import type { Meta, StoryObj } from "@storybook/nextjs";
import { Badge } from "./badge";
import "../../../app/globals.css";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "secondary", "destructive", "outline"],
    },
    asChild: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Badge",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
};

export const WithIcon: Story = {
  render: () => (
    <Badge variant="default">
      <svg
        className="size-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
      Verified
    </Badge>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Active</Badge>
      <Badge variant="secondary">Pending</Badge>
      <Badge variant="destructive">Error</Badge>
      <Badge variant="outline">Draft</Badge>
    </div>
  ),
};

export const NotificationBadge: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <span>Messages</span>
      <Badge variant="destructive">3</Badge>
    </div>
  ),
};

export const CategoryBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline">React</Badge>
      <Badge variant="outline">TypeScript</Badge>
      <Badge variant="outline">Tailwind</Badge>
      <Badge variant="outline">Storybook</Badge>
    </div>
  ),
};

export const SizeVariations: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 items-center">
      <Badge className="text-xs">Small</Badge>
      <Badge>Default</Badge>
      <Badge className="text-sm px-3 py-1">Large</Badge>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge asChild>
        <a href="#" className="hover:bg-primary/90">
          Clickable Badge
        </a>
      </Badge>
      <Badge variant="outline" asChild>
        <button className="hover:bg-accent">Button Badge</button>
      </Badge>
    </div>
  ),
};
