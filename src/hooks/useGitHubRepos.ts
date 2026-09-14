import { useEffect, useState } from 'react'
import { PROJECT_OVERRIDES } from '../config/projects'
import { SITE } from '../config/site'
import { fetchReadme, type RepoReadme } from '../lib/readme'

export interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
  topics: string[]
  updated_at: string
  homepage: string | null
  default_branch?: string
  fork?: boolean
  archived?: boolean
  override?: (typeof PROJECT_OVERRIDES)[string]
  /** Filled in a moment after the repo list, once the README is fetched. */
  readme?: RepoReadme | null
}

const REPO_CACHE_KEY = 'github:repos'

export function useGitHubRepos() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function fetchRepos() {
      try {
        const data = await loadRepoList()

        const enriched = data
          .filter((r) => !isThisSite(r.name) && !r.fork)
          .map((repo) => ({
            ...repo,
            override: PROJECT_OVERRIDES[repo.name],
          }))
          .sort((a, b) => {
            const aFeatured = a.override?.featured ? 1 : 0
            const bFeatured = b.override?.featured ? 1 : 0
            return bFeatured - aFeatured
          })

        if (cancelled) return
        setRepos(enriched)
        setLoading(false)

        // READMEs are the interesting part, but they're one request each — load
        // them after the cards are already on screen.
        const readmes = await Promise.all(
          enriched.map((repo) => fetchReadme(SITE.githubUsername, repo.name)),
        )
        if (cancelled) return
        setRepos(enriched.map((repo, i) => ({ ...repo, readme: readmes[i] })))
      } catch {
        if (!cancelled) {
          setError(true)
          setLoading(false)
        }
      }
    }

    fetchRepos()
    return () => {
      cancelled = true
    }
  }, [])

  return { repos, loading, error }
}

/** This site's own repo shouldn't show up in its own projects list. */
function isThisSite(name: string) {
  return name.toLowerCase().replace(/[-_]/g, '').includes('personalsite')
}

async function loadRepoList(): Promise<GitHubRepo[]> {
  try {
    const cached = sessionStorage.getItem(REPO_CACHE_KEY)
    if (cached) return JSON.parse(cached) as GitHubRepo[]
  } catch {
    // Ignore unusable cache and go to the network.
  }

  const res = await fetch(
    `https://api.github.com/users/${SITE.githubUsername}/repos?sort=updated&per_page=12`,
  )
  if (!res.ok) throw new Error('Failed to fetch')
  const data = (await res.json()) as GitHubRepo[]

  try {
    sessionStorage.setItem(REPO_CACHE_KEY, JSON.stringify(data))
  } catch {
    // Caching is optional.
  }

  return data
}
