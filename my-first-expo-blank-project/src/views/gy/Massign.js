import React from "react";

export default function Massign() {
  return <div></div>;
}

// import React, { useEffect, useState } from "react";
// import { View, Text, Image, ScrollView,StyleSheet, TouchableOpacity } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// // import { get } from "../../services/request";
// import axios from "axios";
// import { useNavigation } from "@react-navigation/native";

// export default function Massign() {
//   const navigation=useNavigation()
//   const [userData, setUserData] = useState([]);
// const getlist = async () => {
//   const res = await axios.get("/api/assign");
//   console.log(res.data.data);
//   setUserData(res.data.data);
// };
//   const getList = async () => {
//     const res = await axios.get("http://127.0.0.1:3000/shopList");
//     setUserData(res.data.data);
//   };
//   const handleMessgeClick=(item)=>{
//     navigation.navigate("Service",{context:item.context})
//   }
//   useEffect(() => {
//     getList();
//   }, []);
//   return (
//     <View>
//       <View style={styles.topmessage}>
//         <Text style={styles.text1}>消息</Text>
//       </View>
//       <View style={styles.boxcard}>
//         <View style={styles.iconCircle}>
//           <Image
//             source={require("../../../assets/物流.svg")}
//             style={styles.icon1}
//           />
//           <Text style={styles.text2}>物流消息</Text>
//         </View>
//         <View style={styles.iconCircle}>
//           <Image
//             source={require("../../../assets/消息通知-消息.svg")}
//             style={styles.icon1}
//           />
//           <Text style={styles.text2}>通知消息</Text>
//         </View>
//         <View style={styles.iconCircle}>
//           <View style={styles.imggg}>
//             <Image
//               source={require("../../../assets/互动版块.svg")}
//               style={styles.icon2}
//             />
//           </View>
//           <Text>互动消息</Text>
//         </View>
//       </View>
//       <View style={styles.bodycont}>
//         <ScrollView showsHorizontalScrollIndicator={false}>
//           {userData.map((item) => {
//             return (
//               <TouchableOpacity style={styles.listcont} key={item._id} onPress={()=>handleMessgeClick(item)}>
//                 <Image
//                   source={{ uri: item.img }}
//                   style={{ width: 60, height: 60, borderRadius: 50 }}
//                 />
//                 <View style={styles.textContainer}>
//                   <Text>{item.name}</Text>
//                   <Text>{item.context}</Text>
//                   <Text>{item.time}</Text>
//                 </View>
//               </TouchableOpacity>
//             );
//           })}
//         </ScrollView>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   topmessage: {
//     height: 150,
//     lineHeight: 150,
//     width: "100%",
//     backgroundColor: "rgb(193, 171, 150)",
//     justifyContent: "center",
//   },
//   text1: {
//     fontWeight: "bold",
//     fontSize: 20,
//     color: "#fff",
//     marginLeft: 20,
//   },
//   boxcard: {
//     width: "85%",
//     height: 100,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     margin: "auto",
//     marginTop: -45,
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "row",
//     boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
//   },
//   iconCircle: {
//     margin: 25,
//     textAlign: "center",
//     alignItems: "center",
//   },
//   imggg: {
//     width: 40,
//     height: 40,
//     lineHeight: 30,
//     alignItems: "center",
//     borderRadius: 20,
//     backgroundColor: "rgb(109, 111, 209)",
//     textAlign: "center",
//     padding: 5,
//   },
//   icon1: {
//     width: 40,
//     height: 40,
//   },
//   icon2: {
//     width: 30,
//     height: 30,
//   },
//   bodycont: {
//     padding: 10,
//     height: 580,
//   },
//   listcont: {
//     borderColor: "rgb(193, 171, 150)",
//     // borderWidth: 1,
//     // 文字距离底部的线要有一定的距离
//     paddingBottom: 10,
//     borderBottomWidth:1,
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//     // padding: 10,
//     margin:5,
//   },
//   textContainer: {
//     flex: 1,
//     marginLeft: 10,
//   },
// });

