import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
} from "./card";
import { Button } from "../Button/button";
import { Badge } from "../Badge/badge";
import "../../../app/globals.css";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const Simple: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent>
        <p>Simple card with just content.</p>
      </CardContent>
    </Card>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Project Alpha</CardTitle>
        <CardDescription>Development in progress</CardDescription>
        <CardAction>
          <Badge variant="secondary">Active</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>
          This project is currently in active development with a team of 5
          developers.
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline">View Details</Button>
        <Button>Edit</Button>
      </CardFooter>
    </Card>
  ),
};

export const ProductCard: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>MacBook Pro</CardTitle>
        <CardDescription>Apple M2 chip, 16GB RAM</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Price</span>
            <span className="font-semibold">$1,999</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Stock</span>
            <Badge variant="outline">12 available</Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Add to Cart</Button>
      </CardFooter>
    </Card>
  ),
};

export const UserCard: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="size-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
            JD
          </div>
          <div>
            <CardTitle className="text-base">John Doe</CardTitle>
            <CardDescription>Software Engineer</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Passionate about building great user experiences with modern web
          technologies.
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" size="sm">
          Follow
        </Button>
        <Button size="sm">Message</Button>
      </CardFooter>
    </Card>
  ),
};

export const StatsCard: Story = {
  render: () => (
    <Card className="w-[250px]">
      <CardHeader>
        <CardTitle className="text-2xl">$45,231.89</CardTitle>
        <CardDescription>Total Revenue</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <Badge variant="default">+20.1%</Badge>
          <span className="text-sm text-muted-foreground">from last month</span>
        </div>
      </CardContent>
    </Card>
  ),
};

export const NotificationCard: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>New Message</CardTitle>
        <CardDescription>You have 3 unread messages</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
            <div className="size-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm">
              A
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Alice Johnson</p>
              <p className="text-xs text-muted-foreground">
                Hey, how is the project going?
              </p>
            </div>
            <Badge variant="destructive">2</Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline">Mark as Read</Button>
        <Button>Reply</Button>
      </CardFooter>
    </Card>
  ),
};

export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Feature 1</CardTitle>
          <CardDescription>Description for feature 1</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content for feature 1</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Feature 2</CardTitle>
          <CardDescription>Description for feature 2</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content for feature 2</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Feature 3</CardTitle>
          <CardDescription>Description for feature 3</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content for feature 3</p>
        </CardContent>
      </Card>
    </div>
  ),
};
