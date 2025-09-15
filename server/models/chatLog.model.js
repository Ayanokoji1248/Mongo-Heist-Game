import mongoose from "mongoose";

const chatLogSchema = new mongoose.Schema(
  {
    sender: { type: String, required: true, index: true },
    receiver: { type: String, required: true, index: true },
    message: { type: String, required: true },
    encrypted: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

chatLogSchema.index({ sender: 1, receiver: 1, timestamp: -1 });

export default mongoose.model("ChatLog", chatLogSchema);
