import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import AdminSidebar from "../components/AdminSidebar";

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50 flex-col md:flex-row">
        <div className="hidden md:block">
          <AdminSidebar />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between p-4 bg-[#1f2937] text-white">
            <span className="font-semibold tracking-wide">Admin Dashboard</span>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 border-r-0 w-64 bg-[#1f2937]">
                <AdminSidebar />
              </SheetContent>
            </Sheet>
          </div>

          <main className="flex-1 p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}