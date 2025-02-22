import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { EvidenceItem } from "../../types/evidence"

interface EvidenceDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  evidence: EvidenceItem | null
}

export default function EvidenceDetailsModal({ isOpen, onClose, evidence }: EvidenceDetailsModalProps) {
  if (!evidence) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1E1E1E] text-white">
        <DialogHeader>
          <DialogTitle>Evidence Details: {evidence.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-300">Source</h3>
            <p className="mt-1 text-white">{evidence.source}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-300">Type</h3>
            <p className="mt-1 text-white">{evidence.type}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-300">Collected At</h3>
            <p className="mt-1 text-white">{evidence.collectedAt}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-300">Status</h3>
            <p className="mt-1 text-white">{evidence.status}</p>
          </div>
          {/* Add more details as needed */}
        </div>
      </DialogContent>
    </Dialog>
  )
}

