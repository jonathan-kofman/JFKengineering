"use client"


import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
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

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabName>("Rutgers Formula Racing")






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
    }
  ]


  return (
    <div className="font-sans bg-gradient-to-b from-slate-900 to-slate-800 text-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="relative min-h-screen flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"
        />
        
        {/* Navigation */}
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed top-0 left-0 right-0 bg-slate-900/80 backdrop-blur-sm z-50"
        >
          <div className="container mx-auto px-4 py-4">
            <ul className="flex justify-center space-x-8">
              {["Home", "About", "Experience", "Gallery", "Contact", "Store"].map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href={item === "Store" ? "/store" : `#${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.nav>

        {/* Hero Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-center z-10 px-4"
            >
              <h1 className="text-6xl font-bold mb-4 gradient-text">
                Jonathan Kofman
              </h1>
              <p className="text-2xl text-gray-300 mb-6">
                Aerospace Engineer
              </p>
            </motion.div>
      </header>

      <main>
        {/* About Section */}
        <section id="about" className="py-24 bg-slate-800/50">
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
                <div className="relative aspect-square w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-xl">
                  <Image
                    src="/assets/jon-headshot.jpeg"
                    alt="Jonathan Kofman"
                    width={400}
                    height={400}
                    className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
                  />
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

                <motion.a
                  href="/assets/jon-kofman-resume.pdf"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  View Resume
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </section>

<section id="experience" className="py-24 bg-slate-900">
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
        <Image
          src="/assets/scarlet-flight.png"
          alt="Engineering Experience"
          width={672} // Maintaining aspect ratio: 504 * (4032/3024) ≈ 672
          height={504}
          className="rounded-lg shadow-xl object-cover w-full h-auto"
          priority
        />
      </div>

      <div className="md:w-2/3">
        <div className="flex flex-wrap gap-4 mb-8">
          {(Object.keys(tabContent) as TabName[]).map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                activeTab === tab
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                  : "bg-slate-800 text-gray-300 hover:bg-slate-700"
              }`}
            >
              {tab}
            </motion.button>
          ))}
        </div>

        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-slate-800 p-6 rounded-lg shadow-xl"
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

        <Gallery />


        {/* Contact Section */}
        <section id="contact" className="py-24 bg-slate-900">
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
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  variants={fadeIn}
                  whileHover={{ scale: 1.2 }}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-4xl text-gray-300 hover:text-white transition-colors"
                >
                  <i className={social.icon}></i>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>


      </main>

      <footer className="bg-slate-900 text-gray-300 py-8 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          © {new Date().getFullYear()} Jonathan Kofman. All rights reserved.
        </motion.p>
      </footer>
    </div>
  )
}