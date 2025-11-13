"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { usePathname } from "next/navigation"
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isBuilderPage = pathname === "/builder"

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>ZeroTex - Zero Code, Pure LaTeX Resume Builder</title>
        <meta name="description" content="ZeroTex - Create stunning professional resumes with pure LaTeX output. Zero coding required, maximum quality guaranteed. ATS-friendly and beautifully formatted." />
        <meta name="author" content="Fahad Nadim Ziad" />
        <meta name="keywords" content="zerotex, resume builder, cv maker, latex resume, no code, ats friendly, professional resume, cv builder" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {isBuilderPage ? (
            // Builder page - no header/footer, full screen
            <div className="h-screen overflow-hidden">
              {children}
              <Toaster />
            </div>
          ) : (
            // Other pages - normal layout
            <div className="flex min-h-screen flex-col bg-background transition-colors duration-300">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <Toaster />
            </div>
          )}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
