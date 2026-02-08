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
  description: string
  sectionCount: number
  sections: LearnSection[]
}

const pathOrder = ['foundations']

const pathLabels: Record<string, string> = {
  foundations: 'Foundations',
}

const pathDescriptions: Record<string, string> = {
  foundations:
    'Build the universal foundation for any tech career — from how computers work through infrastructure as code.',
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

export const sectionDescriptions: Record<string, string> = {
  'getting-started':
    'Welcome to the Foundations path. See the full roadmap, understand the structure, and get oriented before you begin.',
  'introduction-to-computers':
    'Hardware, software, binary, and the boot process. Understand the building blocks everything else is built on.',
  'os-fundamentals':
    'Processes, memory management, file systems, and user permissions. Learn what the operating system does for you.',
  linux:
    'Ubuntu terminal, apt, file operations, chmod/chown, and user management. Get hands-on with the server OS.',
  'text-editing':
    'Vim modes, navigation, editing, search/replace, and .vimrc configuration. Edit files anywhere, any time.',
  'shell-scripting':
    'Variables, conditionals, loops, pipes, redirects, and cron. Automate everything with Bash scripts.',
  programming:
    'Python syntax, data structures, functions, file I/O, virtual environments, and pip. Your general-purpose tool.',
  'version-control':
    'Git and GitHub: repos, commits, branches, merges, pull requests, and collaboration workflows.',
  'networking-fundamentals':
    'IP, TCP/UDP, DNS, HTTP, ports, firewalls, and SSH. Understand how computers communicate.',
  cicd:
    'GitHub Actions: workflows, triggers, jobs, secrets, and deploy pipelines. Automate testing and deployment.',
  containers:
    'Docker: images, Dockerfiles, volumes, networking, and Compose. Package applications for any environment.',
  'container-orchestration':
    'Kubernetes: pods, deployments, services, namespaces, and kubectl. Manage containers at scale.',
  iac:
    'Terraform: providers, resources, state, variables, and modules. Define infrastructure programmatically.',
}

export function getAllLearnSlugs(): string[][] {
  if (!fs.existsSync(LEARN_DIRECTORY)) return []

  const slugs: string[][] = []

  for (const pathName of pathOrder) {
    // Add 1-part slug for the path landing page
    slugs.push([pathName])

    const pathDir = path.join(LEARN_DIRECTORY, pathName)
    if (!fs.existsSync(pathDir)) continue

    const config = pathSections[pathName]
    if (!config) continue

    const allDirs = fs.readdirSync(pathDir).filter((dir) => {
      const fullPath = path.join(pathDir, dir)
      return fs.statSync(fullPath).isDirectory()
    })

    const sections = config.order.filter((s) => allDirs.includes(s))

    // Add 2-part slugs for each section (section name = filename)
    for (const section of sections) {
      slugs.push([pathName, section])
    }
  }

  return slugs
}

export function getAllLearnPaths(): LearnPath[] {
  return pathOrder.map((name) => {
    const config = pathSections[name]
    const sections = config ? getSidebarData(name) : []

    return {
      name,
      label: pathLabels[name] ?? name,
      description: pathDescriptions[name] ?? '',
      sectionCount: config ? config.order.length : 0,
      sections,
    }
  })
}

export function getPathData(pathName: string): LearnPath | null {
  if (!pathLabels[pathName]) return null

  const sections = getSidebarData(pathName)
  const config = pathSections[pathName]

  return {
    name: pathName,
    label: pathLabels[pathName],
    description: pathDescriptions[pathName] ?? '',
    sectionCount: config ? config.order.length : 0,
    sections,
  }
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
        slug: [pathName, section],
        title: data.title ?? section.replace(/-/g, ' '),
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
  if (slug.length < 2) return null

  // 2-part slug: [pathName, sectionName] — filename is inferred from section name
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
    sidebarPosition: data.sidebar_position ?? 99,
    contentHtml: result.toString(),
  }
}
