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

app.set("trust proxy", 1);

app.use(
  cors({
    origin: (origin, callback) => {
      // 서버 간 호출 (Postman 등)
      if (!origin) return callback(null, true);

      // 모든 Vercel 배포 도메인 허용
      if (
        origin === "https://mvtt.vercel.app" ||
        origin.endsWith(".vercel.app")
      ) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

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
