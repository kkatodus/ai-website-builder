import mongoose, { Schema, Document } from "mongoose";
import { title } from "process";

export interface IConversation {
  message: string;
  creator: "user" | "bot";
  timestamp: Date;
}

export interface ISession extends Document {
  user: mongoose.Types.ObjectId;
  conversationHistory: IConversation[];
  htmlCode: string;
  cssCode: string;
  createdAt: Date;
}

const ConversationSchema: Schema = new Schema({
  message: { type: String, required: true },
  creator: { type: String, enum: ["user", "bot"], required: true },
  timestamp: { type: Date, required: true },
});

const SessionSchema: Schema = new Schema({
  title: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  conversationHistory: { type: [ConversationSchema], required: true },
  htmlCode: { type: String },
  cssCode: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ISession>("Session", SessionSchema);