// import React, { useState, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import io from "socket.io-client";

// export default function Massign() {
//   const [messages, setMessages] = useState([]);
//   const [inputText, setInputText] = useState("");
//   const socket = useRef(null);

//   useEffect(() => {
//     // 连接 Socket.io 服务器
//     socket.current = io("http://localhost:3000");

//     // 监听历史消息
//     socket.current.on("history", (history) => {
//       setMessages(history);
//     });

//     // 监听新消息
//     socket.current.on("message", (message) => {
//       setMessages((prev) => [...prev, message]);
//     });

//     return () => {
//       socket.current.disconnect();
//     };
//   }, []);

//   const sendMessage = () => {
//     if (inputText.trim()) {
//       socket.current.emit("message", {
//         text: inputText,
//         sender: "user",
//       });
//       setInputText("");
//     }
//   };

//   const renderMessage = ({ item }) => (
//     <View
//       style={[
//         styles.messageContainer,
//         item.sender === "user" ? styles.userMessage : styles.serviceMessage,
//       ]}
//     >
//       <Text style={styles.messageText}>{item.text}</Text>
//       <Text style={styles.timeText}>
//         {new Date(item.timestamp).toLocaleTimeString()}
//       </Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>客服聊天</Text>
//       </View>

//       <FlatList
//         data={messages}
//         renderItem={renderMessage}
//         keyExtractor={(item) => item.id.toString()}
//         style={styles.chatList}
//       />

//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           value={inputText}
//           onChangeText={setInputText}
//           placeholder="请输入消息..."
//         />
//         <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
//           <Text style={styles.sendButtonText}>发送</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//   },
//   header: {
//     height: 60,
//     backgroundColor: "rgb(193, 171, 150)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   headerText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   chatList: {
//     flex: 1,
//     padding: 10,
//   },
//   messageContainer: {
//     maxWidth: "80%",
//     padding: 10,
//     marginVertical: 5,
//     borderRadius: 10,
//   },
//   userMessage: {
//     backgroundColor: "#007AFF",
//     alignSelf: "flex-end",
//   },
//   serviceMessage: {
//     backgroundColor: "#E5E5EA",
//     alignSelf: "flex-start",
//   },
//   messageText: {
//     color: "#fff",
//     fontSize: 16,
//   },
//   timeText: {
//     fontSize: 12,
//     color: "#rgba(255,255,255,0.7)",
//     marginTop: 5,
//   },
//   inputContainer: {
//     flexDirection: "row",
//     padding: 10,
//     backgroundColor: "#fff",
//   },
//   input: {
//     flex: 1,
//     height: 40,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 20,
//     paddingHorizontal: 15,
//     marginRight: 10,
//   },
//   sendButton: {
//     backgroundColor: "rgb(193, 171, 150)",
//     height: 40,
//     paddingHorizontal: 20,
//     borderRadius: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   sendButtonText: {
//     color: "#fff",
//     fontSize: 16,
//   },
// });

// import React, { useState, useEffect, useCallback, useRef } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Platform,
//   Modal,
//   FlatList,
// } from "react-native";
// import axios from "axios";
// import { useNavigation } from "@react-navigation/native";
// import Icon from "react-native-vector-icons/AntDesign"; // For icons
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as ImagePicker from "react-native-image-picker"; // For image picking
// import Voice from "@react-native-voice/voice"; // For speech recognition
// import Tts from "react-native-tts"; // For text-to-speech
// import Clipboard from "@react-native-clipboard/clipboard"; // For copying text
// import Toast from "react-native-toast-message"; // For toast notifications

