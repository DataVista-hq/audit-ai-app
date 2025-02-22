"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../components/ui/dialog"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import type { User } from "../../types/user-management"

interface TwoFactorAuthModalProps {
  isOpen: boolean
  onClose: () => void
  user: User | null
}

export default function TwoFactorAuthModal({ isOpen, onClose, user }: TwoFactorAuthModalProps) {
  const [verificationCode, setVerificationCode] = useState("")

  const handleEnable2FA = () => {
    // Here you would implement the logic to enable 2FA for the user
    console.log(`Enabling 2FA for user ${user?.name} with code ${verificationCode}`)
    onClose()
  }

  if (!user) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1E1E1E] text-white">
        <DialogHeader>
          <DialogTitle>Set Up Two-Factor Authentication</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>Scan the QR code with your authenticator app or enter the setup key manually.</p>
          {/* Here you would display a QR code for the user to scan */}
          <div className="bg-white p-4 w-48 h-48 mx-auto">
            {/* Placeholder for QR code */}
            <div className="w-full h-full bg-gray-300"></div>
          </div>
          <div>
            <Label htmlFor="setupKey">Setup Key</Label>
            <Input id="setupKey" value="ABCD EFGH IJKL MNOP" readOnly className="mt-1" />
          </div>
          <div>
            <Label htmlFor="verificationCode">Verification Code</Label>
            <Input
              id="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter 6-digit code"
              className="mt-1"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleEnable2FA}>Enable 2FA</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

