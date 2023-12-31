import { Deck } from "src/decks/deck.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Card {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  front: string;

  @Column()
  back: string;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @CreateDateColumn({ type: "timestamptz" })
  updatedAt: Date;

  @ManyToOne(() => Deck, (deck) => deck.cards)
  @JoinColumn({ name: "postId" })
  deck: Deck;

  @Column()
  deckId: string;
}
