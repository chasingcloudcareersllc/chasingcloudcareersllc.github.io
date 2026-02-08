import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getAllLearnSlugs, getSidebarData, getLearnPage } from '@/lib/learn'
import LearnSidebar from '@/components/LearnSidebar'
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
  const page = await getLearnPage(slug)

  if (!page) {
    notFound()
  }

  const sections = getSidebarData()

  // Build flat list for prev/next navigation
  const allPages = sections.flatMap((s) => s.pages)
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
                href="/learn/"
                className="inline-flex items-center text-accent-500 hover:text-accent-600 font-medium mb-4 text-sm transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                All Learning Paths
              </Link>
              <LearnSidebar sections={sections} currentSlug={slug} />
            </div>
          </aside>

          {/* Content */}
          <article className="flex-grow min-w-0">
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
  )
}
