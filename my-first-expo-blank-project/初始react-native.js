import React, { StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  backgorund-color: #f5fcff;
`;

const CountText = styled.Text`
  font-size: 30px;
  color: blue;
  margin: 20px;
`;

const StyledButton = styled(TouchableOpacity)`
  width: 90%;
  padding: 10px 20px;
  margin: 10px;
  background-color: #841584;
  border-radius: 5px;
  align-selft: stretch;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 20px;
  text-align: center;
`;

export default function App1() {
  const [count, setCount] = useState(10);

  console.log(process.env.EXPO_PUBLIC_API_URL, "环境变量");
  console.log(process.env.EXPO_PUBLIC_API_KEY, "key值");

  return (
    <Container style={styles.container}>
      <CountText style={styles.text}>count: {count}</CountText>
      <StyledButton
        onPress={() => {
          console.log("Button Pressed");
          setCount(count + 1);
        }}
      >
        <ButtonText>Increase</ButtonText>
      </StyledButton>
      <StyledButton onPress={() => setCount(count - 1)}>
        <ButtonText>Decrease</ButtonText>
      </StyledButton>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  text: {
    fontSize: 28,
    color: "darkblue",
    margin: 15,
    fontWeight: "bold",
  },
});
