import jwt from "jsonwebtoken";

/**
 * JWT 인증 미들웨어
 * - Authorization: Bearer <token>
 */
export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  // 1️⃣ 토큰 존재 여부
  if (!authHeader) {
    return res.status(401).json({
      message: "로그인이 필요합니다.",
    });
  }

  // 2️⃣ Bearer 토큰 분리
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "유효하지 않은 토큰 형식",
    });
  }

  try {
    // 3️⃣ JWT 검증
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ 요청 객체에 유저 정보 저장
    req.user = decoded; 
    // decoded = { id, email, username, iat, exp }

    next();
  } catch (err) {
    return res.status(401).json({
      message: "토큰이 만료되었거나 유효하지 않습니다.",
    });
  }
}
