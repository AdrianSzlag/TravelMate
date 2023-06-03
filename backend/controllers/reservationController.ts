import { Request, Response } from "express";
import Place from "../schemas/Place";
import { IFreeSlotsDTO } from "../dtos/FreeSlotsDTO";
import { getFreeSlots } from "../utils/getFreeSlots";
import { IReservation } from "../models/IReservation";
import { IRequest } from "../middlewares/authMiddleware";
import { IUser } from "../models/IUser";
import { IService } from "../models/IService";
import { ReservationDTO } from "../dtos/ReservationDTO";

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
      (service) => service._id.toString() === serviceId
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

const getEndTime = (startDate: Date, duration: number) => {
  const endDate = new Date(startDate);
  endDate.setMinutes(endDate.getMinutes() + duration);
  return endDate;
};

export const makeReservation = async (req: IRequest, res: Response) => {
  const { placeId, serviceId, date } = req.body;
  const userId = req.userId;

  if (!serviceId || !date || !placeId) {
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
      (service) => service._id.toString() === serviceId
    );

    if (!service) {
      return res.status(404).json({ message: "Service not found!" });
    }

    const { reservations } = place;

    const currentDate = new Date();
    const freeSlots: IFreeSlotsDTO[] = [];
    [...Array(14).keys()].forEach((i) => {
      currentDate.setDate(currentDate.getDate() + 1);
      const freeSlotsForDay = getFreeSlots(
        currentDate,
        place.openingHours,
        reservations,
        service.duration ?? 15
      );
      if (freeSlotsForDay.length > 0) {
        freeSlots.push(...freeSlotsForDay);
      }
    });

    const dateMs = new Date(date).getTime();
    const slot = freeSlots.find((slot) => new Date(slot).getTime() === dateMs);

    if (!slot) {
      return res.status(400).json({ message: "Please choose another time." });
    }

    const reservation: IReservation = {
      _id: undefined!,
      service: serviceId,
      user: req.userId!,
      reservationTime: {
        from: new Date(date),
        to: getEndTime(new Date(date), service.duration ?? 15),
      },
    };

    place.reservations.push(reservation);

    await place.save();

    res.status(200).json({ message: "Reservation created successfully." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occurred while fetching place", error });
  }
};

export const getReservations = async (req: IRequest, res: Response) => {
  const userId = req.userId;

  try {
    const places = await Place.find({
      "reservations.user": userId,
    }).populate("reservations.user");

    const reservations = places.reduce((acc, place) => {
      place.reservations.forEach((reservation) => {
        const service = place.services.find(
          (service) => service._id.toString() === reservation.service.toString()
        );
        if (!service) return;
        const reservationDTO: ReservationDTO = {
          id: reservation._id,
          duration: service.duration,
          date: reservation.reservationTime.from.toISOString(),
          price: service.price,
          place: {
            id: place._id,
            name: place.name,
            address: place.address,
            image: place.thumbnail,
          },
          service: {
            id: service._id,
            name: service.name,
            description: service.description,
            image: service.image,
          },
        };
        acc.push(reservationDTO);
      });
      return acc;
    }, [] as ReservationDTO[]);

    res.status(200).json(reservations);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occurred while fetching place", error });
  }
};

export const cancelReservation = async (req: IRequest, res: Response) => {
  const { reservationId } = req.params;

  if (!reservationId) {
    return res.status(400).json({ message: "Invalid data." });
  }

  try {
    const place = await Place.findOne({
      "reservations._id": reservationId,
    }).populate("reservations.user createdBy");

    if (!place) {
      return res.status(404).json({ message: "Reservation not found!" });
    }

    const reservation = place.reservations.find(
      (reservation) => reservation._id.toString() === reservationId
    );

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found!" });
    }

    if (
      (reservation.user as IUser)._id.toString() !== req.userId ||
      (place.createdBy as IUser)._id.toString() !== req.userId
    ) {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    place.reservations = place.reservations.filter(
      (reservation) => reservation._id.toString() !== reservationId
    );

    await place.save();

    res.status(200).json({ message: "Reservation canceled successfully." });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occurred while fetching place", error });
  }
};
