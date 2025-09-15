import mongoose, { Schema } from "mongoose";

const accessLogSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
      index: true,
    },
    ip: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
      enum: ["LOGIN", "LOGOUT", "READ", "WRITE", "DELETE"],
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("AccessLog", accessLogSchema);
