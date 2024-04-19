import { prismaClient } from "@/lib/prisma-client";
import { UserService } from "@/lib/services/user";
import { faker } from "@faker-js/faker";

export class SeedService {
  static async seed() {
    const user = await this.upsertUser();

    await this.reseed({ userId: user.id });
  }

  static async reseed({ userId }: { userId: string }) {
    await this.upsertAttributes(userId);
    await this.upsertCategories(userId);
    await this.upsertSuppliers(userId);
    await this.upsertProducts(userId);
  }

  static async upsertAttributes(userId: string) {
    const attrs = [
      {
        externalAttributeId: "abcdef123",
        name: "Large",
        value: "10",
        unit: "meter",
      },
      {
        externalAttributeId: "abcdef125",
        name: "Medium",
        value: "7",
        unit: "meter",
      },
      {
        externalAttributeId: "abcdef124",
        name: "Small",
        value: "5",
        unit: "meter",
      },
    ];

    for (const a of attrs) {
      await prismaClient.attribute.upsert({
        where: {
          userId_externalAttributeId: {
            userId,
            externalAttributeId: a.externalAttributeId,
          },
        },
        create: {
          ...a,
          userId,
        },
        update: {
          ...a,
          userId,
        },
      });
    }
  }

  static async upsertCategories(userId: string) {
    const attrs = [
      {
        externalCategoryId: "1001",
        name: "Refrigerators",
        description:
          "Includes a variety of refrigerators such as single-door, double-door, side-by-side, and compact models, suitable for different household sizes and preferences.",
      },
      {
        externalCategoryId: "1002",
        name: "Washing Machines",
        description:
          "Features a range of washing machines including high-efficiency front loaders, top loaders with advanced features, and compact models for small spaces.",
      },
      {
        externalCategoryId: "1003",
        name: "Dryers",
        description:
          "Covers all types of clothes dryers, including electric and gas models, with features like moisture sensors and energy-efficient technologies.",
      },
      {
        externalCategoryId: "1004",
        name: "Televisions",
        description:
          "Offers a variety of televisions, from ultra-high-definition 4K TVs to smart TVs that connect to the internet and support apps.",
      },
      {
        externalCategoryId: "1005",
        name: "Dishwashers",
        description:
          "From built-in to freestanding models, this category includes energy-efficient dishwashers with various washing cycles.",
      },
      {
        externalCategoryId: "1006",
        name: "Stoves and Ranges",
        description:
          "Includes gas, electric, and induction stoves, as well as ranges with multiple burners and oven combinations.",
      },
      {
        externalCategoryId: "1007",
        name: "Microwaves",
        description:
          "Features microwaves of all types, including countertop models, over-the-range units, and built-in versions that fit seamlessly into kitchen cabinetry.",
      },
      {
        externalCategoryId: "1008",
        name: "Vacuum Cleaners",
        description:
          "Offers vacuums from robotic models that navigate your home autonomously to powerful uprights and handy handhelds for quick cleanups.",
      },
      {
        externalCategoryId: "1009",
        name: "Coffee Makers",
        description:
          "This category includes everything from basic drip coffee makers to elaborate espresso machines and modern single-serve brewers.",
      },
      {
        externalCategoryId: "1010",
        name: "Blenders",
        description:
          "Covers a wide range of blenders, suitable for everything from smoothie making to pureeing soups, including high-powered and immersion models.",
      },
      {
        externalCategoryId: "1011",
        name: "Air Conditioners",
        description:
          "Includes portable air conditioners, window units, and split system models to cool rooms during hot weather.",
      },
      {
        externalCategoryId: "1012",
        name: "Heaters",
        description:
          "Features a variety of heating options, including portable space heaters, radiant heaters, and wall-mounted electric heaters.",
      },
      {
        externalCategoryId: "1013",
        name: "Fans",
        description:
          "Includes ceiling fans, oscillating stand fans, and compact desk fans to provide air circulation and cooling in various settings.",
      },
      {
        externalCategoryId: "1014",
        name: "Toasters and Ovens",
        description:
          "From basic two-slice toasters to multi-function toaster ovens capable of baking and broiling.",
      },
      {
        externalCategoryId: "1015",
        name: "Food Processors,
        description:
          "Features food processors of all sizes, from small choppers to large-capacity units, suitable for slicing, dicing, and mixing.",
      },
      {
        externalCategoryId: "1016",
        name: "Irons and Steamers",
        description:
          "Includes traditional steam irons, travel-friendly compact models, and standing garment steamers for removing wrinkles.",
      },
      {
        externalCategoryId: "1017",
        name: "Lighting",
        description:
          "Offers a variety of lighting solutions, including energy-efficient LED bulbs, smart lighting systems that can be controlled remotely, and decorative fixtures.",
      },
      {
        externalCategoryId: "1018",
        name: "Security Systems",
        description:
          "Covers everything from basic window alarms to full home security systems with cameras, motion detectors, and smart home integration.",
      },
      {
        externalCategoryId: "1019",
        name: "Health and Wellness",
        description:
          "Includes air purifiers to improve indoor air quality, humidifiers to add moisture to the air, and dehumidifiers to reduce excess humidity.",
      },
      {
        externalCategoryId: "1020",
        name: "Outdoor Grills",
        description:
          "Features a range of outdoor cooking options, including traditional charcoal grills, versatile gas grills, and modern electric models.",
      },
    ];

    for (const a of attrs) {
      await prismaClient.category.upsert({
        where: {
          userId_externalCategoryId: {
            userId,
            externalCategoryId: a.externalCategoryId,
          },
        },
        create: {
          ...a,
          userId,
        },
        update: {
          ...a,
          userId,
        },
      });
    }
  }

