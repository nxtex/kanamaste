"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react'
import { useRouter } from 'next/navigation'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AuthOrder {
  id: string
  date: string
  total: number
  status: 'livré' | 'en cours' | 'annulé'
  items: { name: string; qty: number; price: number }[]
}

export interface AuthUser {
  email: string
  name: string
  firstName: string
  avatar: string          // initials fallback
  role: 'admin' | 'client'
  joinedAt: string        // ISO date string
  orders: AuthOrder[]
}

interface AuthCtx {
  user: AuthUser | null
  isLoggedIn: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
}

// ─── Demo credentials ─────────────────────────────────────────────────────────
// login  : anas@kanamaste.fr
// password: anas

const DEMO_USER: AuthUser = {
  email: 'anas@kanamaste.fr',
  name: 'Anas K.',
  firstName: 'Anas',
  avatar: 'AK',
  role: 'admin',
  joinedAt: '2024-03-15',
  orders: [
    {
      id: 'KM-2025-001',
      date: '2025-11-20',
      total: 34.90,
      status: 'livré',
      items: [
        { name: 'Amnesia Haze CBD', qty: 1, price: 18.90 },
        { name: 'OG Kush CBD', qty: 1, price: 16.00 },
      ],
    },
    {
      id: 'KM-2026-002',
      date: '2026-02-08',
      total: 52.40,
      status: 'livré',
      items: [
        { name: 'Gorilla Glue CBD', qty: 2, price: 22.00 },
        { name: 'Coffret Découverte', qty: 1, price: 8.40 },
      ],
    },
    {
      id: 'KM-2026-003',
      date: '2026-03-28',
      total: 69.90,
      status: 'en cours',
      items: [
        { name: 'Coffret Relaxation', qty: 1, price: 69.90 },
      ],
    },
  ],
}

// ─── Context ──────────────────────────────────────────────────────────────────

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
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

/** Base hook — throws if used outside AuthProvider */
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}

/**
 * useRequireAuth — redirects to /mon-compte if the user is not logged in.
 * Use at the top of any protected page component.
 *
 * @example
 * const { user } = useRequireAuth()
 * if (!user) return null   // avoids flash before redirect
 */
export function useRequireAuth(redirectTo = '/mon-compte') {
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!auth.isLoggedIn) {
      router.replace(redirectTo)
    }
  }, [auth.isLoggedIn, router, redirectTo])

  return auth
}
