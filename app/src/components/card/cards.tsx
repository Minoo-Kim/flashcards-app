import Card from "./card";
import useQueryCards from "../../hooks/use-query-cards";

const Cards = () => {
  const { cards } = useQueryCards();
  return (
    <div>
      {cards.map((card) => (
        <div key={card.id}>
          <Card card={card} />
        </div>
      ))}
    </div>
  );
};

export default Cards;
