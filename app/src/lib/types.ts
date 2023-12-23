export type User = {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
};

export type Deck = {
  id: string;
  title: string;
  image?: string;
  numCards: number;
};

export type Card = {
  id: string;
  deckId: string;
  front: string;
  back: string;
};

export type DeckWithUserData = Deck & { user?: User };
