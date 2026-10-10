import type { Service } from "./types";

export const services: Service[] = [
  {
    id: "event-management",
    title: {
      th: "การบริหารจัดการอีเวนต์ (Event Management)",
      en: "Event Management",
    },
    description: {
      th: "วางแผนและจัดงานอีเวนต์ระดับองค์กร สัมมนาเชิงเทคโนโลยี งานสัมมนาสุดยอด และโรดโชว์ทั่วประเทศอย่างครบวงจร",
      en: "End-to-end planning and execution for enterprise technology summits, conferences, and roadshows.",
    },
    items: {
      th: [
        "วางแผนกลยุทธ์และคอนเซปต์งาน",
        "จัดหาสถานที่และบริหารจัดการหน้างาน",
        "ระบบลงทะเบียนและต้อนรับผู้บริหาร",
        "การประสานงานวิทยากรและผู้สนับสนุน",
      ],
      en: [
        "Event concept & strategic planning",
        "Venue sourcing & on-site production",
        "VIP guest & registration workflows",
        "Speaker and sponsor coordination",
      ],
    },
  },
  {
    id: "pr-media-relations",
    title: {
      th: "ประชาสัมพันธ์และการสื่อสารมวลชน (PR & Media Relations)",
      en: "PR & Media Relations",
    },
    description: {
      th: "สร้างความน่าเชื่อถือและการรับรู้ของแบรนด์ผ่านเครือข่ายสื่อมวลชนสายไอที ธุรกิจ และเทคโนโลยีชั้นนำ",
      en: "Building brand authority and earned media coverage across top-tier enterprise tech publications.",
    },
    items: {
      th: [
        "การจัดงานแถลงข่าวและสัมภาษณ์ผู้บริหาร",
        "การเขียนและเผยแพร่ข่าวประชาสัมพันธ์",
        "การบริหารจัดการสื่อมวลชนสัมพันธ์",
        "การติดตามและวัดผลการรายงานข่าว",
      ],
      en: [
        "Press conferences & executive interviews",
        "Press release drafting & wire distribution",
        "Media relationship management",
        "Media monitoring and clipping reports",
      ],
    },
  },
  {
    id: "marketing-campaign",
    title: {
      th: "แคมเปญการตลาดดิจิทัล (Marketing Campaign)",
      en: "Marketing Campaign",
    },
    description: {
      th: "ออกแบบและขับเคลื่อนแคมเปญการตลาดทั้งออนไลน์และออฟไลน์เพื่อสร้างการมีส่วนร่วมและผลลัพธ์ทางธุรกิจ",
      en: "Integrated digital and physical marketing campaigns tailored to tech decision-makers.",
    },
    items: {
      th: [
        "การวางแผนกลยุทธ์แคมเปญรอบด้าน",
        "สื่อโฆษณาดิจิทัลเพื่อโปรโมตอีเวนต์",
        "กิจกรรมสร้างการมีส่วนร่วมก่อนและหลังงาน",
      ],
      en: [
        "Multi-channel campaign strategy",
        "Targeted digital advertising for events",
        "Pre-and-post event audience engagement",
      ],
    },
  },
  {
    id: "lead-generation-database",
    title: {
      th: "การสร้างฐานข้อมูลและลีดคุณภาพ (Lead Generation & Database)",
      en: "Lead Generation & Database",
    },
    description: {
      th: "เข้าถึงกลุ่มเป้าหมายระดับผู้บริหารและผู้ตัดสินใจในองค์กรเพื่อต่อยอดเป็นโอกาสทางธุรกิจจริง",
      en: "Reaching C-level executives and enterprise IT leaders to drive verified business pipeline.",
    },
    items: {
      th: [
        "การคัดกรองกลุ่มเป้าหมาย B2B แม่นยำ",
        "การเชิญผู้บริหารร่วมงานสัมมนาเฉพาะกลุ่ม",
        "การบริหารจัดการฐานข้อมูลตามมาตรฐาน PDPA",
      ],
      en: [
        "Targeted B2B persona segmentation",
        "Executive roundtable audience acquisition",
        "PDPA-compliant database management",
      ],
    },
  },
  {
    id: "creative-content",
    title: {
      th: "งานสร้างสรรค์และคอนเทนต์ (Creative & Content)",
      en: "Creative & Content",
    },
    description: {
      th: "ถ่ายทอดข้อความทางเทคโนโลยีที่ซับซ้อนให้เข้าใจง่ายและน่าสนใจ ผ่านงานดีไซน์ วิดีโอ และสื่อนำเสนอ",
      en: "Transforming complex technology narratives into engaging keynotes, stage visuals, and videos.",
    },
    items: {
      th: [
        "ออกแบบ Key Visual และธีมอีเวนต์",
        "การผลิตสื่อวิดีโอและโมชันกราฟิก",
        "ออกแบบสไลด์พรีเซนเทชันระดับผู้บริหาร",
      ],
      en: [
        "Key visual & event branding design",
        "Video production & motion graphics",
        "Executive keynote presentation design",
      ],
    },
  },
];
