import dotenv from "dotenv";
dotenv.config(); // ⭐⭐⭐ 이게 핵심 ⭐⭐⭐

import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.js";



console.log("ENV CHECK", {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
});

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

app.use(express.json());

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
