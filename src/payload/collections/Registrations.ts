import type { CollectionConfig } from "payload";

export const Registrations: CollectionConfig = {
  slug: "registrations",
  admin: {
    useAsTitle: "fullName",
    defaultColumns: ["fullName", "company", "email", "phone", "eventSlug", "createdAt"],
    description: "Event attendee registrations submitted via website",
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true,
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "eventSlug",
      type: "text",
      required: true,
      index: true,
    },
    {
      name: "fullName",
      type: "text",
      required: true,
    },
    {
      name: "company",
      type: "text",
      required: true,
    },
    {
      name: "jobTitle",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "phone",
      type: "text",
      required: true,
    },
    {
      name: "pdpaConsent",
      type: "checkbox",
      required: true,
      defaultValue: false,
    },
  ],
};
