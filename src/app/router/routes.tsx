import LoginPage from "../../features/auth/pages/LoginPage";
import AuthLayout from "../../app/layout/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";

import CreateAccountPage from "@/features/auth/pages/CreateAccountPage";
import VerifyEmailPage from "@/features/auth/pages/VerifyEmailPage";
import CompleteAccountPage from "@/features/auth/pages/CompleteAccountPage";
import ResetPasswordPage from "@/features/auth/pages/ResetPasswordPage";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage";
import { Navigate } from "react-router-dom";
import NotFoundPage from "@/app/pages/NotFoundPage";
import CompletePasswordPage from "@/features/auth/pages/CompletePasswordPage";
import PasswordResetSendPage from "@/features/auth/pages/PasswordResetSendPage";
import DiplomasPage from "@/features/diplomas/pages/DiplomasPage";
import DashboardLayout from "../layout/DashboardLayout";
import DiplomaDetailsPage from "@/features/diplomas/pages/DiplomaDetailsPage";
import ExamQuestionsPage from "@/features/diplomas/pages/ExamQuestionsPage";
import ExamResultPage from "@/features/diplomas/pages/ExamResultPage";
import AccountSettingsPage from "@/features/diplomas/pages/AccountSettingsPage";
import ChangePasswordPage from "@/features/diplomas/pages/ChangePasswordPage";
import AdminDashboardPage from "@/features/admin/pages/AdminDashboardPage";
import AdminRoute from "./AdminRoute";
import AdminLayout from "@/features/admin/layout/AdminLayout";
import AdminDiplomaDetailsPage from "@/features/admin/diplomas/pages/AdminDiplomaDetailsPage";
import AdminDiplomaFormPage from "@/features/admin/diplomas/pages/AdminDiplomaFormPage";
import AdminExamPage from "@/features/admin/exam/pages/AdminExamPage";
import AdminExamDetailsPage from "@/features/admin/exam/pages/AdminExamDetailsPage";
import AdminExamFormPage from "@/features/admin/exam/pages/AdminExamFormPage";
import AdminQuestionDetailsPage from "@/features/questions/pages/AdminQuestionDetailsPage";
import AdminQuestionFormPage from "@/features/questions/pages/AdminQuestionFormPage";
import AdminAccountSettingsPage from "@/features/admin/pages/AdminAccountSettingsPage";
import AdminAuditLogPage from "@/features/admin/audit-log/pages/AdminAuditLogPage";
import AdminAuditLogDetailsPage from "@/features/admin/audit-log/pages/AdminAuditLogDetailsPage";

export const routes = [
  {
    path: "/",
    element: <Navigate to="/auth/login" replace />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <CreateAccountPage />,
      },
      {
        path: "verify-email",
        element: <VerifyEmailPage />,
      },
      {
        path: "complete-account",
        element: <CompleteAccountPage />,
      },
      {
        path: "create-password",
        element: <CompletePasswordPage />
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "reset-send",
        element: <PasswordResetSendPage />,
      },
      {
        path: "reset-password",
        element: <ResetPasswordPage />,
      },
    ],
  },
  {

    element: <ProtectedRoute />, children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <DiplomasPage /> },
          { path: "diplomas/:id", element: <DiplomaDetailsPage /> },
          {
            path: "exams/:id",
            element: <ExamQuestionsPage />,
          },
          {
            path: "exams/:id/result",
            element: <ExamResultPage />,
          },
          {
            path: "account",
            element: <AccountSettingsPage />,
          },
          {
            path: "change-password",
            element: <ChangePasswordPage />
          }
        ]

      },
    ],




  },
  {
    element: <AdminRoute />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminDashboardPage />,
          },

          {
            path: "diplomas/new",
            element: <AdminDiplomaFormPage />,
          },

          {
            path: "diplomas/:id",
            element: <AdminDiplomaDetailsPage />,
          },
          {
            path: "diplomas/:id/edit",
            element: <AdminDiplomaFormPage />,
          },
          {
            path: "exams",
            element: <AdminExamPage />,
          },
          {
            path: "exams/:id",
            element: <AdminExamDetailsPage />,
          },

          {
            path: "exams/new",
            element: <AdminExamFormPage />,
          },
          {
            path: "exams/:id/edit",
            element: <AdminExamFormPage />,
          },

          {
            path: "questions/:id",
            element: <AdminQuestionDetailsPage />,
          },
          {
            path: "questions/new",
            element: <AdminQuestionFormPage />,
          },
          {
            path: "questions/:id/edit",
            element: <AdminQuestionFormPage />,
          },
          {
            path: "exams/:examId/questions/add",
            element: <AdminQuestionFormPage />,
          },
          {
            path: "questions/:id/edit",
            element: <AdminQuestionFormPage />,
          },
          {
            path: "account",
            element: <AdminAccountSettingsPage />,
          },
          {
            path: "audit-log",
            element: <AdminAuditLogPage />,
          },
          {
            path: "audit-log/:id",
            element: <AdminAuditLogDetailsPage />,
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]