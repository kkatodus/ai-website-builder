export type conversationType = {
  message: string;
  creator: "user" | "bot";
  timestamp: Date;
  _id: string;
};

export type sessionType = {
  _id: string;
  title: string;
  user: string;
  conversationHistory: conversationType[];
  htmlCode: string;
  cssCode: string;
  createdAt: string;
  __v: number;
};
