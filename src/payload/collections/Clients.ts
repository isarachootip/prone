import type { CollectionConfig } from "payload";

export const Clients: CollectionConfig = {
  slug: "clients",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "industry"],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "industry",
      type: "select",
      required: true,
      options: [
        { label: "Technology", value: "tech" },
        { label: "Enterprise", value: "enterprise" },
        { label: "Government", value: "government" },
        { label: "Consumer", value: "consumer" },
      ],
    },
  ],
};
