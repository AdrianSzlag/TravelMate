import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  cancelReservation,
  getFreeSlotsForService,
  getUserReservations,
  makeReservation,
} from "../controllers/reservationController";

const reservationRouter = express.Router();

reservationRouter.get("/available/", authMiddleware, getFreeSlotsForService);
reservationRouter.post("/", authMiddleware, makeReservation);
reservationRouter.get("/", authMiddleware, getUserReservations);
reservationRouter.delete("/:reservationId", authMiddleware, cancelReservation);

export default reservationRouter;
