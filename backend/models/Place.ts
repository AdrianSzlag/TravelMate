import mongoose, { Schema, Document } from "mongoose";

export interface IPlace extends Document {
  name: string;
  type: string;
  description?: string;
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
  reservations?: Schema.Types.ObjectId[];
  contactInfo: {
    phone: string;
    email?: string;
  };
  tags?: string[];
}

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
  rating: Number,
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review", required: true }],
  images: [String],
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  reservations: [
    { type: Schema.Types.ObjectId, ref: "Reservation", required: true },
  ],
  contactInfo: {
    phone: { type: String, required: true },
    email: String,
  },
  tags: [String],
});

export default mongoose.model<IPlace>("Place", PlaceSchema);
