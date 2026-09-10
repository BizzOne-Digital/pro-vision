"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Eye, Trash2, X } from "lucide-react";

interface MessageItem {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service?: string;
  message: string;
  status: "new" | "read" | "resolved";
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<MessageItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MessageItem | null>(null);

  function load() {
    setLoading(true);
    fetch("/api/admin/messages")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setMessages(data.messages);
      })
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function updateStatus(id: string, status: string) {
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Update failed");
      toast.success("Status updated");
      load();
      setSelected((s) => (s && s._id === id ? { ...s, status: status as MessageItem["status"] } : s));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed");
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/admin/messages/${deleteTarget._id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Delete failed");
      toast.success("Message deleted");
      setDeleteTarget(null);
      setSelected(null);
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  }

  function openMessage(m: MessageItem) {
    setSelected(m);
    if (m.status === "new") updateStatus(m._id, "read");
  }

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-[#102A43]">Messages</h1>
      <p className="mt-1 text-sm text-[#627D98]">Contact form submissions from your website.</p>

      <div className="mt-8 overflow-x-auto rounded-xl border border-[#DCE8F0] bg-white">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#DCE8F0] bg-[#F7FAFC] text-[#627D98]">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Interest</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Received</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && messages.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-[#627D98]">
                  No messages yet.
                </td>
              </tr>
            )}
            {messages.map((m) => (
              <tr key={m._id} className="border-b border-[#DCE8F0] last:border-0">
                <td className="px-4 py-3 font-medium text-[#102A43]">{m.name}</td>
                <td className="px-4 py-3 text-[#627D98]">{m.email}</td>
                <td className="px-4 py-3 text-[#627D98]">{m.service || "—"}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      m.status === "new"
                        ? "bg-[#EFF7FC] text-[#078BE7]"
                        : m.status === "resolved"
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {m.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#627D98]">
                  {new Date(m.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <button type="button" onClick={() => openMessage(m)} aria-label={`View message from ${m.name}`}>
                      <Eye className="h-4 w-4 text-[#078BE7]" aria-hidden="true" />
                    </button>
                    <button type="button" onClick={() => setDeleteTarget(m)} aria-label={`Delete message from ${m.name}`}>
                      <Trash2 className="h-4 w-4 text-red-600" aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl font-semibold text-[#102A43]">
                Message from {selected.name}
              </h2>
              <button type="button" onClick={() => setSelected(null)} aria-label="Close">
                <X className="h-5 w-5 text-[#627D98]" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-5 space-y-3 text-sm">
              <p><span className="font-semibold text-[#102A43]">Email:</span> {selected.email}</p>
              <p><span className="font-semibold text-[#102A43]">Phone:</span> {selected.phone}</p>
              <p><span className="font-semibold text-[#102A43]">Interest:</span> {selected.service || "—"}</p>
              <p><span className="font-semibold text-[#102A43]">Received:</span> {new Date(selected.createdAt).toLocaleString()}</p>
              <div>
                <p className="font-semibold text-[#102A43]">Message:</p>
                <p className="mt-1 rounded-md bg-[#F7FAFC] p-3 text-[#627D98]">{selected.message}</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => updateStatus(selected._id, "read")}
                className="rounded-md border border-[#DCE8F0] px-3 py-2 text-xs font-medium text-[#102A43]"
              >
                Mark Read
              </button>
              <button
                type="button"
                onClick={() => updateStatus(selected._id, "resolved")}
                className="rounded-md border border-[#DCE8F0] px-3 py-2 text-xs font-medium text-[#102A43]"
              >
                Mark Resolved
              </button>
              <button
                type="button"
                onClick={() => updateStatus(selected._id, "new")}
                className="rounded-md border border-[#DCE8F0] px-3 py-2 text-xs font-medium text-[#102A43]"
              >
                Mark Unread
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6">
            <h3 className="font-heading text-lg font-semibold text-[#102A43]">Delete Message</h3>
            <p className="mt-2 text-sm text-[#627D98]">
              Are you sure you want to delete this message from &ldquo;{deleteTarget.name}&rdquo;?
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
