import { Deck } from "src/decks/deck.entity";
export declare class Card {
    id: string;
    front: string;
    back: string;
    createdAt: Date;
    updatedAt: Date;
    deck: Deck;
    deckId: string;
}
