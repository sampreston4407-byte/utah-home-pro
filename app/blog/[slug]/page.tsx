import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts, getPostBySlug, getPostsByCategory, extractFAQs } from '@/lib/posts'
import PostCard from '@/components/PostCard'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: ['Utah Home Pro'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return notFound()

  const relatedPosts = getPostsByCategory(post.category)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3)

  const faqs = extractFAQs(post.content)

  const formattedDate = new Date(post.date + 'T00:00:00').toLocaleDateString(
    'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: 'Utah Home Pro',
      url: 'https://utahhomepro.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Utah Home Pro',
      url: 'https://utahhomepro.com',
    },
    description: post.description,
    url: `https://utahhomepro.com/blog/${post.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://utahhomepro.com/blog/${post.slug}`,
    },
  }

  const faqJsonLd =
    faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <article className="max-w-[720px] mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-accent transition-colors">
            Home
          </Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link
            href={`/category/${post.category.toLowerCase()}`}
            className="hover:text-accent transition-colors capitalize"
          >
            {post.category}
          </Link>
        </nav>

        {/* Post header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Link
              href={`/category/${post.category.toLowerCase()}`}
              className="text-xs font-semibold uppercase tracking-wide text-accent hover:underline"
            >
              {post.category}
            </Link>
            <span className="text-gray-300 text-xs" aria-hidden="true">&middot;</span>
            <span className="text-xs text-gray-400">{post.readTime}</span>
          </div>

          <h1 className="font-lora text-3xl md:text-4xl font-bold text-charcoal leading-snug mb-5">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 text-sm text-gray-500 pb-6 border-b border-gray-100">
            <span>Utah Home Pro Staff</span>
            <span aria-hidden="true">&middot;</span>
            <time dateTime={post.date}>{formattedDate}</time>
          </div>
        </header>

        {/* MDX content */}
        <div className="prose prose-lg max-w-none">
          <MDXRemote source={post.content} />
        </div>
      </article>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-gray-100 py-12 px-4">
          <div className="max-w-[720px] mx-auto">
            <h2 className="font-lora text-2xl font-semibold text-charcoal mb-6">
              More {post.category} Posts
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {relatedPosts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
