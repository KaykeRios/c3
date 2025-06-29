
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [isLoading, user, router])

  if (isLoading || !user) {
    return <p>Carregando...</p>
  }

  return (
    <div>
      <h1>Bem-vindo, {user.name}!</h1>
      <p>Email: {user.email}</p>
    </div>
  )
}
