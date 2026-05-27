# 🚀 Uday Kumar — Cinematic AI Portfolio

> **The Most Insane Portfolio on the Internet.** Not a website. A digital experience.

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://typescriptlang.org)
[![Three.js](https://img.shields.io/badge/Three.js-0.170-green)](https://threejs.org)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-purple)](https://www.framer.com/motion)

---

## ✨ Features

### 🎬 Cinematic Experience
- AI boot sequence loader with neural particles
- Three.js neural particle field + floating rings
- Smooth Lenis scroll with parallax effects
- Custom futuristic cursor with trailing ring
- Matrix rain easter egg (type `matrix` in terminal)

### 🤖 AI Features (All work in mock mode — no API key needed!)
- **ARIA Chat Assistant** — AI trained on portfolio data
- **AI Terminal** — 10+ commands, press `` ` `` to open
- **Resume Analyzer** — Paste any JD, get match score
- **Project Recommender** — Describe your idea, get tailored suggestions

### 📐 Sections (25+)
Hero → About → Experience → Skills → Projects → AI Lab → Blog → Certifications → Hackathons → Testimonials → Contact → Footer

### 🎨 Design
- Neural dark theme with cyan/purple/emerald accents
- Glassmorphism cards with animated borders
- GPU glow effects and holographic cards
- Animated skill bars, counter animations
- Responsive — works on all devices

---

## 🏃 Quick Start

```bash
# 1. Clone / download the project
cd "Portfolio Main"

# 2. Install dependencies
npm install

# 3. Copy environment file
cp .env.example .env.local

# 4. Run development server
npm run dev

# 5. Open browser
# http://localhost:3000
```

### That's it! The portfolio works immediately in mock/demo mode.

---

## 🔑 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Optional | For real AI chat (works without it) |
| `MONGODB_URI` | Optional | For contact form persistence |
| `EMAIL_FROM` | Optional | Gmail for contact notifications |
| `EMAIL_APP_PASSWORD` | Optional | Gmail App Password |
| `GITHUB_TOKEN` | Optional | For live GitHub stats |

> **Without any env vars**: Everything works with smart mock data!
> **With OpenAI key**: AI chat, resume analyzer, and recommender use real GPT-4o-mini.

---

## 📁 Project Structure

```
portfolio/
├── app/                    # Next.js 15 App Router
│   ├── api/
│   │   ├── chat/           # AI Chat API
│   │   ├── contact/        # Contact form API
│   │   ├── resume-analyzer/# JD analysis API
│   │   └── project-recommender/
│   ├── globals.css         # Design system
│   ├── layout.tsx          # Root layout + SEO
│   └── page.tsx            # Main page
├── components/
│   ├── loaders/            # Boot sequence loader
│   ├── cursor/             # Custom futuristic cursor
│   ├── navigation/         # Floating nav + mobile dock
│   ├── hero/               # Three.js hero section
│   ├── about/              # Cinematic about
│   ├── experience/         # Glowing timeline
│   ├── skills/             # Neural skill matrix
│   ├── projects/           # Cinematic project cards
│   ├── ai-features/        # Chat, Terminal, Analyzer
│   ├── blog/               # Futuristic blog cards
│   ├── extras/             # Certs, Hackathons, Matrix
│   ├── contact/            # Glassmorphism form
│   └── footer/             # Interactive HUD footer
├── lib/
│   ├── data.ts             # ⭐ ALL PORTFOLIO CONTENT
│   ├── utils.ts            # Utility functions
│   └── openai.ts           # OpenAI client
├── store/
│   └── index.ts            # Zustand global state
├── prisma/
│   └── schema.prisma       # Database schema
├── .env.example            # Env template
└── DEPLOYMENT.md           # Deploy guide
```

---

## 🎨 Customization

**All portfolio data lives in ONE file: `lib/data.ts`**

Edit these exports to personalize everything:

```typescript
// Your personal info
export const personalInfo = {
  name: "Your Name",
  email: "you@email.com",
  // ...
}

// Your projects
export const projects = [
  {
    title: "My Project",
    description: "...",
    tech: ["React", "Python"],
    liveUrl: "https://...",
    githubUrl: "https://...",
  }
]

// Your skills
export const skills = {
  Frontend: [
    { name: "React", level: 95 },
    // ...
  ]
}

// Your experience
export const experiences = [
  {
    company: "My Company",
    role: "Senior Engineer",
    // ...
  }
]
```

---

## 🖥️ AI Terminal Commands

Press `` ` `` (backtick) to open the terminal:

| Command | Description |
|---------|-------------|
| `help` | List all commands |
| `about` | About Uday |
| `skills` | Tech stack |
| `projects` | Featured projects |
| `experience` | Work history |
| `contact` | Contact info |
| `resume` | Download resume PDF |
| `github` | Open GitHub |
| `matrix` | 🐇 Easter egg |
| `clear` | Clear terminal |

---

## 📦 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 App Router |
| Language | TypeScript |
| Styling | Tailwind CSS + Custom CSS |
| Animation | Framer Motion + GSAP |
| 3D | Three.js + React Three Fiber |
| Scroll | Lenis |
| State | Zustand |
| AI | OpenAI GPT-4o-mini |
| Database | MongoDB + Prisma |
| Icons | Lucide + React Icons |
| Email | Nodemailer |
| Deploy | Vercel |

---

## 🚀 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript check
```

---

## 📄 License

MIT — Feel free to use as a template for your own portfolio!

---

*Built with ❤️ by Uday Kumar — Hyderabad, India*
