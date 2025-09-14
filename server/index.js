import dotenv from "dotenv"
import express from "express";
const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT, () => {
  console.log("Server running on port 3000");
});
