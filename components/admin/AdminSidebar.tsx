"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Landmark,
  Users,
  Mail,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/services", label: "Services", icon: Landmark },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const linkClass = (href: string) => {
    const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
    return `flex items-center gap-3 rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${
      active ? "bg-[#078BE7] text-white" : "text-[#DCE8F0] hover:bg-white/10"
    }`;
  };

  return (
    <>
      <div className="flex items-center justify-between border-b border-white/10 bg-[#031D33] px-4 py-4 lg:hidden">
        <span className="font-heading text-lg font-semibold text-white">Pro-Vision Admin</span>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-white"
        >
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      <aside
        className={`${
          open ? "block" : "hidden"
        } w-full shrink-0 bg-[#062B4A] lg:block lg:w-64`}
      >
        <div className="hidden px-6 py-6 lg:block">
          <span className="font-heading text-xl font-semibold text-white">Pro-Vision</span>
          <p className="text-xs text-[#87EDF0]">Admin Panel</p>
        </div>
        <nav className="space-y-1 px-4 py-4" aria-label="Admin navigation">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className={linkClass(item.href)}>
                <Icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 flex w-full items-center gap-3 rounded-md px-4 py-2.5 text-sm font-medium text-[#DCE8F0] hover:bg-white/10"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Logout
          </button>
        </nav>
      </aside>
    </>
  );
}
