/**
 * Fetches and distills README files from public GitHub repos so project cards
 * can describe themselves straight from the source of truth.
 */

export interface ParsedReadme {
  /** First real paragraph of prose, trimmed to a card-sized blurb. */
  summary: string | null
  /** Bullets pulled from a "Features" style section (max 4). */
  highlights: string[]
  /** True when the README is still a starter-template default. */
  isBoilerplate: boolean
}

export interface RepoReadme extends ParsedReadme {
  /** Raw markdown, kept for the full-README reader. */
  markdown: string
}

const CACHE_PREFIX = 'readme:'
const SUMMARY_MAX_CHARS = 300
const MAX_HIGHLIGHTS = 4

const BOILERPLATE_MARKERS = [
  'this template provides a minimal setup',
  'getting started with create react app',
  'expanding the eslint configuration',
  'bootstrapped with [create react app]',
  'to learn more about next.js',
]

const FEATURE_HEADINGS =
  /^(features?|highlights?|what it does|what it can do|capabilities|key features?|overview)\b/i

export async function fetchReadme(
  owner: string,
  repo: string,
): Promise<RepoReadme | null> {
  const cacheKey = `${CACHE_PREFIX}${owner}/${repo}`

  const cached = readCache(cacheKey)
  if (cached !== null) return cached ? parseIntoRepoReadme(cached) : null

  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
      headers: { Accept: 'application/vnd.github.raw' },
    })
    // 404 simply means the repo has no README — not an error worth surfacing.
    if (!res.ok) {
      writeCache(cacheKey, '')
      return null
    }
    const markdown = await res.text()
    writeCache(cacheKey, markdown)
    return parseIntoRepoReadme(markdown)
  } catch {
    return null
  }
}

function parseIntoRepoReadme(markdown: string): RepoReadme {
  return { markdown, ...parseReadme(markdown) }
}

export function parseReadme(markdown: string): ParsedReadme {
  const clean = markdown.replace(/\r\n/g, '\n').replace(/<!--[\s\S]*?-->/g, '')
  const isBoilerplate = BOILERPLATE_MARKERS.some((marker) =>
    clean.toLowerCase().includes(marker),
  )

  if (isBoilerplate) {
    return { summary: null, highlights: [], isBoilerplate: true }
  }

  return {
    summary: extractSummary(clean),
    highlights: extractHighlights(clean),
    isBoilerplate: false,
  }
}

/** Walks the document, yielding only lines that live outside fenced code blocks. */
function contentLines(markdown: string): string[] {
  const lines: string[] = []
  let inFence = false

  for (const line of markdown.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence
      continue
    }
    if (!inFence) lines.push(line)
  }

  return lines
}

