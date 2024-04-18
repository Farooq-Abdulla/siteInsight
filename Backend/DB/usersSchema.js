import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URL);

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    maxLength: 40,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    maxLength: 40,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 4,
    maxLength: 30,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 4,
  },
});


const User = mongoose.model("User", userSchema);

export default User;

