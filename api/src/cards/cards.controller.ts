import {
  Body,
  Controller,
  Param,
  Post,
  Delete,
  Get,
  UseGuards,
  Query,
  NotFoundException,
  Patch,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { CardsService } from "./cards.service";
import { CardResponseDTO } from "./card-response.dto";
import { CreateCardDTO } from "./card-create.dto";
import { FindCardsQueryDTO } from "./find-cards-query.dto";
import { FindCardsResponseDTO } from "./find-cards-response.dto";
import { UpdateCardDto } from "./card-update.dto";
import { DeckOwnershipGuard } from "src/guards/deck-owner.guard";
import { CardOwnershipGuard } from "src/guards/card-owner.guard";

@UseGuards(JwtAuthGuard, CardOwnershipGuard)
@Controller("decks/:deckId/cards")
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  async create(
    @Body() createCardDto: CreateCardDTO,
    @Param("deckId") deckId: string,
  ): Promise<CardResponseDTO> {
    return await this.cardsService.create(createCardDto, deckId);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() UpdateCardDto: UpdateCardDto,
  ): Promise<CardResponseDTO> {
    const card = await this.cardsService.update(id, UpdateCardDto);
    return card;
  }

  @Delete(":id")
  async remove(
    @Param("deckId") deckId: string,
    @Param("id") id: string,
  ): Promise<CardResponseDTO> {
    const card = await this.cardsService.remove(deckId, id);
    return card;
  }

  @Get(":id")
  async findOne(
    @Param("deckId") deckId: string,
    @Param("id") id: string,
  ): Promise<CardResponseDTO> {
    const card = await this.cardsService.findOne(deckId, id);
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
    return card;
  }

  @Get()
  async findAll(
    @Param("deckId") deckId: string,
    @Query() query: FindCardsQueryDTO,
  ): Promise<FindCardsResponseDTO> {
    const { limit, offset, search } = query;

    const cards = await this.cardsService.findAll(
      limit,
      offset,
      deckId,
      search,
    );

    return {
      limit,
      offset,
      search,
      data: cards,
    };
  }
}
