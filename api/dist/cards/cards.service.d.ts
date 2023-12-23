import { Repository } from "typeorm";
import { Card } from "./card.entity";
import { CreateCardDTO } from "./card-create.dto";
import { DecksService } from "src/decks/decks.service";
import { UpdateCardDto } from "./card-update.dto";
export declare class CardsService {
    private readonly cardRepository;
    private readonly decksService;
    constructor(cardRepository: Repository<Card>, decksService: DecksService);
    create(createCardDto: CreateCardDTO, deckId: string): Promise<Card>;
    update(id: string, updateDeckDto: UpdateCardDto): Promise<Card | null>;
    remove(deckId: string, cardId: string): Promise<Card | null>;
    findOne(deckId: string, cardId: string): Promise<Card | null>;
    findAll(limit: number, offset: number, deckId?: string, search?: string): Promise<Card[]>;
}
