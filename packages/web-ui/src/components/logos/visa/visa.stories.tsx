import type { Meta, StoryObj } from "@storybook/react";
import { Visa } from "./visa";

const meta: Meta<typeof Visa> = {
  title: "Components/Logos/Visa",
  component: Visa,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Visa>;

export const Default: Story = {};
