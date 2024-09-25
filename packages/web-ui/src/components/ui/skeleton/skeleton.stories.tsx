import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/UI/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Showcase: Story = {
  render: () => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Skeleton
          style={{
            height: "3rem",
            width: "3rem",
            borderRadius: 9999,
          }}
        />

        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <Skeleton
            style={{
              height: "1rem",
              width: 250,
            }}
          />
          <Skeleton
            style={{
              height: "1rem",
              width: 200,
            }}
          />
        </div>
      </div>
    );
  },
};
