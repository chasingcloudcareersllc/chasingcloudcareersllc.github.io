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
  icon?: string
}

export type LearnPage = LearnPageMeta & {
  contentHtml: string
}

export type LearnPath = {
  name: string
  label: string
  description: string
  icon?: string
  sectionCount: number
  pages: LearnPageMeta[]
}

type PathMeta = {
  name: string
  label: string
  description: string
  icon?: string
  position: number
}

function discoverPaths(): PathMeta[] {
  if (!fs.existsSync(LEARN_DIRECTORY)) return []

  const entries = fs.readdirSync(LEARN_DIRECTORY).filter((entry) => {
    const fullPath = path.join(LEARN_DIRECTORY, entry)
    return fs.statSync(fullPath).isDirectory()
  })

  const paths: PathMeta[] = []

  for (const entry of entries) {
    const pathMetaFile = path.join(LEARN_DIRECTORY, entry, '_path.md')
    if (!fs.existsSync(pathMetaFile)) continue

    const fileContents = fs.readFileSync(pathMetaFile, 'utf8')
    const { data } = matter(fileContents)

    paths.push({
      name: entry,
      label: data.title ?? entry.replace(/-/g, ' '),
      description: data.description ?? '',
      icon: data.icon,
      position: data.position ?? 99,
    })
  }

  paths.sort((a, b) => a.position - b.position)
  return paths
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
      icon: data.icon,
    })
  }

  pages.sort((a, b) => a.position - b.position)
  return pages
}

export function getAllLearnSlugs(): string[][] {
  const paths = discoverPaths()
  const slugs: string[][] = []

  for (const p of paths) {
    slugs.push([p.name])

    const pages = getPathPages(p.name)
    for (const page of pages) {
      slugs.push(page.slug)
    }
  }

  return slugs
}

export function getAllLearnPaths(): LearnPath[] {
  return discoverPaths().map((p) => {
    const pages = getPathPages(p.name)

    return {
      name: p.name,
      label: p.label,
      description: p.description,
      icon: p.icon,
      sectionCount: pages.length,
      pages,
    }
  })
}

export function getPathData(pathName: string): LearnPath | null {
  const paths = discoverPaths()
  const meta = paths.find((p) => p.name === pathName)
  if (!meta) return null

  const pages = getPathPages(pathName)

  return {
    name: meta.name,
    label: meta.label,
    description: meta.description,
    icon: meta.icon,
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
    icon: data.icon,
    contentHtml: result.toString(),
  }
}
