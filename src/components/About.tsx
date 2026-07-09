import { motion } from 'framer-motion'
import {
  BookOpen,
  Brain,
  Code2,
  GraduationCap,
  Lightbulb,
  Rocket,
  Sparkles,
  Target,
} from 'lucide-react'
import { SITE } from '../config/site'

const skillCategories = [
  { label: 'Languages', key: 'languages' as const, icon: Code2, color: 'emerald' },
  { label: 'ML & Data', key: 'ml' as const, icon: Brain, color: 'purple' },
  { label: 'System Design', key: 'system_design' as const, icon: Sparkles, color: 'pink' },
  { label: 'Tools', key: 'tools' as const, icon: Rocket, color: 'emerald' },
]

const colorMap = {
  emerald: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-400/20',
    tag: 'bg-emerald-500/10 text-emerald-300 border-emerald-400/20',
  },
  purple: {
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    border: 'border-purple-400/20',
    tag: 'bg-purple-500/10 text-purple-300 border-purple-400/20',
  },
  pink: {
    bg: 'bg-pink-500/10',
    text: 'text-pink-400',
    border: 'border-pink-400/20',
    tag: 'bg-pink-500/10 text-pink-300 border-pink-400/20',
  },
}

export function About() {
  return (
    <section id="about" className="relative px-6 py-32">
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="mb-2 font-mono text-sm text-emerald-400">// about_me</p>
          <h2 className="mb-8 text-4xl font-bold text-white md:text-5xl">
            Who I am &{' '}
            <span className="gradient-text">what I build</span>
          </h2>
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="space-y-5 lg:col-span-3">
              {SITE.longBio.map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-lg leading-relaxed text-slate-400"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass glow-border rounded-2xl p-6 lg:col-span-2"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-emerald-500/10 p-2">
                  <GraduationCap className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">{SITE.program}</p>
                  <p className="text-sm text-slate-500">{SITE.school}</p>
                </div>
              </div>
              <div className="space-y-3 border-t border-white/5 pt-4 text-sm">
                <InfoRow label="Location" value={SITE.location} />
                <InfoRow label="Focus" value="ML, AI & Software Engineering" />
                <InfoRow label="Status" value="Building & learning" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Highlights */}
        <div className="mb-24">
          <SectionLabel icon={Target} label="What I focus on" />
          <div className="grid gap-5 sm:grid-cols-2">
            {SITE.highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="glass glow-border group rounded-2xl p-7"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-xl bg-gradient-to-br from-emerald-500/20 to-purple-500/20 p-3 transition-transform group-hover:scale-110">
                    <Lightbulb className="h-5 w-5 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                </div>
                <p className="leading-relaxed text-slate-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="mb-24">
          <SectionLabel icon={BookOpen} label="My journey" />
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-[19px] w-px bg-gradient-to-b from-emerald-400/50 via-purple-400/30 to-transparent md:left-1/2 md:-translate-x-px" />
            <div className="space-y-10">
              {SITE.journey.map((step, i) => (
                <motion.div
                  key={`${step.period}-${step.title}`}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative flex flex-col gap-4 pl-14 md:pl-0 md:flex-row md:items-center ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="glass rounded-2xl border border-white/10 p-5 text-left">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-300">
                          {step.category}
                        </span>
                        <span className="font-mono text-xs text-slate-500">{step.period}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-white">{step.organization}</h3>
                      <p className="mt-1 text-sm text-slate-500">{step.location}</p>
                      <p className="mt-3 font-medium text-slate-200">{step.title}</p>
                      <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-400">
                        {step.details.map((detail) => (
                          <li key={detail} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-emerald-400/70" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="absolute left-0 flex h-10 w-10 items-center justify-center md:left-1/2 md:-translate-x-1/2">
                    <div className="h-3 w-3 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20" />
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-24">
          <SectionLabel icon={Code2} label="Tech stack" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {skillCategories.map((cat, i) => {
              const colors = colorMap[cat.color as keyof typeof colorMap]
              const Icon = cat.icon
              return (
                <motion.div
                  key={cat.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`glass rounded-2xl border p-6 ${colors.border}`}
                >
                  <div className={`mb-4 inline-flex rounded-lg p-2.5 ${colors.bg}`}>
                    <Icon className={`h-5 w-5 ${colors.text}`} />
                  </div>
                  <h3 className="mb-4 font-semibold text-white">{cat.label}</h3>
                  <div className="flex flex-wrap gap-2">
                    {SITE.skills[cat.key].map((skill) => (
                      <span
                        key={skill}
                        className={`rounded-lg border px-2.5 py-1 font-mono text-xs ${colors.tag}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Code profile snippet */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass overflow-hidden rounded-2xl"
        >
          <div className="flex items-center gap-2 border-b border-white/5 px-5 py-3">
            <span className="h-3 w-3 rounded-full bg-red-400/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
            <span className="h-3 w-3 rounded-full bg-green-400/80" />
            <span className="ml-2 font-mono text-xs text-slate-500">profile.ts</span>
          </div>
          <pre className="overflow-x-auto p-6 font-mono text-sm leading-relaxed text-slate-500">
            <span className="text-purple-400">export const</span>{' '}
            <span className="text-emerald-400">profile</span>{' '}
            <span className="text-slate-400">= {'{'}</span>
            {'\n'}
            <span className="text-slate-400">  name: </span>
            <span className="text-green-400">&quot;{SITE.name}&quot;</span>
            <span className="text-slate-400">,</span>
            {'\n'}
            <span className="text-slate-400">  school: </span>
            <span className="text-green-400">&quot;{SITE.school}&quot;</span>
            <span className="text-slate-400">,</span>
            {'\n'}
            <span className="text-slate-400">  program: </span>
            <span className="text-green-400">&quot;{SITE.program}&quot;</span>
            <span className="text-slate-400">,</span>
            {'\n'}
            <span className="text-slate-400">  location: </span>
            <span className="text-green-400">&quot;{SITE.location}&quot;</span>
            <span className="text-slate-400">,</span>
            {'\n'}
            <span className="text-slate-400">  interests: </span>
            <span className="text-slate-400">[</span>
            {'\n'}
            <span className="text-slate-400">    </span>
            <span className="text-green-400">&quot;machine learning&quot;</span>
            <span className="text-slate-400">,</span>
            {'\n'}
            <span className="text-slate-400">    </span>
            <span className="text-green-400">&quot;deep learning&quot;</span>
            <span className="text-slate-400">,</span>
            {'\n'}
            <span className="text-slate-400">    </span>
            <span className="text-green-400">&quot;full-stack development&quot;</span>
            <span className="text-slate-400">,</span>
            {'\n'}
            <span className="text-slate-400">    </span>
            <span className="text-green-400">&quot;building intelligent systems&quot;</span>
            <span className="text-slate-400">,</span>
            {'\n'}
            <span className="text-slate-400">  ],</span>
            {'\n'}
            <span className="text-slate-400">  currently: </span>
            <span className="text-green-400">&quot;shipping projects &amp; studying AI&quot;</span>
            <span className="text-slate-400">,</span>
            {'\n'}
            <span className="text-slate-400">{'}'}</span>
            <span className="text-slate-400">;</span>
          </pre>
        </motion.div>
      </div>
    </section>
  )
}

function SectionLabel({ icon: Icon, label }: { icon: typeof Target; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-8 flex items-center gap-3"
    >
      <div className="rounded-lg bg-emerald-500/10 p-2">
        <Icon className="h-4 w-4 text-emerald-400" />
      </div>
      <h3 className="text-2xl font-bold text-white">{label}</h3>
    </motion.div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-slate-500">{label}</span>
      <span className="text-right text-slate-300">{value}</span>
    </div>
  )
}
