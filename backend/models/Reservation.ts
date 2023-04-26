import mongoose, { Schema, Document } from "mongoose";

export interface IReservation extends Document {
  userId: Schema.Types.ObjectId;
  serviceId: Schema.Types.ObjectId;
  placeId: Schema.Types.ObjectId;
  reservedSlot: { from: Date; to: Date };
  status: string;
}

const ReservationSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  serviceId: { type: Schema.Types.ObjectId, ref: "Service" },
  placeId: { type: Schema.Types.ObjectId, ref: "Place" },
  reservedSlot: {
    from: Date,
    to: Date,
  },
  status: String,
});

export default mongoose.model<IReservation>("Reservation", ReservationSchema);
