import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import type { PasswordPolicy } from "@/types/user-management"

interface PasswordPolicyModalProps {
  isOpen: boolean
  onClose: () => void
  passwordPolicy: PasswordPolicy | null
}

export default function PasswordPolicyModal({ isOpen, onClose, passwordPolicy }: PasswordPolicyModalProps) {
  if (!passwordPolicy) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1E1E1E] text-white">
        <DialogHeader>
          <DialogTitle>Password Policy</DialogTitle>
        </DialogHeader>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Minimum Length</TableCell>
              <TableCell>{passwordPolicy.minLength} characters</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Require Uppercase</TableCell>
              <TableCell>{passwordPolicy.requireUppercase ? "Yes" : "No"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Require Lowercase</TableCell>
              <TableCell>{passwordPolicy.requireLowercase ? "Yes" : "No"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Require Numbers</TableCell>
              <TableCell>{passwordPolicy.requireNumbers ? "Yes" : "No"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Require Special Characters</TableCell>
              <TableCell>{passwordPolicy.requireSpecialChars ? "Yes" : "No"}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Password Expiration</TableCell>
              <TableCell>{passwordPolicy.expirationDays} days</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  )
}