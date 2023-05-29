import { Request, Response } from "express";
import Place from "../schemas/Place";
import { IFreeSlotsDTO } from "../dtos/FreeSlotsDTO";
import { getFreeSlots } from "../utils/getFreeSlots";

export const getFreeSlotsForService = async (req: Request, res: Response) => {
  const currentDate = new Date();
  const { placeId } = req.params;
  const { serviceId } = req.body;

  if (!serviceId) {
    return res.status(400).json({ message: "Invalid data." });
  }

  try {
    const place = await Place.findById(placeId).populate(
      "reviews.user createdBy"
    );

    if (!place) {
      return res.status(404).json({ message: "Place not found!" });
    }

    const service = place.services.find(
      (service) => service.id.toString() === serviceId
    );

    if (!service) {
      return res.status(404).json({ message: "Service not found!" });
    }

    const { reservations, openingHours } = place;

    const freeSlots: IFreeSlotsDTO[] = [];
    [...Array(7).keys()].forEach((i) => {
      const day = (currentDate.getDay() + i) % 7;
      const openingHour = openingHours.find(
        (openingHour) => openingHour.dayOfWeek === day
      );
      if (!openingHour) return;
      const freeSlotsForDay = getFreeSlots(
        openingHour,
        reservations,
        service.duration ?? 15
      );
      if (freeSlotsForDay.length > 0) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        freeSlots.push({ date, slots: freeSlotsForDay });
      }
    });

    res.status(200).json(freeSlots);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occurred while fetching place", error });
  }
};
