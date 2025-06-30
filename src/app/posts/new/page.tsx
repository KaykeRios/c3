
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

export default function NewPostPage() {
  const { user } = useAuth()
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !content) {
      setError("Preencha todos os campos")
      return
    }

    try {
      const res = await fetch("/api/posts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, authorId: user?.id }),
      })

      if (!res.ok) throw new Error("Erro ao criar post")

      router.push("/posts")
    } catch (err) {
      setError("Erro ao criar post")
    }
  }

  if (!user) {
    return <p>Você precisa estar logado para criar um post.</p>
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Novo Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Título"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ display: "block", marginBottom: "0.5rem", width: "100%" }}
        />
        <textarea
          placeholder="Conteúdo"
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={5}
          style={{ display: "block", marginBottom: "0.5rem", width: "100%" }}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Publicar</button>
      </form>
    </div>
  )
}
