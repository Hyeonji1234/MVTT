import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import reviewRoutes from "./routes/reviews.js";
import authRoutes from "./routes/auth.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/auth", authRoutes);
app.use("/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.send("SPO Backend Running");
});

app.listen(process.env.PORT, () => {
  console.log(`✅ Backend running on http://localhost:${process.env.PORT}`);
});
