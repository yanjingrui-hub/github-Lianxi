import { createStackNavigator } from "@react-navigation/stack";

// 模版
import Detail from "../../src/views/yjr/Detail";
const Stack = createStackNavigator();

export default [
  // 模版
  //   <Stack.Screen name="Detail1" component={Detail1} key="Detail1" />,
  <Stack.Screen name="Detail" component={Detail} key="Detail" />,
];
