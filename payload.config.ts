import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

import { Users } from "./src/payload/collections/Users";
import { Media } from "./src/payload/collections/Media";
import { Clients } from "./src/payload/collections/Clients";
import { Events } from "./src/payload/collections/Events";
import { CaseStudies } from "./src/payload/collections/CaseStudies";
import { Services } from "./src/payload/collections/Services";
import { SiteSettings } from "./src/payload/globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Clients, Events, CaseStudies, Services],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "prone-cms-development-secret-key-32chars",
  typescript: {
    outputFile: path.resolve(dirname, "src/payload/payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  localization: {
    locales: ["th", "en", "de", "zh", "ar"],
    defaultLocale: "th",
    fallback: true,
  },
  sharp,
});
