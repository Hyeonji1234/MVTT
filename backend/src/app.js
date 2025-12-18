import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRouter from "./routes/auth.js";
import reviewsRouter from "./routes/reviews.js";
import tagsRouter from "./routes/tags.js";
import moviesRouter from "./routes/movies.js";

const app = express();

/* ⭐ Render + Vercel 필수 */
app.set("trust proxy", 1);

/* ⭐ CORS 단일 설정 (중요) */
app.use(
  cors({
    origin: "https://mvtt.vercel.app",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ⭐ Preflight 처리 */
app.options("*", cors());

app.use(morgan("dev"));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/reviews", reviewsRouter);
app.use("/tags", tagsRouter);
app.use("/movies", moviesRouter);

app.get("/", (_req, res) => res.send("SPO Backend OK"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on ${PORT}`);
});
