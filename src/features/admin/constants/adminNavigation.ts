import {
  GraduationCap,
  FileText,
  UserRound,
  ListChecks,
} from "lucide-react";

export const adminNavigation = [
  {
    title: "Diplomas",
    path: "/admin/diplomas",
    icon: GraduationCap,
  },
  {
    title: "Exams",
    path: "/admin/exams",
    icon: FileText,
  },
  {
    title: "Account Settings",
    path: "/admin/account",
    icon: UserRound,
  },
  {
    title: "Audit Log",
    path: "/admin/audit-log",
    icon: ListChecks,
  },
];