import express, { Request, Response } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import { register, login } from "./auth/authController";
import { authMiddleware } from "./auth/authMiddleware";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27018/booking";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

app.post("/api/auth/register", register);
app.post("/api/auth/login", login);
app.get("/api/test", authMiddleware, (req, res) => {
  res.send("test ok ok");
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from MERN server with TypeScripts!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
