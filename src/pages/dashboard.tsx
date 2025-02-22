"use client"

import Head from "next/head"
import { useState } from "react"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import ComplianceScore from "../components/ComplianceScore"
import AIInsights from "../components/AIInsights"
import SecurityAlerts from "../components/SecurityAlerts"
import AuditReports from "../components/AuditReports"

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <>
      <Head>
        <title>Dashboard | ComplianceAI</title>
        <meta name="description" content="AI-powered compliance automation dashboard" />
      </Head>

      <div className="flex h-screen bg-black">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-light-gray">
            <div className="container mx-auto px-6 py-8">
              <h4 className="text-xl font-semibold text-white mb-6">AuditAI</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <ComplianceScore score={15} />
                <AIInsights />
                <SecurityAlerts />
              </div>
              <AuditReports />
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

