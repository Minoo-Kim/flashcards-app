import { useStore } from "../lib/store";
import { useEffect, useState } from "react";

// custom hook to return matching deck's title
export function useDeckData(deckId: string) {
  const decks = useStore((state) => state.decks);
  const [currTitle, setCurrTitle] = useState("");

  useEffect(() => {
    const matchingDeck = decks.find((deck) => deck.id === deckId);
    if (matchingDeck) {
      setCurrTitle(matchingDeck.title);
    }
  }, [decks, deckId]);

  return currTitle;
}