  static async upsertSuppliers(userId: string) {
    const attrs = [
      {
        externalSupplierId: "3001",
        name: "Apex Electronicsinfo@apexelectronics.com",
        phone: "(650) 555-9409",
        address: "123 Tech Park Blvd",
        city: "Silicon Valley",
        state: "CA",
        country: "USA",
      },
      {
        externalSupplierId: "3002",
        name: "Home Comfort Systemsinfo@homecomfortsystems.com",
        phone: "(650) 555-3634",
        address: "654 Home Lane",
        city: "Silicon Valley",
        state: "CA",
        country: "USA",
      },
      {
        externalSupplierId: "3003",
        name: "Outdoor Tech Suppliesinfo@outdoortechsupplies.com",
        phone: "(650) 555-5789",
        address: "28 Outdoor Ave",
        city: "Silicon Valley",
        state: "CA",
        country: "USA",
      },
      {
        externalSupplierId: "3004",
        name: "Urban Fashion Appliancesinfo@urbanfashionappliances.com",
        phone: "(650) 555-6812",
        address: "1554 Fashion Way",
        city: "Silicon Valley",
        state: "CA",
        country: "USA",
      },
      {
        externalSupplierId: "3005",
        name: "Health Home Solutionsinfo@healthhomesolutions.com",
        phone: "(650) 555-2890",
        address: "6554 Wellness Drive",
        city: "Silicon Valley",
        state: "CA",
        country: "USA",
      },
      {
        externalSupplierId: "3006",
        name: "Kitchen Experts Incinfo@kitchenexpertsinc.com",
        phone: "(312) 555-6811",
        address: "148 Kitchen Ct",
        city: "Chicago",
        state: "IL",
        country: "USA",
      },
      {
        externalSupplierId: "3007",
        name: "Cozy Home Appliancesinfo@cozyhomeappliances.com",
        phone: "(312) 555-3772",
        address: "3658 Comfort Rd",
        city: "Chicago",
        state: "IL",
        country: "USA",
      },
      {
        externalSupplierId: "3008",
        name: "Smart Tech Gearinfo@smarttechgear.com",
        phone: "(312) 555-3106",
        address: "14 Gadget St",
        city: "Chicago",
        state: "IL",
        country: "USA",
      },
      {
        externalSupplierId: "3009",
        name: "Efficient Energy Systemsinfo@efficientenergysystems.com",
        phone: "(312) 555-4222",
        address: "125 Energy Blvd",
        city: "Chicago",
        state: "IL",
        country: "USA",
      },
      {
        externalSupplierId: "3010",
        name: "Premium Kitchen Suppliesinfo@premiumkitchensupplies.com",
        phone: "(312) 555-9311",
        address: "9878 Culinary Lane",
        city: "Chicago",
        state: "IL",
        country: "USA",
      },
      {
        externalSupplierId: "3011",
        name: "Reliable Appliance Partnersinfo@reliableappliancepartners.com",
        phone: "(303) 555-1495",
        address: "324 Partner Pkwy",
        city: "Boulder",
        state: "CO",
        country: "USA",
      },
      {
        externalSupplierId: "3012",
        name: "Eco Friendly Equipmentsinfo@ecofriendlyequipments.com",
        phone: "(303) 555-9882",
        address: "3 Eco Trail",
        city: "Boulder",
        state: "CO",
        country: "USA",
      },
      {
        externalSupplierId: "3013",
        name: "Tech Innovators Ltdinfo@techinnovatorsltd.com",
        phone: "(212) 555-7201",
        address: "215 Innovation WayNew",
        city: "York",
        state: "NY",
        country: "USA",
      },
      {
        externalSupplierId: "3014",
        name: "Family Appliance Martinfo@familyappliancemart.com",
        phone: "(212) 555-1539",
        address: "45 Family StNew",
        city: "York",
        state: "NY",
        country: "USA",
      },
      {
        externalSupplierId: "3015",
        name: "Compact Home Solutionsinfo@compacthomesolutions.com",
        phone: "(212) 555-4422",
        address: "489 Compact BlvdNew",
        city: "York",
        state: "NY",
        country: "USA",
      },
      {
        externalSupplierId: "3016",
        name: "Luxury Appliance Studioinfo@luxuryappliancestudio.com",
        phone: "(415) 555-1266",
        address: "699 Luxury LaneSan",
        city: "Francisco",
        state: "CA",
        country: "USA",
      },
      {
        externalSupplierId: "3017",
        name: "Quick Fix Appliancesinfo@quickfixappliances.com",
        phone: "(415) 555-4372",
        address: "123 Quick StSan",
        city: "Francisco",
        state: "CA",
        country: "USA",
      },
      {
        externalSupplierId: "3018",
        name: "Budget Appliances Coinfo@budgetappliancesco.com",
        phone: "(415) 555-9265",
        address: "15 Budget BlvdSan",
        city: "Francisco",
        state: "CA",
        country: "USA",
      },
      {
        externalSupplierId: "3019",
        name: "Elite Home Productsinfo@elitehomeproducts.com",
        phone: "(415) 555-7444",
        address: "6485 Elite RdSan",
        city: "Francisco",
        state: "CA",
        country: "USA",
      },
      {
        externalSupplierId: "3020",
        name: "Household Utility Providersinfo@householdutilityproviders.com",
        phone: "(415) 555-3014",
        address: "258 Utility AveSan",
        city: "Francisco",
        state: "CA",
        country: "USA",
      },
    ];

    for (const a of attrs) {
      await prismaClient.supplier.upsert({
        where: {
          userId_externalSupplierId: {
            userId,
            externalSupplierId: a.externalSupplierId,
          },
        },
        create: {
          ...a,
          userId,
        },
        update: {
          ...a,
          userId,
        },
      });
    }
  }

