import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Lightbulb, AlertTriangle, ShieldAlert, ArrowRight } from "lucide-react"

interface Insight {
  message: string
  severity: "low" | "medium" | "high"
  action: string
}

const insights: Insight[] = [
  {
    message: "Enable MFA for all admin accounts",
    severity: "high",
    action: "Configure MFA",
  },
  {
    message: "Update firewall rules for better security",
    severity: "medium",
    action: "Review Rules",
  },
  {
    message: "Review and update data retention policies",
    severity: "low",
    action: "Update Policies",
  },
  {
    message: "Implement regular security training for employees",
    severity: "medium",
    action: "Schedule Training",
  },
  {
    message: "Upgrade outdated software components",
    severity: "high",
    action: "Plan Upgrades",
  },
]

const severityConfig = {
  low: { icon: Lightbulb, color: "bg-blue-500" },
  medium: { icon: AlertTriangle, color: "bg-yellow-500" },
  high: { icon: ShieldAlert, color: "bg-red-500" },
}

export default function AIInsights() {
  return (
    <Card className="bg-[#1E1E1E] border-gray-800 h-[300px] flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-xl font-semibold text-white flex items-center">
          <Lightbulb className="mr-2 h-5 w-5 text-cyber-blue" />
          AI-Driven Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ul className="space-y-4 h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300">
          {insights.map((insight, index) => {
            const { icon: Icon, color } = severityConfig[insight.severity]
            return (
              <li key={index} className="bg-[#2D2D2D] rounded-lg p-4 flex items-start">
                <div className={`${color} p-2 rounded-full mr-4 flex-shrink-0`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-white font-medium">{insight.message}</p>
                    <Badge
                      variant="outline"
                      className={`ml-2 ${
                        insight.severity === "high"
                          ? "border-red-500 text-red-500"
                          : insight.severity === "medium"
                            ? "border-yellow-500 text-yellow-500"
                            : "border-blue-500 text-blue-500"
                      }`}
                    >
                      {insight.severity}
                    </Badge>
                  </div>
                  <Button variant="link" className="text-cyber-blue p-0 h-auto text-[#0071E3]">
                    {insight.action} <ArrowRight className="ml-1 h-4 w-4 " />
                  </Button>
                </div>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}

