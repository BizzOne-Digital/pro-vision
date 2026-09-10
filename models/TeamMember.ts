import { Schema, models, model } from "mongoose";

export interface ITeamMember {
  name: string;
  slug: string;
  title: string;
  bio: string;
  image?: string;
  email?: string;
  phone?: string;
  nmlsNumber?: string;
  linkedinUrl?: string;
  sortOrder: number;
  isActive: boolean;
}

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    bio: { type: String, required: true },
    image: { type: String },
    email: { type: String },
    phone: { type: String },
    nmlsNumber: { type: String },
    linkedinUrl: { type: String },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default models.TeamMember || model<ITeamMember>("TeamMember", TeamMemberSchema);
