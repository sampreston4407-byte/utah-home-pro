import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'

export const metadata: Metadata = {
  title: 'Utah Home Pro — Honest Contractor Recommendations for Utah Homeowners',
  description:
    'Independent roofing, plumbing, and HVAC contractor recommendations for Utah Valley and Salt Lake County homeowners.',
}

const CATEGORIES = ['Roofing', 'Plumbing', 'HVAC', 'General']

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Utah Home Pro',
  description:
    'Honest contractor recommendations for Utah homeowners covering Utah Valley and Salt Lake County.',
  url: 'https://utahhomepro.com',
}

export default function HomePage() {
  const posts = getAllPosts()
  const featuredPosts = posts.filter((p) => p.featured)
  const recentPosts = posts.filter((p) => !p.featured)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      {/* Hero */}
      <section className="border-b border-gray-200 py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-lora text-4xl md:text-5xl font-bold text-charcoal mb-3 leading-tight">
            Utah Home Pro
          </h1>
          <p className="text-xl text-gray-500 font-light">
            Honest contractor recommendations for Utah homeowners
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-b border-gray-100 py-4 px-4 bg-white">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/category/${cat.toLowerCase()}`}
              className="px-4 py-1.5 text-sm font-medium border border-gray-300 rounded-full text-gray-600 hover:border-accent hover:text-accent transition-colors"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Posts */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-10">
          {featuredPosts.length > 0 && (
            <div>
              <h2 className="font-lora text-2xl font-semibold text-charcoal mb-6 pb-2 border-b border-gray-100">
                Featured
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                {featuredPosts.map((post) => (
                  <PostCard key={post.slug} post={post} featured />
                ))}
              </div>
            </div>
          )}

          {recentPosts.length > 0 && (
            <div>
              <h2 className="font-lora text-2xl font-semibold text-charcoal mb-6 pb-2 border-b border-gray-100">
                Recent Posts
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                {recentPosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          )}

          {posts.length === 0 && (
            <p className="text-gray-500 text-center py-12">
              No posts yet. Check back soon.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
