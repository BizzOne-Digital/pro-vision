import { Toaster } from "react-hot-toast";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7FAFC] lg:flex-row">
      <Toaster position="top-right" />
      <AdminSidebar />
      <main className="flex-1 p-6 lg:p-10">{children}</main>
    </div>
  );
}
