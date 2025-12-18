import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import authRouter from "./routes/auth.js";
import reviewsRouter from "./routes/reviews.js";
import tagsRouter from "./routes/tags.js";
import moviesRouter from "./routes/movies.js";

import pool from "./db.js";

(async () => {
  const [rows] = await pool.query("SELECT DATABASE() AS db");
  console.log("✅ CONNECTED DB:", rows[0].db);
})();

dotenv.config();

const app = express();


app.use(morgan("dev"));
app.use(express.json());

app.use(
  cors({
  origin: [
    "http://localhost:3000",
    "https://mvtt.vercel.app/",
  ],
  credentials: true,
}));


app.get("/", (_req, res) => res.send("SPO Backend OK"));

app.use("/auth", authRouter);
app.use("/reviews", reviewsRouter);
app.use("/tags", tagsRouter);
app.use("/movies", moviesRouter);

const PORT = Number(process.env.PORT || 4000);
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
