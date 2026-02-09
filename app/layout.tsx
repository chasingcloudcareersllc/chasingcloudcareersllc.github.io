import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://chasingcloudcareersllc.github.io'),
  title: {
    template: '%s | Chasing Cloud Careers',
    default: 'Chasing Cloud Careers - Teach Yourself Tech',
  },
  description: 'Self-service learning paths from computer science fundamentals to production infrastructure. Teach yourself at your own pace, from zero experience to deep expertise.',
  keywords: 'self-service learning, computer science, cloud computing, DevOps, infrastructure, software engineering, learning paths, self-paced',
  authors: [{ name: 'Chasing Cloud Careers LLC' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Chasing Cloud Careers - Teach Yourself Tech',
    description: 'Self-service learning paths from computer science fundamentals to production infrastructure. Teach yourself from zero to deep expertise.',
    url: 'https://chasingcloudcareersllc.github.io',
    siteName: 'Chasing Cloud Careers',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 1024,
        height: 1024,
        alt: 'Chasing Cloud Careers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chasing Cloud Careers - Teach Yourself Tech',
    description: 'Self-service learning paths from computer science fundamentals to production infrastructure. Teach yourself from zero to deep expertise.',
    images: ['/logo.png'],
  },
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
