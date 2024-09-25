import type { Meta, StoryObj } from "@storybook/react";
import { WurthFullWhite } from "./wurth-full-white";

const meta: Meta<typeof WurthFullWhite> = {
  title: "Components/Logos/Wurth Full White",
  component: WurthFullWhite,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#D1D1D1" }],
    },
  },
};

export default meta;
type Story = StoryObj<typeof WurthFullWhite>;

export const Default: Story = {};
