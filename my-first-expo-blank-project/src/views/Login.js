import React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import { Form, Input, Button, Toast } from "@ant-design/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const LoginScreen = ({ navigation, onLoginSuccess }) => {
  const [form] = Form.useForm();

  const handleLogin = () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log("登录信息:", values);
        Toast.success("登录成功");
        // TODO: 调用接口进行登录处理
        // 登录成功后，将登录的信息存储到localstorage中
        await AsyncStorage.setItem(
          "isLoggedIn",
          "true",
          localStorage.setItem("user", JSON.stringify(values))
        );
        onLoginSuccess();
        navigation.replace("Layout");
      })
      .catch((error) => {
        console.log("校验失败:", error);
        Toast.fail("请检查输入内容");
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require("../../assets/logo.png")} // 商城 logo
          style={styles.logo}
          resizeMode="contain"
        />
        <Form form={form} style={styles.form}>
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "请输入手机号" },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "手机号格式不正确",
              },
            ]}
          >
            <Input placeholder="请输入手机号" clear />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "请输入密码" },
              {
                min: 6,
                max: 16,
                message: "密码长度应为 6-16 位",
              },
            ]}
          >
            <Input placeholder="请输入密码" secureTextEntry clear />
          </Form.Item>

          <Button
            type="primary"
            style={styles.loginButton}
            onPress={handleLogin}
          >
            登录
          </Button>
        </Form>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f7fb",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: width * 0.9,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  logo: {
    width: "100%",
    height: 100,
    alignSelf: "center",
    marginBottom: 24,
  },
  loginButton: {
    marginTop: 20,
    borderRadius: 25,
    height: 45,
    justifyContent: "center",
    backgroundColor: "#1677ff",
  },
  form: {
    backgroundColor: "#fff",
    borderBottomWidth: 0,
  },
});

export default LoginScreen;