function extractSummary(markdown: string): string | null {
  const paragraph: string[] = []

  for (const line of contentLines(markdown)) {
    const trimmed = line.trim()

    if (trimmed === '') {
      const candidate = finishParagraph(paragraph)
      if (candidate) return candidate
      paragraph.length = 0
      continue
    }

    // Skip structural lines: headings, quotes, tables, lists, raw HTML, badges.
    if (/^(#{1,6}\s|>|\||-{3,}|={3,}|<|[-*+]\s|\d+\.\s)/.test(trimmed)) {
      paragraph.length = 0
      continue
    }

    paragraph.push(trimmed)
  }

  return finishParagraph(paragraph)
}

function finishParagraph(paragraph: string[]): string | null {
  if (paragraph.length === 0) return null
  const text = stripMarkdown(paragraph.join(' '))
  if (text.length < 40) return null
  return truncateToSentence(text, SUMMARY_MAX_CHARS)
}

function extractHighlights(markdown: string): string[] {
  const lines = contentLines(markdown)
  let underFeatureHeading = false
  let pastIntro = false
  let intro: string[] = []
  const featured: string[] = []

  for (let i = 0; i < lines.length; i += 1) {
    const trimmed = lines[i].trim()
    const heading = /^(#{1,6})\s+(.*)$/.exec(trimmed)

    if (heading) {
      if (featured.length > 0) break
      // The title (H1) still counts as intro; any real section ends it.
      if (heading[1].length > 1) pastIntro = true
      underFeatureHeading = FEATURE_HEADINGS.test(stripMarkdown(heading[2]))
      continue
    }

    if (!/^[-*+]\s+/.test(trimmed)) continue

    const list = collectList(lines, i)
    i = list.endIndex

    if (underFeatureHeading) {
      featured.push(...list.items)
      if (featured.length >= MAX_HIGHLIGHTS) break
    } else if (!pastIntro && intro.length === 0 && !list.isTableOfContents) {
      // A bullet list right under the title is usually a feature list too.
      intro = list.items
    }
  }

  const picked = featured.length > 0 ? featured : intro
  return picked.slice(0, MAX_HIGHLIGHTS)
}

/** Reads one bullet list starting at `start`, ignoring nested sub-bullets. */
function collectList(lines: string[], start: number) {
  const items: string[] = []
  let anchorLinkItems = 0
  let endIndex = start

  for (let i = start; i < lines.length; i += 1) {
    const raw = lines[i]
    const trimmed = raw.trim()

    if (trimmed === '') {
      // A blank line only ends the list if the next line isn't another bullet.
      const next = lines[i + 1]?.trim() ?? ''
      if (!/^[-*+]\s+/.test(next)) break
      continue
    }

    const indent = raw.search(/\S/)
    const bullet = /^[-*+]\s+(?:\[[ xX]\]\s+)?(.+)$/.exec(trimmed)

    if (!bullet) {
      // Indented prose under a bullet is a wrapped continuation of that item.
      if (indent > 0 && items.length > 0 && !/^[#>|]/.test(trimmed)) {
        items[items.length - 1] = `${items[items.length - 1]} ${stripMarkdown(trimmed)}`
        endIndex = i
        continue
      }
      break
    }

    endIndex = i
    // Only top-level bullets become highlights; indented ones are detail.
    if (indent <= 1) {
      if (/^\[[^\]]*\]\(#[^)]*\)$/.test(bullet[1].trim())) anchorLinkItems += 1
      const text = stripMarkdown(bullet[1])
      if (text) items.push(text)
    }
  }

  return {
    items: items.map((item) => truncateToSentence(item, 140)),
    endIndex,
    // A list of nothing but in-page anchors is a table of contents, not features.
    isTableOfContents: items.length > 0 && anchorLinkItems === items.length,
  }
}

function stripMarkdown(text: string): string {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // images / badges
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links -> label
    .replace(/<[^>]+>/g, '') // inline HTML
    .replace(/`{1,3}([^`]*)`{1,3}/g, '$1') // inline code
    .replace(/(\*\*|__)(.*?)\1/g, '$2') // bold
    .replace(/(\*|_)(.*?)\1/g, '$2') // italics
    .replace(/^\s*[:—–-]\s*/, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Cuts at the last sentence boundary that fits, so blurbs never end mid-word. */
function truncateToSentence(text: string, max: number): string {
  if (text.length <= max) return text

  const window = text.slice(0, max)
  const lastSentence = Math.max(
    window.lastIndexOf('. '),
    window.lastIndexOf('! '),
    window.lastIndexOf('? '),
  )
  if (lastSentence > max * 0.5) return window.slice(0, lastSentence + 1)

  const lastSpace = window.lastIndexOf(' ')
  return `${window.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}…`
}

function readCache(key: string): string | null {
  try {
    return sessionStorage.getItem(key)
  } catch {
    return null
  }
}

function writeCache(key: string, value: string) {
  try {
    sessionStorage.setItem(key, value)
  } catch {
    // Storage full or unavailable — caching is a nicety, not a requirement.
  }
}
