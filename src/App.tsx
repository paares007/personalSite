import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Projects } from './components/Projects'
import { ContactForm } from './components/ContactForm'
import { Footer } from './components/Footer'
import { NeuralNetworkBackground } from './components/NeuralNetworkBackground'

function App() {
  return (
    <>
      <NeuralNetworkBackground />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_rgba(52,211,153,0.08)_0%,_transparent_50%)]" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(167,139,250,0.06)_0%,_transparent_50%)]" />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <ContactForm />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
