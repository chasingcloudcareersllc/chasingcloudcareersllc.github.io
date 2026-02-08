import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeMermaid from 'rehype-mermaid'
import rehypeStringify from 'rehype-stringify'

const POSTS_DIRECTORY = path.join(process.cwd(), 'content/blog/posts')

export type BlogPostMeta = {
  slug: string
  title: string
  date: string
  excerpt: string
  author: string
  tags: string[]
  readingTime: number
}

export type BlogPost = BlogPostMeta & {
  contentHtml: string
}

function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

function slugFromFilename(filename: string): string {
  return filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '')
}

function dateFromFilename(filename: string): string {
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})/)
  return match ? match[1] : ''
}

function normalizeDate(value: unknown, filename: string): string {
  if (value instanceof Date) return value.toISOString().split('T')[0]
  if (typeof value === 'string' && value) return value
  return dateFromFilename(filename)
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIRECTORY)) return []

  return fs
    .readdirSync(POSTS_DIRECTORY)
    .filter((file) => file.endsWith('.md'))
    .map(slugFromFilename)
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(POSTS_DIRECTORY)) return []

  const files = fs.readdirSync(POSTS_DIRECTORY).filter((file) => file.endsWith('.md'))

  const posts = files
    .map((filename) => {
      const filePath = path.join(POSTS_DIRECTORY, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)

      if (data.draft && process.env.NODE_ENV === 'production') return null

      const meta: BlogPostMeta = {
        slug: slugFromFilename(filename),
        title: data.title ?? '',
        date: normalizeDate(data.date, filename),
        excerpt: data.excerpt ?? '',
        author: data.author ?? '',
        tags: data.tags ?? [],
        readingTime: calculateReadingTime(content),
      }

      return meta
    })
    .filter((post): post is BlogPostMeta => post !== null)

  posts.sort((a, b) => (a.date > b.date ? -1 : 1))

  return posts
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!fs.existsSync(POSTS_DIRECTORY)) return null

  const files = fs.readdirSync(POSTS_DIRECTORY).filter((file) => file.endsWith('.md'))

  const filename = files.find((file) => slugFromFilename(file) === slug)
  if (!filename) return null

  const filePath = path.join(POSTS_DIRECTORY, filename)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  if (data.draft && process.env.NODE_ENV === 'production') return null

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeMermaid, {
      strategy: 'inline-svg',
      mermaidConfig: { theme: 'neutral' },
    })
    .use(rehypeStringify)
    .process(content)

  return {
    slug,
    title: data.title ?? '',
    date: normalizeDate(data.date, filename),
    excerpt: data.excerpt ?? '',
    author: data.author ?? '',
    tags: data.tags ?? [],
    readingTime: calculateReadingTime(content),
    contentHtml: result.toString(),
  }
}
