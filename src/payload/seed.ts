import { getPayload } from "payload";
import config from "@payload-config";
import { clients, events, caseStudies, services, siteConfig } from "@/content";

export async function seedDatabase() {
  const payload = await getPayload({ config });

  // 1. Seed Admin User
  const existingUsers = await payload.find({
    collection: "users",
    limit: 1,
  });

  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: "users",
      data: {
        email: "admin@prone.network",
        password: "Password123!",
        role: "admin",
      },
    });
    console.log("✓ Created initial admin user: admin@prone.network");
  }

  // 2. Seed Clients
  const existingClients = await payload.find({
    collection: "clients",
    limit: 1,
  });

  if (existingClients.totalDocs === 0) {
    for (const c of clients) {
      await payload.create({
        collection: "clients",
        data: {
          name: c.name,
          industry: c.industry,
        },
      });
    }
    console.log(`✓ Seeded ${clients.length} clients`);
  }

  // 3. Seed Events
  const existingEvents = await payload.find({
    collection: "events",
    limit: 1,
  });

  if (existingEvents.totalDocs === 0) {
    for (const e of events) {
      await payload.create({
        collection: "events",
        data: {
          slug: e.slug,
          title: e.title.th,
          type: e.type,
          date: e.date,
          venue: e.venue.th,
          client: e.client,
          summary: e.summary.th,
          registerUrl: e.registerUrl,
          status: e.status,
        },
      });
    }
    console.log(`✓ Seeded ${events.length} events`);
  }

  // 4. Seed Case Studies
  const existingCaseStudies = await payload.find({
    collection: "case-studies",
    limit: 1,
  });

  if (existingCaseStudies.totalDocs === 0) {
    for (const cs of caseStudies) {
      await payload.create({
        collection: "case-studies",
        data: {
          slug: cs.slug,
          title: cs.title,
          client: cs.client,
          year: cs.year,
          eventType: cs.eventType,
          challenge: cs.challenge.th,
          whatWeDid: cs.whatWeDid.th,
          results: cs.results.map((r) => ({
            label: r.label.th,
            value: r.value,
          })),
          featured: cs.featured,
        },
      });
    }
    console.log(`✓ Seeded ${caseStudies.length} case studies`);
  }

  // 5. Seed Services
  const existingServices = await payload.find({
    collection: "services",
    limit: 1,
  });

  if (existingServices.totalDocs === 0) {
    for (const s of services) {
      await payload.create({
        collection: "services",
        data: {
          id: s.id,
          title: s.title.th,
          description: s.description.th,
          items: s.items.th.map((text) => ({ text })),
        },
      });
    }
    console.log(`✓ Seeded ${services.length} services`);
  }

  // 6. Seed Site Settings Global
  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      companyName: siteConfig.companyName.th,
      foundedYear: siteConfig.foundedYear,
      address: siteConfig.address.th,
      contact: siteConfig.contact,
      social: siteConfig.social,
    },
  });
  console.log("✓ Seeded site-settings global");
}

if (process.argv[1]?.endsWith("seed.ts") || process.argv[1]?.endsWith("seed.js")) {
  seedDatabase()
    .then(() => {
      console.log("Seeding completed successfully.");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Seeding failed:", err);
      process.exit(1);
    });
}
