import express from "express";
import { getImage } from "../controllers/imageController";

const imageRouter = express.Router();

imageRouter.get("/", getImage);

export default imageRouter;
