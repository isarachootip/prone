#!/usr/bin/env node
/**
 * check-tokens — กันไม่ให้ใช้สีหรือค่าที่ไม่ได้มาจาก design token
 *
 * ใช้: node scripts/check-tokens.mjs [โฟลเดอร์ ...]   (ค่าเริ่มต้น: src)
 * ผลลัพธ์: exit 0 = ผ่าน, exit 1 = เจอการละเมิด (แสดงไฟล์:บรรทัด)
 *
 * ยกเว้นทั้งบรรทัดได้ด้วยคอมเมนต์ `token-ok: <เหตุผล>` (ผู้ดูแล DS ต้องอนุมัติ)
 * เช่น สีโลโก้ของ LINE / Facebook ที่ต้องตรงตามแบรนด์ของเขา
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname, relative } from "node:path";

const roots = process.argv.slice(2).length ? process.argv.slice(2) : ["src"];
const EXTS = new Set([".ts", ".tsx", ".js", ".jsx", ".mdx"]);
const SKIP_DIRS = new Set(["node_modules", ".next", "dist", "build", "coverage"]);

// Tailwind default palette names (ห้ามใช้ ให้ใช้ token แทน)
const PALETTE =
  "slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose";
const UTIL =
  "bg|text|border|ring|outline|fill|stroke|from|via|to|shadow|decoration|divide|placeholder|caret|accent";

const RULES = [
  {
    id: "hex-color",
    re: /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b(?![\w-])/g,
    msg: "ห้ามใส่สี hex ตรงๆ — ใช้ token เช่น bg-primary, text-muted-foreground",
  },
  {
    id: "color-function",
    re: /\b(?:rgb|rgba|hsl|hsla|oklch|oklab)\(/g,
    msg: "ห้ามใส่ฟังก์ชันสีตรงๆ — เพิ่มเป็น token ใน globals.css ก่อน (ผ่านผู้ดูแล DS)",
  },
  {
    id: "tailwind-palette",
    re: new RegExp(`\\b(?:${UTIL})-(?:${PALETTE})-\\d{2,3}\\b`, "g"),
    msg: "ห้ามใช้สี palette ของ Tailwind (เช่น bg-blue-500) — ใช้ token ของ PR One",
  },
  {
    id: "tailwind-arbitrary-color",
    re: new RegExp(`\\b(?:${UTIL})-\\[(?:#|rgb|hsl|oklch|color:)`, "g"),
    msg: "ห้ามใช้ arbitrary color เช่น bg-[#123456] — ใช้ token",
  },
  {
    id: "inline-font",
    re: /fontFamily\s*:|font-\[['"]?[A-Z]/g,
    msg: "ห้ามกำหนดฟอนต์เอง — ใช้ font-sans / font-display / font-mono",
  },
];

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    if (SKIP_DIRS.has(name)) continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (EXTS.has(extname(name))) out.push(p);
  }
  return out;
}

const violations = [];
for (const root of roots) {
  for (const file of walk(root)) {
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      if (/token-ok:/.test(line)) return;
      const trimmed = line.trim();
      if (trimmed.startsWith("//") || trimmed.startsWith("*")) return;
      for (const rule of RULES) {
        rule.re.lastIndex = 0;
        let m;
        while ((m = rule.re.exec(line))) {
          if (rule.id === "hex-color") {
            const before = line.slice(0, m.index);
            if (/(href|to|id)\s*=\s*\{?\s*["'`]$/.test(before)) continue; // href="#about"
          }
          violations.push({ file: relative(process.cwd(), file), line: i + 1, rule: rule.id, text: m[0], msg: rule.msg });
        }
      }
    });
  }
}

if (violations.length === 0) {
  console.log("✓ check-tokens: ไม่พบสีหรือฟอนต์ที่อยู่นอก design token");
  process.exit(0);
}

console.error(`✗ check-tokens: พบ ${violations.length} จุดที่ไม่ได้ใช้ design token\n`);
for (const v of violations) {
  console.error(`  ${v.file}:${v.line}  [${v.rule}]  ${v.text}\n    → ${v.msg}`);
}
console.error("\nแก้โดยใช้ token จาก src/app/globals.css (ดู design/tokens.md)");
console.error("ถ้าจำเป็นจริง ให้เติมคอมเมนต์ `token-ok: <เหตุผล>` ท้ายบรรทัด และให้ผู้ดูแล DS อนุมัติใน PR");
process.exit(1);
