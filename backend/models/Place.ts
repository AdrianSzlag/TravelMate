import mongoose, { Schema, Document } from "mongoose";

export interface IPlace extends Document {
  name: string;
  type: string;
  description: string;
  address: string;
  location: {
    type: string;
    coordinates: number[];
  };
  thumbnail: string;
  rating?: number;
  reviews?: Schema.Types.ObjectId[];
  images?: string[];
  createdBy: Schema.Types.ObjectId;
  reservations: Schema.Types.ObjectId[];
  contactInfo: {
    phone: string;
    email: string;
  };
}

const PlaceSchema: Schema = new Schema({
  name: String,
  type: String,
  description: String,
  address: String,
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], index: "2dsphere" },
  },
  thumbnail: String,
  rating: Number,
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  images: [String],
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  reservations: [{ type: Schema.Types.ObjectId, ref: "Reservation" }],
  contactInfo: {
    phone: String,
    email: String,
  },
});

export default mongoose.model<IPlace>("Place", PlaceSchema);
