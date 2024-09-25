import type { Meta, StoryObj } from "@storybook/react";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";

const meta: Meta<typeof Carousel> = {
  title: "Components/UI/Carousel",
  component: Carousel,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Showcase: Story = {
  render: () => {
    return (
      <Carousel style={{ width: "100%", maxWidth: "20rem" }}>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div style={{ padding: "0.25rem" }}>
                <div
                  style={{
                    backgroundColor: "#FFF",
                    color: "#000",
                    borderRadius: "0.75rem",
                    borderWidth: 1,
                    boxShadow:
                      "0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
                  }}
                >
                  <div
                    style={{
                      aspectRatio: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "1.5rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "2.25rem",
                        lineHeight: "2.5rem",
                        fontWeight: 600,
                      }}
                    >
                      {index + 1}
                    </span>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />

        <CarouselDots style={{ marginTop: "1rem" }} />
      </Carousel>
    );
  },
};
