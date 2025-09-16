import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/dbConnection.js";
const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function main() {
  await connectDB();
  app.listen(process.env.PORT, () => {
    console.log("Server running on port 3000");
  });
}

main();
