import mongoose, { Schema, Document } from "mongoose";
import { IPlace } from "../models/IPlace";
import { IReservation } from "../models/IReservation";
import { IReview } from "../models/IReview";
import { IUser } from "../models/IUser";

export type IPlaceSchema = Document & IPlace;

export type IPlaceSchemaPopulated = Document &
  IPlace & {
    createdBy: IUser;
    reservations: IReservation[];
    reviews: IReview[];
  };

const PlaceSchema: Schema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: String,
  address: String,
  location: {
    type: { type: String, default: "Point", required: true },
    coordinates: { type: [Number], index: "2dsphere", required: true },
  },
  thumbnail: { type: String, required: true },
  images: [String],
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  contactInfo: {
    phone: { type: String, required: true },
    email: String,
  },
  tags: [String],
  services: [
    {
      name: { type: String, required: true },
      description: String,
      duration: Number,
      price: { type: Number, required: true },
    },
  ],
  reservations: [
    {
      serviceName: { type: String, required: true },
      user: { type: Schema.Types.ObjectId, ref: "User", required: true },
      reservationTime: {
        from: { type: Date, required: true },
        to: { type: Date, required: true },
      },
    },
  ],
  reviews: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User", required: true },
      rating: { type: Number, required: true },
      comment: String,
    },
  ],
});

PlaceSchema.index({
  name: "text",
  description: "text",
  address: "text",
  type: "text",
  tags: "text",
});

export default mongoose.model<IPlaceSchema>("Place", PlaceSchema);
