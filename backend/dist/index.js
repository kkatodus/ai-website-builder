"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const chatRoutes_1 = __importDefault(require("@routes/chatRoutes"));
const userRoutes_1 = __importDefault(require("@routes/userRoutes"));
const sessionRoutes_1 = __importDefault(require("@routes/sessionRoutes"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)({ origin: "*" }));
app.use(express_1.default.json());
(0, db_1.default)();
app.use("/chat", chatRoutes_1.default);
app.use("/user", userRoutes_1.default);
app.use("/session", sessionRoutes_1.default);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
