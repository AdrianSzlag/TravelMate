import { Request, Response } from "express";
import Review from "../models/Review";
import Place, { IPlace, IPlacePopulated } from "../models/Place";
import { IReview } from "../models/Review";

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
    }).populate("reviews", Review);

    res.status(200).json(places);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error occurred while searching for places", error });
  }
};
