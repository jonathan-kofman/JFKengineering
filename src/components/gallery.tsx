"use client"

import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface MediaItem {
    type: 'image' | 'video'
    src: string
    alt: string
    caption: string
    thumbnail?: string  // Thumbnail for videos
  }

  const galleryMedia: MediaItem[] = [
    {
        type: 'image',

    src: "/assets/scarlet-flight.png",
    alt: "scarlet-flight",
    caption: "Working on Scarlet-Flight rocket"
  },
  {
    type: 'image',
    src: "/assets/chassy.png",
    alt: "Chassis from Rutgers' Formula Racing",
    caption: "Chassis from Rutgers' Formula Racing"
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
    src: "/assets/chassy-weld.png",
    alt: "Formula Racing",
    caption: "Chassis and Jig design for the Formula car"
  },

  {
    type: 'video',
    src: "/assets/watertank.mp4",
    alt: "Injector for liquid rocket engine",
    caption: "Injector for liquid rocket engine",

  },
  {
    type: 'video',
    src: "/assets/weld.mp4",
    alt: "Me welding practice components",
    caption: "Me welding practice components",
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
    caption: "Multi-stage Water Rocket testing",
  },
  {
    type: 'video',
    src: "/assets/cad.mp4",
    alt: "Solenoid mount cad design",
    caption: "Solenoid mount CAD design",
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
  
    const handleThumbnailGenerated = (videoSrc: string, thumbnail: string) => {
      setVideoThumbnails(prev => ({
        ...prev,
        [videoSrc]: thumbnail
      }))
    }
  
    const renderThumbnail = (item: MediaItem) => {
      if (item.type === 'image') {
        return (
          <Image
            src={item.src}
            alt={item.alt}
            width={600}
            height={400}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
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
  
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {galleryMedia.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer"
                onClick={() => setSelectedMedia(item)}
              >
                <div className="relative group rounded-lg overflow-hidden bg-slate-800 shadow-xl">
                  {renderThumbnail(item)}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <p className="text-white p-4 text-sm">{item.caption}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
  
        {/* Modal for enlarged media view */}
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMedia(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
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
      </section>
    )
  }