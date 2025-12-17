import express from "express";
import {
  createReview,
  getReviewsByMovie,
} from "../controllers/reviewController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// 리뷰 작성 (로그인 필수)
router.post("/", authMiddleware, createReview);

// 영화별 리뷰 조회
router.get("/movie/:movieId", getReviewsByMovie);

export default router;
