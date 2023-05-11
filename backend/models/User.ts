import mongoose, { Schema, Document } from "mongoose";
import { IReservation } from "./Reservation";

export interface IUser extends Document {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  role: string;
  profileImage?: string;
  phone: string;
  address?: string;
  dateOfBirth: Date;
  reservations?: Schema.Types.ObjectId[] | IReservation[];
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  profileImage: String,
  phone: { type: String, required: true },
  address: String,
  dateOfBirth: { type: Date, required: true },
  reservations: [
    { type: Schema.Types.ObjectId, ref: "Reservation", required: true },
  ],
});

export default mongoose.model<IUser>("User", UserSchema);
