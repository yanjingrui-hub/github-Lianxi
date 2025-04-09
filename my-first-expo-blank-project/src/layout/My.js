import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-web";

export default function My({ navigation, onLogout }) {
  const logout = async () => {
    await AsyncStorage.removeItem("isLoggedIn");
    onLogout();
    navigation.replace("Login");
  };
  return (
    <View>
      <Text>我的页面</Text>
      <Button title="退出登录" onPress={logout} />
    </View>
  );
}
