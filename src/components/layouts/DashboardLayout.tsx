"use client"

import { useEffect, useState  } from "react"
import type { ReactNode } from "react"
import Header from "../../components/Header"
import Sidebar from "../../components/Sidebar"
import { useRouter } from "next/router"

interface DashboardLayoutProps {
  children: ReactNode
  title?: string
}

const publicRoutes = ["/auth/login", "/auth/signup", "/", "/security-alerts", "/compliance-policies", "/dashboard", "/audit-reports", "/certifications", "/devops-integration", "/evidence-collection", "/user-management", "/settings", "/pricing"]

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  // Basic auth check - replace with your actual auth logic
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    const isPublicRoute = publicRoutes.includes(router.pathname)

    if (!isAuthenticated && !isPublicRoute) {
      router.push("/auth/login")
    }
  }, [router])

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-black">
          <div className="container mx-auto px-6 py-8">
            {title && <h1 className="text-3xl font-semibold text-gray-900 mb-6">{title}</h1>}
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

