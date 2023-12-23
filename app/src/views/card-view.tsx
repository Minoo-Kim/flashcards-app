import Aside from "@/components/aside";
import Feed from "@/components/feed";
import Sidebar from "@/components/sidebar";
import { toast } from "@/components/ui/use-toast";
import { useStore } from "@/lib/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const CardView = () => {
  const setSelectedDeckId = useStore((state) => state.setSelectedDeckId);
  const clearSelectedDeckId = useStore((state) => state.clearSelectedDeckId);

  const setAtDeck = useStore((state) => state.setAtDeck);
  const { deckId } = useParams();

  useEffect(() => {
    try {
      if (deckId) {
        setSelectedDeckId(deckId);
        setAtDeck(false);
      }
    } catch (error) {
      clearSelectedDeckId();
      toast({
        variant: "destructive",
        title: "Failed to fetch decks",
        description:
          (error as Error).message ||
          "There was an error in loading the specified URL",
      });
    }
  }, [deckId]);

  return (
    <>
      <Sidebar />
      <Feed />
      <Aside />
    </>
  );
};

export default CardView;
