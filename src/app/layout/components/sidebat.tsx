import { NavLink, useNavigate } from "react-router-dom";
import ElevateLogo from "../../../assets/icons/ElevateLogo.png";
import Logo from "./auth-illustration/Logo";
import {
    GraduationCap,
    User,
    MoreVertical,
    LogOut,
    LayoutDashboard,
    User as UserIcon,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Sidebar() {
    const navigate = useNavigate();

    // Get user details from localStorage
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
        <aside className="w-full flex-1 border-r border-[#e0e8f5] bg-[#f8fbff] h-full md:h-screen flex flex-col justify-between py-4 md:py-8 px-6 md:fixed left-0 top-0">
            <div className="flex flex-col gap-8">
                {/* Brand/Logo Section */}
                <div className="flex flex-col gap-2">
                    <img src={ElevateLogo} alt="Elevate Logo" className="w-[120px] object-contain" />
                    <div className="scaled-logo-container transform -translate-x-1">
                        <Logo />
                    </div>
                </div>

                {/* Navigation Section */}
                <nav className="flex flex-col gap-3 mt-4">
                    <NavLink
                        to="/dashboard"
                        end
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-md transition-all border ${isActive
                                ? "border-[#4085f4] bg-[#eef4ff] text-[#4085f4] font-medium"
                                : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                            }`
                        }
                    >
                        <GraduationCap className="w-5 h-5 shrink-0" />
                        <span className="text-sm">Diplomas</span>
                    </NavLink>

                    <NavLink
                        to="/dashboard/account" // Place holder or active route path
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-md transition-all border ${isActive
                                ? "border-[#4085f4] bg-[#eef4ff] text-[#4085f4] font-medium"
                                : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                            }`
                        }
                    >
                        <User className="w-5 h-5 shrink-0" />
                        <span className="text-sm">Account Settings</span>
                    </NavLink>
                </nav>
            </div>

            <div className="relative">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-150 text-left outline-none cursor-pointer">
                            <div className="flex items-center gap-3">
                                <Avatar className="border-gray-100 rounded-md">
                                    <AvatarImage
                                        src={user?.profilePhoto || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=90"}
                                        alt={fullName}
                                    />
                                    <AvatarFallback className="bg-slate-200 text-slate-700 font-semibold text-xs rounded-md">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-sm font-semibold text-blue-600 truncate leading-none mb-1">
                                        {fullName}
                                    </span>
                                    <span className="text-xs text-gray-500 truncate">
                                        {email}
                                    </span>
                                </div>
                            </div>
                            <MoreVertical className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-56 p-2 rounded-xl border border-gray-200 bg-white shadow-lg mb-2 relative z-50 origin-bottom" align="end" side="top" sideOffset={8}>
                        <DropdownMenuItem
                            disabled
                            className="flex items-center justify-between cursor-not-allowed rounded-lg opacity-50 py-2 px-3 outline-none"
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
                            className="flex items-center gap-3 cursor-pointer rounded-lg hover:bg-[#f6f8fb] focus:bg-[#f6f8fb] py-2 px-3 outline-none mt-1"
                        >
                            <LayoutDashboard className="w-4 h-4 text-slate-500" />
                            <span className="text-sm font-medium text-slate-700">Dashboard</span>
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
