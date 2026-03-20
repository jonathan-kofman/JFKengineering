"use client"

import Image from "next/image"
import dynamic from "next/dynamic"
import { useState, useEffect, useRef, useMemo } from "react"
import { motion } from "framer-motion"
import { githubProjects } from "@/content/github-projects"

const Gallery = dynamic(() => import("@/components/gallery"), {
  loading: () => (
    <div
      className="min-h-[240px] flex flex-col items-center justify-center gap-3 py-16 text-slate-500"
      aria-live="polite"
      aria-label="Loading gallery"
    >
      <div className="h-9 w-9 rounded-full border-2 border-cyan-400/25 border-t-cyan-400 animate-spin" />
      <span className="text-sm">Loading gallery…</span>
    </div>
  ),
  ssr: false,
})

// Define types for the tab content
type TabName =
  | "Applied Materials"
  | "Northeastern Formula Racing"
  | "AerospaceNU"
  | "Robodog Project"
  | "Scarlet Flight"
  | "Rutgers Formula Racing"

interface TabContent {
  title: string
  date: string
  content: string
}

type TabContents = {
  [K in TabName]: TabContent
}

// Define aerospace and manufacturing icons
interface BackgroundIcon {
  svg: string
  position: {
    top?: string
    bottom?: string
    left?: string
    right?: string
  }
  size: string
  animationDelay: string
  animationDuration: string
  rotation?: string
}

