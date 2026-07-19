"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Toaster } from "@/components/ui/toaster"

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isBuilderPage = pathname.startsWith("/builder")

  if (isBuilderPage) {
    return (
      <div className="h-screen overflow-hidden">
        {children}
        <Toaster />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <Toaster />
    </div>
  )
}
