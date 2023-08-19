import express from "express";
import {
  deletePlace,
  getPlace,
  searchPlaces,
  updatePlace,
} from "../controllers/placeController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { upload } from "../middlewares/fileMiddleware";
import {
  addServiceToPlace,
  deleteServiceFromPlace,
} from "../controllers/serviceController";
import {
  addMenuItemToPlace,
  deleteMenuItemFromPlace,
} from "../controllers/menuController";

const placeRouter = express.Router();

placeRouter.get("/search", searchPlaces);
placeRouter.get("/:placeId", getPlace);
placeRouter.put(
  "/:placeId",
  authMiddleware,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  updatePlace
);
placeRouter.delete("/:placeId", authMiddleware, deletePlace);
placeRouter.post(
  "/:placeId/service",
  authMiddleware,
  upload.single("image"),
  addServiceToPlace
);
placeRouter.delete(
  "/:placeId/service/:serviceId",
  authMiddleware,
  deleteServiceFromPlace
);
placeRouter.post(
  "/:placeId/menu",
  authMiddleware,
  upload.single("image"),
  addMenuItemToPlace
);
placeRouter.delete(
  "/:placeId/menu/:menuId",
  authMiddleware,
  deleteMenuItemFromPlace
);

export default placeRouter;
