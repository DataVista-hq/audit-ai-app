"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import Link from "next/link"
import SignInModal from "../components/SignInModal"
import SignUpModal from "../components/SignUpModal"

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [isTalkSalesOpen, setIsTalkSalesOpen] = useState(false)

  return (
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
                  className="text-gray-300 hover:text-white"
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
                <SignInModal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} />
                <SignUpModal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} /> 
                {/* <TalkToSales isOpen={isTalkSalesOpen} onClose={() => setIsTalkSalesOpen(false)} />  */}
        </nav>
  )
}

