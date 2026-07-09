# Pablo Arango — Personal Site

A dynamic personal portfolio with ML/AI aesthetics. Built with React, Vite, Tailwind CSS, and Framer Motion.

## Features

- Animated neural network background (interactive with mouse)
- Typing animation cycling through ML/AI topics
- About section with skill highlights
- Contact form for visitors to register their info
- Links to [GitHub](https://github.com/paares007) and [LinkedIn](https://www.linkedin.com/in/pablo-arango-esc/)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Contact Form Setup

Submissions are saved locally in the browser. To receive emails when someone contacts you:

1. Open `src/config/site.ts`
2. Replace `contactEmail: 'pablo.arango@example.com'` with your real email
3. The form will automatically send via [FormSubmit](https://formsubmit.co/) (free, no backend needed)

## Deploy

Build for production:

```bash
npm run build
```

Deploy the `dist/` folder to [Vercel](https://vercel.com), [Netlify](https://netlify.com), or GitHub Pages.

## Customize

Edit `src/config/site.ts` to update your name, bio, links, and highlights.
