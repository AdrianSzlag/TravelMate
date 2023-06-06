import express from "express";
import {
  addMenuItemToPlace,
  addServiceToPlace,
  deleteMenuItemFromPlace,
  deleteServiceFromPlace,
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
placeRouter.delete(
  "/:placeId/service/:serviceId",
  authMiddleware,
  deleteServiceFromPlace
);
placeRouter.delete(
  "/:placeId/menu/:menuId",
  authMiddleware,
  deleteMenuItemFromPlace
);

export default placeRouter;
