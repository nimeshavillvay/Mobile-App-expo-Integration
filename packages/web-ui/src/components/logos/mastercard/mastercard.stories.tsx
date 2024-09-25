import type { Meta, StoryObj } from "@storybook/react";
import { Mastercard } from "./mastercard";

const meta: Meta<typeof Mastercard> = {
  title: "Components/Logos/Mastercard",
  component: Mastercard,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Mastercard>;

export const Default: Story = {};
