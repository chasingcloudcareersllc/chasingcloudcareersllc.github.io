'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronRight } from 'lucide-react'
import type { LearnSection } from '@/lib/learn'

type Props = {
  sections: LearnSection[]
  currentSlug: string[]
}

export default function LearnSidebar({ sections, currentSlug }: Props) {
  const currentPath = currentSlug.join('/')
  const [openSections, setOpenSections] = useState<Set<string>>(() => {
    const initial = new Set<string>()
    if (currentSlug.length > 0) {
      initial.add(currentSlug[0])
    }
    return initial
  })

  function toggleSection(name: string) {
    setOpenSections((prev) => {
      const next = new Set(prev)
      if (next.has(name)) {
        next.delete(name)
      } else {
        next.add(name)
      }
      return next
    })
  }

  return (
    <nav className="space-y-2">
      {sections.map((section) => {
        const isOpen = openSections.has(section.name)

        return (
          <div key={section.name}>
            <button
              onClick={() => toggleSection(section.name)}
              className="flex items-center justify-between w-full px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <span>{section.label}</span>
              {isOpen ? (
                <ChevronDown className="h-4 w-4 text-slate-400" />
              ) : (
                <ChevronRight className="h-4 w-4 text-slate-400" />
              )}
            </button>

            {isOpen && (
              <ul className="mt-1 ml-3 space-y-0.5">
                {section.pages.map((page) => {
                  const pagePath = page.slug.join('/')
                  const isActive = pagePath === currentPath

                  return (
                    <li key={pagePath}>
                      <Link
                        href={`/learn/${pagePath}/`}
                        className={`block px-3 py-1.5 text-sm rounded-lg transition-colors ${
                          isActive
                            ? 'bg-accent-50 text-accent-700 font-medium'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        {page.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        )
      })}
    </nav>
  )
}
