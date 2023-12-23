import { CardsService } from "./cards.service";
import { CardResponseDTO } from "./card-response.dto";
import { CreateCardDTO } from "./card-create.dto";
import { FindCardsQueryDTO } from "./find-cards-query.dto";
import { FindCardsResponseDTO } from "./find-cards-response.dto";
import { UpdateCardDto } from "./card-update.dto";
export declare class CardsController {
    private readonly cardsService;
    constructor(cardsService: CardsService);
    create(createCardDto: CreateCardDTO, deckId: string): Promise<CardResponseDTO>;
    update(id: string, UpdateCardDto: UpdateCardDto): Promise<CardResponseDTO>;
    remove(deckId: string, id: string): Promise<CardResponseDTO>;
    findOne(deckId: string, id: string): Promise<CardResponseDTO>;
    findAll(deckId: string, query: FindCardsQueryDTO): Promise<FindCardsResponseDTO>;
}
