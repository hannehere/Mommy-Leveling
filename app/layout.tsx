import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { AppToneWrapper } from "@/components/app-tone-wrapper"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mommy Leveling - Level Up Your Motherhood Journey",
  description:
    "Track, learn, and grow through the journey of raising your baby. Join thousands of moms on their leveling adventure.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap&subset=vietnamese"
          rel="stylesheet"
        />
      </head>
      <body className={`${_geist.className} font-sans antialiased overflow-x-hidden w-full max-w-full`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AppToneWrapper>
            {children}
          </AppToneWrapper>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
