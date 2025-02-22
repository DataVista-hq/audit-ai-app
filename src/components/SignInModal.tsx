import React, { useState } from "react"
import { useRouter } from "next/router"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

interface SignInModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Replace this with your actual authentication logic
      const response = await signIn(email, password)

      if (response.success) {
        // Close the modal
        onClose()
        // Redirect to the dashboard
        router.push("/dashboard")
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

   // Mock signIn function - replace with your actual authentication logic
   const signIn = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demo purposes, always return success
    return { success: true }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] bg-[#121212] border-0">
        <div className="flex flex-col items-center">
          <Image src="/logo.svg" alt="Logo" width={150} height={40} className="mb-8 text-white" />
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Full Name</Label>
              <Input
                id="email"
                type="email"
                placeholder="Your full name"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#1e1e1e] border-[#3d3d3d] text-white focus:border-[#6366f1] focus:ring-0"
              />
              <Label htmlFor="email" className="text-white">Email</Label>
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
            <Button type="submit" className="w-full bg-[#6366f1] hover:bg-[#4f46e5] text-white">
              Sign In
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
            Don't have an account? <a href="#" className="text-[#6366f1] hover:underline">Sign up</a>
          </p> */}
        </div>
      </DialogContent>
    </Dialog>
  )
}
