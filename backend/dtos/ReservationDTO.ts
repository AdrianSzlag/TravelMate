import { ILocation } from "../models/ILocation";
import { UserDTO } from "./UserDTO";

export interface ReservationDTO {
  id: string;
  date: string;
  duration?: number;
  price: number;
  service: {
    id: string;
    name: string;
    description?: string;
    image?: string;
  };
  place: {
    id: string;
    name: string;
    owner: string;
    address?: string;
    image?: string;
    location: ILocation;
  };
  user?: UserDTO;
}
