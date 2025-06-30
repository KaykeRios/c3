
"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

export default function EditPostPage() {
  const { id } = useParams()
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch("/api/posts/" + id)
      const data = await res.json()
      setTitle(data.title)
      setContent(data.content)
      setLoading(false)
    }
    fetchPost()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch("/api/posts/" + id + "/edit", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      })

      if (!res.ok) throw new Error("Erro ao editar")

      router.push("/posts/" + id)
    } catch {
      setError("Erro ao salvar alterações")
    }
  }

  if (loading) return <p>Carregando...</p>

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Editar Post</h1>
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
        <button type="submit">Salvar</button>
      </form>
    </div>
  )
}
