"use client"

import type React from "react"
import { useState } from "react"
import DashboardLayout from "@/components/layouts/DashboardLayout"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Award, Download, Share2, CheckCircle, Clock, ArrowRight, Eye } from "lucide-react"

interface Certification {
  id: string
  name: string
  status: "Issued" | "In Progress" | "Not Started"
  readinessScore: number
  issueDate?: string
  expiryDate?: string
}

interface CertificationStep {
  id: string
  description: string
  status: "Completed" | "In Progress" | "Pending"
}

const certifications: Certification[] = [
  {
    id: "1",
    name: "SOC 2 Type 2",
    status: "Issued",
    readinessScore: 100,
    issueDate: "2025-01-15",
    expiryDate: "2026-01-14",
  },
  { id: "2", name: "PCI DSS", status: "In Progress", readinessScore: 85 },
  { id: "3", name: "ISO 27001", status: "Not Started", readinessScore: 60 },
]

const certificationSteps: CertificationStep[] = [
  { id: "1", description: "Complete self-assessment questionnaire", status: "Completed" },
  { id: "2", description: "Implement required controls", status: "In Progress" },
  { id: "3", description: "Conduct internal audit", status: "Pending" },
  { id: "4", description: "Schedule external audit", status: "Pending" },
  { id: "5", description: "Obtain certification", status: "Pending" },
]

