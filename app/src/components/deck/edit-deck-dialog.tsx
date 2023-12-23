import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutationDecks } from "../../hooks/use-mutations-decks";
import { useToast } from "@/components/ui/use-toast";
import { useDeckData } from "../../hooks/use-deck-data";

type EditDeckDialogProps = {
  deckId: string;
};

export const EditDeckDialog = ({ deckId }: EditDeckDialogProps) => {
  const [content, setContent] = useState("");
  const { mutateEditDeck } = useMutationDecks();
  const { toast } = useToast();
  const currTitle = useDeckData(deckId) || "";

  useEffect(() => {
    // Set the initial content to the current title when the dialog is opened
    setContent(currTitle);
  }, [currTitle]);

  const handleSave = async () => {
    if (!content) {
      toast({
        variant: "destructive",
        title: "Error: Edited content cannot be empty!",
        description: "Please enter the content for your deck.",
      });
      return;
    }
    await mutateEditDeck(deckId, content);
    setContent("");
    window.location.reload();
  };

  const handleCancel = () => {
    setContent("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="inline-block w-40 text-left text-black bg-white hover:bg-gray-100 hover:text-black"
          aria-label={"Make a Deck"}
          variant="default"
          size="sm"
          style={{ boxShadow: "none", outline: "none" }}
        >
          Edit deck
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Deck</DialogTitle>
          <DialogDescription>Give a title to your deck here.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="title" className="text-right">
              Content
            </Label>
            <Input
              id="content"
              value={content}
              className="col-span-3"
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"} type="reset" onClick={handleCancel}>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" onClick={handleSave}>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
