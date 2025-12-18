import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRouter from "./routes/auth.js";
import reviewsRouter from "./routes/reviews.js";
import tagsRouter from "./routes/tags.js";
import moviesRouter from "./routes/movies.js";

import pool from "./db.js";

/* 1️⃣ 앱 생성 (가장 먼저!) */
const app = express();

/* 2️⃣ CORS */
app.use(
  cors({
    origin: "*",
  })
);
app.options("*", cors());

/* 3️⃣ 기타 미들웨어 */
app.use(morgan("dev"));
app.use(express.json());

/* 4️⃣ DB 연결 확인 (한 번만) */
(async () => {
  const [rows] = await pool.query("SELECT DATABASE() AS db");
  console.log("✅ CONNECTED DB:", rows[0].db);
})();

/* 5️⃣ 라우터 */
app.get("/", (_req, res) => res.send("SPO Backend OK"));

app.use("/auth", authRouter);
app.use("/reviews", reviewsRouter);
app.use("/tags", tagsRouter);
app.use("/movies", moviesRouter);

/* 6️⃣ 서버 실행 */
const PORT = Number(process.env.PORT || 4000);
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
