export interface EvidenceSource {
    id: string
    name: string
    type: "AWS" | "GCP" | "Azure" | "Manual"
    status: "Connected" | "Disconnected" | "Pending"
    lastSync: string
  }
  
  export interface EvidenceItem {
    id: string
    name: string
    source: string
    type: string
    collectedAt: string
    status: "Collected" | "Pending" | "Failed"
  }
  
  