import { Repository } from "typeorm";
import { Deck } from "./deck.entity";
import { CreateDeckDto } from "./deck-create.dto";
import { UpdateDeckDto } from "./deck-update.dto";
export declare class DecksService {
    private deckRepository;
    constructor(deckRepository: Repository<Deck>);
    create(createDeckDto: CreateDeckDto, userId: number): Promise<Deck>;
    findOne(id: string): Promise<Deck | null>;
    update(id: string, updateDeckDto: UpdateDeckDto): Promise<Deck | null>;
    remove(id: string): Promise<Deck | null>;
    findAll(limit: number, offset: number, search?: string, userId?: number, withUserData?: boolean): Promise<Deck[]>;
    incrementCardCounter(id: string): Promise<Deck | null>;
    decrementCardCounter(id: string): Promise<Deck | null>;
}
