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

const LEARN_DIRECTORY = path.join(process.cwd(), 'content/learn')

export type LearnPageMeta = {
  slug: string[]
  title: string
  description: string
  position: number
}

export type LearnPage = LearnPageMeta & {
  contentHtml: string
}

export type LearnPath = {
  name: string
  label: string
  description: string
  sectionCount: number
  pages: LearnPageMeta[]
}

const pathOrder = ['foundations']

const pathLabels: Record<string, string> = {
  foundations: 'Foundations',
}

const pathDescriptions: Record<string, string> = {
  foundations:
    'Build the universal foundation for any tech career — from how computers work through infrastructure as code.',
}

function getPathPages(pathName: string): LearnPageMeta[] {
  const pathDir = path.join(LEARN_DIRECTORY, pathName)
  if (!fs.existsSync(pathDir)) return []

  const dirs = fs.readdirSync(pathDir).filter((dir) => {
    const fullPath = path.join(pathDir, dir)
    return fs.statSync(fullPath).isDirectory()
  })

  const pages: LearnPageMeta[] = []

  for (const dir of dirs) {
    const filePath = path.join(pathDir, dir, `${dir}.md`)
    if (!fs.existsSync(filePath)) continue

    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContents)

    pages.push({
      slug: [pathName, dir],
      title: data.title ?? dir.replace(/-/g, ' '),
      description: data.description ?? '',
      position: data.position ?? 99,
    })
  }

  pages.sort((a, b) => a.position - b.position)
  return pages
}

export function getAllLearnSlugs(): string[][] {
  if (!fs.existsSync(LEARN_DIRECTORY)) return []

  const slugs: string[][] = []

  for (const pathName of pathOrder) {
    slugs.push([pathName])

    const pages = getPathPages(pathName)
    for (const page of pages) {
      slugs.push(page.slug)
    }
  }

  return slugs
}

export function getAllLearnPaths(): LearnPath[] {
  return pathOrder.map((name) => {
    const pages = getPathPages(name)

    return {
      name,
      label: pathLabels[name] ?? name,
      description: pathDescriptions[name] ?? '',
      sectionCount: pages.length,
      pages,
    }
  })
}

export function getPathData(pathName: string): LearnPath | null {
  if (!pathLabels[pathName]) return null

  const pages = getPathPages(pathName)

  return {
    name: pathName,
    label: pathLabels[pathName],
    description: pathDescriptions[pathName] ?? '',
    sectionCount: pages.length,
    pages,
  }
}

export async function getLearnPage(slug: string[]): Promise<LearnPage | null> {
  if (slug.length < 2) return null

  const [pathName, sectionName] = slug
  const filePath = path.join(LEARN_DIRECTORY, pathName, sectionName, `${sectionName}.md`)
  if (!fs.existsSync(filePath)) return null

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

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
    title: data.title ?? sectionName.replace(/-/g, ' '),
    description: data.description ?? '',
    position: data.position ?? 99,
    contentHtml: result.toString(),
  }
}
