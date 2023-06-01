import { Request, Response } from "express";
import Place from "../schemas/Place";
import { IFreeSlotsDTO } from "../dtos/FreeSlotsDTO";
import { getFreeSlots } from "../utils/getFreeSlots";

export const getFreeSlotsForService = async (req: Request, res: Response) => {
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

    const currentDate = new Date();
    const freeSlots: IFreeSlotsDTO[] = [];
    [...Array(14).keys()].forEach((i) => {
      currentDate.setDate(currentDate.getDate() + 1);
      const freeSlotsForDay = getFreeSlots(
        currentDate,
        openingHours,
        reservations,
        service.duration ?? 15
      );
      if (freeSlotsForDay.length > 0) {
        freeSlots.push(...freeSlotsForDay);
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