// const ChatAI = () => {
//   const navigation = useNavigation();
//   const [message, setMessage] = useState("");
//   const [messageCount, setMessageCount] = useState(0);
//   const [messagePairs, setMessagePairs] = useState([]);
//   const [dian, setDian] = useState({
//     name: "Chat",
//     img: "https://example.com/default.jpg",
//   });
//   const [emojiVisible, setEmojiVisible] = useState(false);
//   const [optionsVisible, setOptionsVisible] = useState(false);
//   const [isListening, setIsListening] = useState(false);
//   const [shuo, setShuo] = useState(false);
//   const scrollViewRef = useRef(null);

//   // Emoji list
//   const emojilist = [
//     ["😀", "😁", "😂", "🤣", "😃", "😅", "😆"],
//     ["😝", "🤤", "😒", "📐", "😔", "😕", "🙃"],
//     ["🤑", "😲", "🙁", "😖", "😟", "😤", "😢"],
//     ["😭", "😉", "😊", "😎", "😍", "😘", "😚"],
//     ["😱", "😵", "😡", "😠", "😷", "🤒", "🤕"],
//   ];

//   // Load stored data
//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const storedDian = await AsyncStorage.getItem("dian");
//         const storedMessagePairs = await AsyncStorage.getItem("messagePairs");
//         if (storedDian) setDian(JSON.parse(storedDian));
//         if (storedMessagePairs) setMessagePairs(JSON.parse(storedMessagePairs));
//       } catch (error) {
//         console.error("Error loading data:", error);
//       }
//     };
//     loadData();
//   }, []);

//   // Save messagePairs to AsyncStorage
//   useEffect(() => {
//     const saveData = async () => {
//       try {
//         await AsyncStorage.setItem(
//           "messagePairs",
//           JSON.stringify(messagePairs)
//         );
//       } catch (error) {
//         console.error("Error saving data:", error);
//       }
//     };
//     saveData();
//   }, [messagePairs]);

//   // Speech recognition setup
//   useEffect(() => {
//     Voice.onSpeechStart = () => {
//       console.log("Speech recognition started");
//       setIsListening(true);
//       setShuo(true);
//     };
//     Voice.onSpeechEnd = () => {
//       console.log("Speech recognition stopped");
//       setIsListening(false);
//       setShuo(false);
//     };
//     Voice.onSpeechError = (e) => {
//       console.error("Speech recognition error:", e);
//       setIsListening(false);
//       setShuo(false);
//     };
//     Voice.onSpeechResults = (e) => {
//       const text = e.value[0];
//       console.log("Speech result:", text);
//       setMessage(text);
//     };

//     return () => {
//       Voice.destroy().then(Voice.removeAllListeners);
//     };
//   }, []);

//   // Start speech recognition
//   const startSpeechRecognition = useCallback(async () => {
//     try {
//       await Voice.start("zh-CN");
//     } catch (error) {
//       console.error("Error starting speech recognition:", error);
//     }
//   }, []);

//   // Stop speech recognition
//   const stopSpeechRecognition = useCallback(async () => {
//     try {
//       await Voice.stop();
//     } catch (error) {
//       console.error("Error stopping speech recognition:", error);
//     }
//   }, []);

//   // Text-to-speech
//   const speak = useCallback((content) => {
//     if (content) {
//       Tts.setDefaultLanguage("zh-CN");
//       Tts.setDefaultPitch(0.9);
//       Tts.setDefaultRate(0.9);
//       Tts.speak(content);
//     }
//   }, []);

//   // Clean up TTS
//   useEffect(() => {
//     return () => {
//       Tts.stop();
//     };
//   }, []);

//   // Send message
//   const sendMessage = async () => {
//     try {
//       const response = await axios.post("http://localhost:3000/chat", {
//         userInput: message,
//       });
//       const newMessage = response.data.data;
//       const newMessagePair = {
//         userMessage: message,
//         serverReply: newMessage,
//       };
//       setMessagePairs((prevPairs) => [...prevPairs, newMessagePair]);
//       setMessage("");
//       scrollToBottom();
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   // Throttle sendMessage
//   const throttle = (func, limit) => {
//     let inThrottle;
//     return (...args) => {
//       if (!inThrottle) {
//         func(...args);
//         inThrottle = setTimeout(() => (inThrottle = false), limit);
//       }
//     };
//   };

