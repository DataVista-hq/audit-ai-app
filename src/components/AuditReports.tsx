import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, CheckCircle, Clock, Calendar } from "lucide-react"

interface AuditReport {
  name: string
  status: "Passed" | "In Progress" | "Scheduled"
  date: string
}

const reports: AuditReport[] = [
  { name: "SOC 2 Type 2", status: "Passed", date: "2025-02-15" },
  { name: "PCI DSS", status: "In Progress", date: "2025-03-01" },
  { name: "GDPR", status: "Scheduled", date: "2025-04-10" },
  { name: "ISO 27001", status: "Passed", date: "2025-01-20" },
  { name: "HIPAA", status: "In Progress", date: "2025-05-05" },
]

const statusConfig = {
  Passed: { icon: CheckCircle, color: "text-green-500", bgColor: "bg-green-500/10" },
  "In Progress": { icon: Clock, color: "text-yellow-500", bgColor: "bg-yellow-500/10" },
  Scheduled: { icon: Calendar, color: "text-blue-500", bgColor: "bg-blue-500/10" },
}

export default function AuditReports() {
  return (
    <Card className="bg-[#1E1E1E] border-gray-800">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white flex items-center">
          <FileText className="mr-2 h-5 w-5 text-cyber-blue" />
          Audit Reports
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm">
                <th className="pb-4 font-medium">Report</th>
                <th className="pb-4 font-medium">Status</th>
                <th className="pb-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => {
                const { icon: Icon, color, bgColor } = statusConfig[report.status]
                return (
                  <tr key={index} className="border-t border-gray-800">
                    <td className="py-4 pr-4">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-gray-400" />
                        <span className="text-white">{report.name}</span>
                      </div>
                    </td>
                    <td className="py-4 pr-4">
                      <Badge variant="outline" className={`${color} ${bgColor} border-0`}>
                        <Icon className="h-3 w-3 mr-1" />
                        {report.status}
                      </Badge>
                    </td>
                    <td className="py-4 text-gray-400">{report.date}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

