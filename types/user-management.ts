export interface User {
    id: string
    name: string
    email: string
    role: string
    tenant: string
    isMFAEnabled: boolean
    lastPasswordChange: string
    accountStatus: 'Active' | 'Locked' | 'Inactive'
    lastLogin: string
  }
  
  export interface Role {
    id: string
    name: string
    permissions: string[]
  }
  
  export interface Tenant {
    id: string
    name: string
  }
  
  export interface PasswordPolicy {
    minLength: number
    requireUppercase: boolean
    requireLowercase: boolean
    requireNumbers: boolean
    requireSpecialChars: boolean
    expirationDays: number
  }
  
  export interface SessionInfo {
    activeSessions: number
    lastActiveSession: string
  }
  