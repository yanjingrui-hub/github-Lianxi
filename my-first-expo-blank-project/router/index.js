import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Layout from "../src/layout/Layout";
import Login from "../src/views/Login";
import yjr from "./children/yjr";
import ybk from "./children/ybk";
import gy from "./children/gy";

const Stack = createStackNavigator();

function App({ isLoggedIn, onLoginSuccess, onLogout }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        [
          // 主布局页面
          <Stack.Screen name="Layout" key="Layout">
            {(props) => <Layout {...props} onLogout={onLogout} />}
          </Stack.Screen>,

          // 展开子路由模块
          ...yjr,
          ...gy,
          ...ybk,
        ]
      ) : (
        <Stack.Screen name="Login" key="Login">
          {(props) => <Login {...props} onLoginSuccess={onLoginSuccess} />}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
}

export default function Router({ isLoggedIn, onLoginSuccess, onLogout }) {
  return (
    <>
      <App
        isLoggedIn={isLoggedIn}
        onLoginSuccess={onLoginSuccess}
        onLogout={onLogout}
      />
    </>
  );
}
