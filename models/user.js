const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv/config")

const fileSchema = new mongoose.Schema({
  fieldname:String,
  originalname:String,
  encoding:String,
  mimetype:String,
  destination:String,
  filename:String,
  path:String,
  size:Number
})

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  resources:[fileSchema]
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
    },
    process.env.JwtPrivateKey
  );
  return token;
};

const User = mongoose.model("User", userSchema);


module.exports= User;

