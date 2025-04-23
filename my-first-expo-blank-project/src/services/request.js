// 移除类型导入，直接导入模块
import { LRUCache } from "lru-cache";
import PQueue from "p-queue";
import { message as antdMessage } from "antd";
import axios from "axios";
import axiosRetry from "axios-retry";

// 全局配置 message，启用提示队列
const messageQueue = [];
const MAX_MESSAGE_COUNT = 3;
const MESSAGE_DURATION = 3;

const showNextMessage = () => {
  if (messageQueue.length > 0 && antdMessage.destroy) {
    const { content, type, timestamp } = messageQueue[0];
    antdMessage.destroy(); // 销毁当前提示
    if (type === "error") {
      antdMessage.error(content, MESSAGE_DURATION, () => {
        messageQueue.shift();
        showNextMessage();
      });
    } else if (type === "success") {
      antdMessage.success(content, MESSAGE_DURATION, () => {
        messageQueue.shift();
        showNextMessage();
      });
    }
  }
};

const enqueueMessage = (content, type) => {
  const now = Date.now();
  // 去重：检查最近 5 秒内是否有相同内容
  const isDuplicate = messageQueue.some(
    (msg) => msg.content === content && now - msg.timestamp < 5000
  );
  if (!isDuplicate && messageQueue.length < MAX_MESSAGE_COUNT * 2) {
    messageQueue.push({ content, type, timestamp: now });
    if (messageQueue.length === 1) showNextMessage();
  }
};

// 全局 Loading 状态管理
let loadingCount = 0;
const setLoading = (isLoading) => {
  loadingCount += isLoading ? 1 : -1;
  console.log("Global Loading:", loadingCount > 0);
};

// 请求缓存，使用 LRUCache
const cache = new LRUCache({
  max: 500, // 最大条目数
  maxSize: 5000, // 最大存储大小（单位由 sizeCalculation 决定）
  sizeCalculation: (value, key) => {
    return 1; // 每个条目占 1 单位大小，可根据实际数据调整
  },
  dispose: (value, key) => {
    console.log(`Cache entry evicted for key: ${key}`); // 清理时记录日志
  },
  ttl: 1000 * 60 * 5, // 默认 5 分钟过期
  allowStale: false, // 不返回过期项
  updateAgeOnGet: false, // 获取时不更新年龄
  updateAgeOnHas: false, // has 检查时不更新年龄
});

// 请求队列
const queue = new PQueue({ concurrency: 3 });

// 请求去重和取消管理
const pendingRequests = new Map();
const controllers = new Map();

// Token 刷新状态
let isRefreshing = false;
let failedQueue = [];
const REFRESH_TIMEOUT = 5000; // 刷新超时 5 秒

// 排序对象，确保属性顺序一致
const sortObject = (obj) => {
  if (typeof obj !== "object" || obj === null) return obj;
  return Object.keys(obj)
    .sort()
    .reduce((sorted, key) => {
      sorted[key] = sortObject(obj[key]);
      return sorted;
    }, {});
};

const createApiInstance = () => {
  const instance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    timeout: 10000,
  });

  axiosRetry(instance, {
    retries: 3,
    retryDelay: (retryCount) => retryCount * 1000,
    retryCondition: (error) =>
      axios.isAxiosError(error) &&
      (error.code === "ECONNABORTED" || (error.response?.status ?? 0) >= 500),
  });

  instance.interceptors.request.use(
    (config) => {
      setLoading(true);
      config.metadata = {
        startTime: Date.now(),
        requestId: crypto.randomUUID(),
      };
      console.log(
        `Request ${config.metadata.requestId}: ${config.method} ${config.url}`
      );

      const token = localStorage.getItem("token");
      if (token) {
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      setLoading(false);
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      setLoading(false);
      const { metadata } = response.config;
      const duration = Date.now() - (metadata?.startTime ?? 0);
      console.log(
        `Response ${metadata?.requestId}: ${response.config.method} ${response.config.url} - ${response.status} (${duration}ms)`
      );
      return response;
    },
    async (error) => {
      setLoading(false);

      if (!error.config) return Promise.reject(error);

      const config = error.config;
      const duration = Date.now() - (config.metadata?.startTime ?? 0);
      console.log(
        `Error ${config.metadata?.requestId}: ${config.method} ${config.url} - ${error.response?.status} (${duration}ms)`
      );

      if (axios.isCancel(error)) {
        enqueueMessage("请求已取消", "error");
        throw new Error("请求已取消");
      }

      if (
        axios.isAxiosError(error) &&
        error.response?.status === 401 &&
        config
      ) {
        const originalRequest = config;

        if (!originalRequest._retry) {
          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                originalRequest.headers = originalRequest.headers || {};
                originalRequest.headers["Authorization"] = `Bearer ${token}`;
                return instance(originalRequest);
              })
              .catch((err) => Promise.reject(err));
          }

          originalRequest._retry = true;
          isRefreshing = true;

          let refreshTimeout;
          try {
            const newToken = await Promise.race([
              refreshToken(),
              new Promise(
                (_, reject) =>
                  (refreshTimeout = setTimeout(
                    () => reject(new Error("刷新超时")),
                    REFRESH_TIMEOUT
                  ))
              ),
            ]);
            clearTimeout(refreshTimeout);
            localStorage.setItem("token", newToken);
            instance.defaults.headers.common["Authorization"] =
              `Bearer ${newToken}`;
            processQueue(null, newToken);
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            return instance(originalRequest);
          } catch (refreshError) {
            clearTimeout(refreshTimeout);
            processQueue(refreshError, undefined);
            console.error("Token 刷新失败:", refreshError);
            localStorage.clear();
            window.location.href = "/login";
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
            failedQueue = []; // 清空队列，避免内存泄漏
          }
        }
      }

      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const messageText = getErrorMessage(error);
        if (status === 403) {
          enqueueMessage("无权限访问", "error");
        } else if (status && status !== 401) {
          enqueueMessage(messageText, status >= 500 ? "error" : "error");
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

const api = createApiInstance();

// 错误提示函数
const showErrorMessage = (content, isCritical = false) => {
  enqueueMessage(content, "error");
};

// 成功提示函数
const showSuccessMessage = (content) => {
  enqueueMessage(content, "success");
};

const getErrorMessage = (error) => {
  let msg = "未知错误";
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    switch (status) {
      case 400:
        msg = "请求错误";
        break;
      case 401:
        msg = "未授权，请登录";
        break;
      case 403:
        msg = "拒绝访问";
        break;
      case 404:
        msg = "请求地址出错";
        break;
      case 408:
        msg = "请求超时";
        break;
      case 500:
        msg = "服务器内部错误";
        break;
      case 502:
        msg = "网关错误";
        break;
      case 503:
        msg = "服务不可用";
        break;
      case 504:
        msg = "网关超时";
        break;
      default:
        msg = "网络请求失败";
    }
  }
  return msg;
};

