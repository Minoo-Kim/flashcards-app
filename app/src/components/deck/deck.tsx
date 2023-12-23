import { Deck as DeckType } from "../../lib/types"; // Import the Deck type from types.ts
import { Button } from "../ui/button";
import DeckActions from "./deck-actions";
import { useStore } from "@/lib/store";
import { Link } from "react-router-dom";

const DeckComponent = ({ deck }: { deck: DeckType }) => {
  const setSelectedDeckId = useStore((state) => state.setSelectedDeckId);

  const setAtDeck = useStore((state) => state.setAtDeck);
  const deckId = deck.id;

  // when the button is clicked, the current deck is saved via store management for future use
  const showCards = () => {
    // save deckId
    setSelectedDeckId(deckId);
    // change state to render cards
    setAtDeck(false);
  };
  const { id, title, numCards } = deck;
  return (
    <div className="flex justify-center">
      <div className="relative p-4 border-2 rounded-lg shadow-md w-96 h-60 hover:scale-105">
        <div className="relative mt-2 deck-info">
          <h2 className="deck-title">{title}</h2>
          <p className="deck-card-count">{numCards} cards</p>
          <Link onClick={showCards} to={`decks/${deckId}`}>
            <Button>Show Cards</Button>
          </Link>
        </div>
        <div className="absolute top-0 right-0 mt-2">
          <DeckActions deckId={id} />
        </div>
      </div>
    </div>
  );
};

export default DeckComponent;
