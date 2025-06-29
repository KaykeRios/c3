
"use client"

import { useEffect, useState } from "react"

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

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/posts")
      const data = await res.json()
      setPosts(data)
      setLoading(false)
    }
    fetchPosts()
  }, [])

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Postagens</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : posts.length === 0 ? (
        <p>Nenhuma postagem encontrada.</p>
      ) : (
        posts.map(post => (
          <div key={post.id} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p style={{ fontSize: "0.9rem", color: "#555" }}>
              Por: {post.author.name} ({post.author.email}) <br />
              Em: {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  )
}
