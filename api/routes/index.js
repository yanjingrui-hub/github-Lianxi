var express = require('express');
const {createServer}=require("node:http")
const {join,resolve}=require("node:path")
const app=express()
const server=createServer(app)
const {Server}=require('socket.io')
var router = express.Router();
const path=require('path')
const cors=require('cors') //引入cors中间件

const {LoginModel,shopModel}=require('../model/model')


app.use('/uploads',express.static(path.join(__dirname,'./uploads')))
app.use('/audioUploads',express.static(path.join(__dirname,'./audioUploads')))
// 引入fs模块
const fs=require('fs')
const multer=require('multer')

const io=new Server(server,{
  cors:{
    origin:"*",
    methods:["GET","POST"]
  }
})
// 存储聊天记录
let messageHistory=[]
io.on('connection',(socket)=>{
  console.log("用户已连接：",socket.id);
  // 发送历史消息
  socket.emit("history",messageHistory)
  // 接收新消息
  socket.on("message",(msg)=>{
    const message={
      ...msg,
      id:Date.now(),
      timestamp:new Date().toISOString()
    }
  })
  
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/shopList',async(req,res)=>{
  try{
    const data=await shopModel.find()
    res.send({
      code:200,
      msg:'查询成功',
      data
    })
  }catch(err){
    res.send({
      code:500,
      msg:'查询失败',
      err
    })
  }
})




// const client=new OpenAi({
//   apiKey: "sk-oebcfonKqLJu3EMd2Dt0hcLGGsa9ehCnNwjB5L5lCk5gkaep", 
//   baseURL: "https://api.moonshot.cn/v1",
// })
// // 可以在这里自定义角色
// const systemMessage=[
//   {
//     role:'system',
//     content:"你是一个专业的翻译官，请将中文翻译成英文"
//   }
// ]
// let messages=[]
// async function makeMessage(input,n=20){
//   messages.push({
//     role:"user",
//     content:input,
//   })
//   let newMessages=systemMessage;
//   if(messages.length>50){
//     messages=messages.slice(-50)
//   }
//   newMessages=newMessages.concat(messages)
//   return newMessages
// }
// async function chat(input){
//   try{
//     const completion=await client.chat.completions.create({
//       model:"moonshot-v1-8k", //指定的使用语言模型
//       messages:await makeMessage(input),
//       temperature: 0.3// 控制输出的随机性程度，值越低输出越确定
//     })
//     const assistantMessage=completion.choices[0].message;
//     messages.push(assistantMessage)
//     return assistantMessage.content
//   }catch(error){
//     console.error("error during chat completion:",error)
//     throw error
//   }
// }
// router.post('/chat',async(req,res,next)=>{
//   try{
//     const userInput=req.body.userInut
//     if(!userInput){
//       return res.status(400).send({
//         code:400,
//         message:"请提供输入信息"
//       })
//     }
//     const reply=await chat(userInput)
//     res.send({
//       code:200,
//       data:reply
//     })
//   }catch(error){
//     next(error)
//   }
// })

// router.post('/upload',async(req,res,next)=>{
//   let form=new multiparty.Form()
//   form.uploadDir="../upload"
//   form.parse(req,(err,formdate,data)=>{
//     console.log(data);
    
//     res.send({
//       code:200,
//       path:'http://127.0.0.1:3000/'+data.file[0].path
//     })
//   })
// })



module.exports = router;
