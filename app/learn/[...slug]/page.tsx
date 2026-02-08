import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import {
  getAllLearnSlugs,
  getLearnPage,
  getPathData,
} from '@/lib/learn'
import { getIcon } from '@/lib/icons'
import { LearnSidebar } from '@/components/LearnSidebar'
import type { Metadata } from 'next'

export const dynamicParams = false

export async function generateStaticParams() {
  return getAllLearnSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
  const { slug } = await params

  // 1-part slug: path landing page
  if (slug.length === 1) {
    const pathData = getPathData(slug[0])
    if (!pathData) return { title: 'Page Not Found' }

    return {
      title: pathData.label,
      description: pathData.description,
      alternates: {
        canonical: `/learn/${slug[0]}/`,
      },
    }
  }

  // 2-part slug: lesson page
  const page = await getLearnPage(slug)

  if (!page) {
    return { title: 'Page Not Found' }
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/learn/${slug.join('/')}/`,
    },
  }
}

export default async function LearnPageRoute({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params

  // 1-part slug: path landing page (e.g., /learn/foundations/)
  if (slug.length === 1) {
    const pathData = getPathData(slug[0])
    if (!pathData) notFound()

    return (
      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-tertiary-50 via-accent-50 to-secondary-50"></div>
          <div className="relative container-max section-padding">
            <div className="text-center">
              <Link
                href="/learn/"
                className="inline-flex items-center text-accent-500 hover:text-accent-600 font-medium mb-4 text-sm transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                All Learning Paths
              </Link>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
                The {pathData.label}
                <span className="text-accent-500 block">Path</span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
                {pathData.description}
              </p>
              <p className="text-sm text-slate-500">
                {pathData.sectionCount} sections
              </p>
            </div>
          </div>
        </section>

        {/* Sections List */}
        <section className="section-padding">
          <div className="container-max max-w-4xl">
            <div className="space-y-4">
              {pathData.pages.map((page, index) => {
                const Icon = getIcon(page.icon)

                return (
                  <Link
                    key={page.slug.join('/')}
                    href={`/learn/${page.slug.join('/')}/`}
                    className="flex items-start gap-4 bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow group"
                  >
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <span className="text-sm font-bold text-slate-300 w-8 text-right">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-accent-500" />
                      </div>
                    </div>
                    <div className="flex-grow min-w-0">
                      <h2 className="text-lg font-bold text-slate-900 group-hover:text-accent-600 transition-colors">
                        {page.title}
                      </h2>
                      <p className="text-slate-600 text-sm mt-1">{page.description}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-accent-500 transition-colors flex-shrink-0 mt-1" />
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    )
  }

  // 2-part slug: lesson page (e.g., /learn/foundations/linux/)
  const page = await getLearnPage(slug)

  if (!page) {
    notFound()
  }

  const pathName = slug[0]
  const pathData = getPathData(pathName)
  const pathLabel = pathData?.label ?? pathName.replace(/-/g, ' ')
  const allPages = pathData?.pages ?? []

  // Prev/next navigation
  const currentPath = slug.join('/')
  const currentIndex = allPages.findIndex((p) => p.slug.join('/') === currentPath)
  const prevPage = currentIndex > 0 ? allPages[currentIndex - 1] : null
  const nextPage = currentIndex >= 0 && currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null

  return (
    <div className="bg-white">
      <div className="container-max section-padding">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <Link
                href={`/learn/${pathName}/`}
                className="inline-flex items-center text-accent-500 hover:text-accent-600 font-medium mb-6 text-sm transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                {pathLabel}
              </Link>
              <LearnSidebar
                pathName={pathName}
                pathLabel={pathLabel}
                pages={allPages}
                currentSlug={slug}
              />
            </div>
          </aside>

          {/* Content */}
          <div className="flex-grow min-w-0">
            <article>
              <div
                className="prose-learn"
                dangerouslySetInnerHTML={{ __html: page.contentHtml }}
              />

              {/* Prev/Next Navigation */}
              <div className="mt-12 pt-8 border-t border-slate-200 flex justify-between">
                {prevPage ? (
                  <Link
                    href={`/learn/${prevPage.slug.join('/')}/`}
                    className="flex items-center text-accent-500 hover:text-accent-600 font-medium transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    <div className="text-left">
                      <div className="text-xs text-slate-400">Previous</div>
                      <div>{prevPage.title}</div>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
                {nextPage ? (
                  <Link
                    href={`/learn/${nextPage.slug.join('/')}/`}
                    className="flex items-center text-accent-500 hover:text-accent-600 font-medium transition-colors text-right"
                  >
                    <div>
                      <div className="text-xs text-slate-400">Next</div>
                      <div>{nextPage.title}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  )
}
