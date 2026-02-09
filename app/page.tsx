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
      title: 'Completely Free',
      description: 'Every learning path, lesson, and resource is free and always will be. No paywalls, no sign-ups, no catch.',
    },
    {
      icon: Rocket,
      title: 'Self-Service',
      description: 'Everything you need is here. Pick a path, open a lesson, and start teaching yourself. No waiting on anyone else.',
    },
    {
      icon: GraduationCap,
      title: 'Theory and Practice',
      description: 'Every concept is understood deeply and applied immediately. Learn the why and the how together, the way real expertise is built.',
    },
    {
      icon: Users,
      title: 'Your Pace',
      description: 'No deadlines, no cohorts, no schedules. Come back whenever you want and pick up right where you left off.',
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
          description: 'Free self-service learning paths from computer science fundamentals to production infrastructure. Teach yourself from zero to deep expertise.',
          sameAs: [
            'https://github.com/chasingcloudcareersllc',
            'https://www.linkedin.com/company/chasing-cloud-careers',
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
              Free self-service learning paths from computer science fundamentals to production infrastructure. Teach yourself from zero experience to deep expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/learn/" className="btn-primary text-lg px-8 py-4">
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
              We give you the guide. You teach yourself. Our learning paths are built so you can go from knowing nothing to deep expertise entirely on your own.
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
            Pick a learning path and start teaching yourself. Everything you need is right here, completely free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/learn/" className="inline-flex items-center px-8 py-4 bg-white text-accent-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors">
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
