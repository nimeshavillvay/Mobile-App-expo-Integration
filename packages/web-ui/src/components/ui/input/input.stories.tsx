import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const meta: Meta = {
  title: "Components/UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
    controls: {
      exclude: /(onClick)/g,
    },
  },
  args: {
    disabled: false,
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};
