import { UserResponseDTO } from "src/user/user-response.dto";
export declare class DeckResponseDTO {
    id: string;
    title: string;
    image?: string;
    numCards: number;
    createdAt: Date;
    user?: UserResponseDTO;
}
