export interface ProjectOverride {
  description: string
  highlights: string[]
  featured?: boolean
}

export const PROJECT_OVERRIDES: Record<string, ProjectOverride> = {
  dentalClinic: {
    description:
      'A polished single-page application for a modern dental clinic — featuring animated service cards, a before/after gallery, patient testimonials, and a responsive design built entirely with React and Framer Motion.',
    highlights: [
      'Interactive service catalog with detail modals',
      'Filterable before/after gallery',
      'Patient testimonial carousel',
      'Fully responsive, mobile-first UI',
    ],
    featured: true,
  },
}

export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python: '#3572A5',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Java: '#b07219',
  'C++': '#f34b7d',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
}
