import React from "react";
import { View } from "@ant-design/react-native";
import { useRoute } from "@react-navigation/native";

const Detail = () => {
  const route = useRoute();
  const { id } = route.params;
  return <View>{id}</View>;
};

export default Detail;
