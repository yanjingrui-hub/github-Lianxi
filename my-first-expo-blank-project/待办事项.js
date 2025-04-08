import React, {
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
  TextInput,
  Button,
  Dimensions,
} from "react-native";

import { useState } from "react";
const { setTimeout } = Dimensions.get("window");
export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const addTask = () => {
    if (task.trim() !== "") {
      setLoading(true);

      setTimeout(() => {
        setTasks([...tasks, task]);
        setTask("");
        setLoading(false);
      }, 500);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>待办事项应用</Text>
      <Text style={styles.subTitle}>今天的待办事项列表</Text>

      <Image
        style={styles.logo}
        source={{
          uri: "https://picx.zhimg.com/v2-d6f44389971daab7e688e5b37046e4e4_720w.jpg?source=172ae18b",
        }}
      ></Image>
      <Image
        style={styles.favicon}
        source={require("./assets/favicon.png")}
      ></Image>
      {/* {loading ? <ActivityIndicator size="small" color="#0000ff" /> : null} */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.loading}
        />
      ) : null}

      <TextInput
        style={styles.input}
        placeholder="输入待办事项"
        value={task}
        onChangeText={(text) => setTask(text)}
      />
      <Button title="添加待办事项" onPress={addTask} />

      <View style={styles.taskList}>
        {tasks.map((item, index) => (
          <Text key={index} style={styles.task}>
            {item}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 20,
    color: "#888",
    marginTop: 10,
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
  favicon: {
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "80%",
    marginTop: 20,
    paddingLeft: 10,
    marginBottom: 20,
  },
  taskList: {
    marginTop: 20,
    width: "80%",
  },
  task: {
    fontSize: 18,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  loading: {
    marginTop: 20,
  },
});
