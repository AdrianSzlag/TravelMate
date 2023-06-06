import express from "express";
import {
  addMenuItemToPlace,
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
  "/:placeId/service",
  authMiddleware,
  upload.single("image"),
  addServiceToPlace
);
placeRouter.post(
  "/:placeId/menu",
  authMiddleware,
  upload.single("image"),
  addMenuItemToPlace
);

export default placeRouter;