export default function CertificationsPage() {
  const [isRequestCertOpen, setIsRequestCertOpen] = useState(false)
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null)
  const [isCertDetailsOpen, setIsCertDetailsOpen] = useState(false)
  const [isCertPreviewOpen, setIsCertPreviewOpen] = useState(false)

  const handleRequestCertification = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle certification request logic here
    setIsRequestCertOpen(false)
  }

  const handleViewCertification = (cert: Certification) => {
    setSelectedCert(cert)
    setIsCertDetailsOpen(true)
  }

  const handlePreviewCertificate = () => {
    setIsCertPreviewOpen(true)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">Certifications & Compliance Readiness</h1>
          <Button onClick={() => setIsRequestCertOpen(true)}>Request Certification</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <Card key={cert.id} className="bg-[#1E1E1E] border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white flex items-center justify-between">
                  <span className="flex items-center">
                    <Award className="mr-2 h-5 w-5 text-cyber-blue" />
                    {cert.name}
                  </span>
                  <Badge
                    variant="outline"
                    className={
                      cert.status === "Issued"
                        ? "text-green-500 bg-green-500/10 border-0"
                        : cert.status === "In Progress"
                          ? "text-yellow-500 bg-yellow-500/10 border-0"
                          : "text-gray-500 bg-gray-500/10 border-0"
                    }
                  >
                    {cert.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-400">Readiness Score</span>
                      <span className="text-sm font-medium text-white">{cert.readinessScore}%</span>
                    </div>
                    <Progress value={cert.readinessScore} className="h-2" />
                  </div>
                  {cert.status === "Issued" && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">
                        Issue Date: <span className="text-white">{cert.issueDate}</span>
                      </span>
                      <span className="text-gray-400">
                        Expiry: <span className="text-white">{cert.expiryDate}</span>
                      </span>
                    </div>
                  )}
                  <Button variant="outline" className="w-full" onClick={() => handleViewCertification(cert)}>
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-[#1E1E1E] border-gray-800">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white flex items-center">
              <Clock className="mr-2 h-5 w-5 text-cyber-blue" />
              Certification Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {certificationSteps.map((step, index) => (
                <div key={step.id} className="flex items-start space-x-4">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      step.status === "Completed"
                        ? "bg-green-500"
                        : step.status === "In Progress"
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                    }`}
                  >
                    {step.status === "Completed" && <CheckCircle className="h-4 w-4 text-white" />}
                    {step.status === "In Progress" && <Clock className="h-4 w-4 text-white" />}
                    {step.status === "Pending" && <span className="text-white text-xs">{index + 1}</span>}
                  </div>
                  <div>
                    <p className="text-white">{step.description}</p>
                    <p className="text-sm text-gray-400">{step.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isRequestCertOpen} onOpenChange={setIsRequestCertOpen}>
        <DialogContent className="bg-[#1E1E1E] text-white">
          <DialogHeader>
            <DialogTitle>Request Certification</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleRequestCertification}>
            <div className="space-y-4">
              <div>
                <label htmlFor="certType" className="block text-sm font-medium text-gray-300">
                  Certification Type
                </label>
                <Select>
                  <SelectTrigger id="certType">
                    <SelectValue placeholder="Select certification" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="soc2">SOC 2</SelectItem>
                    <SelectItem value="pci-dss">PCI DSS</SelectItem>
                    <SelectItem value="iso27001">ISO 27001</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button type="submit">Request Certification</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isCertDetailsOpen} onOpenChange={setIsCertDetailsOpen}>
        <DialogContent className="bg-[#1E1E1E] text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedCert?.name} Certification Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-300">Status</h3>
              <Badge
                variant="outline"
                className={
                  selectedCert?.status === "Issued"
                    ? "text-green-500 bg-green-500/10 border-0 mt-1"
                    : selectedCert?.status === "In Progress"
                      ? "text-yellow-500 bg-yellow-500/10 border-0 mt-1"
                      : "text-gray-500 bg-gray-500/10 border-0 mt-1"
                }
              >
                {selectedCert?.status}
              </Badge>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-300">Readiness Score</h3>
              <div className="flex items-center mt-1">
                <Progress value={selectedCert?.readinessScore} className="h-2 flex-grow mr-4" />
                <span className="text-white">{selectedCert?.readinessScore}%</span>
              </div>
            </div>
            {selectedCert?.status === "Issued" && (
              <>
                <div>
                  <h3 className="text-sm font-medium text-gray-300">Issue Date</h3>
                  <p className="mt-1 text-white">{selectedCert?.issueDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-300">Expiry Date</h3>
                  <p className="mt-1 text-white">{selectedCert?.expiryDate}</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={handlePreviewCertificate}>
                    <Eye className="mr-2 h-4 w-4" /> Preview Certificate
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" /> Download Certificate (PDF)
                  </Button>
                  <Button variant="outline">
                    <Share2 className="mr-2 h-4 w-4" /> Share Certificate
                  </Button>
                </div>
              </>
            )}
            {selectedCert?.status !== "Issued" && (
              <div>
                <h3 className="text-sm font-medium text-gray-300">Next Steps</h3>
                <ul className="mt-1 space-y-2">
                  <li className="flex items-center text-white">
                    <ArrowRight className="mr-2 h-4 w-4 text-cyber-blue" />
                    Complete all required controls
                  </li>
                  <li className="flex items-center text-white">
                    <ArrowRight className="mr-2 h-4 w-4 text-cyber-blue" />
                    Schedule internal audit
                  </li>
                  <li className="flex items-center text-white">
                    <ArrowRight className="mr-2 h-4 w-4 text-cyber-blue" />
                    Prepare documentation for external audit
                  </li>
                </ul>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isCertPreviewOpen} onOpenChange={setIsCertPreviewOpen}>
        <DialogContent className="bg-white text-black max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Certificate Preview</DialogTitle>
          </DialogHeader>
          <div className="border-4 border-double border-gray-300 p-8 space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-serif mb-2">Certificate of Compliance</h2>
              <h3 className="text-xl font-serif">{selectedCert?.name}</h3>
            </div>
            <div className="text-center">
              <p>This certifies that</p>
              <p className="text-2xl font-bold my-4">Your Company Name</p>
              <p>has successfully completed all requirements and is found to be in compliance with</p>
              <p className="text-xl font-bold my-4">{selectedCert?.name} Standards</p>
            </div>
            <div className="flex justify-between text-sm">
              <div>
                <p>
                  <strong>Issue Date:</strong> {selectedCert?.issueDate}
                </p>
                <p>
                  <strong>Certificate ID:</strong> CERT-{selectedCert?.id}-{new Date().getFullYear()}
                </p>
              </div>
              <div>
                <p>
                  <strong>Expiry Date:</strong> {selectedCert?.expiryDate}
                </p>
                <p>
                  <strong>Verified by:</strong> ComplianceAI
                </p>
              </div>
            </div>
            <div className="text-center text-sm mt-8">
              <p>This certificate is electronically generated and blockchain-verified.</p>
              <p>
                Verify at: https://complianceai.com/verify/CERT-{selectedCert?.id}-{new Date().getFullYear()}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsCertPreviewOpen(false)}>Close Preview</Button>
            <Button>
              <Download className="mr-2 h-4 w-4" /> Download Certificate (PDF)
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}

