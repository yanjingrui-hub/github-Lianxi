import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-web";

export default function Home({ navigation }) {
  const handleDetail = () => {
    navigation.navigate("Detail");
  };

  return (
    <View>
      <Text>首页页面</Text>
      <Button title="进入到详情的页面" onPress={handleDetail}></Button>
    </View>
  );
}
