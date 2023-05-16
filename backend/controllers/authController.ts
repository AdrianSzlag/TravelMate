import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  const { firstName, phone, dateOfBirth, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      email,
      phone,
      dateOfBirth,
      role: "user",
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User created." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error." });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  console.log(email, password);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};
