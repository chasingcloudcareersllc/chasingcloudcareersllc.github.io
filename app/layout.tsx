import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://chasingcloudcareersllc.github.io'),
  title: {
    template: '%s | Chasing Cloud Careers',
    default: 'Chasing Cloud Careers - Free Tech Education & Training',
  },
  description: 'Free learning paths that integrate computer science fundamentals with real-world practice. From zero experience to deep expertise in cloud, infrastructure, and software engineering.',
  keywords: 'cloud computing, tech education, training, mentorship, bootcamp, DevOps, AI, machine learning, learning paths, free training',
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
    title: 'Chasing Cloud Careers - Free Tech Education & Training',
    description: 'Free learning paths that integrate computer science fundamentals with real-world practice. From zero experience to deep expertise.',
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
    title: 'Chasing Cloud Careers - Free Tech Education & Training',
    description: 'Free learning paths that integrate computer science fundamentals with real-world practice. From zero experience to deep expertise.',
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
