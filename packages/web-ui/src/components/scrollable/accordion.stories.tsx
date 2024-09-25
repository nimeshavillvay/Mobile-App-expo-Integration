import type { Meta, StoryObj } from "@storybook/react";
import {
  ScrollableContainer,
  ScrollableNextButton,
  ScrollablePreviousButton,
  ScrollableRoot,
} from "./scrollable";

const meta: Meta<typeof ScrollableRoot> = {
  title: "Components/Scrollable",
  component: ScrollableRoot,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ScrollableContainer>;

export const Showcase: Story = {
  render: () => {
    return (
      <ScrollableRoot className="max-w-screen-md">
        <ScrollablePreviousButton />

        <ScrollableContainer className="gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="grid size-40 shrink-0 place-items-center bg-gray-200"
            >
              {index + 1}
            </div>
          ))}
        </ScrollableContainer>

        <ScrollableNextButton />
      </ScrollableRoot>
    );
  },
};
