'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { getIcon } from '@/lib/icons'
import type { LearnPageMeta } from '@/lib/learn'

type Props = {
  pathName: string
  pathLabel: string
  pages: LearnPageMeta[]
  currentSlug: string[]
}

export function LearnSidebar({ pathName, pathLabel, pages, currentSlug }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const currentPath = currentSlug.join('/')

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden flex items-center gap-2 text-sm font-medium text-accent-500 hover:text-accent-600 transition-colors mb-4"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        {isOpen ? 'Hide' : 'Show'} {pathLabel} lessons
      </button>

      {/* Sidebar content */}
      <nav className={`${isOpen ? 'block' : 'hidden'} lg:block`}>
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
          {pathLabel}
        </h3>
        <ul className="space-y-1">
          {pages.map((page, index) => {
            const isActive = page.slug.join('/') === currentPath
            const Icon = getIcon(page.icon)

            return (
              <li key={page.slug.join('/')}>
                <Link
                  href={`/learn/${page.slug.join('/')}/`}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'bg-accent-50 text-accent-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-300 w-5 text-right flex-shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <Icon className={`h-4 w-4 flex-shrink-0 ${isActive ? 'text-accent-500' : 'text-slate-400'}`} />
                  <span className="truncate">{page.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
