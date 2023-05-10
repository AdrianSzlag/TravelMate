import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface IRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.userId = (decoded as any).id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid." });
  }
};
