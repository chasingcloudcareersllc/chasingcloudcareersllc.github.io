'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Github } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  function isActive(href: string) {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  function navLinkClass(href: string) {
    return isActive(href)
      ? 'text-accent-500 font-semibold transition-colors duration-200'
      : 'text-slate-700 hover:text-accent-500 font-medium transition-colors duration-200'
  }

  function mobileNavLinkClass(href: string) {
    return isActive(href)
      ? 'block px-3 py-2 text-accent-500 font-semibold transition-colors duration-200'
      : 'block px-3 py-2 text-slate-700 hover:text-accent-500 font-medium transition-colors duration-200'
  }

  return (
    <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <nav className="container-max px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Chasing Cloud Careers"
              width={40}
              height={40}
              className="h-10 w-10"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={navLinkClass('/')}>
              Home
            </Link>
            <Link href="/learn/" className={navLinkClass('/learn/')}>
              Learn
            </Link>
            <Link href="/blog/" className={navLinkClass('/blog/')}>
              Blog
            </Link>

            {/* External Links */}
            <a
              href="https://github.com/chasingcloudcareersllc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-700 transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:text-accent-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent-400"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-slate-200">
              <Link
                href="/"
                className={mobileNavLinkClass('/')}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/learn/"
                className={mobileNavLinkClass('/learn/')}
                onClick={() => setIsMenuOpen(false)}
              >
                Learn
              </Link>
              <Link
                href="/blog/"
                className={mobileNavLinkClass('/blog/')}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <a
                href="https://github.com/chasingcloudcareersllc"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 text-slate-700 hover:text-accent-500 font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                GitHub
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
