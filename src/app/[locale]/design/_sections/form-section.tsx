"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function FormSection() {
  return (
    <section id="form" className="space-y-4">
      <h2 className="text-2xl font-bold font-display tracking-tight text-foreground">
        Form Controls
      </h2>

      <div className="p-5 rounded-xl border border-border bg-card grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Standard Input */}
        <div className="space-y-2">
          <Label htmlFor="demo-name">Full Name (ชื่อ-นามสกุล)</Label>
          <Input id="demo-name" placeholder="John Doe" />
          <span className="text-xs text-muted-foreground">Standard text input with surface-sunken bg</span>
        </div>

        {/* Error Input */}
        <div className="space-y-2">
          <Label htmlFor="demo-email" className="text-destructive">
            Corporate Email (Invalid)
          </Label>
          <Input
            id="demo-email"
            aria-invalid="true"
            defaultValue="invalid-email-format"
          />
          <span className="text-xs text-destructive">
            กรุณาระบุที่อยู่อีเมลองค์กรที่ถูกต้อง (Error State)
          </span>
        </div>

        {/* Select */}
        <div className="space-y-2">
          <Label>Event Type (ประเภทงาน)</Label>
          <Select defaultValue="summit">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="summit">Technology Summit</SelectItem>
              <SelectItem value="roadshow">National Roadshow</SelectItem>
              <SelectItem value="seminar">Partner Seminar</SelectItem>
              <SelectItem value="workshop">Hands-on Workshop</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Checkbox with Label */}
        <div className="space-y-3 flex flex-col justify-center">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" defaultChecked />
            <Label htmlFor="terms" className="text-sm font-normal cursor-pointer">
              ยอมรับนโยบายคุ้มครองข้อมูลส่วนบุคคล (PDPA)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="newsletter" />
            <Label htmlFor="newsletter" className="text-sm font-normal cursor-pointer">
              Subscribe to tech event invitations & updates
            </Label>
          </div>
        </div>

        {/* Textarea */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="demo-brief">Project Brief (รายละเอียดโครงการ)</Label>
          <Textarea
            id="demo-brief"
            placeholder="Tell us about your event objectives, estimated attendees, and venue preferences..."
          />
        </div>
      </div>
    </section>
  );
}
