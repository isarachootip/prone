import type { CollectionConfig } from "payload";

export const CaseStudies: CollectionConfig = {
  slug: "case-studies",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "client", "year", "eventType", "featured"],
  },
  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "client",
      type: "text",
      required: true,
    },
    {
      name: "year",
      type: "number",
      required: true,
    },
    {
      name: "eventType",
      type: "select",
      required: true,
      options: [
        { label: "Seminar", value: "seminar" },
        { label: "Summit", value: "summit" },
        { label: "Roadshow", value: "roadshow" },
        { label: "Workshop", value: "workshop" },
      ],
    },
    {
      name: "challenge",
      type: "textarea",
      localized: true,
      required: true,
    },
    {
      name: "whatWeDid",
      type: "textarea",
      localized: true,
      required: true,
    },
    {
      name: "results",
      type: "array",
      fields: [
        {
          name: "label",
          type: "text",
          localized: true,
          required: true,
        },
        {
          name: "value",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "gallery",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
    },
  ],
};
