"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layouts/DashboardLayout"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { AlertTriangle, Clock, CheckCircle, AlertOctagon, ArrowRight } from "lucide-react"

interface Alert {
  id: string
  message: string
  severity: "High" | "Medium" | "Low"
  timestamp: string
  status: "Open" | "Resolved"
}

interface Incident {
  id: string
  description: string
  timestamp: string
  responsible: string
}

const alerts: Alert[] = [
  {
    id: "1",
    message: "Unauthorized access attempt detected",
    severity: "High",
    timestamp: "2025-06-15 14:30",
    status: "Open",
  },
  {
    id: "2",
    message: "Outdated software version found",
    severity: "Medium",
    timestamp: "2025-06-14 09:15",
    status: "Open",
  },
  {
    id: "3",
    message: "Unusual network activity observed",
    severity: "Low",
    timestamp: "2025-06-13 22:45",
    status: "Resolved",
  },
  {
    id: "4",
    message: "Failed login attempts exceeded threshold",
    severity: "High",
    timestamp: "2025-06-12 11:20",
    status: "Open",
  },
  {
    id: "5",
    message: "Firewall rule violation detected",
    severity: "Medium",
    timestamp: "2025-06-11 16:55",
    status: "Resolved",
  },
]

const incidents: Incident[] = [
  {
    id: "1",
    description: "Unauthorized access attempt from IP 192.168.1.100",
    timestamp: "2025-06-15 14:30",
    responsible: "John Doe",
  },
  {
    id: "2",
    description: "Critical software update missed on Server01",
    timestamp: "2025-06-14 09:15",
    responsible: "Jane Smith",
  },
  {
    id: "3",
    description: "Unusual outbound traffic spike detected",
    timestamp: "2025-06-13 22:45",
    responsible: "System",
  },
]

const severityConfig = {
  High: { icon: AlertOctagon, color: "text-red-500", bgColor: "bg-red-500/10" },
  Medium: { icon: AlertTriangle, color: "text-yellow-500", bgColor: "bg-yellow-500/10" },
  Low: { icon: Clock, color: "text-blue-500", bgColor: "bg-blue-500/10" },
}

export default function SecurityAlertsPage() {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)
  const [isAlertDetailsOpen, setIsAlertDetailsOpen] = useState(false)
  const [autoRemediationEnabled, setAutoRemediationEnabled] = useState(false)

  const handleViewAlert = (alert: Alert) => {
    setSelectedAlert(alert)
    setIsAlertDetailsOpen(true)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">Security Alerts & Risk Monitoring</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Auto-remediation for low-risk issues</span>
            <Switch checked={autoRemediationEnabled} onCheckedChange={setAutoRemediationEnabled} />
          </div>
        </div>

        <Card className="bg-[#1E1E1E] border-gray-800">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-cyber-blue" />
              Real-Time Alert Feed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-400">Severity</TableHead>
                  <TableHead className="text-gray-400">Alert</TableHead>
                  <TableHead className="text-gray-400">Timestamp</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alerts.map((alert) => {
                  const { icon: Icon, color, bgColor } = severityConfig[alert.severity]
                  return (
                    <TableRow key={alert.id}>
                      <TableCell>
                        <Badge variant="outline" className={`${color} ${bgColor} border-0`}>
                          <Icon className="h-3 w-3 mr-1" />
                          {alert.severity}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium text-white">{alert.message}</TableCell>
                      <TableCell className="text-gray-300">{alert.timestamp}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            alert.status === "Open"
                              ? "text-yellow-500 bg-yellow-500/10 border-0"
                              : "text-green-500 bg-green-500/10 border-0"
                          }
                        >
                          {alert.status === "Open" ? (
                            <AlertOctagon className="h-3 w-3 mr-1" />
                          ) : (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          )}
                          {alert.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleViewAlert(alert)}>
                          View Details
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
              <Clock className="mr-2 h-5 w-5 text-cyber-blue" />
              Incident Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {incidents.map((incident) => (
                <div key={incident.id} className="flex items-start space-x-4">
                  <div className="w-2 h-2 mt-2 rounded-full bg-cyber-blue"></div>
                  <div>
                    <p className="text-sm text-gray-300">{incident.timestamp}</p>
                    <p className="text-white mt-1">{incident.description}</p>
                    <p className="text-sm text-gray-400 mt-1">Responsible: {incident.responsible}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isAlertDetailsOpen} onOpenChange={setIsAlertDetailsOpen}>
        <DialogContent className="bg-[#1E1E1E] text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle>Alert Details</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="details" className="w-full">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="fix">How to Fix</TabsTrigger>
              <TabsTrigger value="logs">Logs & Audit Trail</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-300">Alert Message</h3>
                  <p className="mt-1">{selectedAlert?.message}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-300">Severity</h3>
                  <Badge
                    variant="outline"
                    className={`${severityConfig[selectedAlert?.severity || "Low"].color} ${severityConfig[selectedAlert?.severity || "Low"].bgColor} border-0 mt-1`}
                  >
                    {selectedAlert?.severity}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-300">Timestamp</h3>
                  <p className="mt-1">{selectedAlert?.timestamp}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-300">Status</h3>
                  <Badge
                    variant="outline"
                    className={
                      selectedAlert?.status === "Open"
                        ? "text-yellow-500 bg-yellow-500/10 border-0 mt-1"
                        : "text-green-500 bg-green-500/10 border-0 mt-1"
                    }
                  >
                    {selectedAlert?.status}
                  </Badge>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="fix">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-white">Recommended Fix</h3>
                <p className="text-gray-300">
                  {selectedAlert?.severity === "High"
                    ? "Immediately isolate affected systems and conduct a thorough investigation. Update all security protocols and implement additional access controls."
                    : selectedAlert?.severity === "Medium"
                      ? "Schedule a system update within the next 24 hours. Review and update relevant security policies."
                      : "Monitor the situation closely. Update affected components during the next maintenance window."}
                </p>
                <div className="mt-4">
                  <Button>
                    Apply Automated Fix <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="logs">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-white">Audit Logs</h3>
                <pre className="bg-[#2D2D2D] p-4 rounded-md text-sm text-gray-300 overflow-x-auto">
                  {`2025-06-15 14:30:15 - Alert triggered: ${selectedAlert?.message}
2025-06-15 14:30:16 - Notification sent to security team
2025-06-15 14:35:22 - Investigation initiated by John Doe
2025-06-15 14:40:18 - Affected system isolated
2025-06-15 15:15:45 - Root cause identified: misconfigured firewall rule
2025-06-15 15:30:10 - Firewall rule updated and tested
2025-06-15 15:45:30 - System brought back online
2025-06-15 16:00:00 - Incident report filed`}
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}

