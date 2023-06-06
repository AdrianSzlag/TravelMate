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
import { fileCleanup } from "../middlewares/fileMiddleware";

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
      const rating = reviewDTOs?.reduce(
        (acc, review) => acc + review.rating,
        0
      );
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
    const rating = reviewDTOs?.reduce((acc, review) => acc + review.rating, 0);
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
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: "Missing thumbnail" });
  }
  const businessDTO = JSON.parse(req.body.business) as BusinessDTO;
  const { name, type, location, phone, openingHours } = businessDTO;
  if (!name || !type || !location || !phone || !openingHours) {
    console.log(name, type, location, phone, openingHours);
    fileCleanup(file.path);
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const thumbnail = Date.now() + file.originalname;
    const newImage = new Image({
      name: thumbnail,
      img: {
        data: file.buffer,
        contentType: file.mimetype,
      },
    });
    await newImage.save();
    fileCleanup(file.path);
    const placeObject = getPlaceFromBusinessDTO(businessDTO, {
      userId,
      thumbnail: thumbnail,
    });
    const place = await Place.create(placeObject);
    fileCleanup(file.path);
    res.status(201).json({ message: "Place created successfully", place });
  } catch (error) {
    console.log(error);
    fileCleanup(file.path);
    res
      .status(500)
      .json({ message: "Error occurred while creating place", error });
  }
};
