import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import type { User, SessionInfo } from "@/types/user-management"
import { useToast } from "@/components/ui/use-toast"

interface SessionManagementModalProps {
  isOpen: boolean
  onClose: () => void
  user: User | null
}

export default function SessionManagementModal({ isOpen, onClose, user }: SessionManagementModalProps) {
  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (user) {
      fetchSessionInfo(user.id)
    }
  }, [user])

  const fetchSessionInfo = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}/sessions`)
      if (!response.ok) throw new Error("Failed to fetch session info")
      const data = await response.json()
      setSessionInfo(data)
    } catch (error) {
      console.error("Error fetching session info:", error)
      toast({
        title: "Error",
        description: "Failed to fetch session information. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleTerminateAllSessions = async () => {
    if (!user) return

    try {
      const response = await fetch(`/api/users/${user.id}/terminate-sessions`, {
        method: "POST",
      })
      if (!response.ok) throw new Error("Failed to terminate sessions")
      
      await fetchSessionInfo(user.id)
      
      toast({
        title: "Success",
        description: "All sessions terminated successfully.",
      })
    } catch (error) {
      console.error("Error terminating sessions:", error)
      toast({
        title: "Error",
        description: "Failed to terminate sessions. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (!user || !sessionInfo) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1E1E1E] text-white">
        <DialogHeader>
          <DialogTitle>Session Management: {user.name}</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-400">Active Sessions</TableHead>
              <TableHead className="text-gray-400">Last Active Session</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{sessionInfo.activeSessions}</TableCell>
              <TableCell>{sessionInfo.lastActiveSession}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button onClick={handleTerminateAllSessions} className="mt-4">Terminate All Sessions</Button>
      </DialogContent>
    </Dialog>
  )
}