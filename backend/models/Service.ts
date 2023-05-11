import mongoose, { Schema, Document } from "mongoose";
import { IPlace } from "./Place";

export interface IService extends Document {
  name: string;
  description?: string;
  duration: number;
  placeId: Schema.Types.ObjectId | IPlace;
  price: number;
  availableSlots: { from: Date; to: Date }[];
}

const ServiceSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: String,
  duration: { type: Number, required: true },
  placeId: { type: Schema.Types.ObjectId, ref: "Place", required: true },
  price: { type: Number, required: true },
  availableSlots: [
    {
      from: { type: Date, required: true },
      to: { type: Date, required: true },
    },
  ],
});

export default mongoose.model<IService>("Service", ServiceSchema);
