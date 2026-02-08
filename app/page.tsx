import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Rocket, Users, GraduationCap } from 'lucide-react'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
}

export default function Home() {
  const values = [
    {
      icon: BookOpen,
      title: 'Free Training',
      description: 'All our training materials, learning paths, and resources are completely free and self-service. Learn at your own pace, on your own schedule.',
    },
    {
      icon: Rocket,
      title: 'Hands-On Learning',
      description: 'Practical, project-based learning that prepares you for real-world cloud and tech roles. No theory without practice.',
    },
    {
      icon: GraduationCap,
      title: 'Mentorship',
      description: 'Guidance from experienced professionals who have walked the path. Public speaking on technical education and career development.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Learn alongside others in tech bootcamp cohorts. Share knowledge, support each other, and grow together.',
    },
  ]

  return (
    <div className="bg-white">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Chasing Cloud Careers LLC',
          url: 'https://chasingcloudcareersllc.github.io',
          description: 'Free self-service training materials, learning paths, and mentorship for cloud computing, AI, and DevOps.',
          sameAs: [
            'https://github.com/chasingcloudcareersllc',
            'https://www.linkedin.com/company/chasingcloudcareersllc',
          ],
        }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-tertiary-50 via-accent-50 to-secondary-50"></div>
        <div className="relative container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Chasing Cloud Careers
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Free self-service training materials and learning paths for cloud computing, AI, and DevOps. Start your tech career journey today with hands-on, practical education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/learn/getting-started/getting-started/" className="btn-primary text-lg px-8 py-4">
                Start Learning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/blog/" className="btn-secondary text-lg px-8 py-4">
                Read the Blog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What We Offer
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Chasing Cloud Careers LLC provides public speaking on technical education, mentorship, and tech bootcamp cohorts. We believe everyone deserves access to quality tech training, regardless of their background.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-slate-50 p-8 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-accent-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-tertiary-600 via-accent-600 to-secondary-600"></div>
        <div className="relative container-max section-padding text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Whether you&apos;re just starting out or looking to level up your skills, our free learning paths will guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/learn/getting-started/getting-started/" className="inline-flex items-center px-8 py-4 bg-white text-accent-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors">
              Start Learning
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a
              href="https://github.com/chasingcloudcareersllc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
