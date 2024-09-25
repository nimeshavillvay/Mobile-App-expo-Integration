import type { Meta, StoryObj } from "@storybook/react";
import { Wurth } from "./wurth";

const meta: Meta<typeof Wurth> = {
  title: "Components/Logos/Wurth",
  component: Wurth,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Wurth>;

export const Default: Story = {};
