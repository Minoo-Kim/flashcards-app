import { Button } from "./ui/button";
import { useStore } from "@/lib/store";

const Header = () => {
  const atDeck = useStore((state) => state.atDeck);
  return (
    <div className="flex justify-center gap-3 p-4 border-b-2 border-slate-400">
      <Button variant={"link"} disabled={!atDeck}>
        Decks
      </Button>
      <Button variant={"link"} disabled={atDeck}>
        Cards
      </Button>
    </div>
  );
};

export default Header;
