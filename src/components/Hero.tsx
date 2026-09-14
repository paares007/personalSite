import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, FileText, Sparkles } from 'lucide-react'
import { GitHubIcon, LinkedInIcon } from './icons/SocialIcons'
import { SITE } from '../config/site'

const phrases = [
  'Machine Learning',
  'Deep Learning',
  'Artificial Intelligence',
  'Neural Networks',
]

export function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[phraseIndex]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < current.length) {
            setDisplayText(current.slice(0, displayText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 1800)
          }
        } else if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setPhraseIndex((i) => (i + 1) % phrases.length)
        }
      },
      isDeleting ? 40 : 80,
    )
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, phraseIndex])

  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 pt-20">
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 h-44 w-44 overflow-hidden rounded-full ring-4 ring-emerald-400/50 ring-offset-8 ring-offset-[#0a0a0f] md:h-56 md:w-56"
        >
          <img
            src={SITE.avatar}
            alt={SITE.name}
            className="h-full w-full object-cover"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-3 flex items-center justify-center gap-2 font-mono text-sm text-emerald-400"
        >
          <Sparkles className="h-4 w-4" />
          {SITE.location}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-4 text-5xl font-bold tracking-tight text-white md:text-7xl"
        >
          Hi, I&apos;m{' '}
          <span className="gradient-text">{SITE.name}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mb-8 h-10 font-mono text-xl text-slate-400 md:text-2xl"
        >
          Exploring{' '}
          <span className="text-emerald-400">{displayText}</span>
          <span className="animate-pulse text-emerald-400">|</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-400"
        >
          {SITE.bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="glow-border flex items-center gap-2 rounded-xl bg-white/5 px-6 py-3 font-medium text-white transition-all hover:bg-white/10 hover:shadow-lg hover:shadow-emerald-500/10"
          >
            <GitHubIcon className="h-5 w-5" />
            GitHub
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-purple-500 px-6 py-3 font-medium text-white transition-all hover:opacity-90 hover:shadow-lg hover:shadow-purple-500/20"
          >
            <LinkedInIcon className="h-5 w-5" />
            LinkedIn
          </a>
          <a
            href="#resume"
            className="flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 font-medium text-slate-300 transition-all hover:border-emerald-400/50 hover:text-emerald-400"
          >
            <FileText className="h-5 w-5" />
            Resume
          </a>
          <a
            href="#contact"
            className="rounded-xl border border-white/10 px-6 py-3 font-medium text-slate-300 transition-all hover:border-emerald-400/50 hover:text-emerald-400"
          >
            Get in Touch
          </a>
        </motion.div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 transition-colors hover:text-emerald-400"
          aria-label="Scroll to about section"
        >
          <ArrowDown className="h-6 w-6 animate-bounce" />
        </motion.a>
      </div>
    </section>
  )
}
