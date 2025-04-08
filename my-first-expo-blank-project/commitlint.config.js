const Configuration = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2, // 1是警告， 2是错误
      "always", // 是否使用当前的规则
      [
        "feat", // New feature 新版本
        "fix", // Bug fix 修复bug
        "chore", // Maintenance tasks 日常修改
        "ci", // CI configurationchanges CI配置修改
        "docs", // Documentation updates 文档更新
        "perf", // Performance improvements 性能优化
        "refactor", // Code refactoring 代码重构
        "revert", // Revert to a previous commit 回滚(恢复到之前的提交)
        "style", // Code style changes 代码格式化
        "test", // Adding  or updating tests 添加或更新测试
      ],
    ],
  },
};

module.exports = Configuration;
