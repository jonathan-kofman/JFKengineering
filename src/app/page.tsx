"use client"

import Image from "next/image"
// Removed unused Link import
import { useState, useEffect, useRef, useMemo } from "react"
import { motion } from "framer-motion"
import Gallery from "@/components/gallery"

// Define types for the tab content
type TabName = "Rutgers Formula Racing" | "Scarlet Flight" | "AerospaceNU" | "Robodog Project"

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

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabName>("Rutgers Formula Racing")
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)
  const particlesRef = useRef<HTMLDivElement>(null)
  const iconsRef = useRef<HTMLDivElement>(null)

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
      const sections = ["home", "about", "experience", "gallery", "contact"]
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

  // Create particles for tech background effect
  useEffect(() => {
    if (!particlesRef.current) return

    const container = particlesRef.current
    container.innerHTML = ''
    
    // Create particle elements
    for (let i = 0; i < 50; i++) {
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
  }, [])

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
    "Rutgers Formula Racing": {
      title: "Aerodynamic Lead",
      date: "Oct 2020-Aug 2024",
      content: `While on the team I helped coordinate the aerodynamic design of the cars' many components using
        SolidWorks and ANSYS to perform lift and drag tests utilizing set parameters which included
        Angle of Attack, Velocity, Temperature, and Provided load. I also performed ANSYS CFD and FEA
        over the front/rear wing as well as the front/rear diffusers to create the optimal design with
        cornering and downforce being the main priorities.`
    },
    "Scarlet Flight": {
      title: "Propulsion and Financial Lead",
      date: "Jun 2023-Aug 2024",
      content: `Scarlet Flight was my senior design project which I co-led alongside 6 other seniors. On the
        team I led propulsion analysis which included but wasn't limited to: creating a test stand to
        hold the rocket body in place to perform thrust testing, optimizing body and nozzle
        design using SolidWorks and ANSYS simulations for optimal flow, and machining each of the components once we had the optimal design.`
    },
    "AerospaceNU": {
      title: "CNC/CAM and Ablatives Lead",
      date: "Sep 2024-Present",
      content: `Leading the design and manufacturing of critical rocket components including bottom and top plates for the injector,
        nozzle, and combustion chamber. Specialized in CNC machining and CAM programming using
        SolidWorks and HSMworks on Tormach 1100M CNC.`
    },
    "Robodog Project": {
      title: "2-stage Coilgun mounted on Robot Dog",
      date: "Sep 2024-Present",
      content: `Innovative project combining robotics and electromagnetic propulsion. Designed and
        implemented a sophisticated control system using Raspberry Pi 5, with custom 3D printed
        components and advanced power management. Fully designed and manufactured inside of my apartment`
    }
  }

  // Interface for social links
  interface SocialLink {
    icon: string
    link: string
  }

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
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
          <div className="container mx-auto px-4 py-4">
            <ul className="flex justify-center space-x-4">
              {["Home", "About", "Experience", "Gallery", "Contact"].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className={`nav-link ${activeSection === item.toLowerCase() ? 'active' : ''}`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Hero Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center z-10 px-4"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-4 gradient-text">
            Jonathan Kofman
          </h1>
          <p className="text-2xl text-gray-300 mb-8">
            Aerospace Engineer
          </p>
          <a 
            href="#about"
            className="tech-button"
          >
            Discover More
          </a>
        </motion.div>
      </header>

      <main>
        {/* About Section */}
        <section id="about" className="py-24 section">
          <div className="section-overlay"></div>
          <div className="blueprint-grid"></div>
          
          <div className="max-w-6xl mx-auto px-4">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="flex flex-col md:flex-row gap-12 items-center"
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
                className="md:w-2/3"
              >
                <h2 className="text-4xl font-bold mb-6 gradient-text">
                  About Me
                </h2>
                <p className="text-gray-300 mb-6 text-lg">
                  Hi, I&apos;m Jonathan Kofman, a master&apos;s student at Northeastern University studying Advanced and Intelligent Manufacturing. With an undergraduate degree in Aerospace engineering, I combine mechanical, electrical, and industrial engineering expertise.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    "Worked on the 22A and 23A models of the Rutgers' Formula Racing car as the aerodynamics lead",
                    "Being in charge of CNC and CAM designs for heat sink and ablative engines for Northeastern Aerospace Liquid Rocket Team",
                    "Solo designing and building a 2 stage mountable coilgun with a robot dog for navigation",
                    "Multi-stage pressurized water rocket for senior design project with ambition to break world record",
                    "Passed FE Mechanical Engineering Exam"
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      className="flex items-center space-x-3"
                    >
                      <div className="h-2 w-2 bg-blue-400 rounded-full" />
                      <p className="text-gray-300">{item}</p>
                    </motion.div>
                  ))}
                </div>

                <a
                  href="/assets/jon-kofman-resume.pdf"
                  className="tech-button"
                >
                  View Resume
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 section">
          <div className="section-overlay"></div>
          <div className="layer-pattern"></div>
          
          <div className="container mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-12 text-center gradient-text"
            >
              Experience
            </motion.h2>

            <div className="flex flex-col md:flex-row gap-8 mt-4">
              <div className="md:w-1/3">
                <div className="rounded-lg overflow-hidden shadow-md relative group">
                  <Image
                    src="/assets/scarlet-flight.png"
                    alt="Engineering Experience"
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

              <div className="md:w-2/3">
                <div className="flex flex-wrap gap-4 mb-8">
                  {(Object.keys(tabContent) as TabName[]).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`experience-tab ${
                        activeTab === tab
                          ? "experience-tab-active"
                          : "experience-tab-inactive"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <motion.div 
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="hover-card p-6 rounded-lg"
                >
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {tabContent[activeTab].title}
                  </h3>
                  <p className="text-gray-400 mb-4">{tabContent[activeTab].date}</p>
                  <p className="text-gray-300">{tabContent[activeTab].content}</p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="section">
          <div className="section-overlay"></div>
          <div className="circuit-pattern"></div>
          
          <Gallery />
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 section">
          <div className="section-overlay"></div>
          <div className="blueprint-grid"></div>
          
          <div className="container mx-auto px-4 text-center">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-12 gradient-text"
            >
              Contact Links
            </motion.h2>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="flex justify-center space-x-8"
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

      <footer className="bg-slate-900/50 text-gray-300 py-8 text-center border-t border-slate-800/20">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} Jonathan Kofman. All rights reserved.</p>
          
          {/* Tech footer decorative element */}
          <div className="flex justify-center mt-4">
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