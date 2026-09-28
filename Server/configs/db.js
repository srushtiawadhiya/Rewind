import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log("=================================");
    console.log("Database Connected Successfully");
    console.log("Host:", conn.connection.host);
    console.log("Database:", conn.connection.name);
    console.log("=================================");
  } catch (error) {
    console.error("=================================");
    console.error("MongoDB Connection FAILED");
    console.error("Error:", error.message);
    console.error("=================================");
  }
};

export default connectDB;
