import mongoose from "mongoose";

const financialTransactionSchema = new mongoose.Schema(
  {
    transactionId: { type: String, required: true, unique: true, index: true },
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "USD" },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending"
    },
    timestamp: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

financialTransactionSchema.index({ sender: 1, receiver: 1 });
financialTransactionSchema.index({ status: 1, amount: -1 });

export default mongoose.model("FinancialTransaction", financialTransactionSchema);
