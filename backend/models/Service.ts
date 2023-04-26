import mongoose, { Schema, Document } from "mongoose";

export interface IService extends Document {
  name: string;
  description: string;
  duration: number;
  placeId: Schema.Types.ObjectId;
  price: number;
  thumbnail: string;
  images?: string[];
  availableSlots: { from: Date; to: Date }[];
  reservations: Schema.Types.ObjectId[];
  tags?: string[];
}

const ServiceSchema: Schema = new Schema({
  name: String,
  description: String,
  duration: Number,
  placeId: { type: Schema.Types.ObjectId, ref: "Place" },
  price: Number,
  thumbnail: String,
  images: [String],
  availableSlots: [
    {
      from: Date,
      to: Date,
    },
  ],
  reservations: [{ type: Schema.Types.ObjectId, ref: "Reservation" }],
  tags: [String],
});

export default mongoose.model<IService>("Service", ServiceSchema);
