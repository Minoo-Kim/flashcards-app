import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditDeckDialog } from "./edit-deck-dialog";
import { useMutationDecks } from "@/hooks/use-mutations-decks";

const DeckActions = ({ deckId }: { deckId: string }) => {
  const { mutateDeleteDeck } = useMutationDecks();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="w-4 h-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <EditDeckDialog deckId={deckId} />
        <DropdownMenuItem
          className="text-red-500"
          onClick={() => mutateDeleteDeck(deckId)}
        >
          Delete deck
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DeckActions;
