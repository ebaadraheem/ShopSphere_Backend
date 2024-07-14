import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  id:String,
  name:String,
  email:String,
  contact_message:String,
  time:String,
  date:String,
});

const Contact = mongoose.model('message', userSchema);

export default Contact;
