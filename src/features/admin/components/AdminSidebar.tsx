import { NavLink, useNavigate } from "react-router-dom";
import ElevateLogo from "../../../assets/icons/ElevateLogo.png";
import {
  GraduationCap,
  User,
  MoreVertical,
  LogOut,
  LayoutDashboard,
  User as UserIcon,
  BookOpenCheck,
  ListTodo
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import file from "../../../assets/icons/file.svg"

export default function AdminSidebar() {
  const navigate = useNavigate();

  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  const firstName = user?.firstName || "Firstname";
  const lastName = user?.lastName || "";
  const email = user?.email || "user-email@example.com";
  const fullName = `${firstName} ${lastName}`.trim();
  const initials = `${firstName[0] || "F"}${lastName[0] || "N"}`.toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth/login");
  };

  return (
    <aside className="w-full flex-1 shrink-0 bg-[#1f2937] text-gray-300 h-full md:h-screen md:sticky top-0 flex flex-col justify-between py-4 px-4 overflow-y-auto">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2 px-2">
          <img src={ElevateLogo} alt="Elevate Logo" className="w-[120px] object-contain brightness-0 invert" />
          <div className="flex items-center gap-2 mt-2">

            <img src={file} alt="file" className="h-6 w-6" />

            <span className="text-white font-semibold tracking-wide">Exam App</span>
          </div>
        </div>

        <nav className="flex flex-col gap-2 mt-4">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded transition-all border ${isActive
                ? "border-white/20 bg-white/5 text-white font-medium"
                : "border-transparent text-gray-400 hover:text-white hover:bg-white/5"
              }`
            }
          >
            <GraduationCap className="w-5 h-5 shrink-0" />
            <span className="text-sm">Diplomas</span>
          </NavLink>

          <NavLink
            to="/admin/exams"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded transition-all border ${isActive
                ? "border-white/20 bg-white/5 text-white font-medium"
                : "border-transparent text-gray-400 hover:text-white hover:bg-white/5"
              }`
            }
          >
            <BookOpenCheck className="w-5 h-5 shrink-0" />
            <span className="text-sm">Exams</span>
          </NavLink>

          <NavLink
            to="/admin/account"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded transition-all border ${isActive
                ? "border-white/20 bg-white/5 text-white font-medium"
                : "border-transparent text-gray-400 hover:text-white hover:bg-white/5"
              }`
            }
          >
            <User className="w-5 h-5 shrink-0" />
            <span className="text-sm">Account Settings</span>
          </NavLink>

          <NavLink
            to="/admin/audit-log"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded transition-all border ${isActive
                ? "border-white/20 bg-white/5 text-white font-medium"
                : "border-transparent text-gray-400 hover:text-white hover:bg-white/5"
              }`
            }
          >
            <ListTodo className="w-5 h-5 shrink-0" />
            <span className="text-sm">Audit Log</span>
          </NavLink>
        </nav>
      </div>

      <div className="relative border-t border-white/10 pt-4 mt-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full flex items-center justify-between p-2 rounded hover:bg-white/5 transition-colors border border-transparent text-left outline-none cursor-pointer">
              <div className="flex items-center gap-3">
                <Avatar className="border border-white/10 w-9 h-9 rounded-md">
                  <AvatarImage
                    src={user?.profilePhoto || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=90"}
                    alt={fullName}
                  />
                  <AvatarFallback className="bg-slate-700 text-white font-semibold text-xs rounded-md">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-white truncate leading-none mb-1">
                    {fullName}
                  </span>
                  <span className="text-xs text-gray-400 truncate">
                    {email}
                  </span>
                </div>
              </div>
              <MoreVertical className="w-4 h-4 text-gray-400 shrink-0 ml-1" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56 p-2 rounded-xl border border-gray-200 bg-white shadow-lg mb-2 relative z-50 origin-bottom" align="end" side="top" sideOffset={8}>
            <DropdownMenuItem
              onClick={() => navigate("/admin/account")}
              className="flex items-center justify-between cursor-pointer rounded-lg hover:bg-[#f6f8fb] py-2 px-3 outline-none"
            >
              <div className="flex items-center gap-3">
                <UserIcon className="w-4 h-4 text-slate-500" />
                <span className="text-sm font-medium text-slate-700">Account</span>
              </div>
              <div className="w-6 h-6 rounded-md bg-amber-400 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                {initials[0] || 'A'}
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-3 cursor-pointer rounded-lg hover:bg-[#f6f8fb] py-2 px-3 outline-none mt-1"
            >
              <LayoutDashboard className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">Application</span>
            </DropdownMenuItem>

            <div className="h-px bg-slate-100 my-1" />

            <DropdownMenuItem
              onClick={handleLogout}
              className="flex items-center gap-3 cursor-pointer rounded-lg hover:bg-rose-50 text-rose-600 focus:bg-rose-50 focus:text-rose-700 py-2 px-3 outline-none mt-1"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}