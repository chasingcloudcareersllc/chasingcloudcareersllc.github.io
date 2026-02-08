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

export type LearnPath = {
  name: string
  label: string
  sections: LearnSection[]
}

const pathOrder = ['foundations']

const pathLabels: Record<string, string> = {
  foundations: 'Foundations',
}

const pathSections: Record<string, { order: string[]; labels: Record<string, string> }> = {
  foundations: {
    order: [
      'getting-started',
      'introduction-to-computers',
      'os-fundamentals',
      'linux',
      'text-editing',
      'shell-scripting',
      'programming',
      'version-control',
      'networking-fundamentals',
      'cicd',
      'containers',
      'container-orchestration',
      'iac',
    ],
    labels: {
      'getting-started': 'Getting Started',
      'introduction-to-computers': 'Introduction to Computers',
      'os-fundamentals': 'OS Fundamentals',
      linux: 'Linux',
      'text-editing': 'Text Editing',
      'shell-scripting': 'Shell Scripting',
      programming: 'Programming',
      'version-control': 'Version Control',
      'networking-fundamentals': 'Networking Fundamentals',
      cicd: 'CI/CD',
      containers: 'Containers',
      'container-orchestration': 'Container Orchestration',
      iac: 'Infrastructure as Code',
    },
  },
}

export function getAllLearnSlugs(): string[][] {
  if (!fs.existsSync(LEARN_DIRECTORY)) return []

  const slugs: string[][] = []

  for (const pathName of pathOrder) {
    const pathDir = path.join(LEARN_DIRECTORY, pathName)
    if (!fs.existsSync(pathDir)) continue

    const config = pathSections[pathName]
    if (!config) continue

    const allDirs = fs.readdirSync(pathDir).filter((dir) => {
      const fullPath = path.join(pathDir, dir)
      return fs.statSync(fullPath).isDirectory()
    })

    const sections = config.order.filter((s) => allDirs.includes(s))

    for (const section of sections) {
      const sectionDir = path.join(pathDir, section)
      const files = fs.readdirSync(sectionDir).filter((f) => f.endsWith('.md'))
      for (const file of files) {
        const slug = file.replace(/\.md$/, '')
        slugs.push([pathName, section, slug])
      }
    }
  }

  return slugs
}

export function getSidebarData(pathName: string): LearnSection[] {
  const pathDir = path.join(LEARN_DIRECTORY, pathName)
  if (!fs.existsSync(pathDir)) return []

  const config = pathSections[pathName]
  if (!config) return []

  const allDirs = fs.readdirSync(pathDir).filter((dir) => {
    const fullPath = path.join(pathDir, dir)
    return fs.statSync(fullPath).isDirectory()
  })

  const sections = config.order.filter((s) => allDirs.includes(s))

  return sections.map((section) => {
    const sectionDir = path.join(pathDir, section)
    const files = fs.readdirSync(sectionDir).filter((f) => f.endsWith('.md'))

    const pages = files.map((file) => {
      const filePath = path.join(sectionDir, file)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug: [pathName, section, file.replace(/\.md$/, '')],
        title: data.title ?? file.replace(/\.md$/, '').replace(/-/g, ' '),
        description: data.description ?? '',
        sidebarPosition: data.sidebar_position ?? 99,
      }
    })

    pages.sort((a, b) => a.sidebarPosition - b.sidebarPosition)

    return {
      name: section,
      label: config.labels[section] ?? section,
      pages,
    }
  })
}

export async function getLearnPage(slug: string[]): Promise<LearnPage | null> {
  if (slug.length < 3) return null

  const filePath = path.join(LEARN_DIRECTORY, slug[0], slug[1], `${slug[2]}.md`)
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
    title: data.title ?? slug[2].replace(/-/g, ' '),
    description: data.description ?? '',
    sidebarPosition: data.sidebar_position ?? 99,
    contentHtml: result.toString(),
  }
}
