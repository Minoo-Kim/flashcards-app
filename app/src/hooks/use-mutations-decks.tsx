import { useStore } from "../lib/store";
import {
  createDeck as createDeckApi,
  updateDeck as updateDeckApi,
  deleteDeck as deleteDeckApi,
} from "../lib/api";
import { toast } from "@/components/ui/use-toast";

export const useMutationDecks = () => {
  const addDeckState = useStore((state) => state.addDeck);
  const deleteDeckState = useStore((state) => state.removeDeck);
  const editDeckState = useStore((state) => state.editDeck);

  const mutateCreateDeck = async (content: string) => {
    try {
      const newDeck = await createDeckApi(content);
      addDeckState(newDeck);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to create Deck",
        description:
          (error as Error).message ||
          "There was an error creating the deck. Please Try again later.",
      });
    }
  };
  const mutateDeleteDeck = async (deckId: string) => {
    try {
      await deleteDeckApi(deckId);
      deleteDeckState(deckId);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete the deck",
        description:
          (error as Error).message ||
          "There was an error deleting the deck. Please try again later.",
      });
    }
  };

  const mutateEditDeck = async (deckId: string, content: string) => {
    try {
      const newDeck = await updateDeckApi(deckId, content);
      if (newDeck) {
        editDeckState(deckId, content);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to create Deck",
        description:
          (error as Error).message ||
          "There was an error editing the deck. Please Try again later.",
      });
    }
  };

  return {
    mutateCreateDeck,
    mutateDeleteDeck,
    mutateEditDeck,
  };
};
