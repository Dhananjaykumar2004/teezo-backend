import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    isAdmin: { type: Boolean, default: false },
  },
  { minimize: false, timestamps: true }
);

// ✅ IMPORTANT: model name MUST be "User"
const User =
  mongoose.models.User || mongoose.model("User", userSchema);

export default User;
