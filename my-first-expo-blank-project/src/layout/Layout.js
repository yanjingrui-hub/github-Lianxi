import React from "react";
// import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "../views/ybk/Home";
import My from "./My";
import Massign from "../views/gy/Massign";
import Category from "../views/yjr/Category";
import ShopCart from "../views/yjr/ShopCart";

const Tab = createBottomTabNavigator();

function App({ onLogout }) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="主页"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="分类"
        component={Massign}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="信息"
        component={Category}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="购物车"
        component={ShopCart}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="我的"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          headerShown: false,
        }}
      >
        {(props) => <My {...props} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default App;
