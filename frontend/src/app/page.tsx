'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Post {
  slug: string
  title: string
  content: string
  author: string
  date: string
  category: string
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    fetch('http://localhost:8000/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(console.error)
  }, [])

  const categories = [...new Set(posts.map(p => p.category))]
  const filtered = selectedCategory ? posts.filter(p => p.category === selectedCategory) : posts

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Минималистичный блог</h1>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          className={`px-3 py-1 rounded ${selectedCategory === null ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setSelectedCategory(null)}
        >
          Все категории
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            className={`px-3 py-1 rounded ${selectedCategory === cat ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.map(post => (
        <div key={post.slug} className="mb-8 p-4 border rounded shadow bg-white">
          <Link href={`/posts/${post.slug}`}>
            <h2 className="text-xl font-semibold hover:underline">{post.title}</h2>
          </Link>
          <p className="text-sm text-gray-500">Автор: {post.author} | Дата: {post.date}</p>
          <p className="text-gray-700 mt-2">{post.content.slice(0, 100)}...</p>
        </div>
      ))}
    </main>
  )
}
