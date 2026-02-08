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
  sidebarPosition: number
}

export type LearnPage = LearnPageMeta & {
  contentHtml: string
}

export type LearnSection = {
  name: string
  label: string
  pages: LearnPageMeta[]
}

export function getAllLearnSlugs(): string[][] {
  if (!fs.existsSync(LEARN_DIRECTORY)) return []

  const slugs: string[][] = []
  const sections = fs.readdirSync(LEARN_DIRECTORY).filter((dir) => {
    const fullPath = path.join(LEARN_DIRECTORY, dir)
    return fs.statSync(fullPath).isDirectory()
  })

  for (const section of sections) {
    const sectionDir = path.join(LEARN_DIRECTORY, section)
    const files = fs.readdirSync(sectionDir).filter((f) => f.endsWith('.md'))
    for (const file of files) {
      const slug = file.replace(/\.md$/, '')
      slugs.push([section, slug])
    }
  }

  return slugs
}

export function getSidebarData(): LearnSection[] {
  if (!fs.existsSync(LEARN_DIRECTORY)) return []

  const sectionOrder = ['getting-started']
  const sectionLabels: Record<string, string> = {
    'getting-started': 'Getting Started',
  }

  const allDirs = fs.readdirSync(LEARN_DIRECTORY).filter((dir) => {
    const fullPath = path.join(LEARN_DIRECTORY, dir)
    return fs.statSync(fullPath).isDirectory()
  })

  const sections = sectionOrder.filter((s) => allDirs.includes(s))

  return sections.map((section) => {
    const sectionDir = path.join(LEARN_DIRECTORY, section)
    const files = fs.readdirSync(sectionDir).filter((f) => f.endsWith('.md'))

    const pages = files.map((file) => {
      const filePath = path.join(sectionDir, file)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug: [section, file.replace(/\.md$/, '')],
        title: data.title ?? file.replace(/\.md$/, '').replace(/-/g, ' '),
        description: data.description ?? '',
        sidebarPosition: data.sidebar_position ?? 99,
      }
    })

    pages.sort((a, b) => a.sidebarPosition - b.sidebarPosition)

    return {
      name: section,
      label: sectionLabels[section] ?? section,
      pages,
    }
  })
}

export async function getLearnPage(slug: string[]): Promise<LearnPage | null> {
  if (slug.length < 2) return null

  const filePath = path.join(LEARN_DIRECTORY, slug[0], `${slug[1]}.md`)
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
    title: data.title ?? slug[1].replace(/-/g, ' '),
    description: data.description ?? '',
    sidebarPosition: data.sidebar_position ?? 99,
    contentHtml: result.toString(),
  }
}
