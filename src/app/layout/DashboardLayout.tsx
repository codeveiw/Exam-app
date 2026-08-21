import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./components/sidebat";

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
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <main className="pl-64 min-h-screen">
        <div className="px-8 pt-8 pb-3">
          <span className="text-xs text-slate-400 font-normal tracking-wide">
            {getBreadcrumbs()}
          </span>
        </div>
        <div className="px-8 pb-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
