import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  cancelReservation,
  getFreeSlotsForService,
  getReservations,
  createReservation,
  updateReservation,
} from "../controllers/reservationController";

const reservationRouter = express.Router();

reservationRouter.get("/available/", authMiddleware, getFreeSlotsForService);
reservationRouter.post("/", authMiddleware, createReservation);
reservationRouter.get("/", authMiddleware, getReservations);
reservationRouter.put("/:reservationId", authMiddleware, updateReservation);
reservationRouter.delete("/:reservationId", authMiddleware, cancelReservation);

export default reservationRouter;
