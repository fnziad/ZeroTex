"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"
import { ZeroTexIcon } from "@/components/zerotex-logo"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/builder", label: "Builder", icon: FileText },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
      <div className="container flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="group flex items-center gap-2.5" aria-label="ZeroTeX home">
          <ZeroTexIcon size={26} />
          <span className="text-sm font-semibold tracking-[-0.02em]">ZeroTeX</span>
        </Link>

        <nav className="flex items-center gap-1" aria-label="Primary navigation">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = href === "/" ? pathname === href : pathname.startsWith(href)
            return (
              <Button key={href} asChild variant="ghost" size="sm" className={cn("h-8 rounded-md px-2.5 text-xs", active && "bg-muted text-foreground")}>
                <Link href={href} aria-current={active ? "page" : undefined}>
                  <Icon className="size-3.5" aria-hidden="true" />
                  <span className="hidden sm:inline">{label}</span>
                  <span className="sr-only sm:hidden">{label}</span>
                </Link>
              </Button>
            )
          })}
          <div className="ml-1 border-l pl-2">
            <ModeToggle />
          </div>
        </nav>
      </div>
    </header>
  )
}
