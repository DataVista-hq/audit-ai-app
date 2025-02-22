import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Checkbox } from "../components/ui/checkbox"
import type { Role } from "../../types/user-management"

interface UserRoleManagementPanelProps {
  isOpen: boolean
  onClose: () => void
  roles: Role[]
  setRoles: React.Dispatch<React.SetStateAction<Role[]>>
}

export default function UserRoleManagementPanel({ isOpen, onClose, roles, setRoles }: UserRoleManagementPanelProps) {
  const [newRole, setNewRole] = useState<Role>({ id: "", name: "", permissions: [] })

  const handleAddRole = () => {
    setRoles([...roles, { ...newRole, id: (roles.length + 1).toString() }])
    setNewRole({ id: "", name: "", permissions: [] })
  }

  const handlePermissionChange = (permission: string) => {
    if (newRole.permissions.includes(permission)) {
      setNewRole({ ...newRole, permissions: newRole.permissions.filter((p) => p !== permission) })
    } else {
      setNewRole({ ...newRole, permissions: [...newRole.permissions, permission] })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1E1E1E] text-white max-w-4xl">
        <DialogHeader>
          <DialogTitle>User Role Management</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="roleName">New Role Name</Label>
            <Input
              id="roleName"
              value={newRole.name}
              onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
              placeholder="Enter role name"
              className="mt-1"
            />
          </div>
          <div>
            <Label>Permissions</Label>
            <div className="mt-2 space-y-2">
              {["read", "write", "delete", "manage_users"].map((permission) => (
                <div key={permission} className="flex items-center">
                  <Checkbox
                    id={`permission-${permission}`}
                    checked={newRole.permissions.includes(permission)}
                    onCheckedChange={() => handlePermissionChange(permission)}
                  />
                  <label
                    htmlFor={`permission-${permission}`}
                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {permission}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <Button onClick={handleAddRole}>Add Role</Button>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Existing Roles</h3>
          <ul className="space-y-2">
            {roles.map((role) => (
              <li key={role.id} className="flex justify-between items-center">
                <span>{role.name}</span>
                <span className="text-sm text-gray-400">{role.permissions.join(", ")}</span>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}

