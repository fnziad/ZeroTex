import Link from "next/link"
import {
  ArrowRight,
  Braces,
  Check,
  Download,
  FileText,
  Github,
  ShieldCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ZeroTexIcon } from "@/components/zerotex-logo"

const features = [
  {
    icon: FileText,
    title: "Focused editor",
    description: "Structured sections, live preview, and sensible defaults keep the work moving.",
  },
  {
    icon: Braces,
    title: "Real LaTeX output",
    description: "Download clean source, continue in Overleaf, or export a polished PDF.",
  },
  {
    icon: ShieldCheck,
    title: "Private by default",
    description: "Your draft stays in your browser and can be backed up as a portable JSON file.",
  },
]

const steps = [
  ["01", "Add your details", "Use guided forms for experience, education, projects, and more."],
  ["02", "Shape the story", "Reorder sections and refine the content while the preview updates live."],
  ["03", "Export with confidence", "Print to PDF, download LaTeX, or move directly into Overleaf."],
] as const

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <section className="relative border-b" aria-labelledby="hero-title">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_20%,hsl(var(--primary)/0.10),transparent_34%),linear-gradient(to_bottom,hsl(var(--background)),hsl(var(--muted)/0.45))]" />
        <div className="container grid max-w-6xl gap-14 px-6 py-20 sm:py-28 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Source available · Local-first
            </div>
            <h1
              id="hero-title"
              className="max-w-3xl text-5xl font-medium tracking-[-0.055em] text-foreground sm:text-6xl lg:text-[4.5rem] lg:leading-[0.98]"
            >
              A precise resume, without fighting LaTeX.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">
              ZeroTeX turns structured career details into a clean, ATS-friendly resume and editable LaTeX source—no templates to wrestle with.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-11 rounded-lg px-5 shadow-sm">
                <Link href="/builder">
                  Build your resume
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-11 rounded-lg px-5 bg-background/60">
                <a href="https://github.com/fnziad/zerotex" target="_blank" rel="noopener noreferrer">
                  <Github aria-hidden="true" />
                  View source
                </a>
              </Button>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {["No account required", "Portable backups", "PDF + .tex export"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <Check className="size-3.5 text-primary" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:mx-0">
            <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-primary/10 blur-3xl" />
            <div className="overflow-hidden rounded-2xl border bg-card shadow-2xl shadow-slate-950/10 dark:shadow-black/30">
              <div className="flex h-11 items-center justify-between border-b px-4">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="size-2.5 rounded-full bg-border" />
                  <span className="size-2.5 rounded-full bg-border" />
                  <span className="size-2.5 rounded-full bg-border" />
                </div>
                <span className="font-mono text-[11px] text-muted-foreground">zerotex / builder</span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400">Saved</span>
              </div>
              <div className="grid min-h-[360px] grid-cols-[0.82fr_1.18fr]">
                <div className="border-r bg-muted/35 p-4 sm:p-5">
                  <p className="text-xs font-medium">Personal information</p>
                  <div className="mt-5 space-y-4">
                    {["Full name", "Email", "Location"].map((label, index) => (
                      <div key={label}>
                        <p className="mb-1.5 text-[10px] text-muted-foreground">{label}</p>
                        <div className="h-8 rounded-md border bg-background px-2.5 py-2">
                          <div className={`h-1.5 rounded-full bg-foreground/15 ${index === 1 ? "w-4/5" : "w-3/5"}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 border-t pt-4">
                    <p className="text-[10px] font-medium text-muted-foreground">SECTIONS</p>
                    <div className="mt-3 space-y-2">
                      {["Experience", "Education", "Skills"].map((section) => (
                        <div key={section} className="flex items-center justify-between rounded-md border bg-background px-2.5 py-2 text-[11px]">
                          {section}
                          <span className="size-1.5 rounded-full bg-primary/60" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-slate-200 p-4 dark:bg-slate-800">
                  <div className="mx-auto min-h-[328px] max-w-[230px] bg-white px-5 py-6 text-slate-950 shadow-sm">
                    <div className="mx-auto h-2 w-2/3 rounded-full bg-slate-900" />
                    <div className="mx-auto mt-2 h-1 w-1/2 rounded-full bg-slate-300" />
                    {["EXPERIENCE", "EDUCATION", "SKILLS"].map((section, index) => (
                      <div key={section} className={index === 0 ? "mt-7" : "mt-6"}>
                        <p className="border-b border-slate-900 pb-1 text-[7px] font-bold tracking-wider">{section}</p>
                        <div className="mt-2 space-y-1.5">
                          <div className="h-1 w-5/6 rounded-full bg-slate-800/75" />
                          <div className="h-1 w-full rounded-full bg-slate-300" />
                          <div className="h-1 w-4/5 rounded-full bg-slate-300" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container max-w-6xl px-6 py-20 sm:py-24" aria-labelledby="features-title">
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-primary">Built for focus</p>
          <h2 id="features-title" className="mt-3 text-3xl font-medium tracking-[-0.035em] sm:text-4xl">
            Everything you need. Nothing in the way.
          </h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <article key={title} className="border-t pt-6">
              <div className="flex size-9 items-center justify-center rounded-lg border bg-muted/50 text-primary">
                <Icon className="size-4" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-lg font-medium tracking-tight">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y bg-muted/30" aria-labelledby="workflow-title">
        <div className="container max-w-6xl px-6 py-20 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-primary">Simple workflow</p>
              <h2 id="workflow-title" className="mt-3 text-3xl font-medium tracking-[-0.035em]">
                From blank page to finished resume.
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                The editor keeps content and output side by side, so every decision stays visible.
              </p>
            </div>
            <ol className="grid gap-3">
              {steps.map(([number, title, description]) => (
                <li key={number} className="grid gap-3 rounded-xl border bg-background p-5 sm:grid-cols-[3rem_1fr] sm:items-start">
                  <span className="font-mono text-xs text-muted-foreground">{number}</span>
                  <div>
                    <h3 className="font-medium">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="container max-w-6xl px-6 py-20 sm:py-24">
        <div className="flex flex-col gap-8 rounded-2xl bg-foreground px-7 py-9 text-background sm:px-10 sm:py-11 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-medium tracking-[-0.035em]">Your next resume can start here.</h2>
            <p className="mt-3 text-sm leading-6 text-background/65">
              Build locally, keep a portable backup, and export whenever you are ready.
            </p>
          </div>
          <Button asChild size="lg" variant="secondary" className="h-11 shrink-0 rounded-lg px-5">
            <Link href="/builder">
              <Download aria-hidden="true" />
              Open the builder
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
