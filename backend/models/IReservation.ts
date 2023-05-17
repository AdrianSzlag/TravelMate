export interface IReservationTime {
  from: Date;
  to: Date;
}

export interface IReservation {
  serviceName: string;
  userId: string;
  reservationTime: IReservationTime;
}
