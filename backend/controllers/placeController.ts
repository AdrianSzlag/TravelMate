import { Request, Response } from "express";
import Place from "../schemas/Place";
import { PlaceDTO } from "../dtos/PlaceDTO";
import {
  getPlaceDTO,
  getPlaceFromBusinessDTO,
  getReviewDTO,
  getUserDTO,
} from "../utils/dtoUtils";
import { IRequest } from "../middlewares/authMiddleware";
import BusinessDTO from "../dtos/BusinessDTO";
import { IPlace } from "../models/IPlace";
import Image from "../schemas/Image";
import mongoose from "mongoose";

export const searchPlaces = async (req: Request, res: Response) => {
  const searchQuery = req.query.search as string;
  try {
    const places = await Place.find({
      $or: [
        { name: new RegExp(searchQuery, "i") },
        { type: new RegExp(searchQuery, "i") },
        { description: new RegExp(searchQuery, "i") },
      ],
    }).populate("reviews.user createdBy");
    const placesDTOs: PlaceDTO[] = places.map((place) => {
      const { _id, reviews, menu, services, createdBy } = place.toObject();
      const reviewDTOs = reviews.map((review) => getReviewDTO(review));
      const rating =
        reviewDTOs?.reduce((acc, review) => acc + review.rating, 0) /
        reviewDTOs.length;
      const creator = getUserDTO(createdBy);
      const menuDTO = menu.map((menuItem) => {
        return { ...menuItem, id: menuItem._id };
      });
      const servicesDTO = services.map((service) => {
        return { ...service, id: service._id };
      });
      return getPlaceDTO({
        ...place.toObject(),
        id: _id,
        reviews: reviewDTOs,
        rating,
        createdBy: creator,
        menu: menuDTO,
        services: servicesDTO,
      });
    });
    res.status(200).json(placesDTOs);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occurred while searching for places", error });
  }
};

export const getPlace = async (req: Request, res: Response) => {
  const { placeId } = req.params;
  try {
    const place = await Place.findById(placeId).populate(
      "reviews.user createdBy"
    );
    if (!place) {
      return res.status(404).json({ message: "Place not found!" });
    }
    const { _id, reviews, menu, services, createdBy } = place.toObject();
    const reviewDTOs = reviews.map((review) => getReviewDTO(review));
    const rating =
      reviewDTOs?.reduce((acc, review) => acc + review.rating, 0) /
      reviewDTOs.length;
    const creator = getUserDTO(createdBy);
    const menuDTO = menu.map((menuItem) => {
      return { ...menuItem, id: menuItem._id };
    });
    const servicesDTO = services.map((service) => {
      return { ...service, id: service._id };
    });
    const placeDTO = getPlaceDTO({
      ...place.toObject(),
      id: _id,
      reviews: reviewDTOs,
      rating,
      createdBy: creator,
      menu: menuDTO,
      services: servicesDTO,
    });
    res.status(200).json(placeDTO);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occurred while fetching place", error });
  }
};

export const createPlace = async (req: IRequest, res: Response) => {
  const userId = req.userId!;
  const files = req.files as any;
  const thumbnailFile = files?.thumbnail
    ? (files.thumbnail[0] as Express.Multer.File)
    : undefined;
  const imagesFiles = files?.images
    ? (files.images as Express.Multer.File[])
    : undefined;

  if (!thumbnailFile) {
    return res.status(400).json({ message: "Missing thumbnail" });
  }
  const businessDTO = JSON.parse(req.body.business) as BusinessDTO;
  const { name, type, location, phone, openingHours } = businessDTO;
  if (!name || !type || !location || !phone || !openingHours) {
    console.log(name, type, location, phone, openingHours);
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const thumbnail = Date.now() + thumbnailFile.originalname;
    const newImage = new Image({
      name: thumbnail,
      img: {
        data: thumbnailFile.buffer,
        contentType: thumbnailFile.mimetype,
      },
    });
    await newImage.save();
    let images: string[] = [];
    if (Array.isArray(imagesFiles)) {
      images = imagesFiles.map((file) => {
        const name = Date.now() + file.originalname;
        const newImage = new Image({
          name,
          img: {
            data: file.buffer,
            contentType: file.mimetype,
          },
        });
        newImage.save();
        return name;
      });
    }
    const placeObject = getPlaceFromBusinessDTO(businessDTO, {
      userId,
      thumbnail: thumbnail,
      images,
    });
    const place = await Place.create(placeObject);
    res.status(201).json({
      message: "Place created successfully",
      placeId: place._id.toString(),
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occurred while creating place", error });
  }
};

export const addServiceToPlace = async (req: IRequest, res: Response) => {
  const image = req.file as Express.Multer.File;
  const { placeId } = req.params;
  const { name, description, price, duration } = JSON.parse(req.body.service);
  if (!placeId || !name || !description || !price || !duration) {
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
    let imageName = undefined;
    if (image) {
      imageName = Date.now() + image.originalname;
      const newImage = new Image({
        name: imageName,
        img: {
          data: image.buffer,
          contentType: image.mimetype,
        },
      });
      await newImage.save();
    }
    place.services.push({
      _id: new mongoose.Types.ObjectId().toString(),
      name,
      description,
      price,
      duration,
      image: imageName ? imageName : undefined,
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

export const addMenuItemToPlace = async (req: IRequest, res: Response) => {
  const image = req.file as Express.Multer.File;
  const { placeId } = req.params;
  const { name, description, price } = JSON.parse(req.body.menu);
  if (!placeId || !name || !description || !price) {
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
    let imageName = undefined;
    if (image) {
      imageName = Date.now() + image.originalname;
      const newImage = new Image({
        name: imageName,
        img: {
          data: image.buffer,
          contentType: image.mimetype,
        },
      });
      await newImage.save();
    }
    place.menu.push({
      _id: new mongoose.Types.ObjectId().toString(),
      name,
      description,
      price,
      image: imageName ? imageName : undefined,
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

export const deleteMenuItemFromPlace = async (req: IRequest, res: Response) => {
  const { placeId, menuId } = req.params;
  if (!placeId || !menuId) {
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
    place.menu = place.menu.filter((menu) => menu._id.toString() !== menuId);
    await place.save();
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occurred while deleting service", error });
  }
};
