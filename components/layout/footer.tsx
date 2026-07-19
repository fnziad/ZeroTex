import Link from "next/link"
import { Github } from "lucide-react"
import { ZeroTexIcon } from "@/components/zerotex-logo"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex max-w-6xl flex-col gap-5 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <ZeroTexIcon size={22} />
          <div>
            <p className="text-sm font-medium">ZeroTeX</p>
            <p className="text-xs text-muted-foreground">Source-available LaTeX resume builder.</p>
          </div>
        </div>
        <div className="flex items-center gap-5 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Fahad Nadim Ziad</span>
          <Link
            href="https://github.com/fnziad/zerotex"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <Github className="size-3.5" aria-hidden="true" />
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  )
}
