"use client"

import type React from "react"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/layouts/DashboardLayout"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus, Users, Shield, Activity, Edit, Trash2, Lock, Key, LogOut } from "lucide-react"
import UserRoleManagementPanel from "@/components/UserRoleManagementPanel"
import AuditTrailModal from "@/components/AuditTrailModal"
import MFASetupModal from "@/components/MFASetupModal"
import PasswordPolicyModal from "../../components/PasswordPolicyModal"
import SessionManagementModal from "../../components/SessionManagementModal"
import type { User, Role, Tenant, PasswordPolicy } from "@/types/user-management"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [passwordPolicy, setPasswordPolicy] = useState<PasswordPolicy | null>(null)
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isRoleManagementOpen, setIsRoleManagementOpen] = useState(false)
  const [isAuditTrailOpen, setIsAuditTrailOpen] = useState(false)
  const [isMFASetupOpen, setIsMFASetupOpen] = useState(false)
  const [isPasswordPolicyOpen, setIsPasswordPolicyOpen] = useState(false)
  const [isSessionManagementOpen, setIsSessionManagementOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterTenant, setFilterTenant] = useState("all")
  const { toast } = useToast()

  useEffect(() => {
    fetchUsers()
    fetchRoles()
    fetchTenants()
    fetchPasswordPolicy()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users")
      if (!response.ok) throw new Error("Failed to fetch users")
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error("Error fetching users:", error)
      toast({
        title: "Error",
        description: "Failed to fetch users. Please try again.",
        variant: "destructive",
      })
    }
  }

  const fetchRoles = async () => {
    try {
      const response = await fetch("/api/roles")
      if (!response.ok) throw new Error("Failed to fetch roles")
      const data = await response.json()
      setRoles(data)
    } catch (error) {
      console.error("Error fetching roles:", error)
      toast({
        title: "Error",
        description: "Failed to fetch roles. Please try again.",
        variant: "destructive",
      })
    }
  }

  const fetchTenants = async () => {
    try {
      const response = await fetch("/api/tenants")
      if (!response.ok) throw new Error("Failed to fetch tenants")
      const data = await response.json()
      setTenants(data)
    } catch (error) {
      console.error("Error fetching tenants:", error)
      toast({
        title: "Error",
        description: "Failed to fetch tenants. Please try again.",
        variant: "destructive",
      })
    }
  }

  const fetchPasswordPolicy = async () => {
    try {
      const response = await fetch("/api/password-policy")
      if (!response.ok) throw new Error("Failed to fetch password policy")
      const data = await response.json()
      setPasswordPolicy(data)
    } catch (error) {
      console.error("Error fetching password policy:", error)
      toast({
        title: "Error",
        description: "Failed to fetch password policy. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleAddUser = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const formData = new FormData(event.target as HTMLFormElement)
      const userData = Object.fromEntries(formData.entries())

      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) throw new Error("Failed to add user")

      await fetchUsers() // Refresh user list
      setIsAddUserOpen(false)
      toast({
        title: "Success",
        description: "User added successfully.",
      })
    } catch (error) {
      console.error("Error adding user:", error)
      toast({
        title: "Error",
        description: "Failed to add user. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setIsAddUserOpen(true)
  }

  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete user")

      setUsers(users.filter((user) => user.id !== userId))
      toast({
        title: "Success",
        description: "User deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting user:", error)
      toast({
        title: "Error",
        description: "Failed to delete user. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleMFASetup = (user: User) => {
    setSelectedUser(user)
    setIsMFASetupOpen(true)
  }

  const handleEnableMFAForAll = async () => {
    try {
      const response = await fetch("/api/users/enable-mfa-all", {
        method: "POST",
      })
      if (!response.ok) throw new Error("Failed to enable MFA for all users")

      // Refresh the user list to reflect the changes
      await fetchUsers()

      toast({
        title: "Success",
        description: "MFA has been enabled for all users.",
      })
    } catch (error) {
      console.error("Error enabling MFA for all users:", error)
      toast({
        title: "Error",
        description: "Failed to enable MFA for all users. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleViewSessions = (user: User) => {
    setSelectedUser(user)
    setIsSessionManagementOpen(true)
  }

  const handleUnlockAccount = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}/unlock`, {
        method: "POST",
      })
      if (!response.ok) throw new Error("Failed to unlock account")

      // Refresh the user list to reflect the changes
      await fetchUsers()

      toast({
        title: "Success",
        description: "Account unlocked successfully.",
      })
    } catch (error) {
      console.error("Error unlocking account:", error)
      toast({
        title: "Error",
        description: "Failed to unlock account. Please try again.",
        variant: "destructive",
      })
    }
  }

  const filteredUsers = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((user) => filterRole === "all" || user.role === filterRole)
    .filter((user) => filterTenant === "all" || user.tenant === filterTenant)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">User Management</h1>
          <div className="space-x-2">
            <Button onClick={() => setIsAddUserOpen(true)}>
              <UserPlus className="mr-2 h-4 w-4" /> Add User
            </Button>
            <Button variant="outline" onClick={() => setIsRoleManagementOpen(true)}>
              <Shield className="mr-2 h-4 w-4" /> Manage Roles
            </Button>
            <Button variant="outline" onClick={() => setIsAuditTrailOpen(true)}>
              <Activity className="mr-2 h-4 w-4" /> View Audit Trail
            </Button>
            <Button variant="outline" onClick={() => setIsPasswordPolicyOpen(true)}>
              <Key className="mr-2 h-4 w-4" /> Password Policy
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">
                  <Lock className="mr-2 h-4 w-4" /> Enable MFA for All
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-[#1E1E1E] text-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>Enable MFA for All Users</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will enable Multi-Factor Authentication for all users. They will be required to set up
                    MFA on their next login. Are you sure you want to continue?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleEnableMFAForAll}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <Card className="bg-[#1E1E1E] border-gray-800">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white flex items-center justify-between">
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-cyber-blue" />
                User List
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
                <Select value={filterRole} onValueChange={setFilterRole}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.name}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterTenant} onValueChange={setFilterTenant}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by tenant" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tenants</SelectItem>
                    {tenants.map((tenant) => (
                      <SelectItem key={tenant.id} value={tenant.name}>
                        {tenant.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-400">Name</TableHead>
                  <TableHead className="text-gray-400">Email</TableHead>
                  <TableHead className="text-gray-400">Role</TableHead>
                  <TableHead className="text-gray-400">Tenant</TableHead>
                  <TableHead className="text-gray-400">MFA</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Last Login</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium text-white">{user.name}</TableCell>
                    <TableCell className="text-gray-300">{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-0">
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-300">{user.tenant}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          user.isMFAEnabled
                            ? "bg-green-500/10 text-green-500 border-0"
                            : "bg-yellow-500/10 text-yellow-500 border-0"
                        }
                      >
                        {user.isMFAEnabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          user.accountStatus === "Active"
                            ? "bg-green-500/10 text-green-500 border-0"
                            : user.accountStatus === "Locked"
                              ? "bg-red-500/10 text-red-500 border-0"
                              : "bg-yellow-500/10 text-yellow-500 border-0"
                        }
                      >
                        {user.accountStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-300">{user.lastLogin}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteUser(user.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleMFASetup(user)}>
                          <Lock className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleViewSessions(user)}>
                          <LogOut className="h-4 w-4" />
                        </Button>
                        {user.accountStatus === "Locked" && (
                          <Button variant="ghost" size="sm" onClick={() => handleUnlockAccount(user.id)}>
                            <Key className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="bg-[#1E1E1E] text-white">
          <DialogHeader>
            <DialogTitle>{selectedUser ? "Edit User" : "Add New User"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddUser}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="userName">Name</Label>
                <Input
                  id="userName"
                  name="name"
                  placeholder="Enter user name"
                  className="mt-1"
                  defaultValue={selectedUser?.name}
                />
              </div>
              <div>
                <Label htmlFor="userEmail">Email</Label>
                <Input
                  id="userEmail"
                  name="email"
                  type="email"
                  placeholder="Enter user email"
                  className="mt-1"
                  defaultValue={selectedUser?.email}
                />
              </div>
              <div>
                <Label htmlFor="userRole">Role</Label>
                <Select name="role" defaultValue={selectedUser?.role}>
                  <SelectTrigger id="userRole">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.name}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="userTenant">Tenant</Label>
                <Select name="tenant" defaultValue={selectedUser?.tenant}>
                  <SelectTrigger id="userTenant">
                    <SelectValue placeholder="Select tenant" />
                  </SelectTrigger>
                  <SelectContent>
                    {tenants.map((tenant) => (
                      <SelectItem key={tenant.id} value={tenant.name}>
                        {tenant.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button type="submit">{selectedUser ? "Update User" : "Add User"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <UserRoleManagementPanel
        isOpen={isRoleManagementOpen}
        onClose={() => setIsRoleManagementOpen(false)}
        roles={roles}
        setRoles={setRoles}
      />

      <AuditTrailModal isOpen={isAuditTrailOpen} onClose={() => setIsAuditTrailOpen(false)} />

      <MFASetupModal isOpen={isMFASetupOpen} onClose={() => setIsMFASetupOpen(false)} user={selectedUser} />

      <PasswordPolicyModal
        isOpen={isPasswordPolicyOpen}
        onClose={() => setIsPasswordPolicyOpen(false)}
        passwordPolicy={passwordPolicy}
      />

      <SessionManagementModal
        isOpen={isSessionManagementOpen}
        onClose={() => setIsSessionManagementOpen(false)}
        user={selectedUser}
      />
    </DashboardLayout>
  )
}

