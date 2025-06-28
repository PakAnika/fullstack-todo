import ReactMarkdown from 'react-markdown'

interface PostFull {
  slug: string
  title: string
  content: string
  author: string
  date: string
  category: string
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const res = await fetch(`http://localhost:8000/api/posts/${params.slug}`)
  if (!res.ok) throw new Error('Пост не найден')
  const post: PostFull = await res.json()

  return (
    <main className="max-w-2xl mx-auto p-6 bg-white shadow mt-10 rounded">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">Автор: {post.author} | Дата: {post.date}</p>
      <div className="prose"><ReactMarkdown>{post.content}</ReactMarkdown></div>
    </main>
  )
}
