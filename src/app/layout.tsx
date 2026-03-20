import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import GoogleAnalytics from "@/components/GoogleAnalytics"
import MotionConfigProvider from "@/components/MotionConfigProvider"
import { getSiteUrl } from "@/lib/site-url"

const inter = Inter({ subsets: ["latin"] })

const title = "Jonathan Kofman · Aerospace & manufacturing engineer"
const description =
  "Jonathan Kofman — M.Eng. Advanced & Intelligent Manufacturing (Northeastern). Applied Materials mechanical design co-op; Northeastern Formula Racing; AerospaceNU; robotics & rocketry projects."

const ogImageAlt =
  "Jonathan Kofman — Aerospace & manufacturing engineer"

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Jonathan Kofman",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
        />
      </head>
      <body className={inter.className}>
        <MotionConfigProvider>
          <GoogleAnalytics />
          {children}
        </MotionConfigProvider>
      </body>
    </html>
  )
}