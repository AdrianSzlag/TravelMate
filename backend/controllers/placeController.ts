import { Request, Response } from "express";
import Place from "../schemas/Place";
import { PlaceDTO } from "../dtos/PlaceDTO";
import { UserDTO } from "../dtos/UserDTO";
import { IUser } from "../models/IUser";

export const searchPlaces = async (req: Request, res: Response) => {
  const { searchQuery } = req.body;

  try {
    const places = await Place.find({
      $or: [
        { name: new RegExp(searchQuery, "i") },
        { type: new RegExp(searchQuery, "i") },
        { description: new RegExp(searchQuery, "i") },
      ],
    }).populate("reviews.user createdBy");

    const placesDTOs: PlaceDTO[] = places.map((place) => {
      const {
        _id,
        name,
        description,
        type,
        thumbnail,
        reviews,
        menu,
        location,
        services,
        createdBy,
        address,
        images,
        contactInfo,
        tags,
        openingHours,
      } = place;

      const reviewDTOs = reviews.map((review) => {
        review.user = review.user as IUser;
        return {
          user: {
            id: review.user._id,
            name: `${review.user.firstName} ${review.user.lastName ?? ""}`,
            profileImage: review.user.profileImage,
          },
          comment: review.comment,
          profileImage: review.user.profileImage,
          rating: review.rating,
          image: review.image,
        };
      });

      let rating;
      if (reviewDTOs) {
        rating =
          reviews.reduce((acc, review) => acc + review.rating, 0) /
          reviews.length;
      } else {
        rating = undefined;
      }

      const id = _id ? _id : "";

      const creator: UserDTO =
        typeof createdBy !== "string"
          ? {
              id: createdBy._id,
              name: `${createdBy.firstName} ${createdBy.lastName ?? ""}`,
              profileImage: createdBy.profileImage,
            }
          : ({} as UserDTO);

      return {
        id,
        name,
        description,
        type,
        thumbnail,
        rating,
        reviews: reviewDTOs,
        location,
        menu,
        services,
        createdBy: creator,
        address,
        images,
        contactInfo,
        tags,
        openingHours,
      };
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

    const {
      _id,
      name,
      description,
      type,
      thumbnail,
      reviews,
      menu,
      location,
      services,
      createdBy,
      address,
      images,
      contactInfo,
      tags,
      openingHours,
    } = place;

    const reviewDTOs = reviews.map((review) => {
      review.user = review.user as IUser;
      return {
        user: {
          id: review.user._id,
          name: `${review.user.firstName} ${review.user.lastName ?? ""}`,
          profileImage: review.user.profileImage,
        },
        comment: review.comment,
        profileImage: review.user.profileImage,
        rating: review.rating,
        image: review.image,
      };
    });

    let rating;
    if (reviewDTOs) {
      rating =
        reviews.reduce((acc, review) => acc + review.rating, 0) /
        reviews.length;
    } else {
      rating = undefined;
    }

    const id = _id ? _id : "";

    const creator: UserDTO =
      typeof createdBy !== "string"
        ? {
            id: createdBy._id,
            name: `${createdBy.firstName} ${createdBy.lastName ?? ""}`,
            profileImage: createdBy.profileImage,
          }
        : ({} as UserDTO);

    const placeDTO: PlaceDTO = {
      id,
      name,
      description,
      type,
      thumbnail,
      rating,
      reviews: reviewDTOs,
      location,
      menu,
      services,
      createdBy: creator,
      address,
      images,
      contactInfo,
      tags,
      openingHours,
    };

    res.status(200).json(placeDTO);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occurred while fetching place", error });
  }
};
