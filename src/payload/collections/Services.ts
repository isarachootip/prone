import type { CollectionConfig } from "payload";

export const Services: CollectionConfig = {
  slug: "services",
  admin: {
    useAsTitle: "id",
  },
  fields: [
    {
      name: "id",
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
      name: "description",
      type: "textarea",
      localized: true,
      required: true,
    },
    {
      name: "items",
      type: "array",
      fields: [
        {
          name: "text",
          type: "text",
          localized: true,
          required: true,
        },
      ],
    },
  ],
};
