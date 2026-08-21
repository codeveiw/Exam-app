import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./components/sidebat";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function DashboardLayout() {
  const location = useLocation();

  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path === "/dashboard" || path === "/dashboard/") {
      return "Diplomas";
    }

    const parts = path.split("/").filter(Boolean);
    return parts
      .map((part) =>
        part
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      )
      .join(" / ");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <main className="flex-1 min-h-screen md:pl-64 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200">
          <span className="font-semibold text-slate-800">Elevate Dashboard</span>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 border-r-0 w-64">
              <Sidebar />
            </SheetContent>
          </Sheet>
        </div>

        <div className="px-4 md:px-8 pt-6 md:pt-8 pb-3">
          <span className="text-xs text-slate-400 font-normal tracking-wide">
            {getBreadcrumbs()}
          </span>
        </div>
        <div className="px-4 md:px-8 pb-4 md:pb-8 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
