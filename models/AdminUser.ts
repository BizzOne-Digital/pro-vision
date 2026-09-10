import { Schema, models, model } from "mongoose";

export interface IAdminUser {
  email: string;
  passwordHash: string;
  createdAt: Date;
}

const AdminUserSchema = new Schema<IAdminUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

export default models.AdminUser || model<IAdminUser>("AdminUser", AdminUserSchema);
