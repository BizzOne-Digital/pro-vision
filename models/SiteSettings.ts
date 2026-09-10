import { Schema, models, model } from "mongoose";

export interface ISiteSettings {
  companyName: string;
  logoUrl?: string;
  email: string;
  phone: string;
  address?: string;
  serviceArea: string;
  nmlsNumber: string;
  facebookUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
  heroCtaText?: string;
  heroCtaUrl?: string;
  footerDescription?: string;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    companyName: { type: String, required: true, default: "Pro-Vision Team Funding Inc." },
    logoUrl: { type: String },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String },
    serviceArea: { type: String, required: true, default: "State of Florida" },
    nmlsNumber: { type: String, required: true, default: "1190997" },
    facebookUrl: { type: String },
    instagramUrl: { type: String },
    linkedinUrl: { type: String },
    youtubeUrl: { type: String },
    heroCtaText: { type: String },
    heroCtaUrl: { type: String },
    footerDescription: { type: String },
  },
  { timestamps: true }
);

export default models.SiteSettings || model<ISiteSettings>("SiteSettings", SiteSettingsSchema);
