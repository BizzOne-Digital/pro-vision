import { Schema, models, model } from "mongoose";

export interface IPageContent {
  page: string; // "home" | "about" | "services" | "team" | "contact"
  heroEyebrow?: string;
  heroTitle?: string;
  heroHighlightedText?: string;
  heroDescription?: string;
  heroImage?: string;
  primaryCtaText?: string;
  primaryCtaUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  aboutTitle?: string;
  aboutDescription?: string;
  aboutImage?: string;
  whyChooseTitle?: string;
  whyChooseBackgroundImage?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaImage?: string;
}

const PageContentSchema = new Schema<IPageContent>(
  {
    page: { type: String, required: true, unique: true },
    heroEyebrow: String,
    heroTitle: String,
    heroHighlightedText: String,
    heroDescription: String,
    heroImage: String,
    primaryCtaText: String,
    primaryCtaUrl: String,
    secondaryCtaText: String,
    secondaryCtaUrl: String,
    aboutTitle: String,
    aboutDescription: String,
    aboutImage: String,
    whyChooseTitle: String,
    whyChooseBackgroundImage: String,
    ctaTitle: String,
    ctaDescription: String,
    ctaImage: String,
  },
  { timestamps: true }
);

export default models.PageContent || model<IPageContent>("PageContent", PageContentSchema);
