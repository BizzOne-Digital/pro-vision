"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import LocalImageField from "@/components/ui/LocalImageField";

interface TeamItem {
  _id: string;
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

const EMPTY_FORM = {
  name: "",
  slug: "",
  title: "",
  bio: "",
  image: "",
  email: "",
  phone: "",
  nmlsNumber: "",
  linkedinUrl: "",
  sortOrder: 0,
  isActive: true,
};

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<TeamItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteTarget, setDeleteTarget] = useState<TeamItem | null>(null);
  const [saving, setSaving] = useState(false);

  function loadTeam() {
    setLoading(true);
    fetch("/api/admin/team")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setTeam(data.team);
      })
      .finally(() => setLoading(false));
  }

  useEffect(loadTeam, []);

  function openCreate() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  }

  function openEdit(member: TeamItem) {
    setEditing(member);
    setForm({
      name: member.name,
      slug: member.slug,
      title: member.title,
      bio: member.bio,
      image: member.image || "",
      email: member.email || "",
      phone: member.phone || "",
      nmlsNumber: member.nmlsNumber || "",
      linkedinUrl: member.linkedinUrl || "",
      sortOrder: member.sortOrder,
      isActive: member.isActive,
    });
    setShowForm(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const url = editing ? `/api/admin/team/${editing._id}` : "/api/admin/team";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Save failed");
      toast.success(editing ? "Team member updated" : "Team member created");
      setShowForm(false);
      loadTeam();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/admin/team/${deleteTarget._id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Delete failed");
      toast.success("Team member deleted");
      setDeleteTarget(null);
      loadTeam();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-[#102A43]">Team</h1>
          <p className="mt-1 text-sm text-[#627D98]">Manage team members shown on the site.</p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-md bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-white"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add Team Member
        </button>
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-[#DCE8F0] bg-white">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#DCE8F0] bg-[#F7FAFC] text-[#627D98]">
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && team.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-[#627D98]">
                  No team members yet.
                </td>
              </tr>
            )}
            {team.map((m) => (
              <tr key={m._id} className="border-b border-[#DCE8F0] last:border-0">
                <td className="px-4 py-3 text-[#627D98]">{m.sortOrder}</td>
                <td className="px-4 py-3 font-medium text-[#102A43]">{m.name}</td>
                <td className="px-4 py-3 text-[#627D98]">{m.title}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      m.isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {m.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <button type="button" onClick={() => openEdit(m)} aria-label={`Edit ${m.name}`}>
                      <Pencil className="h-4 w-4 text-[#078BE7]" aria-hidden="true" />
                    </button>
                    <button type="button" onClick={() => setDeleteTarget(m)} aria-label={`Delete ${m.name}`}>
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
                {editing ? "Edit Team Member" : "Add Team Member"}
              </h2>
              <button type="button" onClick={() => setShowForm(false)} aria-label="Close">
                <X className="h-5 w-5 text-[#627D98]" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#102A43]">Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-md border border-[#DCE8F0] px-4 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#102A43]">Slug</label>
                <input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full rounded-md border border-[#DCE8F0] px-4 py-2.5 text-sm"
                  placeholder="auto-generated from name if left blank"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#102A43]">Title</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-md border border-[#DCE8F0] px-4 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#102A43]">Bio</label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  rows={4}
                  className="w-full rounded-md border border-[#DCE8F0] px-4 py-2.5 text-sm"
                />
              </div>
              <LocalImageField
                label="Photo"
                folder="products"
                value={form.image}
                onChange={(url) => setForm({ ...form, image: url })}
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#102A43]">Email</label>
                  <input
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-md border border-[#DCE8F0] px-4 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#102A43]">Phone</label>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full rounded-md border border-[#DCE8F0] px-4 py-2.5 text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#102A43]">
                    NMLS Number
                  </label>
                  <input
                    value={form.nmlsNumber}
                    onChange={(e) => setForm({ ...form, nmlsNumber: e.target.value })}
                    className="w-full rounded-md border border-[#DCE8F0] px-4 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#102A43]">
                    LinkedIn URL
                  </label>
                  <input
                    value={form.linkedinUrl}
                    onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
                    className="w-full rounded-md border border-[#DCE8F0] px-4 py-2.5 text-sm"
                  />
                </div>
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
                    id="team-active"
                    checked={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                    className="h-4 w-4 rounded border-[#DCE8F0]"
                  />
                  <label htmlFor="team-active" className="text-sm text-[#102A43]">
                    Active
                  </label>
                </div>
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
            <h3 className="font-heading text-lg font-semibold text-[#102A43]">Delete Team Member</h3>
            <p className="mt-2 text-sm text-[#627D98]">
              Are you sure you want to delete &ldquo;{deleteTarget.name}&rdquo;? This cannot be undone.
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
