import express from "express";
import {
  addServiceToPlace,
  getPlace,
  searchPlaces,
} from "../controllers/placeController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { upload } from "../middlewares/fileMiddleware";

const placeRouter = express.Router();

placeRouter.get("/search", searchPlaces);
placeRouter.get("/:placeId", getPlace);
placeRouter.post(
  "/:placeId",
  authMiddleware,
  upload.single("image"),
  addServiceToPlace
);

export default placeRouter;
