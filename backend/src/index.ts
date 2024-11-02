// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import chatRoutes from "@routes/chatRoutes";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("tHIS ");
});
app.use(express.json());

app.use("/chat", chatRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
