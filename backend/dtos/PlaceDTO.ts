import { ILocation } from "../models/ILocation";
import { MenuItemDTO } from "./MenuItemDTO";
import { ReviewDTO } from "./ReviewDTO";
import { ServiceDTO } from "./ServiceDTO";
import { UserDTO } from "./UserDTO";

export type PlaceDTO = {
  id: string;
  name: string;
  description?: string;
  type: string;
  thumbnail: string;
  rating?: number;
  reviews: ReviewDTO[];
  menu: MenuItemDTO[];
  services: ServiceDTO[];
  location: ILocation;
  createdBy: UserDTO;
};
