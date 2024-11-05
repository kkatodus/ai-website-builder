import mongoose, { ConnectOptions } from "mongoose";

const connectDB = async () => {
  try {
    const dbUri = process.env.DATABASE_URL as string;
    await mongoose.connect(dbUri, {
      directConnection: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
