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

// const ServiceChat = ({ route }) => {
//   const { context } = route.params;
//   const [inputText, setInputText] = useState("");
//   const [messages, setMessages] = useState([]);
//   const socket = useRef(null);

//   useEffect(() => {
//     // 连接socket.io服务器
//     socket.current = io("http://localhost:3000");
//     // 监听历史消息
//     socket.current.on("history", (history) => {
//       setMessages(history);
//     });
//     // 监听新消息
//     socket.current.on("message", (message) => {
//       setMessages((prec) => [...PreventRemoveContext, message]);
//     });
//     return () => {
//       socket.current.disconnect();
//     };
//   });

//   const sendMessage = () => {
//     if (inputText.trim()) {
//       socket.current.emit("message", {
//         text: inputText,
//         sender: "user",
//       });
//       setInputText("");
//     }
//     console.log(inputText);
//   };

//   const renderMessage = ({ item }) => {
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
//     </View>;
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>客户聊天/chat</Text>
//       </View>
//       <Text style={styles.contextText}>{context}</Text>
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           value={inputText}
//           onChange={(e) => setInputText(e.target.value)}
//           placeholder="请输入消息..."
//         />
//         <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
//           <Text style={styles.sendButtontext}>发送</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   contextText: {
//     fontSize: 16,
//     color: "#333",
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

// export default ServiceChat;

// import React, { useState, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Platform,
//   Alert,
//   Dimensions,
//   Modal,
// } from "react-native";
// import { io } from "socket.io-client";
// import axios from "axios";
// import Voice from "@react-native-voice/voice"; // 用于语音识别
// import AudioRecorderPlayer from "react-native-audio-recorder-player"; // 用于音频录音
// import { launchImageLibrary } from "react-native-image-picker"; // 用于图片选择
// import EmojiPicker from "react-native-emoji-keyboard"; // 用于表情选择

// const { width } = Dimensions.get("window");

// const ChatScreen = ({ username }) => {
//   const [messageList, setMessageList] = useState([]);
//   const [dispatcher, setDispatcher] = useState("");
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [isPopupVisible, setIsPopupVisible] = useState(false);
//   const [isEmojiVisible, setIsEmojiVisible] = useState(false);
//   const flatListRef = useRef(null);
//   const messageIdCounter = useRef(0);
//   const pendingMessages = useRef([]);
//   const audioRecorderPlayer = useRef(new AudioRecorderPlayer()).current;

//   // Socket.IO 设置
//   const socket = io("ws://你的服务器IP:3001", {
//     autoConnect: false,
//     reconnection: true,
//     reconnectionAttempts: Infinity,
//     reconnectionDelay: 1000,
//     reconnectionDelayMax: 5000,
//   });

//   // 表情列表（为演示简化；建议使用 EmojiPicker）
//   const emojilist = [
//     ["😀", "😁", "😂", "🤣", "😃", "😅", "😆"],
//     ["😉", "😊", "😋", "😎", "😍", "😘", "😗"],
//     ["😙", "😚", "🙂", "🤗", "🤔", "😐", "😑"],
//     ["😶", "🙄", "😏", "😣", "😥", "😮", "🤐"],
//     ["😯", "😪", "😫", "😴", "😌", "😛", "😜"],
//     ["😝", "🤤", "😒", "😓", "😔", "😕", "🙃"],
//     ["🤑", "😲", "🙁", "😖", "😟", "😤", "😢"],
//     ["😭", "😧", "😨", "😩", "😬", "😰", "😳"],
//     ["😱", "😵", "😡", "😠", "😷", "🤒", "🤕"],
//   ];

//   // 语音识别设置
//   useEffect(() => {
//     Voice.onSpeechStart = () => setIsSpeaking(true);
//     Voice.onSpeechEnd = () => setIsSpeaking(false);
//     Voice.onSpeechResults = (e) => setDispatcher(e.value[0]);
//     Voice.onSpeechError = (e) => {
//       console.error("语音错误:", e);
//       setIsSpeaking(false);
//     };

//     return () => {
//       Voice.destroy().then(Voice.removeAllListeners);
//     };
//   }, []);

//   // Socket.IO 连接和事件
//   useEffect(() => {
//     socket.connect();

//     socket.on("connect", () => {
//       console.log("已连接服务器");
//       const heartbeat = setInterval(() => {
//         socket.emit("heartbeat", "ping");
//       }, 5000);
//       return () => clearInterval(heartbeat);
//     });

//     socket.on("disconnect", (reason) => {
//       console.log("断开连接:", reason);
//     });

//     socket.on("reconnect", (attempt) => {
//       console.log("重连成功，第", attempt, "次尝试");
//     });

//     socket.on("heartbeat", (data) => {
//       console.log("收到心跳响应:", data);
//     });

//     socket.on("message", (msg, user) => {
//       if (user !== username) {
//         const userObj = {
//           username: user,
//           message: msg,
//           sendFailed: !navigator.onLine,
//         };
//         setMessageList((prev) => [...prev, userObj]);
//       }
//     });

