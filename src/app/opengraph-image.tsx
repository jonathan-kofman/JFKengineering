import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "Jonathan Kofman — Aerospace & manufacturing engineer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 45%, #0f172a 100%)",
          padding: 72,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 700,
            color: "#93c5fd",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: 16,
          }}
        >
          Jonathan Kofman
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#cbd5e1",
            fontWeight: 500,
          }}
        >
          Aerospace & manufacturing engineer
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 20,
            color: "#64748b",
            marginTop: 28,
            maxWidth: 880,
            lineHeight: 1.45,
          }}
        >
          M.Eng. Northeastern · Formula, rocketry, CNC, embedded & web projects
        </div>
      </div>
    ),
    { ...size }
  )
}
