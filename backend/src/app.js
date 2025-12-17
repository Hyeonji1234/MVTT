import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import authRouter from "./routes/auth.js";
import reviewsRouter from "./routes/reviews.js";

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

app.get("/", (req, res) => res.send("SPO Backend OK"));

app.use("/auth", authRouter);
app.use("/reviews", reviewsRouter);

const PORT = Number(process.env.PORT || 4000);
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
