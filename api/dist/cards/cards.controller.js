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
exports.CardsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const cards_service_1 = require("./cards.service");
const card_create_dto_1 = require("./card-create.dto");
const find_cards_query_dto_1 = require("./find-cards-query.dto");
const card_update_dto_1 = require("./card-update.dto");
const card_owner_guard_1 = require("../guards/card-owner.guard");
let CardsController = class CardsController {
    constructor(cardsService) {
        this.cardsService = cardsService;
    }
    async create(createCardDto, deckId) {
        return await this.cardsService.create(createCardDto, deckId);
    }
    async update(id, UpdateCardDto) {
        const card = await this.cardsService.update(id, UpdateCardDto);
        return card;
    }
    async remove(deckId, id) {
        const card = await this.cardsService.remove(deckId, id);
        return card;
    }
    async findOne(deckId, id) {
        const card = await this.cardsService.findOne(deckId, id);
        if (!card) {
            throw new common_1.NotFoundException(`Card with ID ${id} not found`);
        }
        return card;
    }
    async findAll(deckId, query) {
        const { limit, offset, search } = query;
        const cards = await this.cardsService.findAll(limit, offset, deckId, search);
        return {
            limit,
            offset,
            search,
            data: cards,
        };
    }
};
exports.CardsController = CardsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("deckId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [card_create_dto_1.CreateCardDTO, String]),
    __metadata("design:returntype", Promise)
], CardsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, card_update_dto_1.UpdateCardDto]),
    __metadata("design:returntype", Promise)
], CardsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("deckId")),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CardsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("deckId")),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CardsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)("deckId")),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, find_cards_query_dto_1.FindCardsQueryDTO]),
    __metadata("design:returntype", Promise)
], CardsController.prototype, "findAll", null);
exports.CardsController = CardsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, card_owner_guard_1.CardOwnershipGuard),
    (0, common_1.Controller)("decks/:deckId/cards"),
    __metadata("design:paramtypes", [cards_service_1.CardsService])
], CardsController);
//# sourceMappingURL=cards.controller.js.map