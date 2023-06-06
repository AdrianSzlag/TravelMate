import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { upload } from "../middlewares/fileMiddleware";
import { createPlace } from "../controllers/placeController";

const userRouter = express.Router();

userRouter.post(
  "/business",
  authMiddleware,
  upload.single("thumbnail"),
  createPlace
);

export default userRouter;
