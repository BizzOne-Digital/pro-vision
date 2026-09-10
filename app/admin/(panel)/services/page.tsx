"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import LocalImageField from "@/components/ui/LocalImageField";
import { ICON_KEYS } from "@/lib/icons";

interface ServiceItem {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  image?: string;
  icon: string;
  sortOrder: number;
  isActive: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

const EMPTY_FORM = {
  title: "",
  slug: "",
  shortDescription: "",
  description: "",
  image: "",
  icon: "Home",
  sortOrder: 0,
  isActive: true,
  seoTitle: "",
  seoDescription: "",
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<ServiceItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteTarget, setDeleteTarget] = useState<ServiceItem | null>(null);
  const [saving, setSaving] = useState(false);

  function loadServices() {
    setLoading(true);
    fetch("/api/admin/services")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setServices(data.services);
      })
      .finally(() => setLoading(false));
  }

  useEffect(loadServices, []);

  function openCreate() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  }

  function openEdit(service: ServiceItem) {
    setEditing(service);
    setForm({
      title: service.title,
      slug: service.slug,
      shortDescription: service.shortDescription,
      description: service.description,
      image: service.image || "",
      icon: service.icon,
      sortOrder: service.sortOrder,
      isActive: service.isActive,
      seoTitle: service.seoTitle || "",
      seoDescription: service.seoDescription || "",
    });
    setShowForm(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const url = editing ? `/api/admin/services/${editing._id}` : "/api/admin/services";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Save failed");
      toast.success(editing ? "Service updated" : "Service created");
      setShowForm(false);
      loadServices();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/admin/services/${deleteTarget._id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Delete failed");
      toast.success("Service deleted");
      setDeleteTarget(null);
      loadServices();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-[#102A43]">Services</h1>
          <p className="mt-1 text-sm text-[#627D98]">Manage financing services shown on the site.</p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-md bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-white"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add Service
        </button>
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-[#DCE8F0] bg-white">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#DCE8F0] bg-[#F7FAFC] text-[#627D98]">
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && services.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-[#627D98]">
                  No services yet.
                </td>
              </tr>
            )}
            {services.map((s) => (
              <tr key={s._id} className="border-b border-[#DCE8F0] last:border-0">
                <td className="px-4 py-3 text-[#627D98]">{s.sortOrder}</td>
                <td className="px-4 py-3 font-medium text-[#102A43]">{s.title}</td>
                <td className="px-4 py-3 text-[#627D98]">{s.slug}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      s.isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {s.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <button type="button" onClick={() => openEdit(s)} aria-label={`Edit ${s.title}`}>
                      <Pencil className="h-4 w-4 text-[#078BE7]" aria-hidden="true" />
                    </button>
                    <button type="button" onClick={() => setDeleteTarget(s)} aria-label={`Delete ${s.title}`}>
                      <Trash2 className="h-4 w-4 text-red-600" aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl font-semibold text-[#102A43]">
                {editing ? "Edit Service" : "Add Service"}
              </h2>
              <button type="button" onClick={() => setShowForm(false)} aria-label="Close">
                <X className="h-5 w-5 text-[#627D98]" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#102A43]">Title</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-md border border-[#DCE8F0] px-4 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#102A43]">Slug</label>
                <input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full rounded-md border border-[#DCE8F0] px-4 py-2.5 text-sm"
                  placeholder="auto-generated from title if left blank"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#102A43]">
                  Short Description
                </label>
                <textarea
                  value={form.shortDescription}
                  onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  rows={2}
                  className="w-full rounded-md border border-[#DCE8F0] px-4 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#102A43]">
                  Full Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={4}
                  className="w-full rounded-md border border-[#DCE8F0] px-4 py-2.5 text-sm"
                />
              </div>
              <LocalImageField
                label="Image"
                folder="products"
                value={form.image}
                onChange={(url) => setForm({ ...form, image: url })}
              />
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#102A43]">Icon</label>
                <select
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  className="w-full rounded-md border border-[#DCE8F0] px-4 py-2.5 text-sm"
                >
                  {ICON_KEYS.map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#102A43]">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={form.sortOrder}
                    onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
                    className="w-full rounded-md border border-[#DCE8F0] px-4 py-2.5 text-sm"
                  />
                </div>
                <div className="flex items-end gap-2 pb-2.5">
                  <input
                    type="checkbox"
                    id="svc-active"
                    checked={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                    className="h-4 w-4 rounded border-[#DCE8F0]"
                  />
                  <label htmlFor="svc-active" className="text-sm text-[#102A43]">
                    Active
                  </label>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#102A43]">SEO Title</label>
                <input
                  value={form.seoTitle}
                  onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
                  className="w-full rounded-md border border-[#DCE8F0] px-4 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#102A43]">
                  SEO Description
                </label>
                <textarea
                  value={form.seoDescription}
                  onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
                  rows={2}
                  className="w-full rounded-md border border-[#DCE8F0] px-4 py-2.5 text-sm"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-md border border-[#DCE8F0] px-4 py-2.5 text-sm font-medium text-[#102A43]"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={handleSave}
                className="rounded-md bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6">
            <h3 className="font-heading text-lg font-semibold text-[#102A43]">Delete Service</h3>
            <p className="mt-2 text-sm text-[#627D98]">
              Are you sure you want to delete &ldquo;{deleteTarget.title}&rdquo;? This cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="rounded-md border border-[#DCE8F0] px-4 py-2.5 text-sm font-medium text-[#102A43]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-md bg-red-600 px-4 py-2.5 text-sm font-semibold text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
