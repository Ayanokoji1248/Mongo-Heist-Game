import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/dbConnection.js";
const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GPT
const allowedCollections = [
  "AccessLog",
  "ChatLog",
  "EmployeeRecord",
  "FinancialRecord",
];
const allowedOperations = ["find"];

function sanitizeQuery(queryText) {
  const regex = /^db\.(\w+)\.(find)\((.*)\)$/s; // match db.collection.find({...})
  const match = queryText.trim().match(regex);
  if (!match) throw new Error("Invalid query format!");

  const [, collection, operation, argsStr] = match;

  if (!allowedCollections.includes(collection))
    throw new Error("Invalid collection!");
  if (!allowedOperations.includes(operation))
    throw new Error("Invalid operation!");

  // Convert single quotes to double quotes for JSON
  let filter;
  try {
    filter = JSON.parse(argsStr.replace(/'/g, '"'));
  } catch {
    throw new Error("Invalid query filter JSON!");
  }

  return { collection, operation, filter };
}

app.get("/run-query", (req, res) => {
  const { query } = req.body;

  if (!query) {
    res.json({
      message: "Provide Query",
    });
  }
  const parsed = sanitizeQuery(query);
  console.log(parsed);
  res.json(parsed);
});

async function main() {
  await connectDB();
  app.listen(process.env.PORT, () => {
    console.log("Server running on port 3000");
  });
}

main();