const processQueue = (error, token) => {
  failedQueue.forEach((prom) =>
    error ? prom.reject(error) : prom.resolve(token)
  );
  failedQueue = [];
};

const refreshToken = async () => {
  try {
    const response = await axios.post("/refresh-token", {
      refreshToken: localStorage.getItem("refreshToken"),
    });
    return response.data.accessToken || "new-token";
  } catch (error) {
    console.log(error);
    throw new Error("Token refresh failed");
  }
};

export const cancelAllRequests = () => {
  controllers.forEach((controller, key) => {
    controller.abort();
    pendingRequests.delete(key);
    controllers.delete(key);
  });
};

/**
 * 发送 HTTP 请求，支持缓存、队列和自动重试。
 * @param config 请求配置
 * @returns 请求结果，带有 cancel 方法
 */
export const request = async (config) => {
  const requestKey = `${config.method || "get"}-${config.url}-${JSON.stringify(
    sortObject(config.params || {})
  )}-${JSON.stringify(sortObject(config.data || {}))}`;

  if (pendingRequests.has(requestKey)) {
    console.log(`Request deduplicated: ${requestKey}`);
    return pendingRequests.get(requestKey);
  }

  const controller = new AbortController();
  config.signal = controller.signal;
  controllers.set(requestKey, controller);

  const requestPromise = queue
    .add(() =>
      api({
        ...config,
        timeout: config.timeout,
      }).then((response) => response.data)
    )
    .finally(() => {
      queueMicrotask(() => {
        pendingRequests.delete(requestKey);
        controllers.delete(key);
      });
    });

  requestPromise.cancel = () => controller.abort();
  pendingRequests.set(requestKey, requestPromise);

  try {
    const result = await requestPromise;
    return result;
  } catch (error) {
    config.onError?.(error);
    throw error;
  }
};

export const get = async (url, params, config = {}) => {
  const cacheKey = `${url}-${JSON.stringify(sortObject(params || {}))}`;
  const cached = cache.get(cacheKey);
  const cacheConfig =
    config.cache === true ? { duration: 1000 * 60 * 5 } : config.cache;

  if (
    cacheConfig &&
    cached &&
    Date.now() - cached.timestamp < cached.duration
  ) {
    console.log(`Cache hit for key: ${cacheKey}`);
    return { data: cached.data, fromCache: true };
  }

  const result = await request({ method: "get", url, params, ...config });
  if (cacheConfig) {
    const duration = cacheConfig.duration || 1000 * 60 * 5;
    cache.set(cacheKey, { data: result, timestamp: Date.now(), duration });
    console.log(`Cache set for key: ${cacheKey} with duration: ${duration}ms`);
  }
  return { data: result, fromCache: false };
};

export const post = (url, data, config = {}) => {
  return request({ method: "post", url, data, ...config });
};

export const put = (url, data, config = {}) => {
  return request({ method: "put", url, data, ...config });
};

export const del = (url, params, config = {}) => {
  return request({ method: "delete", url, params, ...config });
};

// 导出提示方法
export { showErrorMessage, showSuccessMessage };
