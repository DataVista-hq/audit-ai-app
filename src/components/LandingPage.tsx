"use client"

import type React from "react"

import { useState } from "react"
import Head from "next/head"
import Link from "next/link"
import { Button } from "../components/ui/button"
import { ChevronRight, Shield, Lock, BarChart, RefreshCw } from "lucide-react"
import SignInModal from "../components/SignInModal"
import SignUpModal from "../components/SignUpModal"
import TalkToSales from "../components/TalkToSalesModal"
import Image from "next/image"

export default function LandingPage() {
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [isTalkSalesOpen, setIsTalkSalesOpen] = useState(false)

  return (
    <>
      <Head>
        <title>ComplianceAI - Enterprise Compliance Automation Platform</title>
        <meta
          name="description"
          content="AI-powered compliance automation platform for SOC 2, and more. Get certified faster with continuous monitoring and automated audits."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-black text-white">
        {/* Announcement Bar */}
        <div className="bg-gradient-to-r h-8 from-purple-600 to-blue-600 text-white py-2">
          <div className="container -mt-3 mx-auto px-6 text-center text-sm">
            <span className="font-small">🚀 New: AI-Powered SOC 2 Automation Available</span>
            <Button variant="link" className="text-white ml-2 hover:text-white/90">
              Try it out <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="border-b border-white/10 bg-black/95 sticky top-0 z-50 backdrop-blur-lg">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold">
                  AuditAI
                </Link>
                <div className="hidden md:flex items-center ml-10 space-x-8">
                  <Link href="#platform" className="text-sm text-gray-300 hover:text-white transition-colors">
                    Platform
                  </Link>
                  <Link href="#solutions" className="text-sm text-gray-300 hover:text-white transition-colors">
                    Solutions
                  </Link>
                  <Link href="/pricing" className="text-sm text-gray-300 hover:text-white transition-colors">
                    Pricing
                  </Link>
                  <Link href="#resources" className="text-sm text-gray-300 hover:text-white transition-colors">
                    Resources
                  </Link>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {/* Replace Button components with regular Buttons */}
                <Button
                  variant="ghost"
                  onClick={() => setIsSignInOpen(true)}
                >
                  Sign In
                </Button>
                <Button
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  onClick={() => setIsSignUpOpen(true)}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-28 bg-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#4F46E5,_transparent_50%)]"></div>
          <div className="container mx-auto px-6 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Enterprise Compliance Automation Powered by AI
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 mb-10">
                Get SOC 2, Type 1, Type 2, and Types 3 certified in hours, not months. Continuous compliance monitoring
                with AI-driven automation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {/* Replace Button components with regular Buttons */}
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Request Demo
                </Button>
                <Button size="lg" variant="outline" className="border-gray-700 hover:bg-gray-800 text-black">
                  View Platform <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        {/* <section className="relative border-y border-white/10 bg-black/90 py-16 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_#4F46E5,_transparent_70%)]"></div>
          <div className="container mx-auto px-6 relative">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Leading Companies</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Join thousands of companies using ComplianceAI to achieve and maintain compliance certifications.
              </p>
            </div>
          </div>
        </section> */}

        {/* Revolutionizing Compliance Automation Section */}
        <section className="relative border-y border-white/10 bg-black/90 py-16 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_#4F46E5,_transparent_70%)]"></div>
          <div className="container mx-auto px-6 relative">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Revolutionizing Compliance Automation
              </h2>
              <p className="text-gray-400 mt-2">Powered by cutting-edge AI technology</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-500 mb-2">24h</div>
                <p className="text-sm text-gray-400">
                  Average Time to
                  <br />
                  Initial Assessment
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-500 mb-2">99%</div>
                <p className="text-sm text-gray-400">
                  Automation
                  <br />
                  Coverage
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-500 mb-2">500+</div>
                <p className="text-sm text-gray-400">
                  Security
                  <br />
                  Controls
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-500 mb-2">10x</div>
                <p className="text-sm text-gray-400">
                  Faster Than
                  <br />
                  Traditional Methods
                </p>
              </div>
            </div>
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-sm font-medium">
                    AI
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-medium">
                    ML
                  </div>
                  <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-sm font-medium">
                    NLP
                  </div>
                </div>
                <span className="text-sm text-gray-400">Cutting-edge technology stack</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-black relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#4F46E5,_transparent_50%)]"></div>
          <div className="container mx-auto px-6 relative">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete Compliance Platform</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Everything you need to achieve and maintain compliance, all in one platform.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<Shield className="h-6 w-6" />}
                title="Automated Audits"
                description="AI-powered scans detect vulnerabilities and compliance gaps automatically."
              />
              <FeatureCard
                icon={<Lock className="h-6 w-6" />}
                title="Continuous Monitoring"
                description="Real-time alerts and automated fixes for compliance violations."
              />
              <FeatureCard
                icon={<BarChart className="h-6 w-6" />}
                title="Evidence Collection"
                description="Automated evidence gathering for SOC 2 audits."
              />
              <FeatureCard
                icon={<RefreshCw className="h-6 w-6" />}
                title="Policy Management"
                description="Create and manage compliance policies with AI assistance."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-900 to-blue-900">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to automate your compliance?</h2>
              <p className="text-gray-300 text-lg mb-8">
                Join leading companies using ComplianceAI to achieve and maintain compliance certifications.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {/* Replace Button components with regular Buttons */}
                <Button
                  size="lg"
                  className="bg-white text-purple-900 hover:bg-gray-100"
                  onClick={() => setIsSignUpOpen(true)}
                >
                  Get Started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-black hover:bg-white/10"
                  onClick={() => setIsTalkSalesOpen(true)}
                >
                  Talk to Sales
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black border-t border-white/10 py-12">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              <div className="col-span-2">
                <Link href="/" className="text-2xl font-bold mb-4 block">
                  AuditAI
                </Link>
                <p className="text-gray-400 text-sm">
                  AI-powered compliance automation platform for modern enterprises.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-4">Platform</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white text-sm">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white text-sm">
                      Security
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white text-sm">
                      Enterprise
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white text-sm">
                      Pricing
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white text-sm">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white text-sm">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white text-sm">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white text-sm">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white text-sm">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white text-sm">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white text-sm">
                      API Reference
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white text-sm">
                      Status
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white text-sm">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white text-sm">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white text-sm">
                      Security
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white text-sm">
                      Cookies
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-gray-400 text-sm text-center">
                © {new Date().getFullYear()} AuditAI. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>

      <SignInModal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} />
      <SignUpModal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} />
      <TalkToSales isOpen={isTalkSalesOpen} onClose={() => setIsTalkSalesOpen(false)} />
    </>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
      <div className="mb-4 text-purple-400">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  )
}

