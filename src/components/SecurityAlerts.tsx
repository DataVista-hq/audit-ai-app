import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, AlertTriangle, ShieldAlert, AlertCircle } from 'lucide-react'

interface Alert {
  severity: "low" | "medium" | "high"
  message: string
  timestamp: string
}

const alerts: Alert[] = [
  { severity: "high", message: "Unauthorized access attempt detected", timestamp: "2 min ago" },
  { severity: "medium", message: "Outdated software version found", timestamp: "15 min ago" },
  { severity: "low", message: "Unusual network activity observed", timestamp: "1 hour ago" },
  { severity: "high", message: "Multiple failed login attempts", timestamp: "2 hours ago" },
  { severity: "medium", message: "Unencrypted data transfer detected", timestamp: "3 hours ago" },
]

const severityConfig = {
  low: { icon: AlertCircle, color: "text-blue-500", bgColor: "bg-blue-500/10" },
  medium: { icon: AlertTriangle, color: "text-yellow-500", bgColor: "bg-yellow-500/10" },
  high: { icon: ShieldAlert, color: "text-red-500", bgColor: "bg-red-500/10" },
}

export default function SecurityAlerts() {
  return (
    <Card className="bg-[#1E1E1E] border-gray-800 h-[300px] flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-xl font-semibold text-white flex items-center">
          <Bell className="mr-2 h-5 w-5 text-cyber-blue" />
          Security Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ul className="space-y-3 h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300">
          {alerts.map((alert, index) => {
            const { icon: Icon, color, bgColor } = severityConfig[alert.severity]
            return (
              <li key={index} className={`${bgColor} rounded-lg p-3 flex items-start`}>
                <div className={`${color} p-1 rounded-full mr-3 flex-shrink-0`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <p className="text-white text-sm font-medium">{alert.message}</p>
                    <Badge
                      variant="outline"
                      className={`ml-2 text-xs ${color} border-current`}
                    >
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-gray-400 text-xs mt-1">{alert.timestamp}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}
