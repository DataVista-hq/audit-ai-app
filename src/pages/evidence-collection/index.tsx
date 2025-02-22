"use client"

import type React from "react"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/layouts/DashboardLayout"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Cloud,
  Database,
  Lock,
  Upload,
  Download,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Eye,
  ArrowUpDown,
} from "lucide-react"
import EvidenceDetailsModal from "../../components/EvidenceDetailsModal"
import ComplianceMappingModal from "../../components/ComplianceMappingModal"
import AuditTrailModal from "../../components/AuditTrailModal"
import type { EvidenceSource, EvidenceItem } from "../../../types/evidence"

export default function EvidenceCollectionPage() {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [auditReadiness, setAuditReadiness] = useState(75)
  const [evidenceSources, setEvidenceSources] = useState<EvidenceSource[]>([])
  const [evidenceItems, setEvidenceItems] = useState<EvidenceItem[]>([])
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceItem | null>(null)
  const [isEvidenceDetailsOpen, setIsEvidenceDetailsOpen] = useState(false)
  const [isComplianceMappingOpen, setIsComplianceMappingOpen] = useState(false)
  const [isAuditTrailOpen, setIsAuditTrailOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  useEffect(() => {
    // Fetch evidence sources and items from API
    fetchEvidenceSources()
    fetchEvidenceItems()
  }, [])

  const fetchEvidenceSources = async () => {
    // Simulated API call
    const sources: EvidenceSource[] = [
      { id: "1", name: "AWS Production", type: "AWS", status: "Connected", lastSync: "2025-06-15 14:30" },
      { id: "2", name: "GCP Analytics", type: "GCP", status: "Connected", lastSync: "2025-06-15 13:45" },
      { id: "3", name: "Azure Backup", type: "Azure", status: "Disconnected", lastSync: "2025-06-14 09:15" },
      { id: "4", name: "On-premise Logs", type: "Manual", status: "Pending", lastSync: "N/A" },
    ]
    setEvidenceSources(sources)
  }

  const fetchEvidenceItems = async () => {
    // Simulated API call
    const items: EvidenceItem[] = [
      {
        id: "1",
        name: "Access Logs",
        source: "AWS Production",
        type: "Security Logs",
        collectedAt: "2025-06-15 14:30",
        status: "Collected",
      },
      {
        id: "2",
        name: "Encryption Keys",
        source: "GCP Analytics",
        type: "Encryption Data",
        collectedAt: "2025-06-15 13:45",
        status: "Collected",
      },
      {
        id: "3",
        name: "User Permissions",
        source: "Azure Backup",
        type: "Access Controls",
        collectedAt: "2025-06-14 09:15",
        status: "Failed",
      },
      {
        id: "4",
        name: "Firewall Rules",
        source: "On-premise Logs",
        type: "Security Configuration",
        collectedAt: "N/A",
        status: "Pending",
      },
    ]
    setEvidenceItems(items)
  }

  const handleUploadEvidence = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle evidence upload logic here
    setIsUploadDialogOpen(false)
  }

  const handleViewEvidenceDetails = (evidence: EvidenceItem) => {
    setSelectedEvidence(evidence)
    setIsEvidenceDetailsOpen(true)
  }

  const handleViewComplianceMapping = (evidence: EvidenceItem) => {
    setSelectedEvidence(evidence)
    setIsComplianceMappingOpen(true)
  }

  const handleViewAuditTrail = () => {
    setIsAuditTrailOpen(true)
  }

  const filteredEvidenceItems = evidenceItems
    .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((item) => filterType === "all" || item.type === filterType)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">Compliance Evidence Collection</h1>
          <div className="space-x-2">
            <Button onClick={() => setIsUploadDialogOpen(true)}>
              <Upload className="mr-2 h-4 w-4" /> Upload Manual Evidence
            </Button>
            <Button variant="outline" onClick={handleViewAuditTrail}>
              View Audit Trail
            </Button>
          </div>
        </div>

        <Card className="bg-[#1E1E1E] border-gray-800">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white flex items-center justify-between">
              <div className="flex items-center">
                <Database className="mr-2 h-5 w-5 text-cyber-blue" />
                Evidence Collection Dashboard
              </div>
              <Button variant="outline" size="sm" className="text-black" onClick={() => alert("Syncing data...")}>
                <RefreshCw className="mr-2 h-4 w-4" /> Sync Now
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-400">Source</TableHead>
                  <TableHead className="text-gray-400">Type</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Last Sync</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {evidenceSources.map((source) => (
                  <TableRow key={source.id}>
                    <TableCell className="font-medium text-white">{source.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-0">
                        {source.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          source.status === "Connected"
                            ? "bg-green-500/10 text-green-500 border-0"
                            : source.status === "Disconnected"
                              ? "bg-red-500/10 text-red-500 border-0"
                              : "bg-yellow-500/10 text-yellow-500 border-0"
                        }
                      >
                        {source.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-300">{source.lastSync}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="bg-[#1E1E1E] border-gray-800">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white flex items-center justify-between">
              <div className="flex items-center">
                <Lock className="mr-2 h-5 w-5 text-cyber-blue" />
                Automated Logs Aggregation
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Search evidence..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 text-black"
                />
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[180px] text-black">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Security Logs">Security Logs</SelectItem>
                    <SelectItem value="Encryption Data">Encryption Data</SelectItem>
                    <SelectItem value="Access Controls">Access Controls</SelectItem>
                    <SelectItem value="Security Configuration">Security Configuration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-400">Evidence Name</TableHead>
                  <TableHead className="text-gray-400">Source</TableHead>
                  <TableHead className="text-gray-400">Type</TableHead>
                  <TableHead className="text-gray-400">Collected At</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvidenceItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium text-white">{item.name}</TableCell>
                    <TableCell className="text-gray-300">{item.source}</TableCell>
                    <TableCell className="text-gray-300">{item.type}</TableCell>
                    <TableCell className="text-gray-300">{item.collectedAt}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          item.status === "Collected"
                            ? "bg-green-500/10 text-green-500 border-0"
                            : item.status === "Failed"
                              ? "bg-red-500/10 text-red-500 border-0"
                              : "bg-yellow-500/10 text-yellow-500 border-0"
                        }
                      >
                        {item.status === "Collected" && <CheckCircle className="mr-1 h-3 w-3" />}
                        {item.status === "Failed" && <AlertTriangle className="mr-1 h-3 w-3" />}
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2 text-gray-300">
                        <Button variant="ghost" size="sm" onClick={() => handleViewEvidenceDetails(item)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleViewComplianceMapping(item)}>
                          <ArrowUpDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="bg-[#1E1E1E] border-gray-800">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white flex items-center justify-between">
              <div className="flex items-center">
                <Cloud className="mr-2 h-5 w-5 text-cyber-blue" />
                Audit Readiness Score
              </div>
              <Button variant="outline" className="text-black">
                <Download className="mr-2 h-4 w-4 text-black" /> Download Report
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Overall Readiness</span>
                  <span className="text-sm font-medium text-white">{auditReadiness}%</span>
                </div>
                <Progress value={auditReadiness} className="h-2" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-1">Security Logs</h3>
                  <Progress value={90} className="h-2" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-1">Access Controls</h3>
                  <Progress value={80} className="h-2" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-1">Encryption Data</h3>
                  <Progress value={95} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="bg-[#1E1E1E] text-white">
          <DialogHeader>
            <DialogTitle>Upload Manual Evidence</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUploadEvidence}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="evidenceName">Evidence Name</Label>
                <Input id="evidenceName" placeholder="Enter evidence name" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="evidenceType">Evidence Type</Label>
                <Input id="evidenceType" placeholder="e.g., Security Log, Access Control" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="evidenceFile">Upload File</Label>
                <Input id="evidenceFile" type="file" className="mt-1" />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button type="submit">Upload Evidence</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <EvidenceDetailsModal
        isOpen={isEvidenceDetailsOpen}
        onClose={() => setIsEvidenceDetailsOpen(false)}
        evidence={selectedEvidence}
      />

      <ComplianceMappingModal
        isOpen={isComplianceMappingOpen}
        onClose={() => setIsComplianceMappingOpen(false)}
        evidence={selectedEvidence}
      />

      <AuditTrailModal isOpen={isAuditTrailOpen} onClose={() => setIsAuditTrailOpen(false)} />
    </DashboardLayout>
  )
}

