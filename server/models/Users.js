const {model,Schema} = require("mongoose")



const UserSchema =new Schema({
    name:{type:String},
    email:{type:String},
    age:{type:Number},
    gender:{type:String},
    address:{type:String},
    createdAt:{type:Date},
})

const UserModel = model("users",UserSchema)


module.exports = UserModel


