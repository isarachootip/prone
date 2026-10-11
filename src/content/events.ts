import type { Event } from "./types";

export const events: Event[] = [
  {
    slug: "upcoming-tech-summit-2026",
    title: {
      th: "[ชื่ออีเวนต์ 1]",
      en: "[Upcoming Event Title 1]",
    },
    type: "summit",
    date: "2026-11-15T09:00:00Z",
    venue: {
      th: "[สถานที่จัดงาน 1]",
      en: "[Event Venue 1]",
    },
    client: "[ลูกค้า]",
    summary: {
      th: "[สรุปรายละเอียดงานสัมมนาและเทคโนโลยีหลักที่นำเสนอ]",
      en: "[Summary of summit theme and featured keynote sessions]",
    },
    registerUrl: "[URL ลงทะเบียน]",
    status: "upcoming",
  },
  {
    slug: "enterprise-security-roadshow-2026",
    title: {
      th: "[ชื่ออีเวนต์ 2]",
      en: "[Upcoming Event Title 2]",
    },
    type: "roadshow",
    date: "2026-12-05T09:00:00Z",
    venue: {
      th: "[สถานที่จัดงาน 2]",
      en: "[Event Venue 2]",
    },
    client: "[ลูกค้า]",
    summary: {
      th: "[สรุปรายละเอียดโรดโชว์และการสาธิตโซลูชัน]",
      en: "[Summary of roadshow sessions and solution showcases]",
    },
    registerUrl: "[URL ลงทะเบียน]",
    status: "upcoming",
  },
  {
    slug: "cloud-ai-seminar-2027",
    title: {
      th: "[ชื่ออีเวนต์ 3]",
      en: "[Upcoming Event Title 3]",
    },
    type: "seminar",
    date: "2027-01-20T09:00:00Z",
    venue: {
      th: "[สถานที่จัดงาน 3]",
      en: "[Event Venue 3]",
    },
    client: "[ลูกค้า]",
    summary: {
      th: "[สรุปรายละเอียดสัมมนาองค์กร]",
      en: "[Summary of enterprise technology seminar]",
    },
    registerUrl: "[URL ลงทะเบียน]",
    status: "upcoming",
  },
  {
    slug: "cybersecurity-summit-2025",
    title: {
      th: "[ชื่ออีเวนต์ 2025]",
      en: "[Past Event Title 2025]",
    },
    type: "summit",
    date: "2025-08-14T09:00:00Z",
    venue: {
      th: "[สถานที่จัดงาน 2025]",
      en: "[Event Venue 2025]",
    },
    client: "[ลูกค้า 2025]",
    summary: {
      th: "[สรุปรายละเอียดงานประชุมไซเบอร์ซีเคียวริตี้]",
      en: "[Summary of past cybersecurity conference]",
    },
    status: "past",
  },
  {
    slug: "ai-workplace-roadshow-2024",
    title: {
      th: "[ชื่ออีเวนต์ 2024]",
      en: "[Past Event Title 2024]",
    },
    type: "roadshow",
    date: "2024-05-10T09:00:00Z",
    venue: {
      th: "[สถานที่จัดงาน 2024]",
      en: "[Event Venue 2024]",
    },
    client: "[ลูกค้า 2024]",
    summary: {
      th: "[สรุปรายละเอียดโรดโชว์ AI องค์กร]",
      en: "[Summary of past enterprise AI roadshow]",
    },
    status: "past",
  },
];
