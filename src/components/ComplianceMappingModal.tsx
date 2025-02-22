import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { EvidenceItem } from "../../types/evidence"

interface ComplianceMappingModalProps {
  isOpen: boolean
  onClose: () => void
  evidence: EvidenceItem | null
}

export default function ComplianceMappingModal({ isOpen, onClose, evidence }: ComplianceMappingModalProps) {
  if (!evidence) return null

  // This is a placeholder. In a real application, you would fetch the actual compliance mapping data.
  const complianceMapping = [
    {
      standard: "SOC 2",
      control: "CC6.1",
      description:
        "Logical access security software, infrastructure, and architectures have been implemented to support (1) identification and authentication of authorized users; (2) restriction of authorized user access to system components, or portions thereof, authorized by management, including hardware, data, software, mobile devices, output, and offline elements; and (3) prevention and detection of unauthorized access.",
    },
    { standard: "GDPR", control: "Article 32", description: "Security of processing" },
    // Add more mappings as needed
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1E1E1E] text-white">
        <DialogHeader>
          <DialogTitle>Compliance Mapping: {evidence.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {complianceMapping.map((mapping, index) => (
            <div key={index} className="border-t border-gray-700 pt-4">
              <h3 className="text-sm font-medium text-gray-300">
                {mapping.standard} - {mapping.control}
              </h3>
              <p className="mt-1 text-white text-sm">{mapping.description}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

