import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import authRouter from "./routers/authRouter";
import reservationRouter from "./routers/reservationRouter";
import placeRouter from "./routers/placeRouter";
import imageRouter from "./routers/imageRouter";
import reviewRouter from "./routers/reviewRouter";
import userRouter from "./routers/userRouter";

require("dotenv").config();
if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is not defined.", process.env.JWT_SECRET);
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27018/booking";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

app.use("/api/auth", authRouter);
app.use("/api/reservation", reservationRouter);
app.use("/api/place", placeRouter);
app.use("/api/review", reviewRouter);
app.use("/image", imageRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
