import type { Meta, StoryObj } from "@storybook/react";
import { WurthFullBlack } from "./wurth-full-black";

const meta: Meta<typeof WurthFullBlack> = {
  title: "Components/Logos/Wurth Full Black",
  component: WurthFullBlack,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof WurthFullBlack>;

export const Default: Story = {};
