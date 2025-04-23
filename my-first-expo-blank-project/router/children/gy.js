import { createStackNavigator } from "@react-navigation/stack";
import Message from "../../src/views/gy/Massign";
import Service from "../../src/views/gy/service";
const Stack = createStackNavigator();

// 模版
// import Detail1 from "../views/Detail1";

export default [
  // 模版
  //   <Stack.Screen name="Detail1" component={Detail1} key="Detail1" />,
  <Stack.Screen name="Message" component={Message} key="Message" />,
  <Stack.Screen name="Service" component={Service} key="Service" />,
];
