import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostsByCategory } from '@/lib/posts'
import PostCard from '@/components/PostCard'

const VALID_CATEGORIES = ['roofing', 'plumbing', 'hvac', 'general']

interface Props {
  params: Promise<{ category: string }>
}

export function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({ category }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  if (!VALID_CATEGORIES.includes(category.toLowerCase())) return {}

  const display = category.charAt(0).toUpperCase() + category.slice(1)

  return {
    title: `${display} Contractor Reviews`,
    description: `Independent ${display.toLowerCase()} contractor recommendations for Utah Valley and Salt Lake County homeowners.`,
    openGraph: {
      title: `${display} Contractor Reviews | Utah Home Pro`,
      description: `Independent ${display.toLowerCase()} contractor recommendations for Utah Valley and Salt Lake County homeowners.`,
    },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params

  if (!VALID_CATEGORIES.includes(category.toLowerCase())) return notFound()

  const posts = getPostsByCategory(category)
  const display = category.charAt(0).toUpperCase() + category.slice(1)

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm text-gray-400 hover:text-accent transition-colors mb-3 inline-block"
        >
          &larr; All posts
        </Link>
        <h1 className="font-lora text-4xl font-bold text-charcoal mb-2">
          {display}
        </h1>
        <p className="text-gray-500">
          Independent {display.toLowerCase()} contractor recommendations for
          Utah homeowners.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-gray-400 mb-4">
            No posts yet in this category.
          </p>
          <Link
            href="/"
            className="text-sm text-accent hover:underline"
          >
            View all posts &rarr;
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
