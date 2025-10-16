import { Button } from "@/components/ui/Button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card/card";
import { Input } from "@/components/ui/Input/input";
import { Badge } from "@/components/ui/Badge/badge";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/Alert/alert";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/Avatar/avatar";
import { AlertCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Lightweight Design System</h1>
          <p className="text-xl text-muted-foreground">
            Built with ShadCN/UI Components
          </p>
        </header>

        <div className="grid gap-8 max-w-4xl mx-auto">
          {/* Button Components */}
          <Card>
            <CardHeader>
              <CardTitle>Button Component</CardTitle>
              <CardDescription>
                Various button styles and variants
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button>Default Button</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </CardContent>
          </Card>

          {/* Card Components */}
          <Card>
            <CardHeader>
              <CardTitle>Card Component</CardTitle>
              <CardDescription>Cards for displaying content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Sample Card 1</CardTitle>
                    <CardDescription>
                      This is a sample card description
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Card content goes here with some example text.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Sample Card 2</CardTitle>
                    <CardDescription>Another card description</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>More card content to demonstrate the layout.</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Input Components */}
          <Card>
            <CardHeader>
              <CardTitle>Input Component</CardTitle>
              <CardDescription>Form inputs and text fields</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Enter password"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="search">Search</label>
                  <Input type="search" id="search" placeholder="Search..." />
                </div>
                <div className="space-y-2">
                  <label htmlFor="disabled">Disabled Input</label>
                  <Input id="disabled" placeholder="Disabled" disabled />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Badge Components */}
          <Card>
            <CardHeader>
              <CardTitle>Badge Component</CardTitle>
              <CardDescription>Labels and status indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <div className="flex items-center gap-2">
                  <span>Status:</span>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span>Version:</span>
                  <Badge variant="outline">v1.0.0</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Avatar Components */}
          <Card>
            <CardHeader>
              <CardTitle>Avatar Component</CardTitle>
              <CardDescription>
                User profile pictures and fallbacks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">
                    With Image
                  </span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <Avatar>
                    <AvatarImage src="/nonexistent.jpg" alt="Broken" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">
                    Fallback
                  </span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">SM</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">Small</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alert Components */}
          <Card>
            <CardHeader>
              <CardTitle>Alert Component</CardTitle>
              <CardDescription>
                Notifications and important messages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Default Alert</AlertTitle>
                  <AlertDescription>
                    This is a default alert message with some important
                    information.
                  </AlertDescription>
                </Alert>

                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error Alert</AlertTitle>
                  <AlertDescription>
                    This is an error alert indicating something went wrong.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </div>

        <footer className="text-center mt-12 text-muted-foreground">
          <p>Design System Demo • Built with Next.js and ShadCN/UI</p>
        </footer>
      </div>
    </div>
  );
}
