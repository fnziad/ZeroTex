"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { FileText, Layers, CheckCircle, ArrowRight, Globe, Github, Sparkles, Code } from "lucide-react"
import ZeroTexLogo from "@/components/zerotex-logo"

export default function HomePage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-slate-900/[0.02] dark:bg-grid-slate-100/[0.02] -z-10" />
      
      <div className="container mx-auto py-20 px-4 max-w-7xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-24"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block mb-8 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl rounded-full" />
            <ZeroTexLogo size={90} className="relative" />
          </motion.div>
          
          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-7xl font-bold tracking-tight mb-3 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent"
          >
            ZeroTex
          </motion.h1>
          
          {/* Tagline */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-2xl font-medium text-slate-600 dark:text-slate-400 mb-6"
          >
            Zero Code, Pure LaTeX
          </motion.p>
          
          {/* Description */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Professional resume builder with LaTeX precision.<br />
            Beautiful typography, ATS-friendly, zero coding required.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link href="/builder">
              <Button 
                size="lg" 
                className="rounded-full px-8 py-6 text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
              >
                <FileText className="mr-2 h-5 w-5" />
                Start Building
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href="https://github.com/fnziad/zerotex" target="_blank" rel="noopener noreferrer">
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full px-8 py-6 text-base font-medium border-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300"
              >
                <Github className="mr-2 h-5 w-5" />
                View Source
              </Button>
            </a>
          </motion.div>
        </motion.div>

      {/* Features Grid */}
      <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 max-w-6xl mx-auto"
        >
          <motion.div variants={item}>
            <Card className="h-full group hover:scale-[1.02] transition-all duration-300 border-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl shadow-lg shadow-slate-200/50 dark:shadow-slate-950/50 hover:shadow-xl hover:shadow-slate-300/50 dark:hover:shadow-slate-900/50">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30 group-hover:shadow-xl group-hover:shadow-blue-500/40 transition-all duration-300">
                  <FileText className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold">Intuitive Builder</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Simple form-based interface. Fill in your details and watch LaTeX magic happen in real-time.</p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={item}>
            <Card className="h-full group hover:scale-[1.02] transition-all duration-300 border-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl shadow-lg shadow-slate-200/50 dark:shadow-slate-950/50 hover:shadow-xl hover:shadow-slate-300/50 dark:hover:shadow-slate-900/50">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30 group-hover:shadow-xl group-hover:shadow-purple-500/40 transition-all duration-300">
                  <Layers className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold">Fully Flexible</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Add, remove, and reorder sections. Customize every aspect to match your unique story.</p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={item}>
            <Card className="h-full group hover:scale-[1.02] transition-all duration-300 border-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl shadow-lg shadow-slate-200/50 dark:shadow-slate-950/50 hover:shadow-xl hover:shadow-slate-300/50 dark:hover:shadow-slate-900/50">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/30 group-hover:shadow-xl group-hover:shadow-indigo-500/40 transition-all duration-300">
                  <CheckCircle className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold">LaTeX Precision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Professional typography and formatting. ATS-friendly output that stands out.</p>
              </CardContent>
            </Card>
          </motion.div>
      </motion.div>

      {/* How It Works Section */}
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto mb-32"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-br from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Three Simple Steps
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              From idea to professional resume in minutes
            </p>
          </div>
          
          <div className="grid gap-6">
            {[
              {
                number: "01",
                title: "Fill Your Details",
                description: "Enter your information in our intuitive form. Personal info, education, experience—all organized beautifully.",
                gradient: "from-blue-500 to-blue-600"
              },
              {
                number: "02",
                title: "Customize Sections",
                description: "Add, remove, or reorder sections. Make it uniquely yours with drag-and-drop simplicity.",
                gradient: "from-purple-500 to-purple-600"
              },
              {
                number: "03",
                title: "Export & Share",
                description: "Download as LaTeX or PDF. Upload to Overleaf or print directly—your choice.",
                gradient: "from-indigo-500 to-indigo-600"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <Card className="border-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl shadow-lg shadow-slate-200/50 dark:shadow-slate-950/50 hover:shadow-xl hover:shadow-slate-300/50 dark:hover:shadow-slate-900/50 transition-all duration-300 overflow-hidden">
                  <CardContent className="p-8 flex items-start gap-6">
                    <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient} text-white font-bold text-2xl shadow-lg`}>
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl mb-2 text-slate-900 dark:text-white">
                        {step.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-10 text-center"
          >
            <Link href="/builder">
              <Button 
                size="lg" 
                className="rounded-full px-10 py-6 text-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
              >
                Start Building Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Creator Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="border-0 bg-gradient-to-br from-white/80 to-blue-50/80 dark:from-slate-900/80 dark:to-slate-800/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-300/50 dark:shadow-slate-950/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none" />
            <CardHeader className="text-center relative pb-6">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="inline-flex items-center justify-center mx-auto mb-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
              </motion.div>
              <CardTitle className="text-3xl font-bold">
                <span className="bg-gradient-to-br from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  Crafted with Care
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 px-8 pb-8 relative">
              <p className="text-center text-lg text-slate-700 dark:text-slate-300">
                Built by{" "}
                <a 
                  href="https://ziaaad.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  Fahad Nadim Ziad
                </a>
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-center max-w-xl mx-auto leading-relaxed">
                A passionate full-stack developer creating tools that simplify professional workflows. 
                ZeroTex merges LaTeX power with modern design—delivering ATS-friendly resumes 
                with zero coding required.
              </p>
                            <div className="flex gap-3 justify-center pt-2">
                <a href="https://github.com/fnziad" target="_blank" rel="noopener noreferrer">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="rounded-full border-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                </a>
                <a href="https://ziaaad.vercel.app" target="_blank" rel="noopener noreferrer">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="rounded-full border-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300"
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    Portfolio
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center text-sm text-slate-500 dark:text-slate-500 mt-20 pb-10"
        >
          <p>© 2025 ZeroTex • Open Source • MIT License</p>
        </motion.footer>
      </div>
    </div>
  )
}
