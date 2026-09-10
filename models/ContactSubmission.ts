import { Schema, models, model } from "mongoose";

export interface IContactSubmission {
  name: string;
  email: string;
  phone: string;
  service?: string;
  message: string;
  consent?: boolean;
  status: "new" | "read" | "resolved";
  createdAt: Date;
}

const ContactSubmissionSchema = new Schema<IContactSubmission>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String },
    message: { type: String, required: true },
    consent: { type: Boolean, default: false },
    status: { type: String, enum: ["new", "read", "resolved"], default: "new" },
  },
  { timestamps: true }
);

export default models.ContactSubmission ||
  model<IContactSubmission>("ContactSubmission", ContactSubmissionSchema);
