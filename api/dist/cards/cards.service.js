"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const card_entity_1 = require("./card.entity");
const typeorm_2 = require("@nestjs/typeorm");
const decks_service_1 = require("../decks/decks.service");
let CardsService = class CardsService {
    constructor(cardRepository, decksService) {
        this.cardRepository = cardRepository;
        this.decksService = decksService;
    }
    async create(createCardDto, deckId) {
        const card = this.cardRepository.create({
            ...createCardDto,
            deckId,
        });
        await this.decksService.incrementCardCounter(deckId);
        return this.cardRepository.save(card);
    }
    async update(id, updateDeckDto) {
        const card = await this.cardRepository.preload({ id, ...updateDeckDto });
        if (!card) {
            return null;
        }
        card.updatedAt = new Date();
        return this.cardRepository.save(card);
    }
    async remove(deckId, cardId) {
        const card = await this.findOne(deckId, cardId);
        if (!card) {
            return null;
        }
        await this.decksService.decrementCardCounter(deckId);
        return this.cardRepository.remove(card);
    }
    async findOne(deckId, cardId) {
        const queryBuilder = this.cardRepository.createQueryBuilder("cards");
        queryBuilder.where("cards.deckId = :deckId", { deckId });
        queryBuilder.andWhere("cards.id = :cardId", { cardId });
        return await queryBuilder.getOne();
    }
    async findAll(limit, offset, deckId, search) {
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
            }
            else {
                queryBuilder.where("cards.deckId = :deckId", { deckId });
                hasWhereCondition = true;
            }
        }
        queryBuilder.limit(limit);
        queryBuilder.offset(offset);
        queryBuilder.orderBy("cards.createdAt", "DESC");
        return await queryBuilder.getMany();
    }
};
exports.CardsService = CardsService;
exports.CardsService = CardsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(card_entity_1.Card)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        decks_service_1.DecksService])
], CardsService);
//# sourceMappingURL=cards.service.js.map