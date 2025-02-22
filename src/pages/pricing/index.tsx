import React from "react"
import { Button } from "@/components/ui/button"
import { Check, Minus } from "lucide-react"
import Link from "next/link"
import Head from "next/head"
import Header from "@/components/Header"
import Footer from "../../components/Footer"
import CTA from "../../components/CTA"

const tiers = [
  {
    name: "BASIC",
    price: "$20",
    description: "Essential compliance monitoring",
    cta: "GET STARTED",
    ctaLink: "/signup",
  },
  {
    name: "TEAM",
    price: "$40",
    description: "Advanced compliance automation",
    cta: "START FREE TRIAL",
    ctaLink: "/signup",
    highlight: true,
  },
  {
    name: "ENTERPRISE",
    price: "Custom",
    description: "Tailored compliance solutions",
    cta: "CONTACT SALES",
    ctaLink: "/contact",
  },
]

const features = [
  {
    category: "Dashboard & Overview",
    items: [
      { name: "Compliance Score Widget", basic: true, team: true, enterprise: true },
      { name: "AI-Driven Insights", basic: "Limited", team: true, enterprise: true },
      { name: "Security Alerts Panel", basic: true, team: true, enterprise: true },
      { name: "Audit Reports Section", basic: "Basic", team: true, enterprise: "Advanced" },
    ],
  },
  {
    category: "Audit Reports",
    items: [
      { name: "Generate Audit Reports", basic: "Limited", team: true, enterprise: "Custom" },
      { name: "Export Reports (PDF, CSV, JSON)", basic: "PDF only", team: true, enterprise: true },
      { name: "Scheduled Report Generation", basic: false, team: true, enterprise: true },
    ],
  },
  {
    category: "Compliance Policies & AI Recommendations",
    items: [
      { name: "Policy Creation Tool", basic: "Basic", team: true, enterprise: "Advanced" },
      { name: "AI-Based Compliance Suggestions", basic: "Limited", team: true, enterprise: "Advanced" },
      { name: "Custom Rules Creation", basic: false, team: true, enterprise: true },
    ],
  },
  {
    category: "Security Alerts & Risk Monitoring",
    items: [
      { name: "Real-Time Alert Feed", basic: "Basic", team: true, enterprise: "Advanced" },
      { name: "Incident Timeline", basic: false, team: true, enterprise: true },
      { name: "Automated Fixes", basic: false, team: "Limited", enterprise: "Advanced" },
    ],
  },
  {
    category: "Certifications & Compliance Readiness",
    items: [
      { name: "Readiness Score Widget", basic: true, team: true, enterprise: true },
      { name: "Certification Timeline", basic: "Basic", team: true, enterprise: "Advanced" },
      { name: "Direct Certification Issuance", basic: false, team: true, enterprise: true },
    ],
  },
  {
    category: "DevOps & CI/CD Compliance Integration",
    items: [
      { name: "CI/CD Policy Compliance Checks", basic: false, team: true, enterprise: true },
      { name: "Pre-Deployment Compliance Scanner", basic: false, team: true, enterprise: "Advanced" },
      { name: "Integration with DevOps Tools", basic: false, team: "Limited", enterprise: "Full" },
    ],
  },
  {
    category: "Compliance Evidence Collection",
    items: [
      { name: "Evidence Collection Dashboard", basic: "Basic", team: true, enterprise: "Advanced" },
      { name: "Automated Logs Aggregation", basic: false, team: true, enterprise: true },
      { name: "Audit Readiness Score", basic: true, team: true, enterprise: true },
    ],
  },
  {
    category: "User Management & RBAC",
    items: [
      { name: "User Role Management", basic: "Basic", team: true, enterprise: "Advanced" },
      { name: "Audit Trail of User Activities", basic: false, team: true, enterprise: true },
      { name: "Multi-Tenant Support", basic: false, team: false, enterprise: true },
    ],
  },
  {
    category: "Settings & Integrations",
    items: [
      { name: "API & Webhooks", basic: false, team: "Limited", enterprise: "Full" },
      { name: "Cloud Provider Integrations", basic: "1 provider", team: "3 providers", enterprise: "Unlimited" },
      { name: "Customization Options", basic: false, team: "Limited", enterprise: "Full" },
    ],
  },
]

export default function PricingPage() {
  return (
    <>
      <Head>
        <title>Pricing - ComplianceAI</title>
        <meta name="description" content="Choose the perfect plan for your compliance automation needs" />
      </Head>

      <div className="min-h-screen bg-black text-white flex flex-col">
        <Header sidebarOpen={false} setSidebarOpen={() => {}} />

        <main className="flex-grow">
          <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-center mb-2">Pricing</h1>
            <p className="text-xl text-center text-gray-400 mb-12">
              Choose the perfect plan for your compliance automation needs
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {tiers.map((tier, index) => (
                <div
                  key={index}
                  className={`bg-[#1E1E1E] rounded-lg p-8 ${tier.highlight ? "border-2 border-purple-600" : ""}`}
                >
                  <h2 className="text-2xl font-bold mb-2">{tier.name}</h2>
                  <p className="text-gray-400 mb-4">{tier.description}</p>
                  <p className="text-4xl font-bold mb-6">
                    {tier.price}{" "}
                    <span className="text-xl font-normal">{tier.price !== "Custom" ? "/seat/month" : ""}</span>
                  </p>
                  <Link href={tier.ctaLink}>
                    <Button
                      className={`w-full ${tier.highlight ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-700 hover:bg-gray-600"}`}
                    >
                      {tier.cta}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2 px-4">Features</th>
                    {tiers.map((tier, index) => (
                      <th key={index} className="text-center py-2 px-4">
                        {tier.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {features.map((category, categoryIndex) => (
                    <React.Fragment key={categoryIndex}>
                      <tr className="border-b border-gray-700">
                        <td colSpan={4} className="py-4 px-4 font-bold">
                          {category.category}
                        </td>
                      </tr>
                      {category.items.map((feature, featureIndex) => (
                        <tr key={`${categoryIndex}-${featureIndex}`} className="border-b border-gray-700">
                          <td className="py-2 px-4">{feature.name}</td>
                          <td className="text-center py-2 px-4">{renderFeatureAvailability(feature.basic)}</td>
                          <td className="text-center py-2 px-4">{renderFeatureAvailability(feature.team)}</td>
                          <td className="text-center py-2 px-4">{renderFeatureAvailability(feature.enterprise)}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <CTA />
        </main>

        <Footer />
      </div>
    </>
  )
}

function renderFeatureAvailability(availability: boolean | string) {
  if (typeof availability === "boolean") {
    return availability ? (
      <Check className="inline-block text-purple-600" />
    ) : (
      <Minus className="inline-block text-gray-600" />
    )
  }
  return <span className="text-sm">{availability}</span>
}

