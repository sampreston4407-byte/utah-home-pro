import Link from 'next/link'
import { Post } from '@/lib/posts'

interface PostCardProps {
  post: Post
  featured?: boolean
}

export default function PostCard({ post, featured }: PostCardProps) {
  const formattedDate = new Date(post.date + 'T00:00:00').toLocaleDateString(
    'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  return (
    <article
      className={`border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow flex flex-col ${
        featured ? 'bg-gray-50' : 'bg-white'
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <Link
          href={`/category/${post.category.toLowerCase()}`}
          className="text-xs font-semibold uppercase tracking-wide text-accent hover:underline"
        >
          {post.category}
        </Link>
        <span className="text-gray-300 text-xs">&middot;</span>
        <span className="text-xs text-gray-400">{post.readTime}</span>
      </div>

      <Link href={`/blog/${post.slug}`} className="flex-1">
        <h2 className="font-lora text-lg font-semibold text-charcoal hover:text-accent transition-colors leading-snug mb-2">
          {post.title}
        </h2>
      </Link>

      <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
        {post.description}
      </p>

      <time
        dateTime={post.date}
        className="text-xs text-gray-400 mt-auto"
      >
        {formattedDate}
      </time>
    </article>
  )
}
