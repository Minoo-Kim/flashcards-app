import { UserResponseDTO } from "src/user/user-response.dto";

export class DeckResponseDTO {
  id: string;
  title: string;
  image?: string;
  numCards: number;
  createdAt: Date;
  user?: UserResponseDTO;
}
