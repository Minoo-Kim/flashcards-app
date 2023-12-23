import { User } from "src/user/user.entity";
import { Card } from "src/cards/card.entity";
export declare class Deck {
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    image: string;
    numCards: number;
    user: User;
    userId: number;
    cards: Card[];
}
