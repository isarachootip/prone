import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

export function CardsSection() {
  return (
    <section id="cards" className="space-y-4">
      <h2 className="text-2xl font-bold font-display tracking-tight text-foreground">
        Cards
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Standard Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="brand">Summit 2026</Badge>
              <span className="font-mono text-xs text-muted-foreground">15 MAR 2026</span>
            </div>
            <CardTitle className="text-xl font-display mt-2">
              Cloud Transformation Summit
            </CardTitle>
            <CardDescription>
              Standard Card component (flat border, rounded-xl, no shadow).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground-soft leading-relaxed">
              งานสัมมนาผู้นำทางเทคโนโลยีสำหรับองค์กรชั้นนำ เพื่ออัปเดตนวัตกรรมคลาวด์และความปลอดภัยไซเบอร์
            </p>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <span className="text-xs font-mono text-primary">BANGKOK, THAILAND</span>
            <Button size="sm">Register Free</Button>
          </CardFooter>
        </Card>

        {/* Interactive Card */}
        <Card interactive>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="outline">Case Study</Badge>
              <ArrowUpRight className="size-4 text-muted-foreground group-hover/card:text-primary transition-colors" />
            </div>
            <CardTitle className="text-xl font-display mt-2">
              Enterprise AI Roadshow Case
            </CardTitle>
            <CardDescription>
              Interactive Card (hover highlights border with border-strong).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground-soft leading-relaxed">
              การบริหารจัดการ Roadshow 5 จังหวัด พร้อมระบบลงทะเบียนผู้เข้าร่วมกว่า 2,000 ที่นั่ง
            </p>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <span className="text-xs font-mono text-muted-foreground">CLICK TO VIEW</span>
            <span className="text-xs font-mono text-primary font-semibold">VIEW DETAILS →</span>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
