'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import type { BlogPostMeta } from '@/lib/blog'

type Props = {
  posts: BlogPostMeta[]
  allTags: string[]
}

export default function BlogPostGrid({ posts, allTags }: Props) {
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set())

  function toggleTag(tag: string) {
    setSelectedTags((prev) => {
      const next = new Set(prev)
      if (next.has(tag)) {
        next.delete(tag)
      } else {
        next.add(tag)
      }
      return next
    })
  }

  function clearTags() {
    setSelectedTags(new Set())
  }

  const filteredPosts =
    selectedTags.size === 0
      ? posts
      : posts.filter((post) => post.tags.some((tag) => selectedTags.has(tag)))

  return (
    <>
      {/* Tag Filter Bar */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={clearTags}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selectedTags.size === 0
                ? 'bg-accent-500 text-white'
                : 'bg-accent-50 text-accent-700 hover:bg-accent-100'
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedTags.has(tag)
                  ? 'bg-accent-500 text-white'
                  : 'bg-accent-50 text-accent-700 hover:bg-accent-100'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-slate-500 mb-4">No posts match the selected tags.</p>
          <button
            onClick={clearTags}
            className="inline-flex items-center px-4 py-2 rounded-lg bg-accent-500 text-white font-medium text-sm hover:bg-accent-600 transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-accent-50 text-accent-700 text-xs font-medium px-2.5 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-slate-900 mb-2">
                  <Link href={`/blog/${post.slug}/`} className="hover:text-accent-500 transition-colors">
                    {post.title}
                  </Link>
                </h2>

                {/* Excerpt */}
                <p className="text-slate-600 mb-4 line-clamp-3">{post.excerpt}</p>

                {/* Meta */}
                <div className="flex items-center text-sm text-slate-500 mb-4">
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
                  <span className="mx-2">&middot;</span>
                  <Clock className="h-4 w-4 mr-1.5" />
                  <span>{post.readingTime} min read</span>
                </div>

                {/* Read More */}
                <Link
                  href={`/blog/${post.slug}/`}
                  className="inline-flex items-center text-accent-500 hover:text-accent-600 font-medium text-sm transition-colors"
                >
                  Read More
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  )
}
