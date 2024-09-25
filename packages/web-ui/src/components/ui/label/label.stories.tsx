import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./label";

const meta: Meta<typeof Label> = {
  title: "Components/UI/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Accept terms and condition",
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {};
