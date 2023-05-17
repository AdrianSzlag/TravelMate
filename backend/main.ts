import express, { Request, Response } from "express";
import mongoose, { ConnectOptions } from "mongoose";

import { register, login } from "./controllers/authController";
import { authMiddleware } from "./middlewares/authMiddleware";
import { searchPlaces } from "./controllers/placeController";
import cors from "cors";

require("dotenv").config();

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
app.post("/api/search", searchPlaces);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from MERN server with TypeScripts!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
