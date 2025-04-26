"use client"

import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface MediaItem {
  type: 'image' | 'video'
  src: string
  alt: string
  caption: string
  thumbnail?: string  // Thumbnail for videos
}

const galleryMedia: MediaItem[] = [
  // Original items
  {
    type: 'image',
    src: "/assets/scarlet-flight.png",
    alt: "scarlet-flight",
    caption: "Working on Scarlet-Flight rocket"
  },
  {
    type: 'video',
    src: "/assets/HOT_FIRE.MOV",
    alt: "Hot Fire Test",
    caption: "Hot fire testing of rocket engine"
  },
  {
    type: 'image',
    src: "/assets/team_pic.JPEG",
    alt: "Engineering Team",
    caption: "The engineering team behind the project"
  },
  {
    type: 'image',
    src: "/assets/water-rocket.png",
    alt: "Rocket Assembly",
    caption: "Assembling rocket components"
  },
  {
    type: 'image',
    src: "/assets/welding.png",
    alt: "Formula Racing",
    caption: "Welding practice for the Formula team"
  },
  {
    type: 'image',
    src: "/assets/LRE_leads.JPEG",
    alt: "LRE Team Leads",
    caption: "Liquid Rocket Engine team leads"
  },
  {
    type: 'image',
    src: "/assets/chassy-weld.png",
    alt: "Formula Racing",
    caption: "Chassis and Jig design for the Formula car"
  },
  {
    type: 'video',
    src: "/assets/watertank.mp4",
    alt: "Injector for liquid rocket engine",
    caption: "Injector for liquid rocket engine"
  },
  {
    type: 'video',
    src: "/assets/weld.mp4",
    alt: "Me welding practice components",
    caption: "Me welding practice components"
  },
  {
    type: 'image',
    src: "/assets/fullsizerender.png",
    alt: "Full size render",
    caption: "Senior Design Poster for Water Rocket"
  },
  {
    type: 'image',
    src: "/assets/gear.png",
    alt: "Lab Work",
    caption: "Robodog gear"
  },
  {
    type: 'image',
    src: "/assets/gear.png",
    alt: "Lab Work",
    caption: "Robodog gear"
  },
  // Original items continued
  {
    type: 'image',
    src: "/assets/joninplane.png",
    alt: "Private Private License flight",
    caption: "Private Private License flight"
  },
  {
    type: 'image',
    src: "/assets/plane.png",
    alt: "Cessna",
    caption: "Cessna"
  },
  {
    type: 'image',
    src: "/assets/grad.jpg",
    alt: "Graduation from Rutgers University",
    caption: "Graduation from Rutgers University"
  },
  {
    type: 'video',
    src: "/assets/liquidrocket.mp4",
    alt: "Multi-stage water rocket testing",
    caption: "Multi-stage Water Rocket testing"
  },
  {
    type: 'video',
    src: "/assets/cad.mp4",
    alt: "Solenoid mount cad design",
    caption: "Solenoid mount CAD design"
  },
  // New assets
  {
    type: 'image',
    src: "/assets/bottom_injector.jpg",
    alt: "Bottom Injector",
    caption: "Bottom injector design for liquid rocket engine"
  },
  {
    type: 'image',
    src: "/assets/burnt_out.jpg",
    alt: "Burnt Out Component",
    caption: "Burnt out rocket engine component after testing"
  },
  {
    type: 'image',
    src: "/assets/engine.jpg",
    alt: "Rocket Engine",
    caption: "Assembled rocket engine design"
  },
  {
    type: 'image',
    src: "/assets/injector_assem.jpg",
    alt: "Injector Assembly",
    caption: "Injector assembly process"
  },
  {
    type: 'image',
    src: "/assets/liq_nitrogen.jpg",
    alt: "Liquid Nitrogen",
    caption: "Working with liquid nitrogen for rocket cooling"
  },
  {
    type: 'image',
    src: "/assets/machining_nozzle.jpg",
    alt: "Machining Nozzle",
    caption: "CNC machining a rocket nozzle"
  },
  {
    type: 'video',
    src: "/assets/machining.MP4",
    alt: "Machining Process",
    caption: "CNC machining process for rocket components"
  },
  {
    type: 'image',
    src: "/assets/Nozzle.jpg",
    alt: "Rocket Nozzle",
    caption: "Finished rocket nozzle design"
  },
  {
    type: 'image',
    src: "/assets/top_injector.jpg",
    alt: "Top Injector",
    caption: "Top injector design for liquid rocket engine"
  },
  {
    type: 'image',
    src: "/assets/top_plate_fresh.jpg",
    alt: "Fresh Top Plate",
    caption: "Newly machined top plate component"
  },
  {
    type: 'image',
    src: "/assets/top_plate_top.jpg",
    alt: "Top Plate View",
    caption: "Top-down view of the rocket top plate"
  }
]