//   const throttledSendMessage = throttle(sendMessage, 1000);

//   // Handle keyboard 'Enter' equivalent
//   const handleSubmitEditing = () => {
//     if (message.trim()) {
//       throttledSendMessage();
//     }
//   };

//   // Add emoji
//   const addEmoji = (emoji) => {
//     setMessage((prev) => prev + emoji);
//     setMessageCount((prev) => prev + emoji.length);
//     setEmojiVisible(false);
//   };

//   // Image picker
//   const pickImage = () => {
//     ImagePicker.launchImageLibrary(
//       { mediaType: "photo", includeBase64: false },
//       async (response) => {
//         if (response.didCancel) {
//           console.log("User cancelled image picker");
//         } else if (response.errorCode) {
//           console.error("ImagePicker Error:", response.errorMessage);
//         } else {
//           const file = response.assets[0];
//           if (["image/png", "image/jpeg"].includes(file.type)) {
//             const formData = new FormData();
//             formData.append("file", {
//               uri: file.uri,
//               type: file.type,
//               name: file.fileName || "image.jpg",
//             });
//             try {
//               const uploadResponse = await axios.post(
//                 "http://127.0.0.1:3000/upload",
//                 formData,
//                 {
//                   headers: { "Content-Type": "multipart/form-data" },
//                 }
//               );
//               const imageUrl = uploadResponse.data.path;
//               const newMessagePair = {
//                 userMessage: "Sent image",
//                 serverReply: "",
//                 image: imageUrl,
//               };
//               setMessagePairs((prevPairs) => [...prevPairs, newMessagePair]);
//               setOptionsVisible(false);
//               scrollToBottom();
//             } catch (error) {
//               console.error("Image upload error:", error);
//             }
//           }
//         }
//       }
//     );
//   };

//   // Copy text
//   const copy = (content) => {
//     Clipboard.setString(content);
//     Toast.show({
//       type: "success",
//       text1: "复制成功",
//     });
//   };

//   // Scroll to bottom
//   const scrollToBottom = () => {
//     scrollViewRef.current?.scrollToEnd({ animated: true });
//   };

//   // Render
//   return (
//     <View style={styles.container}>
//       {/* Navigation Bar */}
//       <View style={styles.navBar}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Icon name="left" size={24} color="#000" />
//         </TouchableOpacity>
//         <Text style={styles.navTitle}>{dian.name}</Text>
//         <TouchableOpacity onPress={() => navigation.navigate("ChatSettings")}>
//           <Icon name="ellipsis1" size={24} color="#000" />
//         </TouchableOpacity>
//       </View>

//       {/* Chat Area */}
//       <ScrollView
//         style={styles.chatContainer}
//         ref={scrollViewRef}
//         onContentSizeChange={() => scrollToBottom()}
//       >
//         {messagePairs.map((pair, index) => (
//           <View key={index}>
//             {/* User Message */}
//             <View style={styles.userMessage}>
//               <Image
//                 source={{
//                   uri: "https://q7.itc.cn/q_70/images03/20240806/92d3001df33d4b56b1a31a08e0b9800b.jpeg",
//                 }}
//                 style={styles.avatar}
//               />
//               <View>
//                 <Text style={styles.timestamp}>
//                   {new Date().toLocaleString()}
//                 </Text>
//                 <Text style={styles.messageText}>{pair.userMessage}</Text>
//                 {pair.image && (
//                   <Image
//                     source={{ uri: pair.image }}
//                     style={styles.chatImage}
//                   />
//                 )}
//               </View>
//             </View>
//             {/* Robot Message */}
//             <View style={styles.robotMessage}>
//               <Image source={{ uri: dian.img }} style={styles.avatar} />
//               <View>
//                 <Text style={styles.timestamp}>
//                   {new Date().toLocaleString()}
//                 </Text>
//                 <TouchableOpacity onPress={() => copy(pair.serverReply)}>
//                   <Text style={styles.messageText}>{pair.serverReply}</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => speak(pair.serverReply)}>
//                   <Icon name="sound" size={20} color="#000" />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         ))}
//       </ScrollView>

