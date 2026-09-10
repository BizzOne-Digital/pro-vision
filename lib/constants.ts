export const ALLOWED_UPLOAD_FOLDERS = ["products", "gallery", "pages", "misc"] as const;
export type UploadFolder = (typeof ALLOWED_UPLOAD_FOLDERS)[number];

export const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
export const MAX_UPLOAD_SIZE_BYTES = 8 * 1024 * 1024; // 8MB

export const COMPANY = {
  name: "Pro-Vision Team Funding Inc.",
  contactName: "John Lodato",
  email: "john@pro-visionteam.com",
  phone: "5616990393",
  phoneFormatted: "(561) 699-0393",
  nmls: "1190997",
  serviceArea: "State of Florida",
  headline: "Your Financing Done Right.",
};

export const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";
