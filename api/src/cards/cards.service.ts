import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Card } from "./card.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCardDTO } from "./card-create.dto";
import { DecksService } from "src/decks/decks.service";
import { UpdateCardDto } from "./card-update.dto";

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    private readonly decksService: DecksService,
  ) {}

  // All operations are below

  // post
  async create(createCardDto: CreateCardDTO, deckId: string): Promise<Card> {
    const card = this.cardRepository.create({
      ...createCardDto,
      deckId,
    });

    // Increment numCards
    await this.decksService.incrementCardCounter(deckId);
    return this.cardRepository.save(card);
  }

  // patch
  async update(id: string, updateDeckDto: UpdateCardDto): Promise<Card | null> {
    const card = await this.cardRepository.preload({ id, ...updateDeckDto });
    if (!card) {
      return null;
    }
    card.updatedAt = new Date();
    return this.cardRepository.save(card);
  }

  // delete
  async remove(deckId: string, cardId: string): Promise<Card | null> {
    const card = await this.findOne(deckId, cardId);
    if (!card) {
      return null;
    }
    await this.decksService.decrementCardCounter(deckId);
    return this.cardRepository.remove(card);
  }

  // get (one card)
  async findOne(deckId: string, cardId: string): Promise<Card | null> {
    const queryBuilder = this.cardRepository.createQueryBuilder("cards");
    queryBuilder.where("cards.deckId = :deckId", { deckId });
    queryBuilder.andWhere("cards.id = :cardId", { cardId });

    return await queryBuilder.getOne();
  }

  // get (all cards)
  async findAll(
    limit: number,
    offset: number,
    deckId?: string,
    search?: string,
  ): Promise<Card[]> {
    const queryBuilder = this.cardRepository.createQueryBuilder("cards");
    let hasWhereCondition = false;

    if (search !== undefined) {
      queryBuilder.where("cards.front ILIKE :search", {
        search: `%${search}%`,
      });
      queryBuilder.orWhere("cards.back ILIKE :search", {
        search: `%${search}%`,
      });
      hasWhereCondition = true;
    }

    if (deckId !== undefined) {
      if (hasWhereCondition) {
        queryBuilder.andWhere("cards.deckId = :deckId", { deckId });
      } else {
        queryBuilder.where("cards.deckId = :deckId", { deckId });
        hasWhereCondition = true;
      }
    }

    queryBuilder.limit(limit);
    queryBuilder.offset(offset);
    queryBuilder.orderBy("cards.createdAt", "DESC");

    return await queryBuilder.getMany();
  }
}
