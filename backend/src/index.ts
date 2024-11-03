// src/index.ts
import express, { Express } from "express";
import dotenv from "dotenv";
import chatRoutes from "@routes/chatRoutes";
import userRoutes from "@routes/userRoutes";
import cors from "cors";
import connectDB from "./db";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/chat", chatRoutes);

app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
