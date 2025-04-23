const mongoose=require('./db')
const LoginSchema=new mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true}
})
const LoginModel=mongoose.model('login',LoginSchema)
const shopSchema=new mongoose.Schema({
    name:String,
    context:String,
    img:String,
    time:String,
    flag:Boolean
})
const shopModel=mongoose.model('shop',shopSchema)
module.exports={LoginModel,shopModel}