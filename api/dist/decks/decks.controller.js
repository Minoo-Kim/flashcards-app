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
exports.DecksController = void 0;
const common_1 = require("@nestjs/common");
const decks_service_1 = require("./decks.service");
const deck_create_dto_1 = require("./deck-create.dto");
const deck_update_dto_1 = require("./deck-update.dto");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const user_id_decorator_1 = require("../decorators/user-id.decorator");
const deck_owner_guard_1 = require("../guards/deck-owner.guard");
const user_service_1 = require("../user/user.service");
const find_decks_query_dto_1 = require("./find-decks-query.dto");
let DecksController = class DecksController {
    constructor(decksService, userService) {
        this.decksService = decksService;
        this.userService = userService;
    }
    async create(CreateDeckDto, userId) {
        const deck = await this.decksService.create(CreateDeckDto, userId);
        delete deck.userId;
        return deck;
    }
    async findOne(id) {
        const deck = await this.decksService.findOne(id);
        if (!deck) {
            throw new common_1.NotFoundException(`Deck with ID ${id} not found`);
        }
        delete deck.userId;
        return deck;
    }
    async update(id, UpdateDeckDto) {
        const deck = await this.decksService.update(id, UpdateDeckDto);
        delete deck.userId;
        return deck;
    }
    async remove(id) {
        const deck = await this.decksService.remove(id);
        delete deck.userId;
        return deck;
    }
    async findAll(query) {
        let userId;
        const { limit, offset, search, username, withUserData } = query;
        if (username) {
            const user = await this.userService.findOne(username);
            if (!user) {
                throw new common_1.NotFoundException(`User with username ${username} not found`);
            }
            userId = user.id;
        }
        const decks = await this.decksService.findAll(limit, offset, search, userId, withUserData);
        return {
            limit,
            offset,
            search,
            username,
            withUserData,
            data: decks.map((deck) => {
                delete deck.userId;
                if (deck.user) {
                    delete deck.user.password;
                }
                return deck;
            }),
        };
    }
};
exports.DecksController = DecksController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_id_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deck_create_dto_1.CreateDeckDto, Number]),
    __metadata("design:returntype", Promise)
], DecksController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DecksController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, deck_owner_guard_1.DeckOwnershipGuard),
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, deck_update_dto_1.UpdateDeckDto]),
    __metadata("design:returntype", Promise)
], DecksController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, deck_owner_guard_1.DeckOwnershipGuard),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DecksController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_decks_query_dto_1.FindDecksQueryDTO]),
    __metadata("design:returntype", Promise)
], DecksController.prototype, "findAll", null);
exports.DecksController = DecksController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)("decks"),
    __metadata("design:paramtypes", [decks_service_1.DecksService,
        user_service_1.UserService])
], DecksController);
//# sourceMappingURL=decks.controller.js.map