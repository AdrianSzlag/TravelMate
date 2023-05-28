import { IReview } from "./IReview";
import { IUser } from "./IUser";

export interface IPlace {
  id: string;
  name: string;
  description?: string;
  type: string;
  thumbnail: string;
  rating?: number;
  address?: string;
  reviews: IReview[];
  location: {
    type: string;
    coordinates: number[];
  };
  services: {
    name: string;
    description?: string;
    duration?: number;
    price: number;
  }[];
  menu: {
    name: string;
    description?: string;
    price: number;
  }[];
  createdBy: IUser;
  images: string[];
  contactInfo: {
    phone: string;
    email?: string;
  };
  tags?: string[];
}

export default IPlace;
