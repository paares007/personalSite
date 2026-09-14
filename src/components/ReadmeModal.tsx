import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, X } from 'lucide-react'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { SITE } from '../config/site'
import { GitHubIcon } from './icons/SocialIcons'

interface ReadmeModalProps {
  open: boolean
  onClose: () => void
  repoName: string
  repoUrl: string
  branch: string
  markdown: string
}

export function ReadmeModal({
  open,
  onClose,
  repoName,
  repoUrl,
  branch,
  markdown,
}: ReadmeModalProps) {
  useEffect(() => {
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  const components = markdownComponents(repoName, repoUrl, branch)

  // Portalled to the body: the cards animate with transforms, and a `fixed`
  // overlay inside a transformed ancestor is positioned against that ancestor.
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:p-8"
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`${repoName} README`}
            className="glass my-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d14]/95"
          >
            <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-white/10 bg-[#0d0d14]/95 px-5 py-4 backdrop-blur">
              <GitHubIcon className="h-4 w-4 shrink-0 text-emerald-400" />
              <p className="min-w-0 flex-1 truncate font-mono text-sm text-white">
                {repoName}
                <span className="text-slate-500">/README.md</span>
              </p>
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs text-slate-400 transition-colors hover:bg-white/5 hover:text-emerald-400 sm:flex"
              >
                open on GitHub
                <ExternalLink className="h-3 w-3" />
              </a>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close README"
                className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="max-h-[70vh] overflow-y-auto px-6 py-6 text-slate-300">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                {markdown}
              </ReactMarkdown>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

/**
 * READMEs are written for GitHub, so relative paths need rebasing onto the repo
 * before they'll resolve from this site.
 */
function resolveUrl(
  href: string | undefined,
  repoName: string,
  repoUrl: string,
  branch: string,
  kind: 'blob' | 'raw',
) {
  if (!href) return undefined
  if (/^(https?:|mailto:|data:)/.test(href)) return href
  if (href.startsWith('#')) return `${repoUrl}${href}`

  const path = href.replace(/^\.?\//, '')
  return kind === 'raw'
    ? `https://raw.githubusercontent.com/${SITE.githubUsername}/${repoName}/${branch}/${path}`
    : `${repoUrl}/blob/${branch}/${path}`
}

function markdownComponents(
  repoName: string,
  repoUrl: string,
  branch: string,
): Components {
  return {
    h1: ({ children }) => (
      <h1 className="mt-8 mb-4 border-b border-white/10 pb-2 text-2xl font-bold text-white first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 mb-3 text-xl font-semibold text-white first:mt-0">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 mb-2 text-lg font-semibold text-slate-100">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-5 mb-2 font-semibold text-slate-200">{children}</h4>
    ),
    p: ({ children }) => <p className="mb-4 leading-relaxed text-slate-400">{children}</p>,
    a: ({ href, children }) => (
      <a
        href={resolveUrl(href, repoName, repoUrl, branch, 'blob')}
        target="_blank"
        rel="noopener noreferrer"
        className="text-emerald-400 underline decoration-emerald-400/30 hover:decoration-emerald-400"
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="mb-4 ml-5 list-disc space-y-2 text-slate-400">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-4 ml-5 list-decimal space-y-2 text-slate-400">{children}</ol>
    ),
    li: ({ children }) => <li className="leading-relaxed marker:text-emerald-400/70">{children}</li>,
    strong: ({ children }) => <strong className="font-semibold text-slate-100">{children}</strong>,
    em: ({ children }) => <em className="text-slate-300 italic">{children}</em>,
    blockquote: ({ children }) => (
      <blockquote className="mb-4 border-l-2 border-emerald-400/40 bg-white/[0.02] py-2 pl-4 text-slate-400 italic">
        {children}
      </blockquote>
    ),
    code: ({ className, children }) => {
      const isBlock = typeof className === 'string' && className.includes('language-')
      if (isBlock) {
        return <code className="font-mono text-[13px] text-slate-300">{children}</code>
      }
      return (
        <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[13px] text-emerald-300">
          {children}
        </code>
      )
    },
    pre: ({ children }) => (
      <pre className="mb-4 overflow-x-auto rounded-xl border border-white/5 bg-black/40 p-4">
        {children}
      </pre>
    ),
    img: ({ src, alt }) => (
      <img
        src={resolveUrl(typeof src === 'string' ? src : undefined, repoName, repoUrl, branch, 'raw')}
        alt={alt ?? ''}
        loading="lazy"
        className="mb-4 max-w-full rounded-lg"
      />
    ),
    hr: () => <hr className="my-8 border-white/10" />,
    table: ({ children }) => (
      <div className="mb-4 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border-b border-white/10 px-3 py-2 font-mono text-xs text-emerald-300">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border-b border-white/5 px-3 py-2 text-slate-400">{children}</td>
    ),
  }
}
