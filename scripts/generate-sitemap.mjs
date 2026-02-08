import { readdirSync, writeFileSync, existsSync, statSync } from 'node:fs'
import { join } from 'node:path'

const SITE_URL = 'https://chasingcloudcareersllc.github.io'

const staticPages = [
  { path: '/', priority: '1.0' },
  { path: '/learn/', priority: '0.9' },
  { path: '/blog/', priority: '0.8' },
]

const today = new Date().toISOString().split('T')[0]

// Collect blog post slugs
const blogSlugs = []
const postsDir = join(process.cwd(), 'content', 'blog', 'posts')

if (existsSync(postsDir)) {
  const files = readdirSync(postsDir).filter((f) => f.endsWith('.md'))
  for (const file of files) {
    const slug = file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '')
    blogSlugs.push(slug)
  }
} else {
  console.log('No blog posts directory found — generating sitemap with static pages only.')
}

// Collect learn page slugs
const learnSlugs = []
const learnDir = join(process.cwd(), 'content', 'learn')

if (existsSync(learnDir)) {
  const sections = readdirSync(learnDir).filter((dir) => {
    const fullPath = join(learnDir, dir)
    try {
      return statSync(fullPath).isDirectory()
    } catch {
      return false
    }
  })

  for (const section of sections) {
    const sectionDir = join(learnDir, section)
    const files = readdirSync(sectionDir).filter((f) => f.endsWith('.md'))
    for (const file of files) {
      const slug = file.replace(/\.md$/, '')
      learnSlugs.push(`${section}/${slug}`)
    }
  }
}

// Build XML
const urls = [
  ...staticPages.map(
    ({ path, priority }) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`
  ),
  ...blogSlugs.map(
    (slug) => `  <url>
    <loc>${SITE_URL}/blog/${slug}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
  ),
  ...learnSlugs.map(
    (slug) => `  <url>
    <loc>${SITE_URL}/learn/${slug}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
  ),
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`

const outPath = join(process.cwd(), 'out', 'sitemap.xml')
writeFileSync(outPath, sitemap, 'utf-8')
console.log(`Sitemap written to ${outPath} (${staticPages.length + blogSlugs.length + learnSlugs.length} URLs)`)
