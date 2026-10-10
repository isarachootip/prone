import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  fields: [
    {
      name: "companyName",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "foundedYear",
      type: "number",
      defaultValue: 2004,
      required: true,
    },
    {
      name: "address",
      type: "textarea",
      localized: true,
      required: true,
    },
    {
      name: "contact",
      type: "group",
      fields: [
        { name: "phone", type: "text", required: true },
        { name: "email", type: "text", required: true },
      ],
    },
    {
      name: "social",
      type: "group",
      fields: [
        { name: "line", type: "text", required: true },
        { name: "facebook", type: "text", required: true },
        { name: "linkedin", type: "text" },
        { name: "youtube", type: "text" },
        { name: "instagram", type: "text" },
      ],
    },
  ],
};
