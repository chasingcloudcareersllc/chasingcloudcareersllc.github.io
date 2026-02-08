import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Cloud, Brain, Server } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Learning Paths',
  description: 'Free self-service training materials for cloud computing, AI, and DevOps. Start your tech career learning journey today.',
  alternates: {
    canonical: '/learn/',
  },
}

export default function LearnPage() {
  const paths = [
    {
      icon: Cloud,
      title: 'Getting Started',
      description: 'New to tech? Start here. Learn the fundamentals and find the right learning path for your career goals in cloud computing, AI, or DevOps.',
      href: '/learn/getting-started/getting-started/',
      items: [
        'Welcome & Orientation',
        'Choosing Your Path',
        'Setting Up Your Environment',
      ],
    },
  ]

  const comingSoon = [
    {
      icon: Cloud,
      title: 'Cloud Computing',
      description: 'AWS, Azure, and GCP fundamentals through advanced topics. Hands-on labs and real-world projects to build your cloud skills.',
    },
    {
      icon: Brain,
      title: 'AI & Machine Learning',
      description: 'From concepts to implementation. Learn machine learning, deep learning, and AI engineering with practical projects.',
    },
    {
      icon: Server,
      title: 'DevOps & Infrastructure',
      description: 'CI/CD pipelines, containers, Kubernetes, infrastructure as code, and modern DevOps practices.',
    },
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-tertiary-50 via-accent-50 to-secondary-50"></div>
        <div className="relative container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Learning
              <span className="text-accent-500 block">Paths</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Free, self-service training materials to help you build real-world skills in cloud computing, AI, and DevOps. Start where you are and grow at your own pace.
            </p>
          </div>
        </div>
      </section>

      {/* Available Paths */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {paths.map((path) => (
              <div
                key={path.title}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                  <path.icon className="h-6 w-6 text-accent-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">{path.title}</h2>
                <p className="text-slate-600 mb-6">{path.description}</p>
                <ul className="space-y-2 mb-6">
                  {path.items.map((item) => (
                    <li key={item} className="flex items-center text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 bg-accent-400 rounded-full mr-3 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={path.href}
                  className="inline-flex items-center text-accent-500 hover:text-accent-600 font-medium transition-colors"
                >
                  Start Learning
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="section-padding bg-slate-50">
        <div className="container-max">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Coming Soon</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {comingSoon.map((path) => (
              <div
                key={path.title}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 opacity-75"
              >
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <path.icon className="h-6 w-6 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{path.title}</h3>
                <p className="text-slate-600">{path.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
