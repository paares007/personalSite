import { motion } from 'framer-motion'
import { Cpu, Database, Layers, Zap } from 'lucide-react'
import { SITE } from '../config/site'

const icons = [Cpu, Layers, Database, Zap]

export function About() {
  return (
    <section id="about" className="relative px-6 py-24">
      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-2 font-mono text-sm text-cyan-400">// about_me</p>
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            Building the future with{' '}
            <span className="gradient-text">intelligent systems</span>
          </h2>
          <p className="mb-12 max-w-3xl text-lg leading-relaxed text-slate-400">
            {SITE.bio} I&apos;m constantly exploring the intersection of
            algorithms, data, and creativity — from training models to deploying
            AI-powered applications.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SITE.highlights.map((item, i) => {
            const Icon = icons[i % icons.length]
            return (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="glass glow-border rounded-2xl p-6"
              >
                <div className="mb-4 inline-flex rounded-lg bg-cyan-500/10 p-3">
                  <Icon className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="font-semibold text-white">{item}</h3>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="glass mt-12 rounded-2xl p-6 font-mono text-sm text-slate-500"
        >
          <span className="text-purple-400">const</span>{' '}
          <span className="text-cyan-400">profile</span>{' '}
          <span className="text-slate-400">=</span>{' '}
          <span className="text-slate-400">{'{'}</span>
          <br />
          <span className="ml-4 text-slate-400">
            name: <span className="text-green-400">&quot;{SITE.name}&quot;</span>,
          </span>
          <br />
          <span className="ml-4 text-slate-400">
            school:{' '}
            <span className="text-green-400">
              &quot;UT Austin — Turing Honors&quot;
            </span>
            ,
          </span>
          <br />
          <span className="ml-4 text-slate-400">
            focus:{' '}
            <span className="text-green-400">
              &quot;ML, AI & Software Engineering&quot;
            </span>
            ,
          </span>
          <br />
          <span className="ml-4 text-slate-400">
            location: <span className="text-green-400">&quot;{SITE.location}&quot;</span>
          </span>
          <br />
          <span className="text-slate-400">{'};'}</span>
        </motion.div>
      </div>
    </section>
  )
}
