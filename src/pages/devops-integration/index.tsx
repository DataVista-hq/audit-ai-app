"use client"

import type React from "react"
import { useState } from "react"
import DashboardLayout from "@/components/layouts/DashboardLayout"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { AlertTriangle, CheckCircle, XCircle, GitBranch, Settings, Plus, Shield, Edit, Trash2 } from "lucide-react"

interface DeploymentCheck {
  id: string
  repository: string
  branch: string
  status: "Passed" | "Failed"
  timestamp: string
  failedChecks?: string[]
}

interface DevOpsTool {
  id: string
  name: string
  isConnected: boolean
}

interface CustomRule {
  id: string
  name: string
  description: string
  pattern: string
}

const deploymentChecks: DeploymentCheck[] = [
  { id: "1", repository: "frontend-app", branch: "main", status: "Passed", timestamp: "2025-06-15 14:30" },
  {
    id: "2",
    repository: "backend-api",
    branch: "develop",
    status: "Failed",
    timestamp: "2025-06-14 09:15",
    failedChecks: ["Hardcoded credentials detected", "Outdated dependencies found"],
  },
  {
    id: "3",
    repository: "data-processor",
    branch: "feature/new-algo",
    status: "Passed",
    timestamp: "2025-06-13 22:45",
  },
  {
    id: "4",
    repository: "auth-service",
    branch: "hotfix/security-patch",
    status: "Failed",
    timestamp: "2025-06-12 11:20",
    failedChecks: ["Insecure configuration detected"],
  },
]

const devOpsTools: DevOpsTool[] = [
  { id: "1", name: "GitHub Actions", isConnected: true },
  { id: "2", name: "GitLab CI", isConnected: false },
  { id: "3", name: "Jenkins", isConnected: true },
  { id: "4", name: "AWS CodePipeline", isConnected: false },
]

const customRules: CustomRule[] = [
  {
    id: "1",
    name: "No Hardcoded Credentials",
    description: "Prevent committing hardcoded credentials",
    pattern: "(password|secret|api_key)\\s*=\\s*['\"]\\w+['\"]",
  },
  { id: "2", name: "Enforce HTTPS", description: "Ensure all URLs use HTTPS", pattern: "http://(?!localhost)" },
]

