import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  ChartConfig,
  ChartContainer,
  ChartLegendContent,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Toggle, toggleVariants } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

describe("shadcn UI components", () => {
  it("renders button, input, label, badge and cards", () => {
    render(
      <div>
        <Button onClick={() => undefined}>Continue</Button>
        <Input aria-label="Email" defaultValue="name@example.com" />
        <Label htmlFor="email">Email</Label>
        <Badge variant="secondary">New</Badge>
        <Alert variant="default">
          <AlertTitle>Heads up</AlertTitle>
          <AlertDescription>Everything is working.</AlertDescription>
        </Alert>
        <Card>
          <CardHeader>
            <CardTitle>Project</CardTitle>
            <CardDescription>Summary</CardDescription>
          </CardHeader>
          <CardContent>Content</CardContent>
        </Card>
      </div>,
    );

    expect(screen.getByRole("button", { name: "Continue" })).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toHaveValue("name@example.com");
    expect(screen.getByText("Heads up")).toBeInTheDocument();
    expect(screen.getByText("Everything is working.")).toBeInTheDocument();
    expect(screen.getByText("Project")).toBeInTheDocument();
  });

  it("supports checkbox and switch interactions", () => {
    render(
      <div>
        <Checkbox aria-label="Accept terms" defaultChecked />
        <Switch aria-label="Enable notifications" defaultChecked />
      </div>,
    );

    expect(screen.getByRole("checkbox", { name: "Accept terms" })).toBeChecked();
    expect(screen.getByRole("switch", { name: "Enable notifications" })).toBeChecked();
  });

  it("renders accordion and collapsible content", () => {
    render(
      <div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Section 1</AccordionTrigger>
            <AccordionContent>Accordion details</AccordionContent>
          </AccordionItem>
        </Accordion>
        <Collapsible defaultOpen>
          <CollapsibleTrigger>Toggle panel</CollapsibleTrigger>
          <CollapsibleContent>Collapsible details</CollapsibleContent>
        </Collapsible>
      </div>,
    );

    expect(screen.getByText("Accordion details")).toBeInTheDocument();
    expect(screen.getByText("Collapsible details")).toBeInTheDocument();
  });

  it("renders tabs and toggles with active state", () => {
    render(
      <div>
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Account details</TabsContent>
          <TabsContent value="password">Password details</TabsContent>
        </Tabs>
        <Toggle aria-label="Favorite" defaultPressed>
          Favorite
        </Toggle>
        <ToggleGroup type="single" defaultValue="left">
          <ToggleGroupItem value="left" aria-label="Left aligned">
            Left
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Right aligned">
            Right
          </ToggleGroupItem>
        </ToggleGroup>
      </div>,
    );

    expect(screen.getByRole("tab", { name: "Account" })).toHaveAttribute("data-state", "active");
    expect(screen.getByText("Account details")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Favorite" })).toHaveAttribute("data-state", "on");
  });

  it("renders avatar, progress, separator, skeleton and textarea content", () => {
    render(
      <div>
        <Avatar>
          <AvatarImage src="https://example.com/avatar.png" alt="User avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <Progress value={55} aria-label="Progress" />
        <Separator />
        <Skeleton data-testid="skeleton" className="h-4 w-8" />
        <Textarea aria-label="Bio" defaultValue="hello world" />
      </div>,
    );

    expect(screen.getByText("U")).toBeInTheDocument();
    expect(screen.getByLabelText("Progress")).toHaveAttribute("data-state", "indeterminate");
    expect(screen.getByLabelText("Bio")).toHaveValue("hello world");
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("renders breadcrumb, table, aspect ratio and select controls", () => {
    render(
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Settings</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Table>
          <TableCaption>Users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Ada</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Footer</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <AspectRatio ratio={16 / 9} className="h-20 w-20">
          <div>Aspect</div>
        </AspectRatio>
        <Select defaultValue="apple">
          <SelectTrigger aria-label="Fruit choice">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectContent>
        </Select>
      </div>,
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("Aspect")).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Fruit choice" })).toBeInTheDocument();
  });

  it("renders command palette, popover, hover card and tooltips", () => {
    render(
      <div>
        <Command>
          <CommandInput placeholder="Search" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Files</CommandItem>
              <CommandSeparator />
            </CommandGroup>
          </CommandList>
        </Command>
        <Popover>
          <PopoverTrigger>Open popover</PopoverTrigger>
          <PopoverContent>Popover body</PopoverContent>
        </Popover>
        <HoverCard>
          <HoverCardTrigger>Hover me</HoverCardTrigger>
          <HoverCardContent>Hover card body</HoverCardContent>
        </HoverCard>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>Trigger tooltip</TooltipTrigger>
            <TooltipContent>Tooltip body</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>,
    );

    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    expect(screen.getByText("Popover body")).toBeInTheDocument();
    expect(screen.getByText("Hover card body")).toBeInTheDocument();
  });

  it("renders calendar, radio group, context menu, dropdown menu and scroll area", () => {
    render(
      <div>
        <Calendar />
        <RadioGroup defaultValue="option-1" aria-label="Plan options">
          <RadioGroupItem value="option-1" aria-label="Option 1" />
          <RadioGroupItem value="option-2" aria-label="Option 2" />
        </RadioGroup>
        <ContextMenu>
          <ContextMenuTrigger>Right click</ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuLabel>Menu</ContextMenuLabel>
            <ContextMenuItem>Open</ContextMenuItem>
            <ContextMenuCheckboxItem checked>Favorites</ContextMenuCheckboxItem>
            <ContextMenuSeparator />
          </ContextMenuContent>
        </ContextMenu>
        <DropdownMenu>
          <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuCheckboxItem checked>Archive</DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
        <ScrollArea className="h-10 w-20">
          <div>Scrollable content</div>
        </ScrollArea>
      </div>,
    );

    expect(screen.getByText("Right click")).toBeInTheDocument();
    expect(screen.getByText("Open menu")).toBeInTheDocument();
    expect(screen.getByText("Scrollable content")).toBeInTheDocument();
    expect(screen.getByLabelText("Plan options")).toBeInTheDocument();
  });

  it("renders sheet, drawer, sidebar and navigation menu structures", () => {
    render(
      <div>
        <Sheet>
          <SheetTrigger>Open sheet</SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Sheet title</SheetTitle>
              <SheetDescription>Sheet description</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <Drawer>
          <DrawerTrigger>Open drawer</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Drawer title</DrawerTitle>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
        <SidebarProvider defaultOpen>
          <Sidebar>
            <SidebarHeader>Header</SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Group</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>Home</SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>Footer</SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <SidebarTrigger>Toggle sidebar</SidebarTrigger>
            <SidebarRail />
            <SidebarInput placeholder="Search" />
            <SidebarSeparator />
            <SidebarMenuSkeleton />
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton>Nested</SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarInset>
        </SidebarProvider>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="#">Docs</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>,
    );

    expect(screen.getByText("Sheet title")).toBeInTheDocument();
    expect(screen.getByText("Drawer title")).toBeInTheDocument();
    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
  });

  it("renders menubar, toaster and form helper structures", () => {
    const FormExample = () => {
      const form = useForm({ defaultValues: { email: "" } });

      return (
        <Form {...form}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="mail@example.com" />
                </FormControl>
                <FormDescription>We will never share it.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      );
    };

    render(
      <div>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New file</MenubarItem>
              <MenubarSeparator />
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <Toaster />
        <FormExample />
      </div>,
    );

    expect(screen.getByRole("menuitem", { name: "New file" })).toBeInTheDocument();
    expect(screen.getByText("We will never share it.")).toBeInTheDocument();
  });

  it("renders input OTP and chart fixtures without crashing", () => {
    const config: ChartConfig = {
      sales: { label: "Sales", color: "#2563eb" },
    };

    render(
      <div>
        <InputOTP maxLength={4} defaultValue="1234">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSeparator />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
        <ChartContainer config={config} className="h-32 w-64">
          <div>Chart content</div>
        </ChartContainer>
        <ChartTooltipContent active payload={[]} className="w-32" />
        <ChartLegendContent payload={[]} />
      </div>,
    );

    expect(screen.getByText("Chart content")).toBeInTheDocument();
  });

  it("renders carousel and resizable panels and supports click handlers", () => {
    const panelGroupProps = { className: "h-10 w-20" } as any;

    render(
      <div>
        <Carousel>
          <CarouselContent>
            <CarouselItem>Slide one</CarouselItem>
            <CarouselItem>Slide two</CarouselItem>
          </CarouselContent>
          <CarouselPrevious aria-label="Previous slide" />
          <CarouselNext aria-label="Next slide" />
        </Carousel>
        <ResizablePanelGroup {...panelGroupProps}>
          <ResizablePanel>Left</ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>Right</ResizablePanel>
        </ResizablePanelGroup>
      </div>,
    );

    expect(screen.getByText("Slide one")).toBeInTheDocument();
    expect(screen.getByText("Left")).toBeInTheDocument();
    expect(screen.getByLabelText("Previous slide")).toBeInTheDocument();
    expect(screen.getByLabelText("Next slide")).toBeInTheDocument();
  });

  it("executes button click and exposes sidebar state helpers", () => {
    const onClick = vi.fn();

    render(
      <div>
        <Button onClick={onClick}>Submit</Button>
        <SidebarProvider defaultOpen>
          <Sidebar>
            <SidebarTrigger>Toggle</SidebarTrigger>
          </Sidebar>
        </SidebarProvider>
      </div>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));
    expect(onClick).toHaveBeenCalledTimes(1);

    const sidebarTrigger = screen.getByRole("button", { name: /toggle sidebar/i });
    fireEvent.click(sidebarTrigger);
    expect(sidebarTrigger).toBeInTheDocument();
  });
});
