import { start } from "repl";
import { IReservation } from "../models/IReservation";
import { IOpeningHours } from "../models/OpeningHours";
import { get } from "http";

interface ISlot {
  start: Date;
  end: Date;
}

const getSlots = (start: Date, stop: Date, duration: number): ISlot[] => {
  const slots: ISlot[] = [];
  const startTime = new Date(start);
  const stopTime = new Date(stop);
  startTime.setMinutes(startTime.getMinutes() + (startTime.getMinutes() % 15));
  stopTime.setMinutes(stopTime.getMinutes() - (stopTime.getMinutes() % 15));
  const temp = new Date(startTime);
  temp.setMinutes(temp.getMinutes() + duration);
  while (temp < stopTime) {
    const start = new Date(startTime);
    const end = new Date(temp);
    start.setMinutes(startTime.getMinutes() + 15);
    temp.setMinutes(temp.getMinutes() + 15);
    slots.push({ start, end });
  }
  return slots;
};

const getTime = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

interface IFreeSlots {
  start: string;
  end: string;
}

export const getFreeSlots = (
  openingHours: IOpeningHours,
  reservations: IReservation[],
  duration: number
): IFreeSlots[] => {
  const slots: IFreeSlots[] = [];
  const openingTime = new Date(`1970-01-01T${openingHours.from}:00Z`);
  const closingTime = new Date(`1970-01-01T${openingHours.to}:00Z`);
  const allSlots = getSlots(openingTime, closingTime, duration);
  allSlots.forEach((slot) => {
    const isFree = reservations.every(
      (reservation) =>
        slot.start.getTime() >= reservation.reservationTime.to.getTime() ||
        slot.end.getTime() <= reservation.reservationTime.from.getTime()
    );
    if (isFree) {
      const start = getTime(slot.start);
      const end = getTime(slot.end);
      slots.push({ start, end });
    }
  });
  return slots;
};
