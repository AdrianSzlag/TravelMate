import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  userId: Schema.Types.ObjectId;
  placeId: Schema.Types.ObjectId;
  serviceId: Schema.Types.ObjectId;
  rating: number;
  comment?: string;
}

const ReviewSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  placeId: { type: Schema.Types.ObjectId, ref: "Place", required: true },
  serviceId: { type: Schema.Types.ObjectId, ref: "Service", required: true },
  rating: { type: Number, required: true },
  comment: String,
});

export default mongoose.model<IReview>("Review", ReviewSchema);
