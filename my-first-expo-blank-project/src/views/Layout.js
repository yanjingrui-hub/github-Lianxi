import React from "react";
// import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "../components/Home";
import My from "../components/My";
import Massign from "../components/Massign";
import Category from "../components/Category";

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
