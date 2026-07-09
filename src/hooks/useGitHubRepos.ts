import { useEffect, useState } from 'react'
import { PROJECT_OVERRIDES } from '../config/projects'
import { SITE } from '../config/site'

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
  override?: (typeof PROJECT_OVERRIDES)[string]
}

export function useGitHubRepos() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function fetchRepos() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${SITE.githubUsername}/repos?sort=updated&per_page=12`,
        )
        if (!res.ok) throw new Error('Failed to fetch')
        const data: GitHubRepo[] = await res.json()

        const enriched = data
          .filter((r) => !r.name.includes('personal-site'))
          .map((repo) => ({
            ...repo,
            override: PROJECT_OVERRIDES[repo.name],
          }))
          .sort((a, b) => {
            const aFeatured = a.override?.featured ? 1 : 0
            const bFeatured = b.override?.featured ? 1 : 0
            return bFeatured - aFeatured
          })

        if (!cancelled) {
          setRepos(enriched)
          setLoading(false)
        }
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
