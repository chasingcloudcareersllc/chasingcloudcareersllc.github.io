# AGENTS.md - Chasing Cloud Careers Repository Guide

## Overview

Chasing Cloud Careers LLC is a free tech education and training platform. This website is built with Next.js 16, React 19, Tailwind CSS 4, and TypeScript. It deploys as a static export to GitHub Pages at `chasingcloudcareersllc.github.io`.

## Tech Stack

- **Framework**: Next.js 16 with static export (`output: 'export'`)
- **Styling**: Tailwind CSS 4 with `@theme` custom properties
- **Language**: TypeScript (strict mode)
- **Markdown**: unified pipeline (remark-parse → remark-gfm → remark-rehype → rehype-raw → rehype-slug → rehype-mermaid → rehype-stringify)
- **Icons**: lucide-react
- **Hosting**: GitHub Pages (chasingcloudcareersllc.github.io)

## Commands

```bash
npm run dev          # Start dev server (fetches blog + learn content first)
npm run build        # Build static export + generate sitemap
npm run lint         # ESLint check
npm run type-check   # TypeScript check (tsc --noEmit)
npm run fetch-content # Clone blog + learn repos into content/
```

## Project Structure

```
app/                    # Next.js App Router pages
  layout.tsx            # Root layout (Header + Footer)
  page.tsx              # Homepage
  not-found.tsx         # 404 page
  globals.css           # Global styles + Tailwind @theme
  blog/                 # Blog listing and [slug] pages
  learn/                # Learning paths index and [...slug] pages
components/             # React components
  Header.tsx            # Sticky nav with mobile menu ('use client')
  Footer.tsx            # Site footer (server)
  JsonLd.tsx            # JSON-LD schema helper (server)
  BlogPostGrid.tsx      # Blog tag filtering ('use client')
lib/                    # Server-side utilities
  blog.ts               # Blog markdown processing
  learn.ts              # Learn content processing + sidebar data
  icons.ts              # Icon name → lucide component registry
scripts/
  fetch-content.sh      # Clone chasingcloudcareersllc-blog + chasingcloudcareersllc-learn
  generate-sitemap.mjs  # Post-build sitemap generator
public/                 # Static assets
  .nojekyll, robots.txt, llms.txt
```

## Content Architecture

- **Blog posts**: Stored in separate `chasingcloudcareersllc/chasingcloudcareersllc-blog` repo, cloned at build time into `content/blog/`
- **Learning paths**: Stored in separate `chasingcloudcareersllc/chasingcloudcareersllc-learn` repo, cloned at build time into `content/learn/`
- Both `content/` directories are gitignored — content repos are the source of truth

## Blog Frontmatter Schema

```yaml
---
title: "Post Title"
date: "YYYY-MM-DD"
author: "Author Name"
excerpt: "Brief description for previews and SEO."
tags: [tag1, tag2]
draft: false
---
```

Filename pattern: `YYYY-MM-DD-slug-title.md` → `/blog/slug-title/`

## Learn Content Schema

**Path metadata** (`_path.md` in each path directory):

```yaml
---
title: "Path Name"
description: "Path description."
icon: "blocks"
position: 1
---
```

**Lesson frontmatter** (each lesson's `.md` file):

```yaml
---
title: "Lesson Title"
description: "Lesson description."
position: 1
icon: "compass"
---
```

Directory structure: `{path}/{section}/{section}.md` → `/learn/{path}/{section}/`

## Icon Registry

`lib/icons.ts` maps string names to lucide-react components. `getIcon(name)` returns the component, defaulting to `Blocks` if not found.

Available icons: `compass`, `monitor`, `cpu`, `terminal`, `pen-tool`, `file-code`, `code`, `git-branch`, `network`, `refresh-cw`, `container`, `ship`, `blocks`

## Color Palette

- **Accent** (purple): 500 `#7c3aed`, 600 `#6d28d9`
- **Secondary** (blue): 500 `#3b82f6`, 600 `#2563eb`
- **Tertiary** (pink): 500 `#ec4899`, 600 `#db2777`
- **Neutrals**: Slate 50 `#f7fafc` → 900 `#171923`
- **Fonts**: Inter (sans), JetBrains Mono (mono)

## Key Patterns

- Server components by default; `'use client'` only for Header and BlogPostGrid
- All pages pre-rendered at build time (static export)
- Blog slugs derived from filenames: `2026-02-07-slug-title.md` → `/blog/slug-title/`
- Learn slugs from directory structure: `content/learn/foundations/linux/linux.md` → `/learn/foundations/linux/`
- Trailing slashes on all URLs (`trailingSlash: true`)
- Mermaid diagrams rendered to inline SVG at build time (requires Playwright/Chromium)
- `repository_dispatch` events from content repos trigger site rebuilds
