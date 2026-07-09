import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Loader2, Mail, Send, User } from 'lucide-react'
import { SITE } from '../config/site'

interface ContactSubmission {
  name: string
  email: string
  message: string
  timestamp: string
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const validate = () => {
    if (!name.trim()) return 'Please enter your name.'
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return 'Please enter a valid email address.'
    if (!message.trim()) return 'Please tell me a bit about why you\'re reaching out.'
    return null
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const validationError = validate()
    if (validationError) {
      setErrorMsg(validationError)
      setStatus('error')
      return
    }

    setStatus('submitting')
    setErrorMsg('')

    const submission: ContactSubmission = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
    }

    try {
      const existing: ContactSubmission[] = JSON.parse(
        localStorage.getItem('contact_submissions') || '[]',
      )
      existing.push(submission)
      localStorage.setItem('contact_submissions', JSON.stringify(existing))

      // FormSubmit integration — update SITE.contactEmail with your real address
      if (SITE.contactEmail && !SITE.contactEmail.includes('example.com')) {
        const formData = new FormData()
        formData.append('name', submission.name)
        formData.append('email', submission.email)
        formData.append('message', submission.message)
        formData.append('_subject', `New contact from ${submission.name}`)
        formData.append('_captcha', 'false')

        await fetch(`https://formsubmit.co/${SITE.contactEmail}`, {
          method: 'POST',
          body: formData,
        })
      }

      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setStatus('error')
      setErrorMsg('Something went wrong. Please try again or reach out via LinkedIn.')
    }
  }

  return (
    <section id="contact" className="relative px-6 py-24">
      <div className="relative z-10 mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <p className="mb-2 font-mono text-sm text-emerald-400">// contact</p>
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Let&apos;s <span className="gradient-text">connect</span>
          </h2>
          <p className="text-slate-400">
            Leave your info below and I&apos;ll get back to you. Whether it&apos;s
            collaboration, opportunities, or just a chat about AI — I&apos;d love to hear from you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass glow-border rounded-2xl p-8"
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-8 text-center"
              >
                <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-green-400" />
                <h3 className="mb-2 text-xl font-semibold text-white">Message received!</h3>
                <p className="text-slate-400">
                  Thanks for reaching out. I&apos;ll be in touch soon.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-sm text-emerald-400 hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-300">
                    Name
                  </label>
                  <div className="relative">
                    <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pr-4 pl-10 text-white placeholder-slate-500 outline-none transition-colors focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/30"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pr-4 pl-10 text-white placeholder-slate-500 outline-none transition-colors focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/30"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your project, opportunity, or question..."
                    rows={4}
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 outline-none transition-colors focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/30"
                  />
                </div>

                {status === 'error' && errorMsg && (
                  <p className="text-sm text-red-400">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-purple-500 py-3.5 font-medium text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Register & Request Contact
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
