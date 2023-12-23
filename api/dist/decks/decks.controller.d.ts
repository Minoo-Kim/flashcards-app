import { DecksService } from "./decks.service";
import { CreateDeckDto } from "./deck-create.dto";
import { DeckResponseDTO } from "./deck-response.dto";
import { UpdateDeckDto } from "./deck-update.dto";
import { UserService } from "src/user/user.service";
import { FindDecksQueryDTO } from "./find-decks-query.dto";
import { FindDecksResponseDTO } from "./find-decks-response.dto";
export declare class DecksController {
    private readonly decksService;
    private readonly userService;
    constructor(decksService: DecksService, userService: UserService);
    create(CreateDeckDto: CreateDeckDto, userId: number): Promise<DeckResponseDTO>;
    findOne(id: string): Promise<DeckResponseDTO>;
    update(id: string, UpdateDeckDto: UpdateDeckDto): Promise<DeckResponseDTO>;
    remove(id: string): Promise<DeckResponseDTO>;
    findAll(query: FindDecksQueryDTO): Promise<FindDecksResponseDTO>;
}
