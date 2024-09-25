import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

const meta: Meta<typeof Dialog> = {
  title: "Components/UI/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Showcase: Story = {
  render: () => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="subtle">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent style={{ maxWidth: 425 }}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div
            style={{
              display: "grid",
              gap: "1rem",
              paddingTop: "1rem",
              paddingBottom: "1rem",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Label htmlFor="name" style={{ textAlign: "right" }}>
                Name
              </Label>
              <Input
                id="name"
                value="Pedro Duarte"
                style={{ gridColumn: "span 3 / span 3" }}
              />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Label htmlFor="username" style={{ textAlign: "right" }}>
                Username
              </Label>
              <Input
                id="username"
                value="@peduarte"
                style={{ gridColumn: "span 3 / span 3" }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
};
