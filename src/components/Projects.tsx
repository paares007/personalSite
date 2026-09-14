import { lazy, Suspense, useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, ExternalLink, FolderGit2, GitFork, Loader2, Star } from 'lucide-react'
import { LANGUAGE_COLORS } from '../config/projects'
import { SITE } from '../config/site'
import { useGitHubRepos, type GitHubRepo } from '../hooks/useGitHubRepos'
import { GitHubIcon } from './icons/SocialIcons'

// The markdown renderer is a big dependency — only pull it in when someone
// actually opens a README.
const ReadmeModal = lazy(() =>
  import('./ReadmeModal').then((m) => ({ default: m.ReadmeModal })),
)

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

export function Projects() {
  const { repos, loading, error } = useGitHubRepos()

  return (
    <section id="projects" className="relative px-6 py-32">
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="mb-2 font-mono text-sm text-emerald-400">// projects</p>
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Things I&apos;ve{' '}
            <span className="gradient-text">built</span>
          </h2>
          <p className="max-w-2xl text-lg text-slate-400">
            A selection of projects from my GitHub — from full-stack web apps to
            experiments in ML and AI. Each card is written from the project&apos;s
            own README, and you can read the whole thing without leaving the page.
          </p>
        </motion.div>

        {loading && (
          <div className="flex items-center justify-center gap-3 py-20 text-slate-400">
            <Loader2 className="h-5 w-5 animate-spin text-emerald-400" />
            <span className="font-mono text-sm">fetching repos from GitHub...</span>
          </div>
        )}

        {error && (
          <div className="glass rounded-2xl p-8 text-center text-slate-400">
            Couldn&apos;t load projects from GitHub.{' '}
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline"
            >
              View my profile →
            </a>
          </div>
        )}

        {!loading && !error && repos.length === 0 && (
          <div className="glass rounded-2xl p-8 text-center text-slate-400">
            No public repos found yet. Check back soon!
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          {repos.map((repo, i) => (
            <ProjectCard key={repo.id} repo={repo} index={i} featured={repos.length === 1} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-sm font-medium text-slate-300 transition-all hover:border-emerald-400/50 hover:text-emerald-400"
          >
            <GitHubIcon className="h-4 w-4" />
            View all on GitHub
            <ExternalLink className="h-3.5 w-3.5 opacity-50" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function ProjectCard({
  repo,
  index,
  featured,
}: {
  repo: GitHubRepo
  index: number
  featured?: boolean
}) {
  const [readmeOpen, setReadmeOpen] = useState(false)
  const [readmeRequested, setReadmeRequested] = useState(false)

  // The README is the most current description of a project, so it outranks the
  // GitHub blurb — but a hand-written override still wins.
  const description =
    repo.override?.description ??
    repo.readme?.summary ??
    repo.description ??
    'No description provided.'
  const highlights =
    repo.override?.highlights ??
    (repo.readme?.highlights.length ? repo.readme.highlights : [])
  // An untouched starter-template README isn't worth offering to read.
  const readmeMarkdown = repo.readme?.isBoilerplate ? undefined : repo.readme?.markdown
  const langColor = repo.language ? LANGUAGE_COLORS[repo.language] ?? '#64748b' : null

  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`glass glow-border group relative overflow-hidden rounded-2xl ${
        featured ? 'lg:col-span-2' : ''
      }`}
    >
      {/* Decorative gradient header */}
      <div className="relative h-32 overflow-hidden bg-gradient-to-br from-emerald-500/10 via-purple-500/10 to-pink-500/5">
        <div className="absolute inset-0 opacity-30">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`grid-${repo.id}`} width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(52,211,153,0.15)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${repo.id})`} />
          </svg>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <FolderGit2 className="h-12 w-12 text-emerald-400/30 transition-transform group-hover:scale-110 group-hover:text-emerald-400/50" />
        </div>
        {repo.override?.featured && (
          <span className="absolute top-3 right-3 rounded-full bg-emerald-500/20 px-3 py-1 font-mono text-xs text-emerald-300">
            featured
          </span>
        )}
      </div>

      <div className={`p-7 ${featured ? 'lg:flex lg:gap-8' : ''}`}>
        <div className={featured ? 'lg:flex-1' : ''}>
          <div className="mb-3 flex items-start justify-between gap-4">
            <h3 className="font-mono text-xl font-semibold text-white transition-colors group-hover:text-emerald-400">
              {repo.name}
            </h3>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${repo.name} on GitHub`}
              className="shrink-0 rounded-lg p-2 text-slate-500 transition-colors hover:bg-white/5 hover:text-emerald-400"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <p className="mb-5 leading-relaxed text-slate-400">{description}</p>

          {highlights.length > 0 && (
            <ul className="mb-5 space-y-2">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-400">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={featured ? 'lg:w-48 lg:shrink-0' : ''}>
          <div className="flex flex-wrap items-center gap-3 border-t border-white/5 pt-5">
            {repo.language && langColor && (
              <span className="flex items-center gap-1.5 font-mono text-xs text-slate-400">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: langColor }}
                />
                {repo.language}
              </span>
            )}
            {repo.stargazers_count > 0 && (
              <span className="flex items-center gap-1 font-mono text-xs text-slate-500">
                <Star className="h-3 w-3" />
                {repo.stargazers_count}
              </span>
            )}
            {repo.forks_count > 0 && (
              <span className="flex items-center gap-1 font-mono text-xs text-slate-500">
                <GitFork className="h-3 w-3" />
                {repo.forks_count}
              </span>
            )}
            <span className="ml-auto font-mono text-xs text-slate-600">
              updated {formatDate(repo.updated_at)}
            </span>
          </div>

          <div className="mt-4 space-y-2">
            {readmeMarkdown && (
              <button
                type="button"
                onClick={() => {
                  setReadmeRequested(true)
                  setReadmeOpen(true)
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-500/10 py-2.5 text-sm font-medium text-emerald-300 transition-all hover:border-emerald-400/40 hover:bg-emerald-500/15"
              >
                <BookOpen className="h-4 w-4" />
                Read README
              </button>
            )}
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/5 py-2.5 text-sm font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white"
            >
              <GitHubIcon className="h-4 w-4" />
              View repository
            </a>
          </div>
        </div>
      </div>

      {readmeMarkdown && readmeRequested && (
        <Suspense fallback={null}>
          <ReadmeModal
            open={readmeOpen}
            onClose={() => setReadmeOpen(false)}
            repoName={repo.name}
            repoUrl={repo.html_url}
            branch={repo.default_branch ?? 'main'}
            markdown={readmeMarkdown}
          />
        </Suspense>
      )}
    </motion.article>
  )
}
