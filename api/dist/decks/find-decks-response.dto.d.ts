import { DeckResponseDTO } from "./deck-response.dto";
export declare class FindDecksResponseDTO {
    limit: number;
    offset: number;
    search?: string;
    username?: string;
    withUserData?: boolean;
    data: DeckResponseDTO[];
}
