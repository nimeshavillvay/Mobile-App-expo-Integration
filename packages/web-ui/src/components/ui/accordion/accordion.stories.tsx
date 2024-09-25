import type { Meta, StoryObj } from "@storybook/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

const meta: Meta<typeof Accordion> = {
  title: "Components/UI/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Showcase: Story = {
  render: () => {
    return (
      <Accordion type="single" collapsible className="w-[32rem] max-w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>
            This is a very long text. This is to test if the text will wrap
            properly. Lorem ipsum dolor sit amet.
          </AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed
            justo ligula. Donec volutpat blandit justo vitae efficitur. Nulla
            auctor dui tincidunt odio mollis, et imperdiet nisi ultricies. Ut
            rhoncus ante magna. Pellentesque consequat magna nec nulla
            efficitur, ac suscipit dui auctor. Vestibulum vel ornare ex, in
            finibus felis. Nullam condimentum quis felis at blandit.
            Pellentesque blandit porttitor tempor. Donec pretium sapien aliquam
            ex luctus, eget faucibus diam posuere. Curabitur efficitur mattis
            lectus id interdum. Maecenas eget ligula ac neque auctor feugiat.
            Suspendisse potenti.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  },
};
