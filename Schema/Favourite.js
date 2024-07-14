import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    favouriteId:String,  
  favouriteIdData: [String]
});

const Favourite = mongoose.model('favourite', userSchema);

export default Favourite;
