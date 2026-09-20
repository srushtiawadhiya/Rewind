import express from "express"
import 'dotenv/config';
import cors from 'cors'

import connectDB from "./configs/db.js";

import authRoutes from "./routes/authRoutes.js";
import yearRoutes from "./routes/yearRoutes.js";
import memoryRoutes from "./routes/memoryRoutes.js";

import cookieParser from "cookie-parser";
import path from "path";

console.log("Uploads folder:", path.resolve("uploads"));

const app = express();

connectDB();

app.use(
  cors({
    origin: "https://rewindclient.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/years", yearRoutes);
app.use("/api/memories", memoryRoutes);

app.get('/' , (req,res)=>res.send("API is working"));

const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;