const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    match: [/^\S+@\S+\.\S+$/, "Invalid email address"] 
  },
  age: { type: Number, min: 0 },
  gender: { type: String, enum: ["male", "female", "other"] },
  address: { type: String, trim: true },
}, { timestamps: true }); // Automatically adds createdAt & updatedAt fields

const UserModel = model("users", UserSchema);

module.exports = UserModel;
