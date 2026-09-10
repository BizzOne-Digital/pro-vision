import { Schema, models, model } from "mongoose";

export interface IService {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  image?: string;
  icon?: string;
  sortOrder: number;
  isActive: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    icon: { type: String, default: "Landmark" },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    seoTitle: { type: String },
    seoDescription: { type: String },
  },
  { timestamps: true }
);

export default models.Service || model<IService>("Service", ServiceSchema);
