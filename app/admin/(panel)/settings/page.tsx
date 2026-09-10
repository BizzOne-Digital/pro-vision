"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LocalImageField from "@/components/ui/LocalImageField";

interface SettingsForm {
  companyName: string;
  logoUrl: string;
  email: string;
  phone: string;
  address: string;
  serviceArea: string;
  nmlsNumber: string;
  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;
  heroCtaText: string;
  heroCtaUrl: string;
  footerDescription: string;
}

const EMPTY: SettingsForm = {
  companyName: "",
  logoUrl: "",
  email: "",
  phone: "",
  address: "",
  serviceArea: "",
  nmlsNumber: "",
  facebookUrl: "",
  instagramUrl: "",
  linkedinUrl: "",
  youtubeUrl: "",
  heroCtaText: "",
  heroCtaUrl: "",
  footerDescription: "",
};

export default function AdminSettingsPage() {
  const [form, setForm] = useState<SettingsForm>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setForm({ ...EMPTY, ...data.settings });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Save failed");
      toast.success("Settings saved");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-sm text-[#627D98]">Loading settings...</p>;
  }

  const fieldClass = "w-full rounded-md border border-[#DCE8F0] px-4 py-2.5 text-sm";
  const labelClass = "mb-1.5 block text-sm font-medium text-[#102A43]";

  return (
    <div className="max-w-3xl">
      <h1 className="font-heading text-2xl font-bold text-[#102A43]">Site Settings</h1>
      <p className="mt-1 text-sm text-[#627D98]">Global company and contact information.</p>

      <div className="mt-8 space-y-6 rounded-xl border border-[#DCE8F0] bg-white p-6">
        <div>
          <label className={labelClass}>Company Name</label>
          <input
            value={form.companyName}
            onChange={(e) => setForm({ ...form, companyName: e.target.value })}
            className={fieldClass}
          />
        </div>

        <LocalImageField
          label="Logo"
          folder="misc"
          value={form.logoUrl}
          onChange={(url) => setForm({ ...form, logoUrl: url })}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Email</label>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={fieldClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Service Area</label>
            <input
              value={form.serviceArea}
              onChange={(e) => setForm({ ...form, serviceArea: e.target.value })}
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>NMLS Number</label>
            <input
              value={form.nmlsNumber}
              onChange={(e) => setForm({ ...form, nmlsNumber: e.target.value })}
              className={fieldClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Address (optional)</label>
          <input
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className={fieldClass}
          />
        </div>

        <div>
          <label className={labelClass}>Footer Description</label>
          <textarea
            value={form.footerDescription}
            onChange={(e) => setForm({ ...form, footerDescription: e.target.value })}
            rows={3}
            className={fieldClass}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Hero CTA Text</label>
            <input
              value={form.heroCtaText}
              onChange={(e) => setForm({ ...form, heroCtaText: e.target.value })}
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>Hero CTA URL</label>
            <input
              value={form.heroCtaUrl}
              onChange={(e) => setForm({ ...form, heroCtaUrl: e.target.value })}
              className={fieldClass}
            />
          </div>
        </div>

        <h2 className="pt-2 font-heading text-lg font-semibold text-[#102A43]">
          Social Links (optional)
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Facebook URL</label>
            <input
              value={form.facebookUrl}
              onChange={(e) => setForm({ ...form, facebookUrl: e.target.value })}
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>Instagram URL</label>
            <input
              value={form.instagramUrl}
              onChange={(e) => setForm({ ...form, instagramUrl: e.target.value })}
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>LinkedIn URL</label>
            <input
              value={form.linkedinUrl}
              onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>YouTube URL</label>
            <input
              value={form.youtubeUrl}
              onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })}
              className={fieldClass}
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="button"
            disabled={saving}
            onClick={handleSave}
            className="rounded-md bg-gradient-primary px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </div>
    </div>
  );
}
