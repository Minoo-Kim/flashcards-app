import {
  createCard,
  deleteCard as deleteCardAPI,
  editCard as editCardAPI,
} from "@/lib/api";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";

function useMutationCards() {
  const { toast } = useToast();
  const addCard = useStore((state) => state.addCard);
  const removeCard = useStore((state) => state.removeCard);
  const updateCard = useStore((state) => state.updateCard);

  const selectedDeckId = useStore((state) => state.selectedDeckId);

  const addNewCard = async (front: string, back: string) => {
    try {
      const newCard = await createCard(selectedDeckId as string, front, back);
      addCard(newCard);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to create the card",
        description:
          (error as Error).message ||
          "There was an error creating the card. Please try again later.",
      });
    }
  };

  const deleteCard = async (id: string) => {
    try {
      if (selectedDeckId != null) {
        await deleteCardAPI(selectedDeckId, id);
        removeCard(id);
      } else {
        toast({
          variant: "destructive",
          title: "Failed to delete the card",
          description:
            "There was an error deleting the card. Please try again later.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete the card",
        description:
          (error as Error).message ||
          "There was an error deleting the card. Please try again later.",
      });
    }
  };

  const editCard = async (id: string, front: string, back: string) => {
    try {
      if (selectedDeckId != null) {
        await editCardAPI(selectedDeckId, id, front, back);
        updateCard(id, front, back);
      } else {
        toast({
          variant: "destructive",
          title: "Failed to edit card",
          description:
            "There was an error editing the card. Please Try again later.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to edit card",
        description:
          (error as Error).message ||
          "There was an error editing the card. Please Try again later.",
      });
    }
  };

  return { addNewCard, deleteCard, editCard };
}

export default useMutationCards;
