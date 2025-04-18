import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Router from "./router/index";
import "./src/views/gy/Mock"

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loginStatus = await AsyncStorage.getItem("isLoggedIn");
      setIsLoggedIn(loginStatus === "true");
    };
    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) return null;

  return (
    <NavigationContainer>
      <Router
        isLoggedIn={isLoggedIn}
        onLoginSuccess={() => setIsLoggedIn(true)}
        onLogout={() => {
          AsyncStorage.removeItem("isLoggedIn");
          setIsLoggedIn(false);
        }}
      />
    </NavigationContainer>
  );
}