const NAV_ITEMS = ["Home", "About", "Experience", "Projects", "Gallery", "Contact"] as const

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabName>("Applied Materials")
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)
  const particlesRef = useRef<HTMLDivElement>(null)
  const iconsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReduceMotion(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const total = el.scrollHeight - el.clientHeight
      setScrollProgress(total > 0 ? (el.scrollTop / total) * 100 : 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Wrap backgroundIcons in useMemo to avoid recreating on every render
  const backgroundIcons = useMemo<BackgroundIcon[]>(() => [
    // Jet/Airplane icons
    {
      svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M42 12L36 18V30L42 36L46 32V16L42 12Z" stroke="#3b82f6" stroke-width="1.5"/>
        <path d="M36 18H24L6 12V18L18 24H36V18Z" stroke="#3b82f6" stroke-width="1.5"/>
        <path d="M36 30H24L6 36V30L18 24H36V30Z" stroke="#3b82f6" stroke-width="1.5"/>
        <circle cx="18" cy="24" r="2" stroke="#3b82f6" stroke-width="1.5"/>
      </svg>`,
      position: { top: '15%', left: '10%' },
      size: '80px',
      animationDelay: '0s',
      animationDuration: '25s',
      rotation: '15deg'
    },
    {
      svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 8L48 24H40L32 16L16 32L8 48L16 56L32 40L40 48V56L24 40L40 24L56 8L32 8Z" stroke="#22d3ee" stroke-width="1.5"/>
        <circle cx="32" cy="32" r="4" stroke="#22d3ee" stroke-width="1.5"/>
      </svg>`,
      position: { bottom: '25%', right: '15%' },
      size: '100px',
      animationDelay: '5s',
      animationDuration: '28s',
      rotation: '-10deg'
    },
    
    // Rocket/Missile icons
    {
      svg: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 4L20 8V20L16 24L12 20V8L16 4Z" stroke="#8b5cf6" stroke-width="1.5"/>
        <path d="M12 12H8L4 16L8 20H12" stroke="#8b5cf6" stroke-width="1.5"/>
        <path d="M20 12H24L28 16L24 20H20" stroke="#8b5cf6" stroke-width="1.5"/>
        <path d="M16 24V28" stroke="#8b5cf6" stroke-width="1.5"/>
        <path d="M14 28H18" stroke="#8b5cf6" stroke-width="1.5"/>
      </svg>`,
      position: { top: '40%', right: '8%' },
      size: '60px',
      animationDelay: '2s',
      animationDuration: '20s',
      rotation: '45deg'
    },
    {
      svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 4V12M24 12L16 20H32L24 12Z" stroke="#3b82f6" stroke-width="1.5"/>
        <path d="M20 20V36M28 20V36" stroke="#3b82f6" stroke-width="1.5"/>
        <path d="M16 36H32L24 44L16 36Z" stroke="#3b82f6" stroke-width="1.5"/>
      </svg>`,
      position: { bottom: '15%', left: '20%' },
      size: '70px',
      animationDelay: '7s',
      animationDuration: '22s',
      rotation: '-20deg'
    },
    
    // 3D Printer icons
    {
      svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="8" width="48" height="12" stroke="#22d3ee" stroke-width="1.5"/>
        <rect x="12" y="20" width="40" height="36" stroke="#22d3ee" stroke-width="1.5"/>
        <path d="M24 8V4M40 8V4" stroke="#22d3ee" stroke-width="1.5"/>
        <path d="M20 32H44M20 44H44" stroke="#22d3ee" stroke-width="1.5"/>
        <path d="M32 20V56" stroke="#22d3ee" stroke-width="1.5"/>
        <rect x="26" y="26" width="12" height="4" stroke="#22d3ee" stroke-width="1.5"/>
      </svg>`,
      position: { top: '60%', left: '15%' },
      size: '90px',
      animationDelay: '3s',
      animationDuration: '26s',
      rotation: '5deg'
    },
    
    // Robot icons
    {
      svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="16" width="24" height="20" rx="2" stroke="#8b5cf6" stroke-width="1.5"/>
        <circle cx="18" cy="22" r="2" stroke="#8b5cf6" stroke-width="1.5"/>
        <circle cx="30" cy="22" r="2" stroke="#8b5cf6" stroke-width="1.5"/>
        <path d="M20 30H28" stroke="#8b5cf6" stroke-width="1.5"/>
        <path d="M24 8V16" stroke="#8b5cf6" stroke-width="1.5"/>
        <path d="M8 20H12M40 20H36" stroke="#8b5cf6" stroke-width="1.5"/>
        <path d="M16 36V42M32 36V42" stroke="#8b5cf6" stroke-width="1.5"/>
      </svg>`,
      position: { top: '25%', right: '25%' },
      size: '70px',
      animationDelay: '4s',
      animationDuration: '24s',
      rotation: '-8deg'
    },
    
    // Drone icon
    {
      svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="4" stroke="#3b82f6" stroke-width="1.5"/>
        <path d="M16 16L12 12M32 16L36 12M16 32L12 36M32 32L36 36" stroke="#3b82f6" stroke-width="1.5"/>
        <circle cx="12" cy="12" r="4" stroke="#3b82f6" stroke-width="1.5"/>
        <circle cx="36" cy="12" r="4" stroke="#3b82f6" stroke-width="1.5"/>
        <circle cx="12" cy="36" r="4" stroke="#3b82f6" stroke-width="1.5"/>
        <circle cx="36" cy="36" r="4" stroke="#3b82f6" stroke-width="1.5"/>
      </svg>`,
      position: { bottom: '35%', right: '10%' },
      size: '60px',
      animationDelay: '6s',
      animationDuration: '23s',
      rotation: '0deg'
    },
    
    // CNC Machine icon
    {
      svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="8" width="48" height="48" stroke="#22d3ee" stroke-width="1.5"/>
        <path d="M8 24H56" stroke="#22d3ee" stroke-width="1.5"/>
        <path d="M24 24V56" stroke="#22d3ee" stroke-width="1.5"/>
        <path d="M24 16L40 16" stroke="#22d3ee" stroke-width="1.5"/>
        <path d="M32 24L32 40" stroke="#22d3ee" stroke-width="1.5"/>
        <path d="M16 32L16 48" stroke="#22d3ee" stroke-width="1.5"/>
        <path d="M32 32H48" stroke="#22d3ee" stroke-width="1.5"/>
      </svg>`,
      position: { top: '10%', left: '30%' },
      size: '80px',
      animationDelay: '1s',
      animationDuration: '27s',
      rotation: '12deg'
    },
    
    // Circuit board icon
    {
      svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="40" height="40" stroke="#8b5cf6" stroke-width="1.5"/>
        <circle cx="12" cy="12" r="4" stroke="#8b5cf6" stroke-width="1.5"/>
        <circle cx="36" cy="12" r="4" stroke="#8b5cf6" stroke-width="1.5"/>
        <circle cx="12" cy="36" r="4" stroke="#8b5cf6" stroke-width="1.5"/>
        <circle cx="36" cy="36" r="4" stroke="#8b5cf6" stroke-width="1.5"/>
        <path d="M12 16V32M16 12H32M36 16V32M16 36H32" stroke="#8b5cf6" stroke-width="1.5"/>
        <rect x="20" y="20" width="8" height="8" stroke="#8b5cf6" stroke-width="1.5"/>
      </svg>`,
      position: { bottom: '10%', left: '35%' },
      size: '75px',
      animationDelay: '8s',
      animationDuration: '29s',
      rotation: '-15deg'
    },
    
    // Gear icon
    {
      svg: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 20C18.2091 20 20 18.2091 20 16C20 13.7909 18.2091 12 16 12C13.7909 12 12 13.7909 12 16C12 18.2091 13.7909 20 16 20Z" stroke="#3b82f6" stroke-width="1.5"/>
        <path d="M16 4V8" stroke="#3b82f6" stroke-width="1.5"/>
        <path d="M16 24V28" stroke="#3b82f6" stroke-width="1.5"/>
        <path d="M4 16H8" stroke="#3b82f6" stroke-width="1.5"/>
        <path d="M24 16H28" stroke="#3b82f6" stroke-width="1.5"/>
        <path d="M7.5 7.5L10.5 10.5" stroke="#3b82f6" stroke-width="1.5"/>
        <path d="M21.5 21.5L24.5 24.5" stroke="#3b82f6" stroke-width="1.5"/>
        <path d="M7.5 24.5L10.5 21.5" stroke="#3b82f6" stroke-width="1.5"/>
        <path d="M21.5 10.5L24.5 7.5" stroke="#3b82f6" stroke-width="1.5"/>
      </svg>`,
      position: { top: '35%', left: '7%' },
      size: '55px',
      animationDelay: '0s',
      animationDuration: '15s',
      rotation: '0deg'
    },
    // Double gear icon
    {
      svg: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 20C18.2091 20 20 18.2091 20 16C20 13.7909 18.2091 12 16 12C13.7909 12 12 13.7909 12 16C12 18.2091 13.7909 20 16 20Z" stroke="#22d3ee" stroke-width="1.5"/>
        <path d="M32 36C34.2091 36 36 34.2091 36 32C36 29.7909 34.2091 28 32 28C29.7909 28 28 29.7909 28 32C28 34.2091 29.7909 36 32 36Z" stroke="#22d3ee" stroke-width="1.5"/>
        <path d="M20 16L28 32" stroke="#22d3ee" stroke-width="1.5"/>
      </svg>`,
      position: { bottom: '25%', right: '30%' },
      size: '65px',
      animationDelay: '3s',
      animationDuration: '18s',
      rotation: '25deg'
    }
  ], []);

  // Handle scroll for active section highlighting
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Determine which section is currently in view
      const sections = ["home", "about", "experience", "projects", "gallery", "contact"]
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Create particles for tech background effect (skipped when reduced motion / lighter on small screens)
  useEffect(() => {
    if (!particlesRef.current) return

    const container = particlesRef.current
    container.innerHTML = ""

    if (reduceMotion) return

    const count = typeof window !== "undefined" && window.innerWidth < 768 ? 28 : 48

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div')
      
      // Random size between 1-3px
      const size = Math.random() * 2 + 1
      
      // Random position
      const posX = Math.random() * 100
      const posY = Math.random() * 100
      
      // Random opacity and color
      const opacity = Math.random() * 0.5 + 0.1
      const colors = ['#3b82f6', '#8b5cf6', '#22d3ee']
      const color = colors[Math.floor(Math.random() * colors.length)]
      
      // Apply styles
      particle.style.position = 'absolute'
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.borderRadius = '50%'
      particle.style.left = `${posX}%`
      particle.style.top = `${posY}%`
      particle.style.backgroundColor = color
      particle.style.opacity = `${opacity}`
      particle.style.boxShadow = `0 0 ${size * 2}px ${color}`
      
      // Animation duration between 15-30s
      const duration = 15 + Math.random() * 15
      particle.style.animation = `float ${duration}s infinite linear`
      
      // Add to container
      container.appendChild(particle)
    }
    
    // Create float animation
    const style = document.createElement('style')
    style.textContent = `
      @keyframes float {
        0% {
          transform: translate(0, 0);
        }
        25% {
          transform: translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px);
        }
        50% {
          transform: translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px);
        }
        75% {
          transform: translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px);
        }
        100% {
          transform: translate(0, 0);
        }
      }
    `
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [reduceMotion])

  // Create background icons
  useEffect(() => {
    if (!iconsRef.current) return
    
    const container = iconsRef.current
    container.innerHTML = ''
    
    backgroundIcons.forEach((icon) => {
      const iconElement = document.createElement('div')
      
      // Set position
      iconElement.style.position = 'absolute'
      if (icon.position.top) iconElement.style.top = icon.position.top
      if (icon.position.bottom) iconElement.style.bottom = icon.position.bottom
      if (icon.position.left) iconElement.style.left = icon.position.left
      if (icon.position.right) iconElement.style.right = icon.position.right
      
      // Set size
      iconElement.style.width = icon.size
      iconElement.style.height = icon.size
      
      // Set animation
      iconElement.style.animationDelay = icon.animationDelay
      iconElement.style.animationDuration = icon.animationDuration
      iconElement.classList.add('floating-icon')
      
      // Set rotation if provided
      if (icon.rotation) {
        iconElement.style.transform = `rotate(${icon.rotation})`
      }
      
      // Set SVG content
      iconElement.innerHTML = icon.svg
      
      // Add to container
      container.appendChild(iconElement)
    })
  }, [backgroundIcons]) // Now using the memoized backgroundIcons

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  // Experience tab content
  const tabContent: TabContents = {
    "Applied Materials": {
      title: "Mechanical Design Engineer (co-op)",
      date: "May 2025 – Dec 2025",
      content:
        "At Applied Materials I delivered mechanical design work for semiconductor capital equipment. I developed and built two ultra-pure helium contamination test stands for cryo-pump supply plumbing, ran Fluidflow analysis on components inside tool fluid routes, and produced wiring schematics technicians used to assemble DI water leak and level sensors in flow loops.",
    },
    "Northeastern Formula Racing": {
      title: "Team member — multi-subsystem contributions",
      date: "2024 – Present",
      content:
        "While completing my M.Eng. at Northeastern I contribute to Northeastern Formula Racing across structural design, aerodynamics, powertrain integration, and business-side team needs—linking fabrication constraints to on-track performance goals.",
    },
    "AerospaceNU": {
      title: "CNC/CAM and Ablatives Lead",
      date: "Sep 2024 – Present",
      content:
        "I lead design and manufacturing for critical liquid rocket hardware—bottom and top injector plates, nozzle, and combustion chamber—using CNC machining and CAM in SolidWorks and HSMWorks on a Tormach 1100M.",
    },
    "Robodog Project": {
      title: "Two-stage coilgun on a legged robot",
      date: "2024 – Present",
      content:
        "Personal R&D merging locomotion and electromagnetic launch: Raspberry Pi 5–based controls, custom 3D-printed mechanical interfaces, and disciplined power management—designed and integrated end to end alongside class and team commitments.",
    },
    "Scarlet Flight": {
      title: "Propulsion and Financial Co-Lead",
      date: "Jun 2023 – Aug 2024",
      content:
        "Scarlet Flight was my Rutgers senior design project with six other seniors. I co-led propulsion and finance: rocket test-stand work, SolidWorks/ANSYS-driven body and nozzle optimization, and machining once the architecture was frozen—supporting expo-ready hardware and documentation.",
    },
    "Rutgers Formula Racing": {
      title: "Aerodynamic Lead · Chassis & fabrication",
      date: "Oct 2020 – Aug 2024",
      content:
        "With Rutgers Formula Racing I served as aerodynamics lead on the 22A and 23A cars—SolidWorks/ANSYS lift–drag campaigns, CFD and FEA on wings and diffusers, and track-focused downforce trade studies. I also supported chassis work and welding, helping connect aero surfaces to a fabrication-ready chassis.",
    },
  }

  // Interface for social links
  interface SocialLink {
    icon: string
    link: string
  }

  const skillTags = useMemo(
    () => [
      "SolidWorks",
      "ANSYS CFD / FEA",
      "Fluidflow",
      "CNC & CAM (HSMWorks)",
      "Tormach 1100M",
      "Wiring & sensors",
      "3D printing",
      "Raspberry Pi / controls",
      "Python",
      "FE Mechanical (EIT)",
    ],
    []
  )

  const socialLinks: SocialLink[] = [
    {
      icon: "fab fa-instagram",
      link: "https://www.instagram.com/j.kofman123/"
    },
    {
      icon: "fab fa-linkedin",
      link: "https://www.linkedin.com/in/jonathan-kofman-096129211"
    },
    {
      icon: "fab fa-github",
      link: "https://github.com/jonathan-kofman"
    },
    {
      icon: "fas fa-podcast",
      link: "https://www.guidience.com"
    }
  ]

  return (
    <div className="font-sans text-gray-100 min-h-screen">
      <div
        className="fixed top-0 left-0 right-0 z-[100] h-1 pointer-events-none bg-slate-900/80"
        aria-hidden
      >
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400 transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <a
        href="#main"
        className="fixed left-4 top-[-100px] z-[110] rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white shadow-lg ring-2 ring-cyan-400 transition-[top] duration-200 focus:top-20 focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Tech background effects */}
      <div className="particles-container" ref={particlesRef}></div>
      
      {/* Background aerospace and manufacturing icons */}
      <div className="icon-backgrounds" ref={iconsRef}></div>
      
      {/* Header Section */}
      <header id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="section-overlay"></div>
        <div className="circuit-pattern"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-40 h-40 opacity-10 animate-pulse">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 5L95 95H5L50 5Z" stroke="#3b82f6" strokeWidth="2" />
            <circle cx="50" cy="50" r="20" stroke="#22d3ee" strokeWidth="2" />
            <line x1="20" y1="50" x2="80" y2="50" stroke="#8b5cf6" strokeWidth="2" />
            <line x1="50" y1="20" x2="50" y2="80" stroke="#8b5cf6" strokeWidth="2" />
          </svg>
        </div>
        
        <div className="absolute bottom-20 right-10 w-64 h-64 opacity-10 animate-pulse">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="#3b82f6" strokeWidth="2" />
            <circle cx="50" cy="50" r="30" stroke="#22d3ee" strokeWidth="2" />
            <circle cx="50" cy="50" r="15" stroke="#8b5cf6" strokeWidth="2" />
            <line x1="5" y1="50" x2="95" y2="50" stroke="#3b82f6" strokeWidth="2" />
            <line x1="50" y1="5" x2="50" y2="95" stroke="#3b82f6" strokeWidth="2" />
          </svg>
        </div>
        
        {/* Navigation */}
        <nav
          className={`navbar ${scrolled ? "scrolled" : ""}`}
          aria-label="Primary"
        >
          <div className="page-container py-3 md:py-4 relative">
            <button
              type="button"
              className="absolute right-3 top-3 z-10 md:hidden inline-flex items-center justify-center rounded-lg border border-slate-600/80 p-2.5 text-slate-200 hover:bg-slate-800/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
              aria-expanded={menuOpen}
              aria-controls="site-nav-links"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            <ul
              id="site-nav-links"
              className={`flex flex-col items-center gap-1 pb-2 md:flex-row md:justify-center md:gap-2 md:space-x-2 md:pb-0 ${
                menuOpen ? "flex pt-12" : "hidden md:flex"
              }`}
            >
              {NAV_ITEMS.map((item) => {
                const id = item.toLowerCase()
                return (
                  <li key={item}>
                    <a
                      href={`#${id}`}
                      className={`nav-link ${activeSection === id ? "active" : ""}`}
                      aria-current={activeSection === id ? "true" : undefined}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>

        {/* Hero Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center z-10 page-container max-w-4xl"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-4 gradient-text">
            Jonathan Kofman
          </h1>
          <p className="text-xl text-slate-200 sm:text-2xl font-medium mb-3">
            Aerospace &amp; manufacturing engineer
          </p>
          <p className="text-slate-400 mb-10 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Co-op mechanical design at Applied Materials; Northeastern M.Eng. student; Formula, liquid rocketry, and bench robotics—from CAD and analysis to machined hardware.
          </p>
          <a 
            href="#about"
            className="tech-button inline-flex"
          >
            Discover more
          </a>
        </motion.div>
      </header>

      <main id="main">
        {/* About Section */}
        <section id="about" className="section-padding section">
          <div className="section-overlay"></div>
          <div className="blueprint-grid"></div>
          
          <div className="page-container">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="flex flex-col md:flex-row gap-10 md:gap-14 lg:gap-16 items-start md:items-center"
            >
              <motion.div 
                variants={fadeIn}
                className="md:w-1/3"
              >
                <div className="relative aspect-square w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-md">
                  <Image
                    src="/assets/jon-headshot.jpeg"
                    alt="Jonathan Kofman"
                    width={400}
                    height={400}
                    className="object-cover w-full h-full transition-transform duration-500"
                  />
                  {/* Tech overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 overflow-hidden opacity-30">
                      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
                            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#3b82f6" strokeWidth="0.5" />
                          </pattern>
                          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                            <rect width="80" height="80" fill="url(#smallGrid)" />
                            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#3b82f6" strokeWidth="1" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                variants={fadeIn}
                className="md:w-2/3 w-full min-w-0"
              >
                <div className="section-title-block">
                  <p className="section-kicker">Profile</p>
                  <h2 className="text-3xl sm:text-4xl font-bold gradient-text">
                    About me
                  </h2>
                  <p className="section-lead max-w-none">
                    M.Eng. candidate in Advanced &amp; Intelligent Manufacturing at Northeastern (2024–2026), building on a B.E. in aerospace engineering from Rutgers. I turn models and simulations into hardware—test rigs, race cars, rockets, and robots.
                  </p>
                </div>
                <p className="text-slate-300 mb-8 text-base sm:text-lg leading-relaxed max-w-prose">
                  Hi, I&apos;m Jonathan Kofman. I&apos;m motivated by internships and full-time roles where I can keep growing in aerospace manufacturing, CAD-heavy mechanical design, and electromechanical systems. Recent work spans semiconductor test hardware, student Formula, liquid-engine machining, and personal R&amp;D builds.
                </p>

                <ul className="space-y-4 mb-8 list-none pl-0 max-w-prose" aria-label="Highlights">
                  {[
                    "Mechanical design co-op at Applied Materials: ultra-pure helium contamination test stands for cryo pump supply lines; Fluidflow analysis; wiring schematics for DI water leak/level sensors in flow loops",
                    "Northeastern Formula Racing — structural, aerodynamics, powertrain, and business contributions while in graduate school",
                    "CNC/CAM and ablatives lead with AerospaceNU on liquid rocket injector, nozzle, and chamber hardware",
                    "Personal build: two-stage coilgun integrated with a legged robot (controls, power, 3D-printed interfaces)",
                    "Scarlet Flight capstone co-lead (propulsion & finance); Rutgers Formula aero lead on 22A/23A plus chassis and welding support",
                    "Projects: adjustable climbing hangboard with an in-place pulley loading system; multi-stage water rocket (CAD/ANSYS/machining) aimed at an altitude-record class goal",
                    "Open source on GitHub — e.g. aria-auto-belay (STM32, SimpleFOC, ESP32-S3, Edge Impulse), this portfolio, and several Vercel-hosted apps",
                    "FE Mechanical passed (EIT)",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-slate-300 leading-relaxed"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Tools &amp; focus areas
                </p>
                <ul className="flex flex-wrap gap-2 mb-10" aria-label="Skills and tools">
                  {skillTags.map((tag) => (
                    <li key={tag}>
                      <span className="skill-pill">{tag}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="/assets/jon-kofman-resume.pdf"
                  className="tech-button inline-flex items-center gap-2"
                >
                  View resume
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="section-padding section">
          <div className="section-overlay"></div>
          <div className="layer-pattern"></div>
          
          <div className="page-container">
            <motion.header 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center section-title-block max-w-3xl mx-auto"
            >
              <p className="section-kicker">Work &amp; projects</p>
              <h2 className="text-3xl sm:text-4xl font-bold gradient-text">
                Experience
              </h2>
              <p className="section-lead mx-auto">
                Industry co-op, graduate/undergraduate race teams, aerospace club machining, and personal R&amp;D—open a tab for scope and tooling.
              </p>
            </motion.header>

            <div className="flex flex-col md:flex-row gap-10 lg:gap-14">
              <div className="md:w-1/3">
                <div className="rounded-lg overflow-hidden shadow-md relative group">
                  <Image
                    src="/assets/scarlet-flight.png"
                    alt="Jonathan Kofman — Formula, rocketry, and engineering project work"
                    width={672}
                    height={504}
                    className="rounded-lg object-cover w-full h-auto"
                    priority
                  />
                  {/* 3D printing layer effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="h-12 w-full">
                        {/* Simple 3D printer animation */}
                        <div className="relative h-full">
                          <div className="absolute left-0 right-0 bottom-0 h-1 bg-blue-500/30"></div>
                          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-1 w-8 h-2 bg-blue-500/70 animate-ping"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-2/3 w-full min-w-0">
                <div
                  className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3 mb-8"
                  role="tablist"
                  aria-label="Experience by team or project"
                >
                  {(Object.keys(tabContent) as TabName[]).map((tab) => {
                    const selected = activeTab === tab
                    return (
                      <button
                        key={tab}
                        type="button"
                        role="tab"
                        id={`tab-${tab.replace(/\s+/g, "-")}`}
                        aria-selected={selected}
                        aria-controls="experience-panel"
                        tabIndex={selected ? 0 : -1}
                        onClick={() => setActiveTab(tab)}
                        onKeyDown={(e) => {
                          const keys = Object.keys(tabContent) as TabName[]
                          const i = keys.indexOf(tab)
                          if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                            e.preventDefault()
                            const next = keys[(i + 1) % keys.length]
                            setActiveTab(next)
                            document.getElementById(`tab-${next.replace(/\s+/g, "-")}`)?.focus()
                          } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                            e.preventDefault()
                            const next = keys[(i - 1 + keys.length) % keys.length]
                            setActiveTab(next)
                            document.getElementById(`tab-${next.replace(/\s+/g, "-")}`)?.focus()
                          } else if (e.key === "Home") {
                            e.preventDefault()
                            const next = keys[0]
                            setActiveTab(next)
                            document.getElementById(`tab-${next.replace(/\s+/g, "-")}`)?.focus()
                          } else if (e.key === "End") {
                            e.preventDefault()
                            const next = keys[keys.length - 1]
                            setActiveTab(next)
                            document.getElementById(`tab-${next.replace(/\s+/g, "-")}`)?.focus()
                          }
                        }}
                        className={`experience-tab ${
                          selected ? "experience-tab-active" : "experience-tab-inactive"
                        }`}
                      >
                        {tab}
                      </button>
                    )
                  })}
                </div>

                <motion.div 
                  key={activeTab}
                  id="experience-panel"
                  role="tabpanel"
                  aria-labelledby={`tab-${activeTab.replace(/\s+/g, "-")}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: reduceMotion ? 0 : 0.45 }}
                  className="hover-card p-6 md:p-8 rounded-xl"
                >
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-snug mb-3">
                    {tabContent[activeTab].title}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium uppercase tracking-wider text-cyan-400/90 mb-4">
                    {tabContent[activeTab].date}
                  </p>
                  <p className="text-slate-300 leading-relaxed text-base md:text-lg">
                    {tabContent[activeTab].content}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* GitHub / open-source projects */}
        <section id="projects" className="section-padding section">
          <div className="section-overlay" />
          <div className="blueprint-grid" />
          <div className="page-container">
            <motion.header
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center section-title-block max-w-3xl mx-auto"
            >
              <p className="section-kicker">Code</p>
              <h2 className="text-3xl sm:text-4xl font-bold gradient-text">
                GitHub projects
              </h2>
              <p className="section-lead mx-auto">
                Recent public repositories — embedded climbing tech, this site, and several client / product web apps.
              </p>
            </motion.header>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.08 }}
              variants={staggerChildren}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
            >
              {githubProjects.map((project) => (
                <motion.article
                  key={project.name}
                  variants={fadeIn}
                  className="hover-card flex flex-col rounded-xl p-5 md:p-6 h-full"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-base font-semibold text-white font-mono leading-snug break-all">
                      {project.name}
                    </h3>
                    {project.language ? (
                      <span className="text-xs text-slate-500 shrink-0 tabular-nums">
                        {project.language}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-5">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                    >
                      <i className="fab fa-github" aria-hidden />
                      Repository
                    </a>
                    {project.homepage ? (
                      <a
                        href={project.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors font-medium"
                      >
                        Live site
                        <span aria-hidden>↗</span>
                      </a>
                    ) : null}
                  </div>
                </motion.article>
              ))}
            </motion.div>

            <p className="text-center mt-10 md:mt-12 text-slate-500 text-sm">
              <a
                href="https://github.com/jonathan-kofman?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-cyan-400 transition-colors inline-flex items-center gap-2"
              >
                <i className="fab fa-github" aria-hidden />
                View all repositories on GitHub
              </a>
            </p>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="section-padding section">
          <div className="section-overlay"></div>
          <div className="circuit-pattern"></div>
          
          <Gallery />
        </section>

        {/* Contact Section */}
        <section id="contact" className="section-padding section">
          <div className="section-overlay"></div>
          <div className="blueprint-grid"></div>
          
          <div className="page-container text-center">
            <motion.header 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="section-title-block max-w-2xl mx-auto"
            >
              <p className="section-kicker">Let&apos;s connect</p>
              <h2 className="text-3xl sm:text-4xl font-bold gradient-text">
                Contact
              </h2>
              <p className="section-lead mx-auto">
                Internships, full-time mechanical/aerospace roles, or project collaboration—here&apos;s how to reach me.
              </p>
            </motion.header>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="max-w-lg mx-auto mb-12"
            >
              <motion.div variants={fadeIn} className="contact-card space-y-4 text-slate-300">
                <a
                  href="mailto:jonkofm@hotmail.com"
                  className="flex items-start gap-3 rounded-lg p-2 -m-2 hover:bg-slate-700/30 transition-colors text-left break-all sm:break-normal"
                >
                  <i className="fas fa-envelope text-cyan-400 mt-1 shrink-0" aria-hidden />
                  <span className="font-medium text-slate-100 hover:text-cyan-300 transition-colors">jonkofm@hotmail.com</span>
                </a>
                <a
                  href="mailto:jfkengineeringcswp@gmail.com"
                  className="flex items-start gap-3 rounded-lg p-2 -m-2 hover:bg-slate-700/30 transition-colors text-left break-all"
                >
                  <i className="fas fa-envelope-open text-cyan-400 mt-1 shrink-0" aria-hidden />
                  <span className="font-medium text-slate-100 hover:text-cyan-300 transition-colors">jfkengineeringcswp@gmail.com</span>
                </a>
                <a
                  href="tel:9087988082"
                  className="flex items-center gap-3 rounded-lg p-2 -m-2 hover:bg-slate-700/30 transition-colors text-left"
                >
                  <i className="fas fa-phone text-cyan-400 shrink-0" aria-hidden />
                  <span className="font-medium text-slate-100 hover:text-cyan-300 transition-colors">(908) 798-8082</span>
                </a>
              </motion.div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="flex flex-wrap justify-center gap-x-8 gap-y-6"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.link}
                  variants={fadeIn}
                  whileHover={{ scale: 1.1 }}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-4xl text-gray-300 hover:text-white transition-colors group"
                >
                  <div className="relative">
                    <i className={social.icon}></i>
                    <div className="absolute -inset-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900/50 text-slate-400 py-10 text-center border-t border-slate-800/30">
        <div className="page-container max-w-2xl">
          <p>© {new Date().getFullYear()} Jonathan Kofman. All rights reserved.</p>
          <p className="mt-4 text-sm text-slate-500 leading-relaxed">
            This site uses{" "}
            <a
              href="https://policies.google.com/technologies/cookies"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 underline underline-offset-2 hover:text-cyan-400 transition-colors"
            >
              Google Analytics
            </a>
            , which may set cookies to measure traffic. See{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 underline underline-offset-2 hover:text-cyan-400 transition-colors"
            >
              Google&apos;s Privacy Policy
            </a>{" "}
            for how Google handles data.
          </p>

          <div className="flex justify-center mt-6">
            <div className="w-40 h-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
              <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-transparent to-blue-400/50 animate-pulse"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}