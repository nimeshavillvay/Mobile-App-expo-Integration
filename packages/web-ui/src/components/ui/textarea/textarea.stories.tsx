import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./textarea";

const meta: Meta = {
  title: "Components/UI/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  args: {
    disabled: false,
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};
