"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

interface SignUpModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle sign up logic here
    console.log("Sign up with:", email, password)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] bg-[#121212] border-0">
        <div className="flex flex-col items-center">
          <Image src="/logo.svg" alt="Logo" width={150} height={40} className="mb-8 text-white" />
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#1e1e1e] border-[#3d3d3d] text-white focus:border-[#6366f1] focus:ring-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-[#1e1e1e] border-[#3d3d3d] text-white focus:border-[#6366f1] focus:ring-0"
              />
            </div>
            <Button type="submit" className="w-full bg-[#6366f1] hover:bg-[#4f46e5] text-white">
              Create Account
            </Button>
          </form>
          <div className="mt-4 w-full">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#121212] text-gray-400">OR</span>
              </div>
            </div>
          </div>
          <div className="mt-4 w-full space-y-2">
            <Button variant="outline" className="w-full bg-[#1e1e1e] text-white border-[#3d3d3d] hover:bg-[#2d2d2d]">
              <Image src="/google-icon.svg" alt="Google" width={20} height={20} className="mr-2" />
              Continue with Google
            </Button>
            <Button variant="outline" className="w-full bg-[#1e1e1e] text-white border-[#3d3d3d] hover:bg-[#2d2d2d]">
              <Image src="/github-icon.svg" alt="GitHub" width={20} height={20} className="mr-2" />
              Continue with GitHub
            </Button>
          </div>
          {/* <p className="mt-6 text-sm text-gray-400">
            Already have an account?{" "}
            <a href="#" className="text-[#6366f1] hover:underline">
              Sign in
            </a>
          </p> */}
        </div>
      </DialogContent>
    </Dialog>
  )
}

