import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface Post {
  slug: string
  title: string
  date: string
  category: string
  description: string
  featured: boolean
  readTime: string
  content: string
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) return []

  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      return getPostBySlug(slug)!
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export function getPostBySlug(slug: string): Post | undefined {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)

  if (!fs.existsSync(fullPath)) return undefined

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const stats = readingTime(content)

  return {
    slug,
    title: data.title,
    date: data.date,
    category: data.category,
    description: data.description,
    featured: data.featured || false,
    readTime: stats.text,
    content,
  }
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  )
}

export function getAllCategories(): string[] {
  const posts = getAllPosts()
  return [...new Set(posts.map((post) => post.category))]
}

export interface FAQ {
  question: string
  answer: string
}

export function extractFAQs(content: string): FAQ[] {
  const faqs: FAQ[] = []
  const lines = content.split('\n')

  let inFAQSection = false
  let currentQuestion = ''
  let currentAnswerLines: string[] = []

  const pushCurrent = () => {
    if (currentQuestion && currentAnswerLines.length > 0) {
      faqs.push({
        question: currentQuestion,
        answer: currentAnswerLines.join(' ').trim(),
      })
    }
    currentQuestion = ''
    currentAnswerLines = []
  }

  for (const line of lines) {
    if (/^## Frequently Asked Questions/i.test(line)) {
      inFAQSection = true
      continue
    }

    if (inFAQSection && /^## /.test(line)) {
      break
    }

    if (!inFAQSection) continue

    const questionMatch = line.match(/^\*\*(.+\?)\*\*$/)
    if (questionMatch) {
      pushCurrent()
      currentQuestion = questionMatch[1].trim()
    } else if (currentQuestion && line.trim() && !line.startsWith('#')) {
      currentAnswerLines.push(line.trim())
    }
  }

  pushCurrent()

  return faqs
}
