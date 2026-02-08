import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Blocks } from 'lucide-react'
import { getAllLearnPaths } from '@/lib/learn'

export const metadata: Metadata = {
  title: 'Learning Paths',
  description:
    'Free self-service training materials for cloud computing, AI, and DevOps. Start your tech career learning journey today.',
  alternates: {
    canonical: '/learn/',
  },
}

const pathIcons: Record<string, typeof Blocks> = {
  foundations: Blocks,
}

export default function LearnPage() {
  const paths = getAllLearnPaths()

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-tertiary-50 via-accent-50 to-secondary-50"></div>
        <div className="relative container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Learning
              <span className="text-accent-500 block">Paths</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Free self-service training materials for cloud computing, AI, and
              DevOps. Choose a path and start learning at your own pace.
            </p>
          </div>
        </div>
      </section>

      {/* Learning Path Tiles */}
      <section className="section-padding">
        <div className="container-max max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {paths.map((learnPath) => {
              const Icon = pathIcons[learnPath.name] ?? Blocks

              return (
                <Link
                  key={learnPath.name}
                  href={`/learn/${learnPath.name}/`}
                  className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-accent-500" />
                    </div>
                    <span className="text-sm font-medium text-slate-400">
                      {learnPath.sectionCount} sections
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-accent-600 transition-colors">
                    {learnPath.label}
                  </h2>
                  <p className="text-slate-600 mb-6">{learnPath.description}</p>
                  <span className="inline-flex items-center text-accent-500 group-hover:text-accent-600 font-medium transition-colors text-sm">
                    Start Learning
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
