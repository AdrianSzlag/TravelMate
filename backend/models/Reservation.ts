import mongoose, { Schema, Document } from "mongoose";

export interface IReservation extends Document {
  userId: Schema.Types.ObjectId;
  serviceId: Schema.Types.ObjectId;
  placeId: Schema.Types.ObjectId;
  reservedSlot: { from: Date; to: Date };
  status: string;
}

const ReservationSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  serviceId: { type: Schema.Types.ObjectId, ref: "Service", required: true },
  placeId: { type: Schema.Types.ObjectId, ref: "Place", required: true },
  reservedSlot: {
    from: { type: Date, required: true },
    to: { type: Date, required: true },
  },
  status: { type: String, required: true },
});

export default mongoose.model<IReservation>("Reservation", ReservationSchema);
