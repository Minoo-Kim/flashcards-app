import { create } from "zustand";
import { Deck, DeckWithUserData, User, Card } from "./types";
import { immer } from "zustand/middleware/immer";

type State = {
  decks: Deck[];
  user: User | null;
  cards: Card[];
  selectedDeckId: string | null;
  atDeck: boolean;
};

type Action = {
  // for decks
  setDeck: (decks: Deck[]) => void;
  addDeck: (deck: DeckWithUserData) => void;
  removeDeck: (id: string) => void;
  editDeck: (id: string, content: string) => void;

  // for users
  setUser: (user: User) => void;
  clearUser: () => void;

  // for cards
  setCards: (cards: Card[]) => void;
  addCard: (card: Card) => void;
  clearCards: () => void;
  removeCard: (id: string) => void;
  updateCard: (id: string, front: string, back: string) => void;

  // for deckId
  setSelectedDeckId: (id: string) => void;
  clearSelectedDeckId: () => void;
  // for card rendering

  setAtDeck: (val: boolean) => void;
};

const initialState: State = {
  decks: [],
  user: null,
  cards: [],
  selectedDeckId: null,
  atDeck: true,
};

export const useStore = create<State & Action>()(
  immer((set, get) => ({
    ...initialState,

    setDeck: (decks: Deck[]) => set({ decks }),
    addDeck: (deck: Deck) => {
      set({ decks: [deck, ...get().decks] });
    },
    removeDeck: (id: string) => {
      const newDecks = get().decks.filter((deck) => deck.id !== id);
      set({ decks: newDecks });
    },
    editDeck: (id: string, content: string) => {
      const newDecks = get().decks.map((deck) => {
        if (deck.id === id) {
          return {
            ...deck,
            title: content,
          };
        }
        // For non-matching decks, return them as they are
        return deck;
      });
      set({ decks: newDecks });
    },
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
    setCards: (cards) => set({ cards }),
    addCard: (card) => {
      set({
        cards: [card, ...get().cards],
        decks: get().decks.map((deck) => {
          if (deck.id === card.deckId) {
            return {
              ...deck,
            };
          }
          return deck;
        }),
      });
    },
    clearCards: () => set({ cards: [] }),
    setSelectedDeckId: (id) => set({ selectedDeckId: id }),
    clearSelectedDeckId: () => set({ selectedDeckId: null }),
    setAtDeck: (val) => set({ atDeck: val }),
    removeCard: (id: string) => {
      const newCards = get().cards.filter((card) => card.id !== id);
      set({ cards: newCards });
    },
    updateCard: (id: string, front: string, back: string) => {
      const newCards = get().cards.map((card) => {
        if (card.id === id) {
          return {
            ...card,
            front: front,
            back: back,
          };
        }
        // For non-matching cards, return them as they are
        return card;
      });
      set({ cards: newCards });
    },
  })),
);
