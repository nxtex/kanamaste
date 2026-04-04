"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export interface AuthUser {
  email: string
  name: string
  avatar: string
}

const DEMO_USER: AuthUser = {
  email: 'anas@kanamaste.fr',
  name: 'Anas K.',
  avatar: 'AK',
}

interface AuthCtx {
  user: AuthUser | null
  login: (email: string, password: string) => boolean
  logout: () => void
  isLoggedIn: boolean
}

const AuthContext = createContext<AuthCtx | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)

  const login = useCallback((email: string, password: string): boolean => {
    if (
      email.trim().toLowerCase() === 'anas@kanamaste.fr' &&
      password === 'anas'
    ) {
      setUser(DEMO_USER)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => setUser(null), [])

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
