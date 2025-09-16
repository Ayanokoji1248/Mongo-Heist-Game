import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/dbConnection.js";
const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GPT 
function sanitizeQuery(queryStr) {
  // Trim and normalize
  const input = queryStr.trim();

  // ✅ Only allow find() or aggregate()
  const regex = /^db\.(\w+)\.(find|aggregate)\(([\s\S]*)\)$/;
  const match = input.match(regex);
  if (!match) {
    throw new Error(
      "❌ Invalid query format. Only find() and aggregate() are allowed."
    );
  }

  const [, collection, operation, args] = match;

  // ❌ Forbidden keywords (prevent injections or harmful ops)
  const forbidden = [
    "update",
    "remove",
    "insert",
    "drop",
    "delete",
    "eval",
    "$where",
  ];
  if (forbidden.some((word) => args.includes(word))) {
    throw new Error("❌ Forbidden operation detected in query.");
  }

  // ✅ Try to parse JSON safely
  let parsedArgs;
  try {
    // Wrap args to allow JSON-like parsing
    parsedArgs = eval("(" + args + ")");
  } catch {
    throw new Error("❌ Invalid query JSON.");
  }

  return { collection, operation, args: parsedArgs };
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
