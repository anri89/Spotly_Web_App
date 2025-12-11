import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: String,
  password: String,
  joinedAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);
export default User;
