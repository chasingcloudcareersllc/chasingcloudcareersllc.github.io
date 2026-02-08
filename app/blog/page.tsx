import { getAllPosts } from '@/lib/blog'
import BlogPostGrid from '@/components/BlogPostGrid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights on tech education, cloud computing, AI, DevOps, and career development from Chasing Cloud Careers.',
  openGraph: {
    title: 'Blog',
    description: 'Insights on tech education, cloud computing, AI, DevOps, and career development from Chasing Cloud Careers.',
  },
  alternates: {
    canonical: '/blog/',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort()

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-tertiary-50 via-accent-50 to-secondary-50"></div>
        <div className="relative container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Our
              <span className="text-accent-500 block">Blog</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Insights, tips, and thought leadership on cloud computing, tech careers, and continuous learning.
            </p>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="section-padding">
        <div className="container-max">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-slate-500">No posts yet. Check back soon.</p>
            </div>
          ) : (
            <BlogPostGrid posts={posts} allTags={allTags} />
          )}
        </div>
      </section>
    </div>
  )
}
