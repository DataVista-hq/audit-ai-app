"use client"

import type React from "react"
import { useState } from "react"
import DashboardLayout from "@/components/layouts/DashboardLayout"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { FileText, Plus, CheckCircle, AlertTriangle, XCircle, Lightbulb } from "lucide-react"

interface Policy {
  id: string
  name: string
  standard: string
  status: "Compliant" | "Non-Compliant" | "Partially Compliant"
  lastUpdated: string
}

interface AISuggestion {
  id: string
  suggestion: string
  impact: "High" | "Medium" | "Low"
}

const policies: Policy[] = [
  { id: "1", name: "Data Encryption Policy", standard: "SOC 2", status: "Compliant", lastUpdated: "2025-03-15" },
  { id: "2", name: "Access Control Policy", standard: "PCI DSS", status: "Non-Compliant", lastUpdated: "2025-02-01" },
  {
    id: "3",
    name: "Incident Response Plan",
    standard: "ISO 27001",
    status: "Partially Compliant",
    lastUpdated: "2025-04-10",
  },
]

const aiSuggestions: AISuggestion[] = [
  { id: "1", suggestion: "Enable MFA on AWS IAM for all admin accounts", impact: "High" },
  { id: "2", suggestion: "Implement regular security awareness training for all employees", impact: "Medium" },
  { id: "3", suggestion: "Update firewall rules to restrict unnecessary inbound traffic", impact: "High" },
]

const statusConfig = {
  Compliant: { icon: CheckCircle, color: "text-green-500", bgColor: "bg-green-500/10" },
  "Non-Compliant": { icon: XCircle, color: "text-red-500", bgColor: "bg-red-500/10" },
  "Partially Compliant": { icon: AlertTriangle, color: "text-yellow-500", bgColor: "bg-yellow-500/10" },
}

export default function CompliancePoliciesPage() {
  const [isCreatePolicyOpen, setIsCreatePolicyOpen] = useState(false)
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null)
  const [isPolicyDetailsOpen, setIsPolicyDetailsOpen] = useState(false)

  const handleCreatePolicy = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle policy creation logic here
    setIsCreatePolicyOpen(false)
  }

  const handleViewPolicy = (policy: Policy) => {
    setSelectedPolicy(policy)
    setIsPolicyDetailsOpen(true)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">Compliance Policies</h1>
          <Button onClick={() => setIsCreatePolicyOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Create New Policy
          </Button>
        </div>

        <Card className="bg-[#1E1E1E] border-gray-800">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white flex items-center">
              <FileText className="mr-2 h-5 w-5 text-cyber-blue" />
              Existing Policies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-400">Policy Name</TableHead>
                  <TableHead className="text-gray-400">Standard</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Last Updated</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {policies.map((policy) => {
                  const { icon: Icon, color, bgColor } = statusConfig[policy.status]
                  return (
                    <TableRow key={policy.id}>
                      <TableCell className="font-medium text-white">{policy.name}</TableCell>
                      <TableCell className="text-gray-300">{policy.standard}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${color} ${bgColor} border-0`}>
                          <Icon className="h-3 w-3 mr-1" />
                          {policy.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-300">{policy.lastUpdated}</TableCell>
                      <TableCell className="text-gray-300">
                        <Button variant="ghost" size="sm" onClick={() => handleViewPolicy(policy)}>
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
              <Lightbulb className="mr-2 h-5 w-5 text-cyber-blue" />
              AI-Based Compliance Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-400">Suggestion</TableHead>
                  <TableHead className="text-gray-400">Impact</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {aiSuggestions.map((suggestion) => (
                  <TableRow key={suggestion.id}>
                    <TableCell className="font-medium text-white">{suggestion.suggestion}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`
                        ${
                          suggestion.impact === "High"
                            ? "text-red-500 bg-red-500/10"
                            : suggestion.impact === "Medium"
                              ? "text-yellow-500 bg-yellow-500/10"
                              : "text-blue-500 bg-blue-500/10"
                        } border-0
                      `}
                      >
                        {suggestion.impact}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="mr-2">
                        Accept
                      </Button>
                      <Button className="text-red-300" variant="ghost" size="sm">
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isCreatePolicyOpen} onOpenChange={setIsCreatePolicyOpen}>
        <DialogContent className="bg-[#1E1E1E] text-white">
          <DialogHeader>
            <DialogTitle>Create New Policy</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreatePolicy}>
            <div className="space-y-4">
              <div>
                <label htmlFor="policyName" className="block text-sm font-medium text-gray-300">
                  Policy Name
                </label>
                <Input id="policyName" placeholder="Enter policy name" className="mt-1" />
              </div>
              <div>
                <label htmlFor="policyStandard" className="block text-sm font-medium text-gray-300">
                  Compliance Standard
                </label>
                <Select>
                  <SelectTrigger id="policyStandard">
                    <SelectValue placeholder="Select standard" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="soc2">SOC 2</SelectItem>
                    <SelectItem value="pci-dss">PCI DSS</SelectItem>
                    <SelectItem value="iso27001">ISO 27001</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="policyDescription" className="block text-sm font-medium text-gray-300">
                  Policy Description
                </label>
                <Textarea id="policyDescription" placeholder="Enter policy description" className="mt-1" />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button type="submit">Create Policy</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isPolicyDetailsOpen} onOpenChange={setIsPolicyDetailsOpen}>
        <DialogContent className="bg-[#1E1E1E] text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedPolicy?.name}</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="details" className="w-full">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="controls">Controls</TabsTrigger>
              <TabsTrigger value="enforcement">Enforcement</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-300">Standard</h3>
                  <p className="mt-1">{selectedPolicy?.standard}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-300">Status</h3>
                  <Badge
                    variant="outline"
                    className={`${statusConfig[selectedPolicy?.status || "Compliant"].color} ${statusConfig[selectedPolicy?.status || "Compliant"].bgColor} border-0 mt-1`}
                  >
                    {selectedPolicy?.status}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-300">Last Updated</h3>
                  <p className="mt-1">{selectedPolicy?.lastUpdated}</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="controls">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-white">All admin accounts must use MFA</h3>
                    <p className="text-sm text-gray-400">
                      Enforce multi-factor authentication for all administrative accounts
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-white">Regular security training</h3>
                    <p className="text-sm text-gray-400">
                      Conduct security awareness training for all employees quarterly
                    </p>
                  </div>
                  <Switch />
                </div>
                {/* Add more controls as needed */}
              </div>
            </TabsContent>
            <TabsContent value="enforcement">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-white">Automated Policy Enforcement</h3>
                    <p className="text-sm text-gray-400">Automatically enforce policy rules across all systems</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-white">Violation Alerts</h3>
                    <p className="text-sm text-gray-400">Send alerts when policy violations are detected</p>
                  </div>
                  <Switch />
                </div>
                {/* Add more enforcement options as needed */}
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}