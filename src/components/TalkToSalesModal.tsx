"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

interface TalkToSalesModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function TalkToSalesModal({ isOpen, onClose }: TalkToSalesModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Request received!",
        description: "Our sales team will contact you shortly.",
      })
      onClose()
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Talk to Sales</DialogTitle>
          <DialogDescription>Let us know how we can help you with your compliance needs</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" name="fullName" type="text" required />
          </div>
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input id="email" name="email" type="email" autoComplete="email" required />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" name="phone" type="tel" autoComplete="tel" required />
          </div>
          <div>
            <Label htmlFor="company">Company Name</Label>
            <Input id="company" name="company" type="text" autoComplete="organization" required />
          </div>
          <div>
            <Label htmlFor="enquiry">How can we help you?</Label>
            <Textarea
              id="enquiry"
              name="enquiry"
              rows={4}
              placeholder="Tell us about your compliance needs and how we can assist you."
              required
            />
          </div>
          <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

