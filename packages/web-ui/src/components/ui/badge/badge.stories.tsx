import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "Components/UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    controls: {
      exclude: /(onClick)/g,
    },
  },
  args: {
    children: "Badge",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const DefaultAlt: Story = {
  args: {
    variant: "default-alt",
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const PrimaryAlt: Story = {
  args: {
    variant: "primary-alt",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
  },
};

export const SuccessAlt: Story = {
  args: {
    variant: "success-alt",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
  },
};

export const WarningAlt: Story = {
  args: {
    variant: "warning-alt",
  },
};
