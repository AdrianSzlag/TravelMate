import express from "express";
import { getPlace, searchPlaces } from "../controllers/placeController";

const placeRouter = express.Router();

placeRouter.get("/search", searchPlaces);
placeRouter.get("/:placeId", getPlace);

export default placeRouter;
