"use client"
import Link from "next/link"
import { useRouter } from "next/router"
import {
  LayoutDashboard,
  FileText,
  ShieldCheck,
  Bell,
  Award,
  GitBranch,
  Search,
  Users,
  Settings,
  Menu,
  X,
} from "lucide-react"
import { Button } from "../components/ui/button"

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Audit Reports", href: "/audit-reports", icon: FileText },
  { name: "Compliance Policies", href: "/compliance-policies", icon: ShieldCheck },
  { name: "Security Alerts", href: "/security-alerts", icon: Bell },
  { name: "Certifications", href: "/certifications", icon: Award },
  { name: "DevOps Integration", href: "/devops-integration", icon: GitBranch },
  { name: "Evidence Collection", href: "/evidence-collection", icon: Search },
  { name: "User Management", href: "/user-management", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
]

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const router = useRouter()

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}
        onClick={() => setSidebarOpen(false)}
      ></div>
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-[#1E1E1E] text-white transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 z-30`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-cyber-blue">AuditAI</h2>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="mt-5 px-2">
          {menuItems.map((item) => {
            const isActive = router.pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-2 mt-2 text-sm rounded-lg transition-colors duration-200 ${
                  isActive ? "bg-cyber-blue text-white" : "text-gray-400 hover:bg-[#2D2D2D] hover:text-white"
                }`}
              >
                <item.icon className={`h-5 w-5 mr-3 ${isActive ? "text-white" : "text-gray-400"}`} />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-40 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </Button>
    </>
  )
}