export default function DevOpsIntegrationPage() {
  const [isRuleDialogOpen, setIsRuleDialogOpen] = useState(false)
  const [selectedCheck, setSelectedCheck] = useState<DeploymentCheck | null>(null)
  const [isCheckDetailsOpen, setIsCheckDetailsOpen] = useState(false)
  const [customRulesList, setCustomRulesList] = useState<CustomRule[]>(customRules)

  const handleAddRule = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle adding new rule logic here
    // For demonstration, let's add a dummy rule
    const newRule: CustomRule = {
      id: (customRulesList.length + 1).toString(),
      name: "New Rule",
      description: "Description of the new rule",
      pattern: "example_pattern",
    }
    setCustomRulesList([...customRulesList, newRule])
    setIsRuleDialogOpen(false)
  }

  const handleViewCheck = (check: DeploymentCheck) => {
    setSelectedCheck(check)
    setIsCheckDetailsOpen(true)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">Pipeline Compliance Integration</h1>
          <Button onClick={() => setIsRuleDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Custom Rule
          </Button>
        </div>

        <Card className="bg-[#1E1E1E] border-gray-800">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white flex items-center">
              <GitBranch className="mr-2 h-5 w-5 text-cyber-blue" />
              CI/CD Policy Compliance Checks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-400">Repository</TableHead>
                  <TableHead className="text-gray-400">Branch</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Timestamp</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deploymentChecks.map((check) => (
                  <TableRow key={check.id}>
                    <TableCell className="font-medium text-white">{check.repository}</TableCell>
                    <TableCell className="text-gray-300">{check.branch}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          check.status === "Passed"
                            ? "text-green-500 bg-green-500/10 border-0"
                            : "text-red-500 bg-red-500/10 border-0"
                        }
                      >
                        {check.status === "Passed" ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <XCircle className="h-3 w-3 mr-1" />
                        )}
                        {check.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-300">{check.timestamp}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => handleViewCheck(check)}>
                        View Details
                      </Button>
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
                <Shield className="mr-2 h-5 w-5 text-cyber-blue" />
                Custom Security Rules
              </div>
              <Button size="sm" onClick={() => setIsRuleDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add Rule
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-400">Rule Name</TableHead>
                  <TableHead className="text-gray-400">Description</TableHead>
                  <TableHead className="text-gray-400">Pattern</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customRulesList.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell className="font-medium text-white">{rule.name}</TableCell>
                    <TableCell className="text-gray-300">{rule.description}</TableCell>
                    <TableCell className="text-gray-300">{rule.pattern}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
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
            <CardTitle className="text-xl font-semibold text-white flex items-center">
              <Settings className="mr-2 h-5 w-5 text-cyber-blue" />
              DevOps Tools Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {devOpsTools.map((tool) => (
                <div key={tool.id} className="flex items-center justify-between">
                  <span className="text-white">{tool.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className={tool.isConnected ? "text-green-500" : "text-gray-500"}>
                      {tool.isConnected ? "Connected" : "Not Connected"}
                    </span>
                    <Switch checked={tool.isConnected} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isRuleDialogOpen} onOpenChange={setIsRuleDialogOpen}>
        <DialogContent className="bg-[#1E1E1E] text-white">
          <DialogHeader>
            <DialogTitle>Add Custom Security Rule</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddRule}>
            <div className="space-y-4">
              <div>
                <label htmlFor="ruleName" className="block text-sm font-medium text-gray-300">
                  Rule Name
                </label>
                <Input id="ruleName" placeholder="Enter rule name" className="mt-1" />
              </div>
              <div>
                <label htmlFor="ruleDescription" className="block text-sm font-medium text-gray-300">
                  Rule Description
                </label>
                <Textarea id="ruleDescription" placeholder="Describe the rule" className="mt-1" />
              </div>
              <div>
                <label htmlFor="rulePattern" className="block text-sm font-medium text-gray-300">
                  Detection Pattern
                </label>
                <Input id="rulePattern" placeholder="Enter regex or pattern" className="mt-1" />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button type="submit">Add Rule</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isCheckDetailsOpen} onOpenChange={setIsCheckDetailsOpen}>
        <DialogContent className="bg-[#1E1E1E] text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle>Deployment Check Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-300">Repository</h3>
              <p className="mt-1 text-white">{selectedCheck?.repository}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-300">Branch</h3>
              <p className="mt-1 text-white">{selectedCheck?.branch}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-300">Status</h3>
              <Badge
                variant="outline"
                className={
                  selectedCheck?.status === "Passed"
                    ? "text-green-500 bg-green-500/10 border-0 mt-1"
                    : "text-red-500 bg-red-500/10 border-0 mt-1"
                }
              >
                {selectedCheck?.status === "Passed" ? (
                  <CheckCircle className="h-3 w-3 mr-1" />
                ) : (
                  <XCircle className="h-3 w-3 mr-1" />
                )}
                {selectedCheck?.status}
              </Badge>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-300">Timestamp</h3>
              <p className="mt-1 text-white">{selectedCheck?.timestamp}</p>
            </div>
            {selectedCheck?.status === "Failed" && (
              <div>
                <h3 className="text-sm font-medium text-gray-300">Failed Checks</h3>
                <ul className="mt-1 space-y-2">
                  {selectedCheck.failedChecks?.map((check, index) => (
                    <li key={index} className="flex items-center text-white">
                      <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />
                      {check}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <h3 className="text-sm font-medium text-gray-300">Pre-Deployment Scan Results</h3>
              <pre className="mt-2 p-4 bg-[#2D2D2D] rounded-md text-sm text-gray-300 overflow-x-auto">
                {`Scan completed at ${selectedCheck?.timestamp}
No critical vulnerabilities detected
2 medium-risk issues found:
  - Outdated dependency: react-router (CVE-2023-1234)
  - Insecure configuration in .env.example file
1 low-risk issue found:
  - Non-production code in main branch
                
Recommendation: Address medium-risk issues before deployment`}
              </pre>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}

