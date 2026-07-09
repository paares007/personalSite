import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, Menu, X } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from './icons/SocialIcons'
import { SITE } from '../config/site'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass py-3 shadow-lg shadow-emerald-500/5' : 'bg-transparent py-5'
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2 font-semibold text-white">
          <Brain className="h-5 w-5 text-emerald-400" />
          <span className="font-mono text-sm tracking-tight">PA</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-slate-400 transition-colors hover:text-emerald-400"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="flex gap-3">
            <SocialIcon href={SITE.github} icon={GitHubIcon} label="GitHub" />
            <SocialIcon href={SITE.linkedin} icon={LinkedInIcon} label="LinkedIn" />
          </li>
        </ul>

        <button
          type="button"
          className="text-slate-300 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass mx-4 mt-2 rounded-xl p-4 md:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-2 text-slate-300"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-3 flex gap-4 border-t border-white/10 pt-3">
            <SocialIcon href={SITE.github} icon={GitHubIcon} label="GitHub" />
            <SocialIcon href={SITE.linkedin} icon={LinkedInIcon} label="LinkedIn" />
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}

function SocialIcon({
  href,
  icon: Icon,
  label,
}: {
  href: string
  icon: typeof GitHubIcon
  label: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="rounded-lg p-2 text-slate-400 transition-all hover:bg-white/5 hover:text-emerald-400"
    >
      <Icon className="h-5 w-5" />
    </a>
  )
}
