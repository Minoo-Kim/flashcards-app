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
import { useToast } from "@/components/ui/use-toast";
import useMutationCards from "@/hooks/use-mutations-cards";
import { Textarea } from "../ui/textarea";
import { Card } from "@/lib/types";
import { useStore } from "@/lib/store";

type EditCardDialogProps = {
  id: string;
};

export const EditCardDialog = ({ id }: EditCardDialogProps) => {
  const { editCard } = useMutationCards();
  const cards = useStore((state) => state.cards);

  const init = {
    front: "",
    back: "",
  };
  const [data, setData] = useState(init);
  const { toast } = useToast();

  useEffect(() => {
    // Set the initial content to the current front/back when the dialog is opened
    cards.map((card: Card) => {
      if (card.id === id) {
        setData({ front: card.front, back: card.back });
      }
    });
  }, []);

  const handleSave = async () => {
    console.log("here");
    if (!data.front || !data.back) {
      console.log("here2");

      toast({
        variant: "destructive",
        title: "Error: Edited card cannot be empty!",
        description: "Please enter both front and back for your card.",
      });
      return;
    }
    await editCard(id, data.front, data.back);
    window.location.reload();
  };

  const handleCancel = () => {
    // set back to what it was
    cards.map((card: Card) => {
      if (card.id === id) {
        setData({ front: card.front, back: card.back });
      }
    });
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
          Edit card
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit card</DialogTitle>
          <DialogDescription>Edit your card below.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Textarea
              id="front"
              value={data.front}
              className="col-span-4"
              onChange={(e) => {
                setData({ front: e.target.value, back: data.back });
              }}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Textarea
              id="back"
              value={data.back}
              className="col-span-4"
              onChange={(e) => {
                setData({ front: data.front, back: e.target.value });
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
