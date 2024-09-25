import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "~/components/ui/label";
import { Checkbox } from "./checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/UI/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const WithLabel: Story = {
  render: (props) => {
    const id = "checkbox";

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <Checkbox id={id} {...props} />

        <Label htmlFor={id}>Accept terms and condition</Label>
      </div>
    );
  },
};

export const WithoutLabel: Story = {};
