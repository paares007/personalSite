import { motion } from 'framer-motion'
import { Download, ExternalLink, FileText } from 'lucide-react'
import { SITE } from '../config/site'

export function Resume() {
  return (
    <section id="resume" className="relative px-6 py-32">
      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="mb-2 font-mono text-sm text-emerald-400">// resume</p>
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            My <span className="gradient-text">resume</span>
          </h2>
          <p className="max-w-2xl text-lg text-slate-400">
            The short version of everything above — education, experience, and
            skills on {SITE.resume.pages === 1 ? 'a single page' : `${SITE.resume.pages} pages`}.
            Read it here or take a copy with you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass glow-border overflow-hidden rounded-2xl"
        >
          <div className="flex flex-wrap items-center gap-3 border-b border-white/10 px-5 py-4">
            <FileText className="h-4 w-4 shrink-0 text-emerald-400" />
            <p className="min-w-0 flex-1 truncate font-mono text-sm text-white">
              {SITE.resume.downloadName}
            </p>
            <a
              href={SITE.resume.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs text-slate-400 transition-colors hover:bg-white/5 hover:text-emerald-400"
            >
              open in new tab
              <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href={SITE.resume.url}
              download={SITE.resume.downloadName}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-purple-500 px-4 py-2 text-sm font-medium text-white transition-all hover:opacity-90"
            >
              <Download className="h-4 w-4" />
              Download
            </a>
          </div>

          {/*
            Inline PDF rendering is unreliable on mobile browsers, so the embed is
            desktop-only and the fallback link always works.
          */}
          <object
            data={`${SITE.resume.url}#view=FitH`}
            type="application/pdf"
            title={`${SITE.name} resume`}
            className="hidden h-[85vh] w-full bg-white/[0.02] md:block"
          >
            <ResumeFallback />
          </object>
          <div className="md:hidden">
            <ResumeFallback />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ResumeFallback() {
  return (
    <div className="px-6 py-14 text-center">
      <FileText className="mx-auto mb-4 h-10 w-10 text-emerald-400/40" />
      <p className="mb-5 text-slate-400">
        Your browser can&apos;t display the PDF inline.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <a
          href={SITE.resume.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-200 transition-all hover:bg-white/10"
        >
          <ExternalLink className="h-4 w-4" />
          View resume
        </a>
        <a
          href={SITE.resume.url}
          download={SITE.resume.downloadName}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-purple-500 px-5 py-2.5 text-sm font-medium text-white transition-all hover:opacity-90"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </a>
      </div>
    </div>
  )
}
