import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from "./routes/auth.js";
import reviewsRouter from "./routes/reviews.js";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use("/auth", authRouter);
app.use("/reviews", reviewsRouter);

app.listen(4000, () => {
  console.log("✅ Backend running on http://localhost:4000");
});
