import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./User";
import { IService } from "./Service";
import { IPlace } from "./Place";

export interface IReservation extends Document {
  userId: Schema.Types.ObjectId | IUser;
  serviceId: Schema.Types.ObjectId | IService;
  placeId: Schema.Types.ObjectId | IPlace;
  reservedSlot: { from: Date; to: Date };
  status: string;
}

export interface IReservationPopulated extends IReservation {
  userId: IUser;
  serviceId: IService;
  placeId: IPlace;
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
