"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layouts/DashboardLayout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useToast } from "@/components/ui/use-toast"
import { Cloud, Key, Bell, Sliders, Webhook, AlertTriangle, Copy } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
  const { toast } = useToast()
  const [apiKey, setApiKey] = useState("")
  const [webhookUrl, setWebhookUrl] = useState("")
  const [selectedCloudProvider, setSelectedCloudProvider] = useState("")
  const [customPolicyEnabled, setCustomPolicyEnabled] = useState(false)
  const [emailAlerts, setEmailAlerts] = useState(false)

  const handleGenerateApiKey = () => {
    // In a real application, this would be a secure API call
    const newApiKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    setApiKey(newApiKey)
    toast({
      title: "API Key Generated",
      description: "Your new API key has been generated. Please save it securely.",
    })
  }

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey)
    toast({
      title: "API Key Copied",
      description: "The API key has been copied to your clipboard.",
    })
  }

  const handleSaveWebhook = () => {
    // In a real application, this would save the webhook URL to the backend
    toast({
      title: "Webhook Saved",
      description: "Your webhook URL has been saved successfully.",
    })
  }

  const handleCloudIntegration = () => {
    // In a real application, this would initiate the cloud provider integration process
    toast({
      title: "Integration Initiated",
      description: `Integration process started for ${selectedCloudProvider}. Please follow the prompts to complete the setup.`,
    })
  }

  const handleCustomPolicyToggle = (enabled: boolean) => {
    setCustomPolicyEnabled(enabled)
    toast({
      title: enabled ? "Custom Policies Enabled" : "Custom Policies Disabled",
      description: enabled
        ? "You can now create and manage custom compliance policies."
        : "Custom compliance policies have been disabled.",
    })
  }

  const handleEmailAlertsToggle = (enabled: boolean) => {
    setEmailAlerts(enabled)
    toast({
      title: enabled ? "Email Alerts Enabled" : "Email Alerts Disabled",
      description: enabled
        ? "You will now receive email alerts for compliance violations."
        : "Email alerts for compliance violations have been disabled.",
    })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Settings & Integrations</h1>
          <Badge variant="outline" className="text-cyber-blue border-cyber-blue">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Some settings require admin approval
          </Badge>
        </div>

        <Tabs defaultValue="api" className="space-y-6">
          <TabsList className="bg-[#1E1E1E] border-b border-gray-700">
            <TabsTrigger
              value="api"
              className="text-white data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-cyber-blue"
            >
              API & Webhooks
            </TabsTrigger>
            <TabsTrigger
              value="cloud"
              className="text-white data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-cyber-blue"
            >
              Cloud Integrations
            </TabsTrigger>
            <TabsTrigger
              value="customization"
              className="text-white data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-cyber-blue"
            >
              Customization
            </TabsTrigger>
          </TabsList>

          <TabsContent value="api" className="space-y-6">
            <Card className="bg-[#1E1E1E] border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white flex items-center">
                  <Key className="mr-2 h-5 w-5 text-cyber-blue" />
                  API Management
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your API keys and access tokens for third-party integrations.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key" className="text-white">
                    API Key
                  </Label>
                  <div className="flex space-x-2">
                    <Input
                      id="api-key"
                      value={apiKey}
                      readOnly
                      className="flex-grow bg-[#2D2D2D] border-gray-600 text-white"
                    />
                    <Button
                      onClick={handleCopyApiKey}
                      variant="outline"
                      className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-white"
                    >
                      <Copy className="w-4 h-4 mr-2" /> Copy
                    </Button>
                    <Button onClick={handleGenerateApiKey} className="bg-cyber-blue text-white hover:bg-cyber-blue/90">
                      Generate New Key
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="webhook-url" className="text-white">
                    Webhook URL
                  </Label>
                  <div className="flex space-x-2">
                    <Input
                      id="webhook-url"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      placeholder="https://your-webhook-url.com"
                      className="flex-grow bg-[#2D2D2D] border-gray-600 text-white"
                    />
                    <Button onClick={handleSaveWebhook} className="bg-cyber-blue text-white hover:bg-cyber-blue/90">
                      Save Webhook
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1E1E1E] border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white flex items-center">
                  <Webhook className="mr-2 h-5 w-5 text-cyber-blue" />
                  Webhook Events
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Configure which events trigger webhook notifications.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="compliance-violations" className="border-b border-gray-700">
                    <AccordionTrigger className="text-white hover:text-cyber-blue">
                      Compliance Violations
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex items-center space-x-2">
                        <Switch id="compliance-violations" />
                        <Label htmlFor="compliance-violations" className="text-gray-300">
                          Send webhook on compliance violations
                        </Label>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="user-activity" className="border-b border-gray-700">
                    <AccordionTrigger className="text-white hover:text-cyber-blue">User Activity</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex items-center space-x-2">
                        <Switch id="user-activity" />
                        <Label htmlFor="user-activity" className="text-gray-300">
                          Send webhook on significant user activities
                        </Label>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="system-updates" className="border-b border-gray-700">
                    <AccordionTrigger className="text-white hover:text-cyber-blue">System Updates</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex items-center space-x-2">
                        <Switch id="system-updates" />
                        <Label htmlFor="system-updates" className="text-gray-300">
                          Send webhook on system updates and maintenance
                        </Label>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cloud" className="space-y-6">
            <Card className="bg-[#1E1E1E] border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white flex items-center">
                  <Cloud className="mr-2 h-5 w-5 text-cyber-blue" />
                  Cloud Provider Integrations
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Connect and manage your cloud provider integrations.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cloud-provider" className="text-white">
                    Select Cloud Provider
                  </Label>
                  <Select value={selectedCloudProvider} onValueChange={setSelectedCloudProvider}>
                    <SelectTrigger id="cloud-provider" className="bg-[#2D2D2D] border-gray-600 text-white">
                      <SelectValue placeholder="Select a cloud provider" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2D2D2D] border-gray-600">
                      <SelectItem value="aws">Amazon Web Services (AWS)</SelectItem>
                      <SelectItem value="gcp">Google Cloud Platform (GCP)</SelectItem>
                      <SelectItem value="azure">Microsoft Azure</SelectItem>
                      <SelectItem value="microsoft365">Microsoft 365</SelectItem>
                      <SelectItem value="okta">Okta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handleCloudIntegration}
                  disabled={!selectedCloudProvider}
                  className="bg-cyber-blue text-white hover:bg-cyber-blue/90"
                >
                  Set Up Integration
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-[#1E1E1E] border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white flex items-center">
                  <Sliders className="mr-2 h-5 w-5 text-cyber-blue" />
                  Integration Settings
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Configure advanced settings for your cloud integrations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="data-sync" className="border-b border-gray-700">
                    <AccordionTrigger className="text-white hover:text-cyber-blue">
                      Data Synchronization
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Switch id="auto-sync" />
                          <Label htmlFor="auto-sync" className="text-gray-300">
                            Enable automatic data synchronization
                          </Label>
                        </div>
                        <Select>
                          <SelectTrigger className="bg-[#2D2D2D] border-gray-600 text-white">
                            <SelectValue placeholder="Sync frequency" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#2D2D2D] border-gray-600">
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="access-management" className="border-b border-gray-700">
                    <AccordionTrigger className="text-white hover:text-cyber-blue">Access Management</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex items-center space-x-2">
                        <Switch id="least-privilege" />
                        <Label htmlFor="least-privilege" className="text-gray-300">
                          Enforce least privilege access
                        </Label>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="compliance-mapping" className="border-b border-gray-700">
                    <AccordionTrigger className="text-white hover:text-cyber-blue">Compliance Mapping</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex items-center space-x-2">
                        <Switch id="auto-mapping" />
                        <Label htmlFor="auto-mapping" className="text-gray-300">
                          Enable automatic compliance mapping
                        </Label>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customization" className="space-y-6">
            <Card className="bg-[#1E1E1E] border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white flex items-center">
                  <Sliders className="mr-2 h-5 w-5 text-cyber-blue" />
                  Custom Policies
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Create and manage custom compliance policies for your organization.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="custom-policies"
                    checked={customPolicyEnabled}
                    onCheckedChange={handleCustomPolicyToggle}
                  />
                  <Label htmlFor="custom-policies" className="text-gray-300">
                    Enable custom compliance policies
                  </Label>
                </div>
                {customPolicyEnabled && (
                  <Button
                    variant="outline"
                    className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-white"
                  >
                    Manage Custom Policies
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card className="bg-[#1E1E1E] border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-white flex items-center">
                  <Bell className="mr-2 h-5 w-5 text-cyber-blue" />
                  Notifications & Alerts
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Configure email notifications and compliance violation alerts.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="email-alerts" checked={emailAlerts} onCheckedChange={handleEmailAlertsToggle} />
                  <Label htmlFor="email-alerts" className="text-gray-300">
                    Enable email alerts for compliance violations
                  </Label>
                </div>
                {emailAlerts && (
                  <div className="space-y-2">
                    <Label htmlFor="alert-email" className="text-white">
                      Alert Email Address
                    </Label>
                    <Input
                      id="alert-email"
                      type="email"
                      placeholder="alerts@yourcompany.com"
                      className="bg-[#2D2D2D] border-gray-600 text-white"
                    />
                  </div>
                )}
                <Button
                  variant="outline"
                  className="border-cyber-blue text-cyber-blue hover:bg-cyber-blue hover:text-white"
                >
                  Configure Alert Rules
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

