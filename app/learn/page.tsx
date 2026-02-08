import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Compass,
  Monitor,
  Cpu,
  Terminal,
  PenTool,
  FileCode,
  Code,
  GitBranch,
  Network,
  RefreshCw,
  Container,
  Ship,
  Blocks,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Learning Paths',
  description: 'Free self-service training materials for cloud computing, AI, and DevOps. Start your tech career learning journey today.',
  alternates: {
    canonical: '/learn/',
  },
}

export default function LearnPage() {
  const sections = [
    {
      icon: Compass,
      title: 'Getting Started',
      description: 'Welcome to the Foundations path. See the full roadmap, understand the structure, and get oriented before you begin.',
      href: '/learn/foundations/getting-started/getting-started/',
    },
    {
      icon: Monitor,
      title: 'Introduction to Computers',
      description: 'Hardware, software, binary, and the boot process. Understand the building blocks everything else is built on.',
      href: '/learn/foundations/introduction-to-computers/introduction-to-computers/',
    },
    {
      icon: Cpu,
      title: 'OS Fundamentals',
      description: 'Processes, memory management, file systems, and user permissions. Learn what the operating system does for you.',
      href: '/learn/foundations/os-fundamentals/os-fundamentals/',
    },
    {
      icon: Terminal,
      title: 'Linux',
      description: 'Ubuntu terminal, apt, file operations, chmod/chown, and user management. Get hands-on with the server OS.',
      href: '/learn/foundations/linux/linux/',
    },
    {
      icon: PenTool,
      title: 'Text Editing',
      description: 'Vim modes, navigation, editing, search/replace, and .vimrc configuration. Edit files anywhere, any time.',
      href: '/learn/foundations/text-editing/text-editing/',
    },
    {
      icon: FileCode,
      title: 'Shell Scripting',
      description: 'Variables, conditionals, loops, pipes, redirects, and cron. Automate everything with Bash scripts.',
      href: '/learn/foundations/shell-scripting/shell-scripting/',
    },
    {
      icon: Code,
      title: 'Programming',
      description: 'Python syntax, data structures, functions, file I/O, virtual environments, and pip. Your general-purpose tool.',
      href: '/learn/foundations/programming/programming/',
    },
    {
      icon: GitBranch,
      title: 'Version Control',
      description: 'Git and GitHub: repos, commits, branches, merges, pull requests, and collaboration workflows.',
      href: '/learn/foundations/version-control/version-control/',
    },
    {
      icon: Network,
      title: 'Networking Fundamentals',
      description: 'IP, TCP/UDP, DNS, HTTP, ports, firewalls, and SSH. Understand how computers communicate.',
      href: '/learn/foundations/networking-fundamentals/networking-fundamentals/',
    },
    {
      icon: RefreshCw,
      title: 'CI/CD',
      description: 'GitHub Actions: workflows, triggers, jobs, secrets, and deploy pipelines. Automate testing and deployment.',
      href: '/learn/foundations/cicd/cicd/',
    },
    {
      icon: Container,
      title: 'Containers',
      description: 'Docker: images, Dockerfiles, volumes, networking, and Compose. Package applications for any environment.',
      href: '/learn/foundations/containers/containers/',
    },
    {
      icon: Ship,
      title: 'Container Orchestration',
      description: 'Kubernetes: pods, deployments, services, namespaces, and kubectl. Manage containers at scale.',
      href: '/learn/foundations/container-orchestration/container-orchestration/',
    },
    {
      icon: Blocks,
      title: 'Infrastructure as Code',
      description: 'Terraform: providers, resources, state, variables, and modules. Define infrastructure programmatically.',
      href: '/learn/foundations/iac/iac/',
    },
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-tertiary-50 via-accent-50 to-secondary-50"></div>
        <div className="relative container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              The Foundations
              <span className="text-accent-500 block">Path</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              One sequential learning journey covering computing basics through infrastructure as code. Complete these 13 sections to build the universal foundation for any specialization — DevOps, Cloud Engineering, SRE, Platform Engineering, or AI/ML Infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Foundations Sections */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section, index) => (
              <div
                key={section.title}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                    <section.icon className="h-6 w-6 text-accent-500" />
                  </div>
                  <span className="text-sm font-medium text-slate-400">
                    {index === 0 ? 'Start' : `Section ${index}`}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">{section.title}</h2>
                <p className="text-slate-600 mb-6 text-sm">{section.description}</p>
                <Link
                  href={section.href}
                  className="inline-flex items-center text-accent-500 hover:text-accent-600 font-medium transition-colors text-sm"
                >
                  Start Learning
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
