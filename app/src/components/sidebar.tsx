import { HomeIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { AddDeckDialog } from "./deck/add-deck-dialog";
import { useStore } from "@/lib/store";
import { AddCardDialog } from "./card/add-card-dialog";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const setAtDeck = useStore((state) => state.setAtDeck);
  const atDeck = useStore((state) => state.atDeck);
  const navigate = useNavigate();

  const handleHome = () => {
    setAtDeck(true);
    navigate("/");
  };

  return (
    <div className="flex flex-col gap-2 p-4">
      <Button variant={"ghost"} size="sm">
        <HomeIcon className="w-5 h-5" onClick={handleHome} />
      </Button>
      <Button variant={"ghost"} size="sm">
        <MagnifyingGlassIcon className="w-5 h-5" />
      </Button>
      {atDeck && <AddDeckDialog />}
      {!atDeck && <AddCardDialog />}
    </div>
  );
};

export default Sidebar;