//     socket.on("messageAck", (ackId) => {
//       const index = pendingMessages.current.findIndex(
//         (msg) => msg.id === ackId
//       );
//       if (index !== -1) {
//         const confirmedMessage = pendingMessages.current.splice(index, 1)[0];
//         setMessageList((prev) => {
//           if (!prev.some((msg) => msg.id === ackId)) {
//             return [...prev, confirmedMessage];
//           }
//           return prev;
//         });
//       }
//     });

//     socket.on("imageMessage", (data) => {
//       const imgBaseUrl = "http://你的服务器IP:3001/uploads";
//       const imageName = data.path.split("\\").pop();
//       const imageUrl = `${imgBaseUrl}/${imageName}`;
//       const userObj = {
//         username: data.username || username,
//         message: imageUrl,
//         isImage: true,
//         sendFailed: false,
//       };
//       setMessageList((prev) => [...prev, userObj]);
//     });

//     socket.on("audioMessage", (data) => {
//       const audioBaseUrl = "http://你的服务器IP:3001/audioUploads";
//       const audioName = data.path.split("\\").pop();
//       const audioUrl = `${audioBaseUrl}/${audioName}`;
//       const userObj = {
//         username: data.username || username,
//         message: audioUrl,
//         isAudio: true,
//         sendFailed: false,
//       };
//       setMessageList((prev) => [...prev, userObj]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   // 消息更新时滚动到底部
//   useEffect(() => {
//     flatListRef.current?.scrollToEnd({ animated: true });
//   }, [messageList]);

//   // 发送文本消息
//   const sendMessage = () => {
//     if (!dispatcher.trim()) return;

//     const newMessage = {
//       username,
//       message: dispatcher,
//       sendFailed: !navigator.onLine,
//       id: messageIdCounter.current++,
//     };

//     if (navigator.onLine) {
//       socket.emit("message", newMessage, username);
//       pendingMessages.current.push(newMessage);
//     } else {
//       setMessageList((prev) => [...prev, newMessage]);
//     }

//     setDispatcher("");
//     setIsPopupVisible(false);
//     setIsEmojiVisible(false);
//   };

//   // 重新发送失败的消息
//   const resendMessage = (failedMessage) => {
//     if (navigator.onLine) {
//       socket.emit("message", failedMessage.message, username);
//       setMessageList((prev) =>
//         prev.filter((msg) => msg.id !== failedMessage.id)
//       );
//     } else {
//       Alert.alert("网络错误", "离线状态无法重新发送消息。");
//     }
//   };

//   // 选择图片
//   const selectImage = () => {
//     if (!navigator.onLine) {
//       Alert.alert("网络错误", "离线状态无法上传图片。");
//       return;
//     }

//     launchImageLibrary({ mediaType: "photo" }, async (response) => {
//       if (response.assets && response.assets[0].uri) {
//         const formData = new FormData();
//         formData.append("image", {
//           uri: response.assets[0].uri,
//           type: response.assets[0].type,
//           name: response.assets[0].fileName || "image.jpg",
//         });
//         formData.append("username", username);

//         try {
//           await axios.post("http://你的服务器IP:3001/upload", formData, {
//             headers: { "Content-Type": "multipart/form-data" },
//           });
//         } catch (error) {
//           console.error("图片上传失败:", error);
//           Alert.alert("错误", "图片上传失败。");
//         }
//       }
//     });
//   };

//   // 语音识别
//   const toggleSpeechRecognition = async () => {
//     if (!isSpeaking) {
//       try {
//         await Voice.start("zh-CN");
//       } catch (e) {
//         console.error("语音识别错误:", e);
//       }
//     } else {
//       Voice.stop();
//     }
//   };

//   // 录音
//   const startRecording = async () => {
//     try {
//       await audioRecorderPlayer.startRecorder();
//       console.log("开始录音");
//     } catch (error) {
//       console.error("录音错误:", error);
//     }
//   };

//   const stopRecording = async () => {
//     try {
//       const result = await audioRecorderPlayer.stopRecorder();
//       const formData = new FormData();
//       formData.append("audio", {
//         uri: result,
//         type: "audio/wav",
//         name: "audio.wav",
//       });
//       formData.append("username", username);

//       await axios.post("http://你的服务器IP:3001/uploadAudio", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       console.log("音频上传成功");
//     } catch (error) {
//       console.error("音频上传失败:", error);
//       Alert.alert("错误", "音频上传失败。");
//     }
//   };

