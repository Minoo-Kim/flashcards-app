import { useState } from "react";

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
import { Textarea } from "../ui/textarea";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { useStore } from "@/lib/store";
import useMutationCards from "@/hooks/use-mutations-cards";

export const AddCardDialog = () => {
  const { addNewCard } = useMutationCards();
  const { toast } = useToast();
  const init = {
    front: "",
    back: "",
  };
  const [data, setData] = useState(init);
  const user = useStore((state) => state.user);

  const handleSave = async () => {
    if (!data.front || !data.back) {
      toast({
        variant: "destructive",
        title: "Sorry! Front and back of the card cannot be empty! 🙁",
        description: `Please enter the content for your card.`,
      });
      setData({ front: "", back: "" });
      return;
    }
    await addNewCard(data.front, data.back);

    setData({ front: "", back: "" });
  };

  const handleCancel = () => {
    setData({ front: "", back: "" });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button aria-label={"Make a card"} variant="default" size="sm">
          <PlusCircledIcon className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add Card</DialogTitle>
          <DialogDescription>
            {user
              ? "Provide the content of your card here."
              : "Please login to make a card."}
          </DialogDescription>
        </DialogHeader>
        {user && (
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Textarea
                id="front"
                placeholder="front"
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
                placeholder="back"
                value={data.back}
                className="col-span-4"
                onChange={(e) => {
                  setData({ front: data.front, back: e.target.value });
                }}
              />
            </div>
          </div>
        )}
        <DialogFooter>
          {!user && (
            <DialogClose asChild>
              <Button>Okay</Button>
            </DialogClose>
          )}
          {user && (
            <DialogClose asChild>
              <Button variant={"secondary"} type="reset" onClick={handleCancel}>
                Cancel
              </Button>
            </DialogClose>
          )}
          {user && (
            <DialogClose asChild>
              <Button type="submit" onClick={handleSave}>
                Save
              </Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
