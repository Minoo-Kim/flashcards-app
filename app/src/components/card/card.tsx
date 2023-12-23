import { useState } from "react";
import { Card as CardType } from "../../lib/types";
import CardActions from "./card-actions";

const Card = ({ card }: { card: CardType }) => {
  const { id, front, back } = card;
  const [isFront, setIsFront] = useState<boolean>(true);
  const flipCard = async () => {
    setIsFront(!isFront);
  };
  return (
    <div className="flex justify-center">
      <div
        className="relative p-4 border-2 rounded-lg shadow-md w-96 h-60 hover:scale-105"
        onClick={flipCard}
      >
        <div className="relative mt-2 deck-info">
          {isFront && <p className="text-center">{front}</p>}
          {!isFront && <p className="text-center">{back}</p>}
        </div>
        <div className="absolute top-0 right-0 mt-2">
          <CardActions id={id} />
        </div>
      </div>
    </div>
  );
};

export default Card;
