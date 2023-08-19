import { Response } from "express";
import Place from "../schemas/Place";
import { IRequest } from "../middlewares/authMiddleware";
import mongoose from "mongoose";
import { imageDelete, imageSave } from "../repositories/imageRepository";

export const addServiceToPlace = async (req: IRequest, res: Response) => {
  const image = req.file as Express.Multer.File;
  const { placeId } = req.params;
  const { name, description, price, duration } = JSON.parse(req.body.service);
  if (!placeId || !name || !price || typeof duration === "undefined") {
    return res.status(400).json({ message: "Missing data" });
  }
  try {
    const place = await Place.findById(placeId);
    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }
    if (place.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    let imageName = image ? await imageSave(image) : undefined;
    place.services.push({
      _id: new mongoose.Types.ObjectId().toString(),
      name,
      description,
      price,
      duration,
      image: imageName,
    });
    await place.save();
    res.status(200).json({ message: "Service added successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occurred while adding service", error });
  }
};

export const deleteServiceFromPlace = async (req: IRequest, res: Response) => {
  const { placeId, serviceId } = req.params;
  if (!placeId || !serviceId) {
    return res.status(400).json({ message: "Missing data" });
  }
  try {
    const place = await Place.findById(placeId);
    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }
    if (place.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const service = place.services.find(
      (service) => service._id.toString() === serviceId
    );
    if (service?.image) await imageDelete(service.image);
    place.services = place.services.filter(
      (service) => service._id.toString() !== serviceId
    );
    place.reservations = place.reservations.filter(
      (reservation) => reservation.service.toString() !== serviceId
    );
    await place.save();
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occurred while deleting service", error });
  }
};
