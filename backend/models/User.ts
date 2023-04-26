import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  profileImage: string;
  phone: string;
  address: string;
  dateOfBirth: Date;
  reservations: Schema.Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: String,
  profileImage: String,
  phone: String,
  address: String,
  dateOfBirth: Date,
  reservations: [{ type: Schema.Types.ObjectId, ref: "Reservation" }],
});

export default mongoose.model<IUser>("User", UserSchema);
