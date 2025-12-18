import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
app.use(
  cors({
  origin: true,
  credentials: true,
}));

import express from "express";

import morgan from "morgan";


import authRouter from "./routes/auth.js";
import reviewsRouter from "./routes/reviews.js";
import tagsRouter from "./routes/tags.js";
import moviesRouter from "./routes/movies.js";

import pool from "./db.js";

(async () => {
  const [rows] = await pool.query("SELECT DATABASE() AS db");
  console.log("✅ CONNECTED DB:", rows[0].db);
})();



const app = express();


app.use(morgan("dev"));
app.use(express.json());




app.get("/", (_req, res) => res.send("SPO Backend OK"));

app.use("/auth", authRouter);
app.use("/reviews", reviewsRouter);
app.use("/tags", tagsRouter);
app.use("/movies", moviesRouter);

const PORT = Number(process.env.PORT || 4000);
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
