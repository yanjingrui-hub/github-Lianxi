const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://yan_jing_rui:yanjingrui91044@cluster0.xazmv.mongodb.net/")
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });
module.exports=mongoose;