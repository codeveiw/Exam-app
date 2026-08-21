import { ShieldCheck } from "lucide-react";

import { SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminHeader() {
  return (
    <header className="flex h-16 items-center gap-4 border-b bg-white px-6">
      <SidebarTrigger />

      <div className="flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-blue-600" />

        <h1 className="text-lg font-semibold text-gray-800">
          Admin Panel
        </h1>
      </div>
    </header>
  );
}