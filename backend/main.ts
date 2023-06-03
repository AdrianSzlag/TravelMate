import express, { Request, Response } from "express";
import mongoose, { ConnectOptions } from "mongoose";

import { register, login, authenticate } from "./controllers/authController";
import { authMiddleware } from "./middlewares/authMiddleware";
import { searchPlaces, getPlace } from "./controllers/placeController";
import cors from "cors";
import { deleteReview, putReview } from "./controllers/reviewController";
import {
  cancelReservation,
  getFreeSlotsForService,
  getReservations,
  makeReservation,
} from "./controllers/reservationController";

require("dotenv").config();
if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is not defined.", process.env.JWT_SECRET);
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27018/booking";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

app.post("/api/register", register);
app.post("/api/login", login);
app.get("/api/authenticate", authMiddleware, authenticate);
app.post("/api/search", searchPlaces);
app.get("/api/place/:placeId", getPlace);
app.post("/api/review", authMiddleware, putReview);
app.delete("/api/review", authMiddleware, deleteReview);
app.post("/api/reservation/:placeId", authMiddleware, getFreeSlotsForService);
app.post("/api/reservation", authMiddleware, makeReservation);
app.get("/api/reservations", authMiddleware, getReservations);
app.delete(
  "/api/reservation/:reservationId",
  authMiddleware,
  cancelReservation
);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from MERN server with TypeScripts!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
