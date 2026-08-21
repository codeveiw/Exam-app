import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from "sonner";
import './index.css'

import QueryProvider from './app/providers/QueryProvider.tsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router/index.tsx'
import AuthContextProvider from './features/auth/context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <AuthContextProvider>
        <RouterProvider router={router} ></RouterProvider>
        <Toaster richColors position="top-right" />
      </AuthContextProvider>
    </QueryProvider>
  </StrictMode>,
)
