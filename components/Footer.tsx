import Link from 'next/link'
import Image from 'next/image'
import { Github, Linkedin } from 'lucide-react'
import { getAllLearnPaths } from '@/lib/learn'

export function Footer() {
  const learnPaths = getAllLearnPaths()

  return (
    <footer className="bg-slate-800 text-white">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Org Info */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/logo.png"
                alt="Chasing Cloud Careers"
                width={40}
                height={40}
                className="h-10 w-10"
              />
            </Link>
            <p className="text-slate-300 mb-6 text-sm">
              Free self-service learning paths. Teach yourself from zero to deep expertise.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/chasingcloudcareersllc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/chasing-cloud-careers"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Learning */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Learning</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/learn/" className="text-slate-300 hover:text-white transition-colors">
                  All Paths
                </Link>
              </li>
              {learnPaths.map((lp) => (
                <li key={lp.name}>
                  <Link href={`/learn/${lp.name}/`} className="text-slate-300 hover:text-white transition-colors">
                    {lp.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/chasingcloudcareersllc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/chasing-cloud-careers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Content</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog/" className="text-slate-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} Chasing Cloud Careers LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
