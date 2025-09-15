import mongoose from "mongoose";

const employeeRecordSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    clearanceLevel: { type: Number, required: true, min: 1, max: 5 },
    department: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    }
  },
  { timestamps: true }
);

employeeRecordSchema.index({ role: 1 });
employeeRecordSchema.index({ clearanceLevel: -1 });

export default mongoose.model("EmployeeRecord", employeeRecordSchema);
