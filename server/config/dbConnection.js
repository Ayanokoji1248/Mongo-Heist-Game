import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MONGO");
  } catch (error) {
    console.log(error, "Error in connecting");
    process.exit(1);
  }
}

export default connectDB;
