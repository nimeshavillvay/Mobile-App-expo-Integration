import Instructions from "@/_components/instructions";
import { Button } from "@repo/web-ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/web-ui/components/ui/dialog";

const DeliveryInstruction = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="mx-0.5 justify-start pl-0 hover:bg-transparent hover:underline"
          data-button-action="View delivery instructions"
        >
          View delivery instructions
          <span className="sr-only">Instruction</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Instructions</DialogTitle>
        </DialogHeader>

        <Instructions
          type="mobile"
          className="top-auto max-h-[calc(100vh-150px)] overflow-y-auto"
        />
      </DialogContent>
    </Dialog>
  );
};

export default DeliveryInstruction;
