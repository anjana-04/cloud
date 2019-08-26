var mongoose=require("mongoose")
var schema=mongoose.Schema
var userschema=new schema({
    text:{type:String},
    file1:{type:String},
   
    
})
var usermodel=mongoose.model("user",userschema,"img1")
module.exports=usermodel