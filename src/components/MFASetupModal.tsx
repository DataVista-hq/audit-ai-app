"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../components/ui/dialog"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import type { User } from "../../types/user-management"
import { useToast } from "../components/ui/use-toast"
import { QRCodeSVG } from "qrcode.react"

interface MFASetupModalProps {
  isOpen: boolean
  onClose: () => void
  user: User | null
}

export default function MFASetupModal({ isOpen, onClose, user }: MFASetupModalProps) {
  const [verificationCode, setVerificationCode] = useState("")
  const [mfaSecret, setMfaSecret] = useState("")
  const { toast } = useToast()

  const generateMFASecret = async () => {
    try {
      const response = await fetch(`/api/users/${user?.id}/mfa-secret`, {
        method: "POST",
      })
      if (!response.ok) throw new Error("Failed to generate MFA secret")
      const data = await response.json()
      setMfaSecret(data.secret)
    } catch (error) {
      console.error("Error generating MFA secret:", error)
      toast({
        title: "Error",
        description: "Failed to generate MFA secret. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleEnableMFA = async () => {
    try {
      const response = await fetch(`/api/users/${user?.id}/enable-mfa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ verificationCode }),
      })
      if (!response.ok) throw new Error("Failed to enable MFA")
      toast({
        title: "Success",
        description: "MFA has been enabled for the user.",
      })
      onClose()
    } catch (error) {
      console.error("Error enabling MFA:", error)
      toast({
        title: "Error",
        description: "Failed to enable MFA. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (!user) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1E1E1E] text-white">
        <DialogHeader>
          <DialogTitle>Set Up Multi-Factor Authentication</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>Scan the QR code with your authenticator app or enter the setup key manually.</p>
          {mfaSecret ? (
            <>
              <div className="bg-white p-4 w-48 h-48 mx-auto">
                <QRCodeSVG
                  value={`otpauth://totp/ComplianceAI:${user.email}?secret=${mfaSecret}&issuer=ComplianceAI`}
                  size={192}
                />
              </div>
              <div>
                <Label htmlFor="setupKey">Setup Key</Label>
                <Input id="setupKey" value={mfaSecret} readOnly className="mt-1" />
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
            </>
          ) : (
            <Button onClick={generateMFASecret}>Generate MFA Secret</Button>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleEnableMFA} disabled={!mfaSecret || verificationCode.length !== 6}>
            Enable MFA
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

