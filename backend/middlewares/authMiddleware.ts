import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface IRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const fullToken = req.header("Authentication");
  if (!fullToken) {
    return res.status(401).json({ message: "No token, authorization denied." });
  }

  const token = fullToken.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.userId = (decoded as any).id;
    if (!req.userId) {
      throw new Error("Invalid token.");
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid." });
  }
};
