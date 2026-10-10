"use client";

import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell, ChevronDown, Info } from "lucide-react";

export function PrimitivesSection() {
  return (
    <TooltipProvider>
      <section id="primitives" className="space-y-6">
        <h2 className="text-2xl font-bold font-display tracking-tight text-foreground">
          UI Primitives
        </h2>

        {/* Tabs */}
        <div className="p-5 rounded-xl border border-border bg-card space-y-3">
          <span className="font-mono text-xs text-muted-foreground uppercase">Tabs (Pill List)</span>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="agenda">Agenda</TabsTrigger>
              <TabsTrigger value="speakers">Speakers</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-3 text-sm text-foreground-soft">
              Overview tab content styled with PR One design tokens.
            </TabsContent>
            <TabsContent value="agenda" className="mt-3 text-sm text-foreground-soft">
              Schedule: 09:00 Registration · 10:00 Keynote · 12:00 Networking.
            </TabsContent>
            <TabsContent value="speakers" className="mt-3 text-sm text-foreground-soft">
              Industry leaders and enterprise technology experts.
            </TabsContent>
          </Tabs>
        </div>

        {/* Overlays & Triggers */}
        <div className="p-5 rounded-xl border border-border bg-card space-y-4">
          <span className="font-mono text-xs text-muted-foreground uppercase">
            Dialogs, Sheet, Dropdown, Toast & Tooltip
          </span>
          <div className="flex flex-wrap items-center gap-3">
            {/* Dialog */}
            <Dialog>
              <DialogTrigger className={buttonVariants({ variant: "outline" })}>
                Open Dialog
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Event Registration</DialogTitle>
                  <DialogDescription>
                    Fill in your company details to receive VIP pass confirmation.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-2 text-sm text-foreground-soft">
                  Modal content with surface backdrop (<code className="font-mono text-xs">bg-background/70</code>).
                </div>
              </DialogContent>
            </Dialog>

            {/* Sheet */}
            <Sheet>
              <SheetTrigger className={buttonVariants({ variant: "outline" })}>
                Open Sheet Drawer
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Navigation Menu</SheetTitle>
                  <SheetDescription>Mobile navigation drawer.</SheetDescription>
                </SheetHeader>
                <div className="py-4 space-y-3 text-sm text-foreground-soft">
                  <div>• Home</div>
                  <div>• Events & Summits</div>
                  <div>• Case Studies</div>
                  <div>• Contact Us</div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={buttonVariants({ variant: "outline" })}>
                <span>Actions</span>
                <ChevronDown className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Export Attendees</DropdownMenuItem>
                <DropdownMenuItem>Copy Event Link</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Cancel RSVP</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Tooltip */}
            <Tooltip>
              <TooltipTrigger
                className={buttonVariants({ variant: "ghost", size: "icon" })}
                aria-label="Information"
              >
                <Info className="size-4" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Tooltip text with token styling</p>
              </TooltipContent>
            </Tooltip>

            {/* Toast / Sonner */}
            <Button
              variant="secondary"
              onClick={() => toast.success("Event registration confirmed! See you in Bangkok.")}
            >
              <Bell className="size-4" />
              <span>Trigger Toast</span>
            </Button>
          </div>
        </div>

        {/* Accordion & Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-border bg-card space-y-3">
            <span className="font-mono text-xs text-muted-foreground uppercase">Accordion</span>
            <Accordion defaultValue={["faq-1"]}>
              <AccordionItem value="faq-1">
                <AccordionTrigger>งานจัดขึ้นที่ไหนและวันใด?</AccordionTrigger>
                <AccordionContent>
                  จัดขึ้นที่ศูนย์การประชุมแห่งชาติสิริกิติ์ วันที่ 15 มีนาคม 2026 เวลา 09:00 - 17:00 น.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger>มีค่าใช้จ่ายในการลงทะเบียนหรือไม่?</AccordionTrigger>
                <AccordionContent>
                  ไม่มีค่าใช้จ่ายสำหรับผู้เข้าร่วมกลุ่มธุรกิจและ IT Professional (ลงทะเบียนล่วงหน้า)
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="p-5 rounded-xl border border-border bg-card space-y-3">
            <span className="font-mono text-xs text-muted-foreground uppercase">Skeleton Loading</span>
            <div className="space-y-3">
              <Skeleton className="h-6 w-3/4 rounded-full" />
              <Skeleton className="h-4 w-full rounded-full" />
              <Skeleton className="h-4 w-5/6 rounded-full" />
              <div className="flex gap-2 pt-2">
                <Skeleton className="size-8 rounded-full" />
                <Skeleton className="h-8 w-24 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}
