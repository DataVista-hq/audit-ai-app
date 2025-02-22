"use client"

import { useState } from "react"
import DashboardLayout from "../../components/layouts/DashboardLayout"
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { FileText, Download, Share2, Calendar, Plus, CheckCircle, AlertTriangle, XCircle } from "lucide-react"

interface AuditReport {
  id: string
  name: string
  type: string
  status: "Passed" | "Pending" | "Failed"
  date: string
}

const auditReports: AuditReport[] = [
  { id: "1", name: "Q1 2025 Compliance Audit", type: "SOC 2 Type 2", status: "Passed", date: "2025-03-15" },
  { id: "2", name: "Annual PCI DSS Assessment", type: "PCI DSS", status: "Pending", date: "2025-06-01" },
  { id: "3", name: "GDPR Compliance Check", type: "GDPR", status: "Failed", date: "2025-04-10" },
  { id: "4", name: "ISO 27001 Certification", type: "ISO 27001", status: "Passed", date: "2025-02-20" },
  { id: "5", name: "HIPAA Security Assessment", type: "HIPAA", status: "Pending", date: "2025-07-05" },
]

const statusConfig = {
  Passed: { icon: CheckCircle, color: "text-green-500", bgColor: "bg-green-500/10" },
  Pending: { icon: AlertTriangle, color: "text-yellow-500", bgColor: "bg-yellow-500/10" },
  Failed: { icon: XCircle, color: "text-red-500", bgColor: "bg-red-500/10" },
}

export default function AuditReportsPage() {
  const [selectedReport, setSelectedReport] = useState<AuditReport | null>(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false)

  const handleViewReport = (report: AuditReport) => {
    setSelectedReport(report)
    setIsViewerOpen(true)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">Audit Reports</h1>
          <Button className="bg-cyber-blue hover:bg-cyber-blue/90">
            <Plus className="mr-2 h-4 w-4" /> Generate New Report
          </Button>
        </div>

        <Card className="bg-[#1E1E1E] border-gray-800">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white flex items-center">
              <FileText className="mr-2 h-5 w-5 text-cyber-blue" />
              Audit History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-400">Report Name</TableHead>
                  <TableHead className="text-gray-400">Type</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Date</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditReports.map((report) => {
                  const { icon: Icon, color, bgColor } = statusConfig[report.status]
                  return (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium text-white">{report.name}</TableCell>
                      <TableCell className="text-gray-300">{report.type}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${color} ${bgColor} border-0`}>
                          <Icon className="h-3 w-3 mr-1" />
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-300">{report.date}</TableCell>
                      <TableCell className="text-gray-300">
                        <Button variant="ghost" size="sm" onClick={() => handleViewReport(report)}>
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="bg-[#1E1E1E] border-gray-800">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-cyber-blue" />
              Scheduled Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="soc2">SOC 2</SelectItem>
                  <SelectItem value="pci-dss">PCI DSS</SelectItem>
                  <SelectItem value="gdpr">GDPR</SelectItem>
                  <SelectItem value="iso27001">ISO 27001</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                </SelectContent>
              </Select>
              <Button>Schedule Report</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
        <DialogContent className="bg-[#1E1E1E] text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedReport?.name}</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="report" className="w-full">
            <TabsList>
              <TabsTrigger value="report">Report</TabsTrigger>
              <TabsTrigger value="findings">Findings</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>
            <TabsContent value="report">
              {/* Placeholder for report content */}
              <div className="bg-[#2D2D2D] p-4 rounded-md">
                <p>Report content goes here...</p>
              </div>
            </TabsContent>
            <TabsContent value="findings">
              {/* Placeholder for findings */}
              <div className="bg-[#2D2D2D] p-4 rounded-md">
                <p>Detailed findings go here...</p>
              </div>
            </TabsContent>
            <TabsContent value="recommendations">
              {/* Placeholder for recommendations */}
              <div className="bg-[#2D2D2D] p-4 rounded-md">
                <p>Recommendations based on the audit go here...</p>
              </div>
            </TabsContent>
          </Tabs>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}

