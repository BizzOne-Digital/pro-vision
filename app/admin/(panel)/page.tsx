"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Landmark, Users, Mail } from "lucide-react";

interface DashboardStats {
  totalServices: number;
  totalTeamMembers: number;
  totalMessages: number;
}

interface RecentMessage {
  _id: string;
  name: string;
  email: string;
  service?: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentMessages, setRecentMessages] = useState<RecentMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStats(data.stats);
          setRecentMessages(data.recentMessages || []);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: "Total Services", value: stats?.totalServices ?? 0, icon: Landmark, href: "/admin/services" },
    { label: "Team Members", value: stats?.totalTeamMembers ?? 0, icon: Users, href: "/admin/team" },
    { label: "Contact Messages", value: stats?.totalMessages ?? 0, icon: Mail, href: "/admin/messages" },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-[#102A43]">Dashboard</h1>
      <p className="mt-1 text-sm text-[#627D98]">Overview of your website content.</p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="rounded-xl border border-[#DCE8F0] bg-white p-6 transition-shadow hover:shadow-md"
          >
            <Icon className="h-6 w-6 text-[#078BE7]" aria-hidden="true" />
            <p className="mt-4 text-3xl font-bold text-[#102A43]">{loading ? "—" : value}</p>
            <p className="mt-1 text-sm text-[#627D98]">{label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-[#DCE8F0] bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold text-[#102A43]">
            Recent Contact Submissions
          </h2>
          <Link href="/admin/messages" className="text-sm font-medium text-[#078BE7]">
            View All
          </Link>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[500px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#DCE8F0] text-[#627D98]">
                <th className="py-2 pr-4 font-medium">Name</th>
                <th className="py-2 pr-4 font-medium">Email</th>
                <th className="py-2 pr-4 font-medium">Interest</th>
                <th className="py-2 pr-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentMessages.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-[#627D98]">
                    {loading ? "Loading..." : "No submissions yet."}
                  </td>
                </tr>
              )}
              {recentMessages.map((m) => (
                <tr key={m._id} className="border-b border-[#DCE8F0] last:border-0">
                  <td className="py-3 pr-4 font-medium text-[#102A43]">{m.name}</td>
                  <td className="py-3 pr-4 text-[#627D98]">{m.email}</td>
                  <td className="py-3 pr-4 text-[#627D98]">{m.service || "—"}</td>
                  <td className="py-3 pr-4">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
