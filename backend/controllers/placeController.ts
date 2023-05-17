import { Request, Response } from "express";
import Place, { IPlaceSchema, IPlaceSchemaPopulated } from "../schemas/Place";
import { IPlaceDTO } from "../dtos/PlaceDTO";

export const searchPlaces = async (req: Request, res: Response) => {
  const { searchQuery } = req.body;

  try {
    // const places = (await Place.find({
    //   $text: { $search: searchQuery },
    const places = await Place.find({
      $or: [
        { name: new RegExp(searchQuery, "i") },
        { type: new RegExp(searchQuery, "i") },
        { description: new RegExp(searchQuery, "i") },
      ],
    });

    const placesDTOs: IPlaceDTO[] = places.map((place: IPlaceSchema) => {
      const { _id, name, description, type, thumbnail, reviews, location } =
        place;

      let rating;
      if (reviews) {
        rating =
          reviews.reduce((acc, review) => acc + review.rating, 0) /
          reviews.length;
      } else {
        rating = undefined;
      }

      const id = _id ? _id : "";

      return {
        id,
        name,
        description,
        type,
        thumbnail,
        rating,
        reviews,
        location,
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
