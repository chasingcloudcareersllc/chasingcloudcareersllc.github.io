import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react'
import { getAllPostSlugs, getPostBySlug } from '@/lib/blog'
import { JsonLd } from '@/components/JsonLd'
import type { Metadata } from 'next'

export const dynamicParams = false

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${slug}/`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${slug}/`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="bg-white">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          author: {
            '@type': 'Person',
            name: post.author,
          },
          datePublished: post.date,
          publisher: {
            '@type': 'Organization',
            name: 'Chasing Cloud Careers LLC',
            url: 'https://chasingcloudcareersllc.github.io',
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://chasingcloudcareersllc.github.io/blog/${slug}/`,
          },
          keywords: post.tags.join(', '),
        }}
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-tertiary-50 via-accent-50 to-secondary-50"></div>
        <div className="relative container-max section-padding">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog/"
              className="inline-flex items-center text-accent-500 hover:text-accent-600 font-medium mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>

            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-accent-100 text-accent-700 text-xs font-medium px-2.5 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-slate-600">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1.5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1.5" />
                {post.date ? (
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                ) : (
                  <span>Date not available</span>
                )}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1.5" />
                <span>{post.readingTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto">
          <div
            className="prose-blog"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </div>
      </section>

      {/* Bottom Section */}
      <section className="section-padding border-t border-slate-200">
        <div className="max-w-3xl mx-auto text-center">
          <Link href="/blog/" className="btn-primary inline-flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Posts
          </Link>
        </div>
      </section>
    </div>
  )
}
