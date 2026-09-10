import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import AdminUser from "../models/AdminUser";
import SiteSettings from "../models/SiteSettings";
import Service from "../models/Service";
import TeamMember from "../models/TeamMember";

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const DEFAULT_SERVICES = [
  {
    title: "Conventional Loans",
    slug: "conventional-loans",
    shortDescription: "Flexible mortgage options for qualified buyers seeking traditional home financing.",
    description: "Flexible mortgage options for qualified buyers seeking traditional home financing.",
    icon: "Landmark",
    sortOrder: 0,
  },
  {
    title: "FHA Loans",
    slug: "fha-loans",
    shortDescription: "Government-backed financing options designed to make homeownership more accessible for eligible buyers.",
    description: "Government-backed financing options designed to make homeownership more accessible for eligible buyers.",
    icon: "ShieldCheck",
    sortOrder: 1,
  },
  {
    title: "Reverse Mortgages",
    slug: "reverse-mortgages",
    shortDescription: "Explore home-equity-based financing options available to eligible homeowners.",
    description: "Explore home-equity-based financing options available to eligible homeowners.",
    icon: "RefreshCw",
    sortOrder: 2,
  },
  {
    title: "Non-QM Financing",
    slug: "non-qm-financing",
    shortDescription: "Alternative financing solutions for borrowers whose financial situation may not fit traditional mortgage qualification models.",
    description: "Alternative financing solutions for borrowers whose financial situation may not fit traditional mortgage qualification models.",
    icon: "FileText",
    sortOrder: 3,
  },
  {
    title: "Private Lender Financing",
    slug: "private-lender-financing",
    shortDescription: "Flexible private financing options for select real-estate and investment scenarios.",
    description: "Flexible private financing options for select real-estate and investment scenarios.",
    icon: "HandCoins",
    sortOrder: 4,
  },
  {
    title: "Refinancing",
    slug: "refinancing",
    shortDescription: "Review your current mortgage and explore refinancing options that may better align with your financial goals.",
    description: "Review your current mortgage and explore refinancing options that may better align with your financial goals.",
    icon: "KeyRound",
    sortOrder: 5,
  },
  {
    title: "Investment Property Financing",
    slug: "investment-property-financing",
    shortDescription: "Financing options for qualifying buyers purchasing rental and investment real estate.",
    description: "Financing options for qualifying buyers purchasing rental and investment real estate.",
    icon: "Building2",
    sortOrder: 6,
  },
  {
    title: "Free Consultation",
    slug: "free-consultation",
    shortDescription: "Discuss your goals with an experienced mortgage professional and explore potential financing paths.",
    description: "Discuss your goals with an experienced mortgage professional and explore potential financing paths.",
    icon: "MessageCircle",
    sortOrder: 7,
  },
];

async function seed() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is not set. Aborting seed.");
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB.");

  // AdminUser
  const existingAdminCount = await AdminUser.countDocuments();
  if (existingAdminCount === 0) {
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
      console.warn("ADMIN_EMAIL/ADMIN_PASSWORD not set. Skipping admin user creation.");
    } else {
      const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
      await AdminUser.create({ email: ADMIN_EMAIL.toLowerCase(), passwordHash });
      console.log(`Created admin user: ${ADMIN_EMAIL}`);
    }
  } else {
    console.log("Admin user already exists. Skipping.");
  }

  // SiteSettings
  const existingSettings = await SiteSettings.findOne();
  if (!existingSettings) {
    await SiteSettings.create({
      companyName: "Pro-Vision Team Funding Inc.",
      email: "john@pro-visionteam.com",
      phone: "5616990393",
      serviceArea: "State of Florida",
      nmlsNumber: "1190997",
    });
    console.log("Created default site settings.");
  } else {
    console.log("Site settings already exist. Skipping.");
  }

  // Services
  const existingServiceCount = await Service.countDocuments();
  if (existingServiceCount === 0) {
    await Service.insertMany(DEFAULT_SERVICES);
    console.log(`Created ${DEFAULT_SERVICES.length} default services.`);
  } else {
    console.log("Services already exist. Skipping.");
  }

  // TeamMember
  const existingTeamCount = await TeamMember.countDocuments();
  if (existingTeamCount === 0) {
    await TeamMember.create({
      name: "John Lodato",
      slug: "john-lodato",
      title: "Founder | Mortgage Professional",
      bio: "With nearly 40 years of experience in the mortgage industry, John Lodato has helped individuals and families throughout Florida purchase homes, refinance existing properties, and explore financing solutions aligned with their goals. His experience spans conventional financing, FHA programs, reverse mortgages, Non-QM solutions, and private financing.",
      nmlsNumber: "1190997",
      email: "john@pro-visionteam.com",
      phone: "5616990393",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&crop=faces&w=800&h=1000&q=80",
      sortOrder: 0,
    });
    console.log("Created default team member: John Lodato.");
  } else {
    console.log("Team members already exist. Skipping.");
  }

  await mongoose.disconnect();
  console.log("Seed complete.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
