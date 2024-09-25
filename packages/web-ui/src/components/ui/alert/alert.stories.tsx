import type { Meta, StoryObj } from "@storybook/react";
import { Alert as AlertIcon } from "~/components/icons/alert";
import { Zap } from "~/components/icons/zap";
import { Alert, AlertContent, AlertDescription, AlertTitle } from "./alert";

const meta: Meta<typeof Alert> = {
  title: "Components/UI/Alert",
  component: Alert,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: () => {
    return (
      <Alert>
        <Zap className="size-4" />

        <AlertContent>
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            You can add components to your app using the cli.
          </AlertDescription>
        </AlertContent>
      </Alert>
    );
  },
};

export const Destructive: Story = {
  render: () => {
    return (
      <Alert variant="destructive">
        <AlertIcon className="size-4" />

        <AlertContent>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Your session has expired. Please log in again.
          </AlertDescription>
        </AlertContent>
      </Alert>
    );
  },
};

export const DefaultWithoutDescription: Story = {
  render: () => {
    return (
      <Alert>
        <Zap className="size-4" />

        <AlertContent>
          <AlertTitle>Heads up!</AlertTitle>
        </AlertContent>
      </Alert>
    );
  },
};

export const DestructiveWithoutDescription: Story = {
  render: () => {
    return (
      <Alert variant="destructive">
        <AlertIcon className="size-4" />

        <AlertContent>
          <AlertTitle>Error</AlertTitle>
        </AlertContent>
      </Alert>
    );
  },
};
