import { UserDTO } from "./UserDTO";

export type ReviewDTO = {
  user: string | UserDTO;
  rating: number;
  comment?: string;
};
