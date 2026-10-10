import type { CollectionConfig } from "payload";

export const Events: CollectionConfig = {
  slug: "events",
  admin: {
    useAsTitle: "slug",
    defaultColumns: ["slug", "type", "date", "status", "client"],
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
      localized: true,
      required: true,
    },
    {
      name: "type",
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
      name: "date",
      type: "date",
      required: true,
    },
    {
      name: "venue",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "client",
      type: "text",
      required: true,
    },
    {
      name: "summary",
      type: "textarea",
      localized: true,
      required: true,
    },
    {
      name: "registerUrl",
      type: "text",
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "upcoming",
      options: [
        { label: "Upcoming", value: "upcoming" },
        { label: "Past", value: "past" },
      ],
    },
    {
      name: "cover",
      type: "upload",
      relationTo: "media",
    },
  ],
};
