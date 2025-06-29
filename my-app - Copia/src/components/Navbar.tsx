
"use client"

import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <Link href="/" style={{ marginRight: "1rem" }}>Início</Link>
      {user ? (
        <>
          <span style={{ marginRight: "1rem" }}>Olá, {user.name}</span>
          <Link href="/dashboard" style={{ marginRight: "1rem" }}>Dashboard</Link>
          <button onClick={logout}>Sair</button>
        </>
      ) : (
        <>
          <Link href="/login" style={{ marginRight: "1rem" }}>Login</Link>
          <Link href="/register">Registrar</Link>
        </>
      )}
    </nav>
  )
}