//       {/* Input Area */}
//       <View style={styles.inputContainer}>
//         <TouchableOpacity
//           onPress={shuo ? stopSpeechRecognition : startSpeechRecognition}
//         >
//           <Icon name={shuo ? "pause" : "mic"} size={24} color="#000" />
//         </TouchableOpacity>
//         <TextInput
//           style={styles.input}
//           value={message}
//           onChangeText={(text) => {
//             setMessage(text);
//             setMessageCount(text.length);
//           }}
//           onSubmitEditing={handleSubmitEditing}
//           placeholder="Type a message..."
//           maxLength={100}
//           multiline
//         />
//         <TouchableOpacity onPress={() => setEmojiVisible(true)}>
//           <Icon name="smileo" size={24} color="#000" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => setOptionsVisible(true)}>
//           <Icon name="pluscircleo" size={24} color="#000" />
//         </TouchableOpacity>
//       </View>

//       {/* Emoji Modal */}
//       <Modal
//         visible={emojiVisible}
//         transparent
//         animationType="slide"
//         onRequestClose={() => setEmojiVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.emojiContainer}>
//             <FlatList
//               data={emojilist.flat()}
//               numColumns={7}
//               renderItem={({ item }) => (
//                 <TouchableOpacity onPress={() => addEmoji(item)}>
//                   <Text style={styles.emoji}>{item}</Text>
//                 </TouchableOpacity>
//               )}
//               keyExtractor={(item, index) => index.toString()}
//             />
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => setEmojiVisible(false)}
//             >
//               <Text style={styles.closeButtonText}>关闭</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {/* Options Modal */}
//       <Modal
//         visible={optionsVisible}
//         transparent
//         animationType="slide"
//         onRequestClose={() => setOptionsVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.optionsContainer}>
//             <TouchableOpacity style={styles.optionItem}>
//               <Icon name="shoppingcart" size={30} color="#000" />
//               <Text>商品</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.optionItem}>
//               <Icon name="file1" size={30} color="#000" />
//               <Text>订单</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.optionItem} onPress={pickImage}>
//               <Icon name="picture" size={30} color="#000" />
//               <Text>图片</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.optionItem}>
//               <Icon name="camerao" size={30} color="#000" />
//               <Text>拍摄</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.optionItem}>
//               <Icon name="pay-circle-o1" size={30} color="#000" />
//               <Text>红包</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.optionItem}
//               onPress={() => {
//                 setOptionsVisible(false);
//                 navigation.navigate("Stores");
//               }}
//             >
//               <Icon name="enviromento" size={30} color="#000" />
//               <Text>位置</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.optionItem}
//               onPress={() => {
//                 setOptionsVisible(false);
//                 navigation.navigate("Complaint");
//               }}
//             >
//               <Icon name="exclamationcircleo" size={30} color="#000" />
//               <Text>投诉</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => setOptionsVisible(false)}
//             >
//               <Text style={styles.closeButtonText}>关闭</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       <Toast />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   navBar: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   navTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   chatContainer: {
//     flex: 1,
//     padding: 10,
//   },
//   userMessage: {
//     flexDirection: "row",
//     alignItems: "flex-end",
//     justifyContent: "flex-end",
//     marginVertical: 5,
//   },
//   robotMessage: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//     marginVertical: 5,
//   },
//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginHorizontal: 10,
//   },
//   messageText: {
//     backgroundColor: "#e0e0e0",
//     padding: 10,
//     borderRadius: 10,
//     maxWidth: 250,
//   },
//   chatImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 10,
//     marginTop: 5,
//   },
//   timestamp: {
//     fontSize: 12,
//     color: "#888",
//     marginBottom: 5,
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 10,
//     borderTopWidth: 1,
//     borderTopColor: "#eee",
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 20,
//     padding: 10,
//     marginHorizontal: 10,
//     maxHeight: 100,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "flex-end",
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   emojiContainer: {
//     backgroundColor: "#fff",
//     padding: 20,
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//   },
//   emoji: {
//     fontSize: 30,
//     margin: 10,
//   },
//   optionsContainer: {
//     backgroundColor: "#fff",
//     padding: 20,
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-around",
//   },
//   optionItem: {
//     alignItems: "center",
//     width: "25%",
//     marginVertical: 10,
//   },
//   closeButton: {
//     alignSelf: "center",
//     padding: 10,
//     marginTop: 20,
//   },
//   closeButtonText: {
//     fontSize: 16,
//     color: "#007AFF",
//   },
// });

// export default ChatAI;

// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
// } from "react-native";
// import { FontAwesome } from "@expo/vector-icons";
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';
// import { useState, useRef, useEffect } from "react";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import DraggableBall from "./DraggableBall";

// const API_BASE_URL = "http://127.0.0.1:3000";
// import Voice from "@react-native-voice/voice";

// // 消息组件
// const MessageItem = ({ message, currentUser }) => {
//   const isSelfMessage = currentUser?.username === message.sender;
//   console.log("currentUser:", currentUser);
//   console.log("message.sender:", message.sender);

//   return (
//     <View
//       style={[
//         styles.messageItem,
//         isSelfMessage ? styles.rightMessage : styles.leftMessage,
//       ]}
//     >
//       <View
//         style={[
//           styles.messageContent,
//           isSelfMessage ? styles.ownMessageContent : styles.otherMessageContent,
//         ]}
//       >
//         <Text
//           style={[styles.messageText, isSelfMessage && styles.ownMessageText]}
//         >
//           {message.content || message.message || ""}
//         </Text>
//       </View>
//     </View>
//   );
// };

// export default function Chat() {
//   const router = useRouter();
//   const params = useLocalSearchParams();
//   const chatId = params?.chatId;
//   const chatName = params?.chatName;

//   const [isAIMode, setIsAIMode] = useState(true);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [inputText, setInputText] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const scrollViewRef = useRef(null);

//   // 获取当前用户信息
//   const getCurrentUserData = async () => {
//     try {
//       const currentUserName = await AsyncStorage.getItem("currentUser");
//       const allUsers = await AsyncStorage.getItem("allUsers");

//       if (!currentUserName || !allUsers) {
//         return null;
//       }

//       const usersData = JSON.parse(allUsers);
//       return usersData[currentUserName] || null;
//     } catch (error) {
//       console.error("获取用户数据失败:", error);
//       return null;
//     }
//   };

//   // 初始化用户信息
//   useEffect(() => {
//     const initUser = async () => {
//       const userData = await getCurrentUserData();
//       if (userData) {
//         setCurrentUser(userData.userInfo);
//         const isCustomerService = userData.userInfo.username === "客服小美";
//         setIsAIMode(!isCustomerService);
//       }
//     };

//     initUser();
//   }, []);

//   // 初始化欢迎消息
//   useEffect(() => {
//     const initMessages = async () => {
//       const userData = await getCurrentUserData();
//       if (userData && isAIMode && userData.userInfo.username !== "客服小美") {
//         setMessages([
//           {
//             id: Date.now(),
//             content: "你好！我是AI助手，有什么可以帮你的吗？",
//             sender: "ai",
//             type: "text",
//             timestamp: new Date().toISOString(),
//           },
//         ]);
//       }
//     };

//     initMessages();
//   }, [isAIMode]);

//   // 发送消息
//   const sendMessage = async () => {
//     if (!inputText.trim() || isLoading) return;
//     setIsLoading(true);
//     try {
//       const userData = await getCurrentUserData();
//       if (!userData) {
//         throw new Error("用户信息无效，请重新登录");
//       }

//       const userMessage = {
//         id: Date.now(),
//         content: inputText,
//         sender: userData.userInfo.username,
//         type: "text",
//         timestamp: new Date().toISOString(),
//       };

//       setMessages((prev) => [...prev, userMessage]);
//       setInputText("");

//       // 发送消息部分的修改
//       if (!isAIMode) {
//         const response = await fetch(`${API_BASE_URL}/messages`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${userData.token}`,
//           },
//           body: JSON.stringify({
//             user1: chatName === "客服小美" ? "张三" : "客服小美", // 使用当前登录用户
//             service1: chatName, // 使用聊天对象名称
//             message: inputText,
//             sender: chatName === "客服小美" ? "张三" : "客服小美",
//             receiver: chatName,
//           }),
//         });

//         const data = await response.json();
//         if (!data.success) {
//           throw new Error(data.message || "发送失败");
//         }

//         setTimeout(async () => {
//           await fetchLatestMessages(userData);
//         }, 10000);
//       } else {
//         //进行消息的发送
//         try {
//           const response = await fetch(`${API_BASE_URL}/chat`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${userData.token}`,
//             },
//             body: JSON.stringify({ userInput: inputText }),
//           });

//           const data = await response.json();

//           const aiMessage = {
//             id: Date.now() + 1,
//             content: data.data,
//             sender: "ai",
//             type: "text",
//             timestamp: new Date().toISOString(),
//           };

//           setMessages((prevMessages) => [...prevMessages, aiMessage]);
//         } catch (error) {
//           console.error("AI回复失败:", error);
//           Alert.alert("发送失败", error.message || "请稍后重试");
//         }
//       }
//     } catch (error) {
//       console.error("发送消息失败:", error);
//       Alert.alert("发送失败", error.message || "请稍后重试");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // 获取最新消息
//   const fetchLatestMessages = async (userData) => {
//     try {
//       const response = await fetch(
//         `${API_BASE_URL}/messages?user1=${chatName === "客服小美" ? "张三" : "客服小美"}&service1=${chatName}`,
//         {
//           headers: {
//             Authorization: `Bearer ${userData.token}`,
//           },
//         }
//       );

//       const data = await response.json();
//       console.log("获取到的消息:", data.data);

//       if (data.success && data.data) {
//         // 确保从 chatlist 中获取消息
//         const chatlist = data.data || [];
//         const processedMessages = chatlist.map((msg) => ({
//           id: msg._id || Date.now(),
//           content: msg.message,
//           sender: msg.sender,
//           receiver: msg.receiver,
//           type: "text",
//           timestamp: msg.time || new Date().toISOString(),
//         }));

//         console.log("处理后的消息:", processedMessages);
//         setMessages(processedMessages);
//       }
//     } catch (error) {
//       console.error("获取消息失败:", error);
//     }
//   };

//   // 消息轮询
//   useEffect(() => {
//     if (!isAIMode && chatId) {
//       const checkNewMessages = async () => {
//         const userData = await getCurrentUserData();
//         if (userData) {
//           await fetchLatestMessages(userData);
//         }
//       };

//       checkNewMessages();
//       const interval = setInterval(checkNewMessages, 10000);
//       return () => clearInterval(interval);
//     }
//   }, [isAIMode, chatId, chatName]);

//   // 转人工服务
//   const switchToHuman = async () => {
//     if (!currentUser) {
//       Alert.alert("提示", "请先登录");
//       return;
//     }

//     try {
//       setIsLoading(true);
//       const userData = await getCurrentUserData();
//       console.log("切换到人工服务:", userData);

//       const response = await fetch(`${API_BASE_URL}/match-service`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userData.token}`,
//         },
//         body: JSON.stringify({
//           userId: userData.userInfo.userId, // 修改这里，发送用户ID
//         }),
//       });

//       const data = await response.json();
//       console.log("匹配结果:", data);
//       if (data.data.online) {
//         setIsAIMode(false);
//         setMessages((prev) => [
//           ...prev,
//           {
//             id: Date.now(),
//             content: "已为您接入人工客服，请描述您的问题",
//             sender: "system",
//             type: "text",
//             timestamp: new Date().toISOString(),
//           },
//         ]);

//         router.replace({
//           pathname: "/cxf/chat",
//           params: {
//             chatId: data.data.serviceId,
//             chatName: "客服小美", // 直接使用客服名称
//           },
//         });
//       } else {
//         Alert.alert("提示", data.message || "客服小美当前不在线，请稍后再试");
//         setIsAIMode(true);
//       }
//     } catch (error) {
//       console.error("转人工失败:", error);
//       Alert.alert("错误", "转人工失败，请稍后重试");
//       setIsAIMode(true);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => router.back()}
//           style={styles.backButton}
//         >
//           <FontAwesome name="angle-left" size={24} color="#333" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>
//           {isAIMode ? "AI 助手" : chatName || "人工客服"}
//         </Text>
//       </View>

//       <ScrollView
//         ref={scrollViewRef}
//         style={styles.messageList}
//         onContentSizeChange={() => {
//           scrollViewRef.current?.scrollToEnd({ animated: true });
//         }}
//       >
//         {messages.length > 0 ? (
//           messages.map((msg, index) => (
//             <MessageItem key={index} message={msg} currentUser={currentUser} />
//           ))
//         ) : (
//           <Text style={styles.emptyMessage}>暂无消息</Text>
//         )}
//       </ScrollView>

//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={styles.inputContainer}
//       >
//         <View style={styles.inputWrapper}>
//           <TextInput
//             style={styles.input}
//             value={inputText}
//             onChangeText={setInputText}
//             placeholder="发送消息..."
//             multiline
//           />
//           <TouchableOpacity
//             style={[styles.sendButton, isLoading && styles.sendButtonDisabled]}
//             onPress={sendMessage}
//             disabled={isLoading}
//           >
//             <Text style={styles.sendButtonText}>
//               {isLoading ? "发送中..." : "发送"}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>

//       {isAIMode && currentUser?.username !== "客服小美" && (
//         <DraggableBall onPress={switchToHuman} />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingTop: 44,
//     paddingBottom: 10,
//     backgroundColor: "#fff",
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   backButton: {
//     padding: 8,
//   },
//   headerTitle: {
//     fontSize: 17,
//     fontWeight: "600",
//     color: "#333",
//     marginLeft: 8,
//   },
//   messageList: {
//     flex: 1,
//     padding: 16,
//   },
//   messageItem: {
//     marginBottom: 16,
//     maxWidth: "70%",
//   },
//   leftMessage: {
//     alignSelf: "flex-start",
//   },
//   rightMessage: {
//     alignSelf: "flex-end",
//   },
//   messageContent: {
//     padding: 12,
//     borderRadius: 8,
//   },
//   ownMessageContent: {
//     backgroundColor: "#FF2442",
//   },
//   otherMessageContent: {
//     backgroundColor: "#fff",
//   },
//   messageText: {
//     fontSize: 16,
//     color: "#333",
//   },
//   ownMessageText: {
//     color: "#fff",
//   },
//   inputContainer: {
//     backgroundColor: "#fff",
//     borderTopWidth: 1,
//     borderTopColor: "#eee",
//     padding: 8,
//   },
//   inputWrapper: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 8,
//   },
//   input: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//     borderRadius: 20,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     marginRight: 8,
//     fontSize: 16,
//   },
//   sendButton: {
//     backgroundColor: "#FF2442",
//     borderRadius: 20,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },
//   sendButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   sendButtonDisabled: {
//     backgroundColor: "#ffb3b3",
//   },
//   emptyMessage: {
//     textAlign: "center",
//     color: "#999",
//     marginTop: 20,
//   },
// });
