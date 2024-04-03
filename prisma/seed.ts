import { SeedService } from "@/lib/services/seed";

async function main() {
  console.log("Seeding...");

  await SeedService.seed();
}

main()
  .then(async () => {
    console.log("Done seeding.");
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });
