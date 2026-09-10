"use client";

import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";
import type { UploadFolder } from "@/lib/constants";

interface LocalImageFieldProps {
  value?: string;
  onChange: (url: string) => void;
  folder: UploadFolder;
  label?: string;
}

interface UploadResponse {
  success: boolean;
  url?: string;
  error?: string;
}

export default function LocalImageField({ value, onChange, folder, label }: LocalImageFieldProps) {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data: UploadResponse = await res.json();
      if (!res.ok || !data.success || !data.url) {
        throw new Error(data.error || "Upload failed");
      }
      onChange(data.url);
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      {label && <label className="mb-2 block text-sm font-medium text-[#102A43]">{label}</label>}
      <div className="flex items-center gap-4">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#DCE8F0] bg-[#EFF7FC]">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="Preview" className="h-full w-full object-cover" />
          ) : (
            <ImageIcon className="h-8 w-8 text-[#627D98]" aria-hidden="true" />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
          <button
            type="button"
            disabled={loading}
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-md border border-[#DCE8F0] bg-white px-3 py-2 text-sm font-medium text-[#102A43] hover:bg-[#EFF7FC] disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Upload className="h-4 w-4" aria-hidden="true" />
            )}
            {value ? "Replace" : "Upload"}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="inline-flex items-center gap-2 rounded-md border border-[#DCE8F0] bg-white px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
