'use client'

import Link from 'next/link'
import type { LearnSection } from '@/lib/learn'

type Props = {
  sections: LearnSection[]
  currentSlug: string[]
}

export default function LearnSidebar({ sections, currentSlug }: Props) {
  const currentPath = currentSlug.join('/')

  return (
    <nav className="space-y-0.5">
      {sections.map((section) => {
        const page = section.pages[0]
        if (!page) return null

        const pagePath = page.slug.join('/')
        const isActive = pagePath === currentPath

        return (
          <Link
            key={section.name}
            href={`/learn/${pagePath}/`}
            className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
              isActive
                ? 'bg-accent-50 text-accent-700 font-medium'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            {section.label}
          </Link>
        )
      })}
    </nav>
  )
}
