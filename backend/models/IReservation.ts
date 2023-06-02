import { IUser } from "./IUser";

export type IReservationTime = {
  from: Date;
  to: Date;
};

export type IReservation = {
  id: string;
  serviceId: string;
  user: string | IUser;
  reservationTime: IReservationTime;
};
