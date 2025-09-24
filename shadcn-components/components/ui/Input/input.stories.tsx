import type { Meta, StoryObj } from "@storybook/nextjs";
import { Input } from "./input";
import "../../../app/globals.css";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "number", "tel", "url", "search"],
    },
    placeholder: {
      control: { type: "text" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FormExample: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Full Name
        </label>
        <Input id="name" placeholder="John Doe" />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input id="email" type="email" placeholder="john@example.com" />
      </div>
      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium">
          Phone
        </label>
        <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
      </div>
      <div className="space-y-2">
        <label htmlFor="website" className="text-sm font-medium">
          Website
        </label>
        <Input id="website" type="url" placeholder="https://example.com" />
      </div>
    </div>
  ),
};

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2">
      <label htmlFor="email" className="text-sm font-medium">
        Email
      </label>
      <Input id="email" type="email" placeholder="Enter your email" />
    </div>
  ),
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password",
  },
};

export const Number: Story = {
  args: {
    type: "number",
    placeholder: "Enter number",
  },
};

export const Search: Story = {
  args: {
    type: "search",
    placeholder: "Search...",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    value: "Pre-filled value",
    readOnly: true,
  },
};

export const FileInput: Story = {
  args: {
    type: "file",
  },
};

export const InputWithIcon: Story = {
  render: () => (
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <Input className="pl-10" placeholder="Search..." />
    </div>
  ),
};

export const InputWithButton: Story = {
  render: () => (
    <div className="flex gap-2">
      <Input placeholder="Enter your email" />
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
        Subscribe
      </button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Small</label>
        <Input className="h-8 text-sm" placeholder="Small input" />
      </div>
      <div>
        <label className="text-sm font-medium">Default</label>
        <Input placeholder="Default input" />
      </div>
      <div>
        <label className="text-sm font-medium">Large</label>
        <Input className="h-12 text-lg" placeholder="Large input" />
      </div>
    </div>
  ),
};

export const ValidationStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Valid</label>
        <Input
          className="border-green-500 focus-visible:ring-green-500"
          placeholder="Valid input"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Invalid</label>
        <Input
          className="border-red-500 focus-visible:ring-red-500"
          placeholder="Invalid input"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Warning</label>
        <Input
          className="border-yellow-500 focus-visible:ring-yellow-500"
          placeholder="Warning input"
        />
      </div>
    </div>
  ),
};