  static async getRandomCategoryId(userId: string) {
    const categories = await prismaClient.category.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    });

    const randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex].id;
  }

  static async getRandomSupplierId(userId: string) {
    const suppliers = await prismaClient.supplier.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    });

    const randomIndex = Math.floor(Math.random() * suppliers.length);
    return suppliers[randomIndex].id;
  }

  static async upsertProducts(userId: string) {
    const attrs = [
      {
        externalProductId: "prod100",
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: 100,
        quantity: 1,
        imageUrl: "https://loremflickr.com/100/100?lock=7826533007753216",
        supplierId: await this.getRandomSupplierId(userId), // Random supplier
        categoryId: await this.getRandomCategoryId(userId), // Random category
      },
      {
        externalProductId: "prod200",
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: 100,
        quantity: 1,
        imageUrl: "https://loremflickr.com/100/100?lock=7826533007753216",
        supplierId: await this.getRandomSupplierId(userId), // Random supplier
        categoryId: await this.getRandomCategoryId(userId), // Random category
      },
      {
        externalProductId: "prod300",
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: 100,
        quantity: 1,
        imageUrl: "https://loremflickr.com/100/100?lock=7826533007753216",
        supplierId: await this.getRandomSupplierId(userId), // Random supplier
        categoryId: await this.getRandomCategoryId(userId), // Random category
      },
      {
        externalProductId: "prod400",
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: 100,
        quantity: 1,
        imageUrl: "https://loremflickr.com/100/100?lock=7826533007753216",
        supplierId: await this.getRandomSupplierId(userId), // Random supplier
        categoryId: await this.getRandomCategoryId(userId), // Random category
      },
      {
        externalProductId: "prod500",
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: 100,
        quantity: 1,
        imageUrl: "https://loremflickr.com/100/100?lock=7826533007753216",
        supplierId: await this.getRandomSupplierId(userId), // Random supplier
        categoryId: await this.getRandomCategoryId(userId), // Random category
      },
    ];

    for (const a of attrs) {
      await prismaClient.product.upsert({
        where: {
          userId_externalProductId: {
            userId,
            externalProductId: a.externalProductId,
          },
        },
        create: {
          ...a,
          userId,
        },
        update: {
          ...a,
          userId,
        },
      });
    }
  }

  private static async upsertUser() {
    const data = {
      email: "test@test.com",
      password: await UserService.hashPassword("asdfasdf"),
      firstName: "Jimmy",
      lastName: "Smith",
      companyName: "Test Corp United",
    };

    const user = await prismaClient.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (user) {
      return user;
    }

    return await prismaClient.user.upsert({
      where: {
        email: data.email,
      },
      create: data,
      update: data,
    });
  }
}