const VideoThumbnail = ({ src, onThumbnailGenerated }: { src: string, onThumbnailGenerated: (thumbnail: string) => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current

    if (!video || !canvas) return

    const handleLoadedData = () => {
      // Set video to first frame
      video.currentTime = 0

      // Once we've seeked to the first frame, capture it
      const handleSeeked = () => {
        const context = canvas.getContext('2d')
        if (context) {
          canvas.width = video.videoWidth
          canvas.height = video.videoHeight
          context.drawImage(video, 0, 0, canvas.width, canvas.height)
          const thumbnail = canvas.toDataURL('image/jpeg')
          onThumbnailGenerated(thumbnail)
        }
        video.removeEventListener('seeked', handleSeeked)
      }

      video.addEventListener('seeked', handleSeeked)
      video.currentTime = 0 // Trigger seek to first frame
    }

    video.addEventListener('loadeddata', handleLoadedData)

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData)
    }
  }, [src, onThumbnailGenerated])

  return (
    <div className="hidden">
      <video ref={videoRef} src={src} crossOrigin="anonymous" />
      <canvas ref={canvasRef} />
    </div>
  )
}

export default function Gallery() {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)
  const [videoThumbnails, setVideoThumbnails] = useState<Record<string, string>>({})
  const [showAll, setShowAll] = useState(false)
  const showMoreButtonRef = useRef<HTMLButtonElement>(null)

  // Log state changes for debugging
  useEffect(() => {
    console.log('showAll state changed:', showAll)
    console.log('Number of items shown:', showAll ? galleryMedia.length : 12)
  }, [showAll])

  // Scroll to newly loaded images when showing all
  useEffect(() => {
    if (showAll && showMoreButtonRef.current) {
      // Wait for the new content to render, then scroll
      setTimeout(() => {
        const yOffset = -100; // Offset to account for fixed header
        if (showMoreButtonRef.current) {
          const y = showMoreButtonRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [showAll]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1 // Reduced stagger time for faster rendering
      }
    }
  }

  const handleThumbnailGenerated = (videoSrc: string, thumbnail: string) => {
    setVideoThumbnails(prev => ({
      ...prev,
      [videoSrc]: thumbnail
    }))
  }

  const renderThumbnail = (item: MediaItem, isPriority: boolean = false) => {
    if (item.type === 'image') {
      return (
        <Image
          src={item.src}
          alt={item.alt}
          width={600}
          height={400}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          priority={isPriority} // Control priority with a parameter
        />
      )
    }

    const thumbnailSrc = item.thumbnail || videoThumbnails[item.src]
    
    return (
      <div className="relative w-full h-64">
        {thumbnailSrc ? (
          <Image
            src={thumbnailSrc}
            alt={item.alt}
            width={600}
            height={400}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-slate-700 animate-pulse" />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-white" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </div>
        </div>
        <VideoThumbnail 
          src={item.src} 
          onThumbnailGenerated={(thumbnail) => handleThumbnailGenerated(item.src, thumbnail)} 
        />
      </div>
    )
  }

  const renderModalContent = (item: MediaItem) => {
    if (item.type === 'image') {
      return (
        <Image
          src={item.src}
          alt={item.alt}
          width={800}
          height={600}
          className="w-full h-auto"
        />
      )
    }
    return (
      <video 
        controls 
        className="w-full max-h-[70vh] object-contain" 
        autoPlay
        muted
      >
        <source src={item.src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    )
  }

  return (
    <section id="gallery" className="py-24 bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-12 pt-8 text-center gradient-text"
        >
          Engineering Gallery
        </motion.h2>

        {/* Initial 12 images */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerChildren}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {galleryMedia.slice(0, 12).map((item, index) => (
            <motion.div
              key={`initial-media-${index}`}
              variants={fadeIn}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer"
              onClick={() => setSelectedMedia(item)}
            >
              <div className="relative group rounded-lg overflow-hidden bg-slate-800 shadow-xl">
                {renderThumbnail(item, true)} {/* Set priority for initial images */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white p-4 text-sm">{item.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Separate section for additional images that appears when showAll is true */}
        {showAll && (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          >
            {galleryMedia.slice(12).map((item, index) => (
              <motion.div
                key={`additional-media-${index}`}
                variants={fadeIn}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer"
                onClick={() => setSelectedMedia(item)}
              >
                <div className="relative group rounded-lg overflow-hidden bg-slate-800 shadow-xl">
                  {renderThumbnail(item, false)} {/* Don't set priority for additional images */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <p className="text-white p-4 text-sm">{item.caption}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Show more button - only visible when not showing all images */}
        {!showAll && galleryMedia.length > 12 && (
          <div className="flex justify-center mt-12">
            <button
              ref={showMoreButtonRef}
              onClick={() => {
                console.log('Show more button clicked');
                setShowAll(true);
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition duration-300 flex items-center group"
            >
              <span>Show more photos</span>
              <span className="ml-2 text-xl">...</span>
            </button>
          </div>
        )}

        {/* Show less button - only visible when showing all images */}
        {showAll && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => {
                console.log('Show less button clicked');
                setShowAll(false);
                // Scroll back to the top of the gallery
                setTimeout(() => {
                  const galleryElement = document.getElementById('gallery');
                  if (galleryElement) {
                    const yOffset = -100;
                    const y = galleryElement.getBoundingClientRect().top + window.scrollY + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }, 100);
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition duration-300 flex items-center group"
            >
              <span>Show less photos</span>
              <span className="ml-2 text-xl">↑</span>
            </button>
          </div>
        )}
      </div>

      {/* Modal for enlarged media view */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMedia(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full bg-slate-800 rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
              >
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>
              {renderModalContent(selectedMedia)}
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{selectedMedia.alt}</h3>
                <p className="text-gray-300">{selectedMedia.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}