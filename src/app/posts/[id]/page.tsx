
"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

interface Post {
  id: number
  title: string
  content: string
  createdAt: string
  author: {
    name: string
    email: string
  }
}

export default function PostDetailPage() {
  const params = useParams()
  const { id } = params
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch("/api/posts/" + id)
      const data = await res.json()
      setPost(data)
      setLoading(false)
    }

    if (id) fetchPost()
  }, [id])
  const handleDelete = async () => {
    const confirm = window.confirm("Tem certeza que deseja deletar este post?")
    if (!confirm) return

    const res = await fetch("/api/posts/" + id, { method: "DELETE" })
    if (res.ok) {
      window.location.href = "/posts"
    } else {
      alert("Erro ao deletar post")
    }
  }
    

  if (loading) return <p>Carregando...</p>
  if (!post) return <p>Post não encontrado.</p>

  return (
    <div style={{ padding: "1rem" }}>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p style={{ fontSize: "0.9rem", color: "#555" }}>
        Por: {post.author.name} ({post.author.email})<br />
        Em: {new Date(post.createdAt).toLocaleString()}
      </p>
    </div>
  )
}
