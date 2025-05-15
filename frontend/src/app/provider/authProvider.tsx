import { Toaster } from "@/components/ui/sonner"
import axios from "axios"
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import type { AuthContextType } from "../interfaces/auth"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken_] = useState<string | null>(localStorage.getItem("token"))

  const setToken = (newToken: string | null) => {
    if (newToken) {
      const expirationTime = 600000
      const expirationDate = new Date().getTime() + expirationTime

      localStorage.setItem("token", newToken)
      localStorage.setItem("tokenExpiration", expirationDate.toString())

    } else {
      localStorage.removeItem("token")
      localStorage.removeItem("tokenExpiration")
    }

    setToken_(newToken)
  }

  useEffect(() => {

    const storedTokenExpiration = localStorage.getItem("tokenExpiration")

    if (storedTokenExpiration) {
      const expirationTime = parseInt(storedTokenExpiration, 10)
      const currentTime = new Date().getTime()


      if (currentTime > expirationTime) {
        setToken(null)
      } else {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      }
    } else {
      delete axios.defaults.headers.common["Authorization"]
    }
  }, [token])

  const logout = useCallback(() => {
    localStorage.removeItem("token")
    localStorage.removeItem("tokenExpiration")
    localStorage.removeItem("user")
    setToken(null)
  }, [])


  const contextValue = useMemo(() => ({ token, setToken, logout }), [token, logout])

  return (
    <AuthContext.Provider value={contextValue}>{children}
      <Toaster richColors theme="light" toastOptions={{}} position="top-center" />
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}


export default AuthProvider