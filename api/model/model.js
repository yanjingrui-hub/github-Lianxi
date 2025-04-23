const mongoose = require('./db')

// 登陆
const LoginSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
})
const LoginModel = mongoose.model('login', LoginSchema)

// 郭艳
const shopSchema = new mongoose.Schema({
    name: String,
    context: String,
    img: String,
    time: String,
    flag: Boolean
})
const shopModel = mongoose.model('shop', shopSchema)

// 杨博凯
// 闫静瑞


module.exports = {
    LoginModel,
    // 郭艳
    shopModel
    // 杨博凯
    // 闫静瑞
}