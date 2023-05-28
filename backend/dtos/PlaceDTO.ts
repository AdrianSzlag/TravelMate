import { ILocation } from "../models/ILocation";
import { UserDTO } from "./UserDTO";

export type PlaceDTO = {
  id: string;
  name: string;
  description?: string;
  type: string;
  thumbnail: string;
  rating?: number;
  reviews: {
    user: string | UserDTO;
    rating: number;
    comment?: string;
  }[];
  menu: {
    name: string;
    description?: string;
    price: number;
  }[];
  services: {
    name: string;
    description?: string;
    duration?: number;
    price: number;
  }[];
  location: ILocation;
  createdBy: UserDTO;
  address?: string;
  images?: string[];
  contactInfo: {
    phone: string;
    email?: string;
  };
  tags?: string[];
};
