/** Curated public repos — synced from github.com/jonathan-kofman (update descriptions as repos evolve). */
export interface GitHubProject {
  name: string
  description: string
  href: string
  homepage?: string | null
  language?: string | null
}

export const githubProjects: GitHubProject[] = [
  {
    name: "aria-auto-belay",
    description:
      "Lead auto-belay concept: hybrid mechanical catch plus AI-assisted slack management. Stack includes STM32, SimpleFOC motor control, ESP32-S3, and Edge Impulse.",
    href: "https://github.com/jonathan-kofman/aria-auto-belay",
    homepage: null,
    language: "Python",
  },
  {
    name: "JFKengineering",
    description:
      "This portfolio — Next.js, TypeScript, Tailwind, and Framer Motion — deployed on Vercel.",
    href: "https://github.com/jonathan-kofman/JFKengineering",
    homepage: "https://jfk-engineering.vercel.app",
    language: "TypeScript",
  },
  {
    name: "personaltrainerapp",
    description:
      "Full-stack TypeScript app for personal-training workflows (scheduling, programming, and client touchpoints).",
    href: "https://github.com/jonathan-kofman/personaltrainerapp",
    homepage: null,
    language: "TypeScript",
  },
  {
    name: "pocket-disc",
    description:
      "Disc-golf companion utility — deployed as a lightweight web app on Vercel.",
    href: "https://github.com/jonathan-kofman/pocket-disc",
    homepage: "https://pocket-disc.vercel.app",
    language: "JavaScript",
  },
  {
    name: "tactical-forge-website",
    description:
      "Brand / marketing site for Tactical Forge — TypeScript stack, Vercel hosting.",
    href: "https://github.com/jonathan-kofman/tactical-forge-website",
    homepage: "https://tactical-forge-website.vercel.app",
    language: "TypeScript",
  },
  {
    name: "daviddriscollfitness",
    description:
      "Public-facing fitness professional site — Next.js on Vercel.",
    href: "https://github.com/jonathan-kofman/daviddriscollfitness",
    homepage: "https://daviddriscollfitness.vercel.app",
    language: "TypeScript",
  },
]