//   // 渲染消息项
//   const renderMessage = ({ item }) => (
//     <View
//       style={[
//         styles.messageContainer,
//         item.username === username ? styles.mainer : styles.other,
//       ]}
//     >
//       <Image
//         source={{ uri: "../../../assets/images/userImage.webp" }} // 替换为实际图片 URI
//         style={styles.avatar}
//       />
//       <View style={styles.words}>
//         {item.isImage ? (
//           <Image source={{ uri: item.message }} style={styles.messageImage} />
//         ) : item.isAudio ? (
//           <Text style={styles.audioPlaceholder}>[音频消息]</Text> // 音频播放器待实现
//         ) : (
//           <Text style={styles.messageText}>{item.message}</Text>
//         )}
//       </View>
//       {item.sendFailed && (
//         <TouchableOpacity onPress={() => resendMessage(item)}>
//           <Text style={styles.failedIcon}>❗</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {isSpeaking && (
//         <View style={styles.speakingIndicator}>
//           <Image
//             source={{ uri: "../../../assets/images/yuyin.gif" }} // 替换为实际 GIF
//             style={styles.speakingImage}
//           />
//         </View>
//       )}
//       <FlatList
//         ref={flatListRef}
//         data={messageList}
//         renderItem={renderMessage}
//         keyExtractor={(item, index) => `${item.id || index}`}
//         style={styles.messageList}
//       />
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           value={dispatcher}
//           onChangeText={setDispatcher}
//           placeholder="输入消息..."
//           multiline
//           onSubmitEditing={sendMessage}
//         />
//         {dispatcher.length > 0 ? (
//           <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
//             <Text style={styles.sendButtonText}>发送</Text>
//           </TouchableOpacity>
//         ) : (
//           <TouchableOpacity onPress={() => setIsPopupVisible(true)}>
//             <Image
//               source={{ uri: "../../../assets/images/plus.png" }} // 替换为实际图片
//               style={styles.icon}
//             />
//           </TouchableOpacity>
//         )}
//         <TouchableOpacity onPress={() => setIsEmojiVisible(true)}>
//           <Image
//             source={{ uri: "../../../assets/images/emoji.png" }} // 替换为实际图片
//             style={styles.icon}
//           />
//         </TouchableOpacity>
//       </View>

//       {/* 弹出框 Modal */}
//       <Modal
//         visible={isPopupVisible}
//         transparent
//         animationType="slide"
//         onRequestClose={() => setIsPopupVisible(false)}
//       >
//         <TouchableOpacity
//           style={styles.modalOverlay}
//           onPress={() => setIsPopupVisible(false)}
//         >
//           <View style={styles.popup}>
//             <View style={styles.popupGrid}>
//               <TouchableOpacity style={styles.gridItem} onPress={selectImage}>
//                 <Text style={styles.gridText}>图片</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.gridItem}
//                 onPress={toggleSpeechRecognition}
//               >
//                 <Text style={styles.gridText}>语音转文字</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.gridItem}
//                 onPress={startRecording}
//               >
//                 <Text style={styles.gridText}>开始录音</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.gridItem} onPress={stopRecording}>
//                 <Text style={styles.gridText}>结束录音</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </TouchableOpacity>
//       </Modal>

//       {/* 表情选择器 */}
//       <EmojiPicker
//         open={isEmojiVisible}
//         onClose={() => setIsEmojiVisible(false)}
//         onEmojiSelected={(emoji) => setDispatcher((prev) => prev + emoji.emoji)}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   messageList: {
//     flex: 1,
//     padding: 10,
//   },
//   messageContainer: {
//     flexDirection: "row",
//     marginBottom: 15,
//     alignItems: "center",
//   },
//   mainer: {
//     flexDirection: "row-reverse",
//   },
//   other: {
//     flexDirection: "row",
//   },
//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//   },
//   words: {
//     maxWidth: "70%",
//     padding: 10,
//     borderRadius: 10,
//     marginHorizontal: 10,
//   },
//   messageText: {
//     fontSize: 16,
//   },
//   messageImage: {
//     width: 140,
//     height: 100,
//     borderRadius: 5,
//   },
//   audioPlaceholder: {
//     fontSize: 16,
//     color: "#555",
//   },
//   failedIcon: {
//     fontSize: 20,
//     color: "red",
//     marginRight: 5,
//   },
//   speakingIndicator: {
//     position: "absolute",
//     bottom: 100,
//     left: 20,
//     width: width - 40,
//     height: 150,
//     backgroundColor: "pink",
//     zIndex: 1000,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   speakingImage: {
//     width: "100%",
//     height: "100%",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 10,
//     borderTopWidth: 1,
//     borderTopColor: "#ccc",
//     backgroundColor: "#eee",
//   },
//   input: {
//     flex: 1,
//     backgroundColor: "#fff",
//     borderRadius: 20,
//     padding: 10,
//     marginRight: 10,
//     maxHeight: 100,
//   },
//   sendButton: {
//     backgroundColor: "#27c669",
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     borderRadius: 5,
//     marginRight: 10,
//   },
//   sendButtonText: {
//     color: "#fff",
//     fontSize: 16,
//   },
//   icon: {
//     width: 25,
//     height: 25,
//   },
//   popup: {
//     backgroundColor: "#fff",
//     padding: 10,
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: "flex-end",
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   popupGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-around",
//   },
//   gridItem: {
//     width: width / 4 - 20,
//     alignItems: "center",
//     padding: 10,
//   },
//   gridText: {
//     fontSize: 14,
//     marginTop: 5,
//   },
// });

// export default ChatScreen;
