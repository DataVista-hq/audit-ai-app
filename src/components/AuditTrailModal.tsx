import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface AuditTrailModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AuditTrailModal({ isOpen, onClose }: AuditTrailModalProps) {
  // This is a placeholder. In a real application, you would fetch the actual audit trail data.
  const auditTrail = [
    { timestamp: "2025-06-15 14:30:00", action: "User Created", user: "John Doe", details: "Created user Jane Smith" },
    {
      timestamp: "2025-06-15 13:45:00",
      action: "Role Modified",
      user: "Admin User",
      details: "Added 'delete' permission to Security Engineer role",
    },
    {
      timestamp: "2025-06-14 09:15:00",
      action: "User Deleted",
      user: "Jane Smith",
      details: "Deleted user Bob Williams",
    },
    // Add more audit trail entries as needed
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1E1E1E] text-white max-w-4xl">
        <DialogHeader>
          <DialogTitle>Audit Trail</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-400">Timestamp</TableHead>
              <TableHead className="text-gray-400">Action</TableHead>
              <TableHead className="text-gray-400">User</TableHead>
              <TableHead className="text-gray-400">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditTrail.map((entry, index) => (
              <TableRow key={index}>
                <TableCell className="text-white">{entry.timestamp}</TableCell>
                <TableCell className="text-white">{entry.action}</TableCell>
                <TableCell className="text-white">{entry.user}</TableCell>
                <TableCell className="text-white">{entry.details}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  )
}

