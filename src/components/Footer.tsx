import { FileText } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from './icons/SocialIcons'
import { SITE } from '../config/site'

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} {SITE.name}. Built with React & curiosity.
        </p>
        <div className="flex items-center gap-4">
          <a
            href={SITE.resume.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-emerald-400"
          >
            <FileText className="h-4 w-4" />
            Resume
          </a>
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 transition-colors hover:text-emerald-400"
            aria-label="GitHub"
          >
            <GitHubIcon className="h-5 w-5" />
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 transition-colors hover:text-emerald-400"
            aria-label="LinkedIn"
          >
            <LinkedInIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
