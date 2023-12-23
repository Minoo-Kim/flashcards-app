import { CardResponseDTO } from "./card-response.dto";
export declare class FindCardsResponseDTO {
    limit: number;
    offset: number;
    search?: string;
    data: CardResponseDTO[];
}
