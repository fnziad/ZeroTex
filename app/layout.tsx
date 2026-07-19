import type { Metadata } from "next"
import type { ReactNode } from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AppShell } from "@/components/layout/app-shell"
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "ZeroTeX — Precise resumes, clean LaTeX",
  description: "Build an ATS-friendly resume with live preview, portable backups, PDF export, and clean LaTeX source.",
  authors: [{ name: "Fahad Nadim Ziad" }],
  keywords: ["resume builder", "LaTeX resume", "ATS-friendly resume", "CV builder", "ZeroTeX"],
  icons: { icon: "/favicon.svg" },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AppShell>{children}</AppShell>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
