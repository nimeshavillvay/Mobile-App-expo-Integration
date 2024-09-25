import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "~/components/ui/button";
import { ToastAction } from "./toast";
import { Toaster } from "./toaster";
import { useToast } from "./use-toast";

const meta: Meta<typeof Toaster> = {
  title: "Components/UI/Toast",
  component: Toaster,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Showcase: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { toast } = useToast();

    return (
      <>
        <Toaster />

        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => {
              toast({
                description: "Your message has been sent.",
              });
            }}
          >
            Simple
          </Button>

          <Button
            onClick={() => {
              toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
              });
            }}
          >
            With Title
          </Button>

          <Button
            onClick={() => {
              toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                action: (
                  <ToastAction altText="Try again">Try again</ToastAction>
                ),
              });
            }}
          >
            With Action
          </Button>

          <Button
            onClick={() => {
              toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                action: (
                  <ToastAction altText="Try again">Try again</ToastAction>
                ),
              });
            }}
          >
            Destructive
          </Button>
        </div>
      </>
    );
  },
};
