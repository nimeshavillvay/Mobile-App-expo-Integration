import type { Meta, StoryObj } from "@storybook/react";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "./button";

const ButtonContent = () => {
  return (
    <>
      <ShoppingCart /> <span>Shopping cart</span>
    </>
  );
};

const meta: Meta<typeof Button> = {
  title: "Components/UI/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    controls: {
      exclude: /(children|asChild)/g,
    },
  },
  args: {
    children: <ButtonContent />,
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    variant: "default",
    size: "default",
    disabled: false,
  },
  render: ({ size, ...delegated }) => {
    return (
      <Button size={size} {...delegated}>
        {size === "icon" ? <Heart /> : <ButtonContent />}
      </Button>
    );
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

export const Subtle: Story = {
  args: {
    variant: "subtle",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const Icon: Story = {
  args: {
    size: "icon",
    children: <Heart />,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
