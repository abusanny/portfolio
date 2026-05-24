'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  GraduationCap,
  Briefcase,
  FileText,
  BookOpen,
  Users,
  Lightbulb,
  Brain,
  Heart,
  Target,
  Cpu,
  Eye,
  Shield,
  Baby,
  MessageSquare,
  Calendar,
  Star,
  Trophy,
  HandHeart,
  Building,
  Code,
  Layers,
  Monitor,
  Microscope,
  Globe,
  School,
} from 'lucide-react'

/* ───────────────── Intersection Observer Hook ───────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

/* ───────────────── Animated Section Wrapper ───────────────── */
function AnimatedSection({
  children,
  className = '',
  animation = 'fade-in-section',
}: {
  children: React.ReactNode
  className?: string
  animation?: string
}) {
  const { ref, isVisible } = useInView()
  return (
    <div
      ref={ref}
      className={`${animation} ${isVisible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </div>
  )
}

/* ───────────────── Section Heading ───────────────── */
function SectionHeading({
  icon: Icon,
  title,
}: {
  icon: React.ElementType
  title: string
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-burgundy/10">
          <Icon className="w-5 h-5 text-burgundy" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-charcoal tracking-wide section-heading">
          {title}
        </h2>
      </div>
    </div>
  )
}

/* ───────────────── Navigation Links ───────────────── */
const NAV_LINKS = [
  { id: 'about', label: 'About', icon: Heart },
  { id: 'research-interests', label: 'Research', icon: Lightbulb },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'publications', label: 'Publications', icon: FileText },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'awards', label: 'Awards', icon: Trophy },
  { id: 'teaching', label: 'Teaching', icon: BookOpen },
  { id: 'leadership', label: 'Leadership', icon: Users },
]

/* ───────────────── Sidebar Component ───────────────── */
function SidebarContent({
  activeSection,
  onNavigate,
}: {
  activeSection: string
  onNavigate: (id: string) => void
}) {
  return (
    <nav className="flex flex-col gap-1 py-6 px-3">
      <div className="px-3 mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-burgundy-200 mb-1">
          Abu Sanny
        </p>
        <p className="text-[11px] text-cream-dark/60 leading-tight">
          AI Researcher
        </p>
      </div>
      <Separator className="bg-sidebar-border mb-3" />
      {NAV_LINKS.map((link) => {
        const Icon = link.icon
        const isActive = activeSection === link.id
        return (
          <button
            key={link.id}
            onClick={() => onNavigate(link.id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-200 text-left w-full ${
              isActive
                ? 'sidebar-link-active font-semibold'
                : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
            }`}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span>{link.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [showBackToTop, setShowBackToTop] = useState(false)

  /* Track scroll for back-to-top & active section */
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600)

      const sections = NAV_LINKS.map((l) => document.getElementById(l.id))
      let current = ''
      for (const section of sections) {
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top <= 150) current = section.id
        }
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setSidebarOpen(false)
    }
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      {/* ─── Desktop Sidebar ─── */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-60 bg-sidebar text-sidebar-foreground z-40 flex-col overflow-y-auto">
        <SidebarContent activeSection={activeSection} onNavigate={scrollToSection} />
      </aside>

      {/* ─── Mobile Hamburger ─── */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-sidebar text-sidebar-foreground shadow-lg"
        aria-label="Toggle navigation menu"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* ─── Mobile Sidebar Overlay ─── */}
      <div
        className={`sidebar-overlay fixed inset-0 bg-black/40 z-40 lg:hidden ${
          sidebarOpen ? 'active' : ''
        }`}
        onClick={() => setSidebarOpen(false)}
      />
      <aside
        className={`lg:hidden fixed left-0 top-0 bottom-0 w-64 bg-sidebar text-sidebar-foreground z-40 transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent activeSection={activeSection} onNavigate={scrollToSection} />
      </aside>

      {/* ─── Main Content ─── */}
      <main className="flex-1 lg:ml-60">
        {/* ════════════════════ HERO SECTION ════════════════════ */}
        <section
          id="hero"
          className="hero-gradient min-h-screen flex items-center relative overflow-hidden"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-burgundy/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />

          <div className="w-full max-w-6xl mx-auto px-6 md:px-12 py-20 lg:py-0">
            <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">
              {/* Left: Text Content */}
              <div className="flex-1 text-center lg:text-left">
                <p className="text-burgundy font-semibold tracking-[0.25em] uppercase text-sm mb-4">
                  Academic Portfolio
                </p>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-charcoal tracking-[0.05em] leading-tight mb-4">
                  ABU <span className="text-burgundy">SANNY</span>
                </h1>
                <p className="text-lg md:text-xl text-charcoal-light leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0">
                  Interdisciplinary AI Researcher | Medical Technology | Deep
                  Learning for Healthcare
                </p>
                <p className="text-base text-muted-foreground italic mb-8 max-w-lg mx-auto lg:mx-0">
                  &ldquo;Bridging Electronics Engineering and Clinical Medical
                  Technology&rdquo;
                </p>

                {/* Contact Info Bar */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8">
                  <a
                    href="mailto:m22id008@iitj.ac.in"
                    className="flex items-center gap-2 text-sm text-charcoal-light hover:text-burgundy transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="hidden sm:inline">m22id008@iitj.ac.in</span>
                  </a>
                  <a
                    href="tel:+918346807930"
                    className="flex items-center gap-2 text-sm text-charcoal-light hover:text-burgundy transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="hidden sm:inline">(+91) 83468 07930</span>
                  </a>
                  <a
                    href="https://github.com/abusanny"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-charcoal-light hover:text-burgundy transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span className="hidden sm:inline">GitHub</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/abusanny"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-charcoal-light hover:text-burgundy transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span className="hidden sm:inline">LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* Right: Profile Image */}
              <div className="flex-shrink-0">
                <div className="profile-border">
                  <div className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden bg-cream-dark">
                    <img
                      src="/profile.jpg"
                      alt="Abu Sanny - Interdisciplinary AI Researcher"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
              <span className="text-xs text-muted-foreground tracking-widest uppercase">
                Scroll
              </span>
              <ChevronDown className="w-5 h-5 text-burgundy animate-bounce-slow" />
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="elegant-divider" />

        {/* ════════════════════ ABOUT / PERSONAL JOURNEY ════════════════════ */}
        <section id="about" className="py-16 md:py-24 px-6 md:px-12 max-w-5xl mx-auto">
          <AnimatedSection>
            <SectionHeading icon={Heart} title="Personal Journey" />
          </AnimatedSection>

          <div className="space-y-10">
            <AnimatedSection>
              <div className="academic-quote text-charcoal-light leading-relaxed text-base md:text-lg bg-white/60 p-6 md:p-8 rounded-xl shadow-sm">
                <p>
                  Growing up in a village and completing school in a Bengali medium
                  government school, my journey to IIT was anything but conventional.
                  I joined my Bachelor&apos;s in Electronics &amp; Communication Engineering
                  because I love gadgets — and in Class 12, I fell in love with the
                  semiconductor chapter. But during COVID, I saw how my country was
                  struggling for healthcare as a developing nation, and that changed
                  everything.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="bg-burgundy/5 p-6 md:p-8 rounded-xl border-l-4 border-burgundy">
                <p className="text-charcoal font-semibold leading-relaxed text-base md:text-lg">
                  &ldquo;I want to create and bring technology to my own country so that my
                  country also gets the opportunity to grow.&rdquo;
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <div className="elegant-divider" />

        {/* ════════════════════ RESEARCH INTERESTS ════════════════════ */}
        <section
          id="research-interests"
          className="py-16 md:py-24 px-6 md:px-12 max-w-5xl mx-auto"
        >
          <AnimatedSection>
            <SectionHeading icon={Lightbulb} title="Research Interests" />
          </AnimatedSection>

          <AnimatedSection className="stagger-children">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Microscope,
                  text: 'Deep learning for medical image analysis and ultrasound imaging',
                },
                {
                  icon: Brain,
                  text: 'Transformer and CNN-LSTM architectures for clinical diagnostics',
                },
                {
                  icon: Layers,
                  text: 'Multimodal AI for early disease detection',
                },
                {
                  icon: Shield,
                  text: 'Privacy-preserving and clinically deployable AI systems',
                },
                {
                  icon: Baby,
                  text: 'Fetal biometrics and obstetric ultrasound AI',
                },
                {
                  icon: MessageSquare,
                  text: 'Vision-language models for diagnostic support',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-white p-4 rounded-xl border border-burgundy/10 card-hover"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-burgundy/10 flex-shrink-0">
                    <item.icon className="w-5 h-5 text-burgundy" />
                  </div>
                  <p className="text-charcoal-light text-sm leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </section>

        <div className="elegant-divider" />

        {/* ════════════════════ ACADEMIC PROFILE ════════════════════ */}
        <section className="py-16 md:py-24 px-6 md:px-12 max-w-5xl mx-auto">
          <AnimatedSection>
            <SectionHeading icon={GraduationCap} title="Academic Profile" />
          </AnimatedSection>

          <AnimatedSection>
            <Card className="bg-white/80 border-burgundy/10 shadow-sm">
              <CardContent className="p-6 md:p-8">
                <p className="text-charcoal-light leading-relaxed text-base md:text-lg">
                  Interdisciplinary AI researcher bridging electronics engineering and
                  clinical medical technology, with demonstrated expertise in deep learning
                  for ultrasound imaging, multimodal diagnostics, and secure clinical AI
                  deployment. Trained under the joint IIT Jodhpur–AIIMS Medical Technology
                  programme, with concurrent research affiliations at IISc Bangalore and
                  BITS-RMIT. Author of three manuscripts addressing confounder robustness,
                  generative augmentation, and fetal biometric automation. Holds a
                  provisional patent for a clinical hardware innovation recognised at
                  national level. Selected for the Harvard Macy Institute Programme and
                  awarded a competitive ANSYS CSR research grant. Committed to building
                  interpretable, equitable, and clinically deployable AI for global
                  healthcare.
                </p>
              </CardContent>
            </Card>
          </AnimatedSection>
        </section>

        <div className="elegant-divider" />

        {/* ════════════════════ EDUCATION ════════════════════ */}
        <section
          id="education"
          className="py-16 md:py-24 px-6 md:px-12 max-w-5xl mx-auto"
        >
          <AnimatedSection>
            <SectionHeading icon={GraduationCap} title="Education" />
          </AnimatedSection>

          {/* M.Tech */}
          <div className="relative mb-16">
            <div className="absolute left-5 md:left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-burgundy via-gold to-burgundy" />

            <div className="flex gap-6 md:gap-8 relative">
              <div className="flex-shrink-0 relative z-10">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-burgundy flex items-center justify-center shadow-lg shadow-burgundy/20">
                  <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
              </div>

              <AnimatedSection className="flex-1 pb-12">
                <Card className="bg-white border-burgundy/10 shadow-sm card-hover">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <CardTitle className="text-lg md:text-xl font-bold text-charcoal">
                          M.Tech: Medical Technology
                        </CardTitle>
                        <p className="text-burgundy font-semibold text-sm mt-1">
                          IIT Jodhpur &amp; AIIMS Jodhpur
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>July 2022 – May 2024</span>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className="w-fit mt-2 bg-burgundy/10 text-burgundy border-burgundy/20"
                    >
                      CGPA: 8.3/10.0 | Institute Fellowship Recipient
                    </Badge>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-charcoal mb-1">
                        Thesis
                      </p>
                      <p className="text-sm text-charcoal-light italic leading-relaxed">
                        &ldquo;Human-Centered Design and Translational Development of a
                        Soft, Skin-Conformable IV Cannula Stabilization Device for
                        Improved Perioperative Patient Safety&rdquo;
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-charcoal mb-2">
                        Relevant Coursework
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'Medical Imaging Systems',
                          'Biomedical Instrumentation',
                          'Machine Learning in Healthcare',
                          'Signal Processing',
                          'Clinical Engineering',
                          'Human-Centered Design',
                        ].map((course) => (
                          <Badge
                            key={course}
                            variant="outline"
                            className="text-xs border-burgundy/20 text-charcoal-light"
                          >
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>

          {/* B.Tech */}
          <div className="relative">
            <div className="absolute left-5 md:left-7 top-0 w-0.5 h-full bg-gradient-to-b from-burgundy to-gold" />

            <div className="flex gap-6 md:gap-8 relative">
              <div className="flex-shrink-0 relative z-10">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gold flex items-center justify-center shadow-lg shadow-gold/20">
                  <School className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
              </div>

              <AnimatedSection className="flex-1">
                <Card className="bg-white border-burgundy/10 shadow-sm card-hover">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <CardTitle className="text-lg md:text-xl font-bold text-charcoal">
                          B.Tech: Electronics &amp; Communication Engineering
                        </CardTitle>
                        <p className="text-burgundy font-semibold text-sm mt-1">
                          Aliah University
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>Aug 2017 – Sep 2021</span>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className="w-fit mt-2 bg-gold/10 text-burgundy-dark border-gold/20"
                    >
                      CGPA: 8.27/10.0
                    </Badge>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div>
                      <p className="text-sm font-semibold text-charcoal mb-1">
                        Project
                      </p>
                      <p className="text-sm text-charcoal-light italic leading-relaxed">
                        &ldquo;Passive Solar Harvesting via Parabolic Concentrator-Coupled
                        Fiber Optic Networks for Energy-Efficient Indoor Illumination in
                        Resource-Constrained Environments&rdquo;
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        <div className="elegant-divider" />

        {/* ════════════════════ RESEARCH EXPERIENCE ════════════════════ */}
        <section
          id="experience"
          className="py-16 md:py-24 px-6 md:px-12 max-w-5xl mx-auto"
        >
          <AnimatedSection>
            <SectionHeading icon={Briefcase} title="Research Experience" />
          </AnimatedSection>

          <div className="space-y-6">
            {[
              {
                role: 'Research Assistant',
                institution: 'BITS-RMIT Higher Education Academy',
                duration: 'Jan 2026 – Present',
                project:
                  'Clinically Deployable Transformer Networks for Automated Lesion Segmentation and Malignancy Risk Stratification in Breast Ultrasound Imaging',
                bullets: [
                  'Developing end-to-end CNN- and Transformer-based deep learning pipelines for automated lesion detection and malignancy classification in B-mode breast ultrasound images',
                  'Designing multi-scale attention segmentation architectures for early-stage breast cancer screening and radiologist decision support',
                  'Investigating domain generalisation strategies to improve model robustness across heterogeneous ultrasound acquisition protocols and equipment',
                  'Contributing to manuscript preparation targeting IEEE TBME / Medical Physics / Ultrasonics',
                ],
                icon: Microscope,
                color: 'burgundy',
              },
              {
                role: 'Research Assistant — AI Module',
                institution: 'IISc Bangalore, USTAAH Lab',
                duration: 'Aug 2025 – Jan 2026',
                project:
                  'Automated Fetal Biometric Estimation from Obstetric Ultrasound via Temporal Deep Learning: Towards Equitable AI-Assisted Prenatal Diagnostics',
                bullets: [
                  'Developed CNN-LSTM and Transformer-based deep learning pipelines for automated fetal biometric estimation from sequential 2D obstetric ultrasound frames using PyTorch',
                  'Engineered encryption-aware AI inference pipelines tightly integrated with custom PMUT-based ultrasound hardware, enabling secure real-time clinical data processing',
                  'Implemented temporal attention modules to capture inter-frame dependency patterns, improving biometric estimation stability across gestational age ranges',
                  'Contributed to automated fetal head plane classification and real-time clinical deployment infrastructure',
                ],
                icon: Baby,
                color: 'gold',
              },
              {
                role: 'Summer School Research Intern',
                institution: 'ISI Kolkata',
                duration: 'June 2024 – July 2024',
                project:
                  'Panoptic Segmentation Architectures for Multi-Organ Tumour Delineation: A Systematic Evaluation of Instance-Aware Transformer Models on Thoracic and Abdominal CT',
                bullets: [
                  'Benchmarked MaskFormer vs. Mask2Former panoptic segmentation architectures on lung and liver CT tumour datasets',
                  'Evaluated segmentation accuracy using MIoU and Panoptic Quality (PQ) metrics, providing quantitative benchmarks for transformer-based clinical segmentation',
                  'Investigated instance vs. semantic segmentation paradigm trade-offs for clinical tumour boundary delineation',
                ],
                icon: Eye,
                color: 'burgundy',
              },
              {
                role: 'Data Science Intern',
                institution: 'NIT Jamshedpur',
                duration: 'July 2023 – Aug 2023',
                project:
                  'Generative Data Synthesis for Low-Prevalence Clinical AI: Conditional GANs for Robust ASD Classification under Training Data Scarcity',
                bullets: [
                  'Developed conditional GAN pipelines trained on behavioural image datasets for autism spectrum disorder detection',
                  'Applied targeted data augmentation strategies in PyTorch and TensorFlow to improve model robustness and classification performance on limited clinical training data',
                ],
                icon: Brain,
                color: 'gold',
              },
              {
                role: 'M.Tech Thesis Researcher',
                institution: 'IIT Jodhpur',
                duration: '2023 – 2024',
                project:
                  'Human-Centered Design and Translational Development of a Soft, Skin-Conformable IV Cannula Stabilization Device',
                bullets: [
                  'Designed a soft, breathable, flexible IV cannula stabilisation device through structured hospital immersion, user-centred design research, and iterative clinical prototyping',
                  'Filed a provisional patent for the device; secured ₹1,00,000 ANSYS CSR research grant and won Best Medical Device Design at IIT Guwahati Biodesign Hackathon',
                  'Initiated pre-incubation activities under IIT Jodhpur technology transfer office toward clinical device commercialisation',
                ],
                icon: Heart,
                color: 'burgundy',
              },
              {
                role: 'B.Tech Final Year Project',
                institution: 'Aliah University',
                duration: '2020 – 2021',
                project:
                  'Passive Solar Harvesting via Parabolic Concentrator-Coupled Fiber Optic Networks',
                bullets: [
                  'Designed and prototyped a parabolic concentrator-coupled fibre optic network for passive indoor solar daylighting, demonstrating measurable energy efficiency improvements over conventional illumination methods',
                ],
                icon: Lightbulb,
                color: 'gold',
              },
            ].map((exp, i) => (
              <AnimatedSection key={i}>
                <Card className="bg-white border-burgundy/10 shadow-sm card-hover overflow-hidden">
                  <div
                    className={`h-1 ${
                      exp.color === 'burgundy'
                        ? 'bg-gradient-to-r from-burgundy to-gold'
                        : 'bg-gradient-to-r from-gold to-burgundy'
                    }`}
                  />
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div className="flex items-start gap-3">
                        <div
                          className={`flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 ${
                            exp.color === 'burgundy'
                              ? 'bg-burgundy/10'
                              : 'bg-gold/10'
                          }`}
                        >
                          <exp.icon
                            className={`w-5 h-5 ${
                              exp.color === 'burgundy'
                                ? 'text-burgundy'
                                : 'text-burgundy-dark'
                            }`}
                          />
                        </div>
                        <div>
                          <CardTitle className="text-base md:text-lg font-bold text-charcoal">
                            {exp.role}
                          </CardTitle>
                          <p className="text-burgundy font-semibold text-sm">
                            {exp.institution}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm flex-shrink-0">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.duration}</span>
                      </div>
                    </div>
                    <p className="text-sm text-charcoal-light italic mt-2 leading-relaxed">
                      {exp.project}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2">
                      {exp.bullets.map((bullet, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-sm text-charcoal-light leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-burgundy flex-shrink-0 mt-2" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </section>

        <div className="elegant-divider" />

        {/* ════════════════════ PUBLICATIONS & PATENTS ════════════════════ */}
        <section
          id="publications"
          className="py-16 md:py-24 px-6 md:px-12 max-w-5xl mx-auto"
        >
          <AnimatedSection>
            <SectionHeading icon={FileText} title="Publications & Patents" />
          </AnimatedSection>

          <div className="space-y-6">
            <AnimatedSection>
              <div className="bg-white p-6 rounded-xl border border-burgundy/10 shadow-sm card-hover">
                <div className="flex items-start gap-4">
                  <span className="pub-number">1</span>
                  <div>
                    <p className="text-charcoal leading-relaxed">
                      <span className="font-semibold">Abu Sanny</span> et al.{' '}
                      <span className="italic">
                        &ldquo;Towards Bias-Resilient Clinical Screening:
                        Landmark-Constrained Confounder-Disentangled Vision
                        Transformers for Early Autism Spectrum Disorder
                        Detection.&rdquo;
                      </span>{' '}
                      arXiv preprint.{' '}
                      <span className="text-burgundy font-semibold">
                        [Under Review]
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="bg-white p-6 rounded-xl border border-burgundy/10 shadow-sm card-hover">
                <div className="flex items-start gap-4">
                  <span className="pub-number">2</span>
                  <div>
                    <p className="text-charcoal leading-relaxed">
                      <span className="font-semibold">Abu Sanny</span> et al.{' '}
                      <span className="italic">
                        &ldquo;Automated Fetal Biometric Estimation from
                        Obstetric Ultrasound via Temporal Deep Learning.&rdquo;
                      </span>{' '}
                      <span className="text-gold font-semibold">
                        [Manuscript In Process]
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="bg-white p-6 rounded-xl border border-burgundy/10 shadow-sm card-hover">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gold flex-shrink-0">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-charcoal leading-relaxed">
                      <span className="font-semibold">Patent:</span>{' '}
                      <span className="italic">
                        Human-Centered Design and Translational Development of a
                        Soft, Skin-Conformable IV Cannula Stabilization Device
                      </span>{' '}
                      — Provisional Patent, Indian Patent Office via IIT
                      Jodhpur, 2024
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <div className="elegant-divider" />

        {/* ════════════════════ INDEPENDENT RESEARCH PROJECT ════════════════════ */}
        <section className="py-16 md:py-24 px-6 md:px-12 max-w-5xl mx-auto">
          <AnimatedSection>
            <SectionHeading icon={Target} title="Independent Research" />
          </AnimatedSection>

          <AnimatedSection>
            <Card className="bg-gradient-to-br from-burgundy/5 to-gold/5 border-burgundy/20 shadow-md card-hover overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-burgundy via-gold to-burgundy" />
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div>
                    <CardTitle className="text-lg md:text-xl font-bold text-charcoal">
                      Multimodal Deep Learning for Early Autism Spectrum Disorder
                      Detection
                    </CardTitle>
                    <p className="text-burgundy font-semibold text-sm mt-1">
                      Self-Directed | 2025 – Present
                    </p>
                  </div>
                  <Badge className="bg-burgundy text-white flex-shrink-0 w-fit">
                    Independent
                  </Badge>
                </div>
                <p className="text-sm text-charcoal-light italic mt-2 leading-relaxed">
                  Bias-Resilient Clinical Screening via Landmark-Constrained
                  Confounder-Disentangled Vision Transformers
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2">
                  {[
                    'Independently designing multimodal deep learning frameworks integrating facial and behavioural biomarkers for early ASD detection',
                    'Investigating confounder-aware, landmark-guided Transformer architectures to reduce demographic and acquisition bias across clinical screening datasets',
                    'Targeting lightweight, scalable model architectures suitable for edge deployment in low-resource primary care settings',
                    'First-authored arXiv preprint; journal manuscript under review',
                  ].map((bullet, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-sm text-charcoal-light leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-burgundy flex-shrink-0 mt-2" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </AnimatedSection>
        </section>

        <div className="elegant-divider" />

        {/* ════════════════════ TECHNICAL SKILLS ════════════════════ */}
        <section
          id="skills"
          className="py-16 md:py-24 px-6 md:px-12 max-w-5xl mx-auto"
        >
          <AnimatedSection>
            <SectionHeading icon={Code} title="Technical Skills" />
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  category: 'Programming',
                  icon: Code,
                  skills: ['Python', 'MATLAB', 'SQL'],
                },
                {
                  category: 'Deep Learning',
                  icon: Brain,
                  skills: [
                    'PyTorch',
                    'TensorFlow',
                    'Keras',
                    'scikit-learn',
                  ],
                },
                {
                  category: 'Architectures',
                  icon: Layers,
                  skills: [
                    'CNN',
                    'ViT',
                    'Swin Transformer',
                    'CNN-LSTM',
                    'GAN',
                    'U-Net',
                    'MaskFormer',
                    'Mask2Former',
                  ],
                },
                {
                  category: 'Medical Imaging',
                  icon: Microscope,
                  skills: [
                    'Ultrasound Analysis',
                    'CT Segmentation',
                    'Fetal Biometrics',
                    'Multimodal Clinical AI',
                  ],
                },
                {
                  category: 'Computer Vision',
                  icon: Eye,
                  skills: [
                    'OpenCV',
                    'Albumentations',
                    'torchvision',
                    'Feature Extraction',
                  ],
                },
                {
                  category: 'Data & Visualisation',
                  icon: Monitor,
                  skills: [
                    'NumPy',
                    'pandas',
                    'Matplotlib',
                    'Seaborn',
                  ],
                },
                {
                  category: 'Tools & Platforms',
                  icon: Cpu,
                  skills: [
                    'Git',
                    'Google Colab',
                    'Jupyter Notebook',
                    'LaTeX',
                    'Keynote',
                  ],
                },
              ].map((cat, i) => (
                <div
                  key={i}
                  className="skill-category bg-white p-5 rounded-xl shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <cat.icon className="w-4 h-4 text-burgundy" />
                    <h3 className="text-sm font-bold text-charcoal">
                      {cat.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="text-xs border-burgundy/15 text-charcoal-light hover:bg-burgundy/5 transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </section>

        <div className="elegant-divider" />

        {/* ════════════════════ AWARDS & RECOGNITION ════════════════════ */}
        <section
          id="awards"
          className="py-16 md:py-24 px-6 md:px-12 max-w-5xl mx-auto"
        >
          <AnimatedSection>
            <SectionHeading icon={Trophy} title="Awards & Recognition" />
          </AnimatedSection>

          <AnimatedSection className="stagger-children">
            <div className="space-y-4">
              {[
                {
                  icon: Globe,
                  title:
                    'Selected Participant — Harvard Macy Institute Programme',
                  subtitle: 'Harvard Medical School',
                  highlight: true,
                },
                {
                  icon: Trophy,
                  title:
                    'Winner — Best Medical Device Design',
                  subtitle: 'IIT Guwahati Biodesign Hackathon',
                  highlight: false,
                },
                {
                  icon: Star,
                  title: '₹1,00,000 CSR Research Grant',
                  subtitle: 'ANSYS',
                  highlight: false,
                },
                {
                  icon: GraduationCap,
                  title: 'GATE Qualified',
                  subtitle: 'Three consecutive attempts (ECE)',
                  highlight: false,
                },
                {
                  icon: BookOpen,
                  title: 'Institute Fellowship',
                  subtitle: 'IIT Jodhpur (M.Tech Programme)',
                  highlight: false,
                },
              ].map((award, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-4 p-5 rounded-xl border card-hover ${
                    award.highlight
                      ? 'bg-gradient-to-r from-burgundy/5 to-gold/5 border-burgundy/20'
                      : 'bg-white border-burgundy/10'
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 ${
                      award.highlight
                        ? 'bg-burgundy text-white'
                        : 'bg-burgundy/10'
                    }`}
                  >
                    <award.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal text-sm md:text-base">
                      {award.title}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {award.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </section>

        <div className="elegant-divider" />

        {/* ════════════════════ PROFESSIONAL DEVELOPMENT ════════════════════ */}
        <section className="py-16 md:py-24 px-6 md:px-12 max-w-5xl mx-auto">
          <AnimatedSection>
            <SectionHeading
              icon={BookOpen}
              title="Professional Development"
            />
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: 'Open Science Summer School 2025',
                  org: 'LMU Munich',
                  icon: School,
                },
                {
                  title: 'ISRC-CN3 Summer School 2025',
                  org: 'Ulster University',
                  icon: School,
                },
                {
                  title: 'ISI Kolkata Summer School',
                  org: 'CV, ML & VLM',
                  icon: School,
                },
                {
                  title: 'MICC-2023',
                  org: 'NIT Jamshedpur',
                  icon: Building,
                },
                {
                  title: 'Harvard Macy Institute Programme',
                  org: 'Harvard Medical School',
                  icon: Globe,
                },
                {
                  title: 'DataCamp',
                  org: 'ML & DL Certifications',
                  icon: Monitor,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-white p-4 rounded-xl border border-burgundy/10 card-hover"
                >
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-burgundy/10 flex-shrink-0">
                    <item.icon className="w-4 h-4 text-burgundy" />
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal text-sm">
                      {item.title}
                    </p>
                    <p className="text-muted-foreground text-xs">{item.org}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </section>

        <div className="elegant-divider" />

        {/* ════════════════════ TEACHING & MENTORING ════════════════════ */}
        <section
          id="teaching"
          className="py-16 md:py-24 px-6 md:px-12 max-w-5xl mx-auto"
        >
          <AnimatedSection>
            <SectionHeading icon={BookOpen} title="Teaching & Mentoring" />
          </AnimatedSection>

          <AnimatedSection className="stagger-children">
            <div className="space-y-4">
              {[
                {
                  role: 'Teaching Assistant',
                  org: 'IIT Jodhpur',
                  icon: GraduationCap,
                },
                {
                  role: 'Subject Matter Expert',
                  org: 'Chegg India | Course Hero | Unacademy',
                  icon: Star,
                },
                {
                  role: 'Volunteer Tutor',
                  org: 'Ideal Child Home, Malda',
                  icon: HandHeart,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-white p-5 rounded-xl border border-burgundy/10 card-hover"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-burgundy/10 flex-shrink-0">
                    <item.icon className="w-5 h-5 text-burgundy" />
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal text-sm md:text-base">
                      {item.role}
                    </p>
                    <p className="text-muted-foreground text-sm">{item.org}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </section>

        <div className="elegant-divider" />

        {/* ════════════════════ LEADERSHIP & COMMUNITY ════════════════════ */}
        <section
          id="leadership"
          className="py-16 md:py-24 px-6 md:px-12 max-w-5xl mx-auto"
        >
          <AnimatedSection>
            <SectionHeading
              icon={Users}
              title="Leadership & Community"
            />
          </AnimatedSection>

          <AnimatedSection className="stagger-children">
            <div className="space-y-4">
              {[
                {
                  role: 'Organising Team Member',
                  org: 'ICMI, IIT Jodhpur & AIIMS Jodhpur',
                  icon: Users,
                },
                {
                  role: 'Coordinator',
                  org: 'Workshop on Field Robotics, IIT Jodhpur',
                  icon: Target,
                },
                {
                  role: 'Co-Founder & Manager',
                  org: 'Ek Daayra, Community Trust',
                  icon: HandHeart,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-white p-5 rounded-xl border border-burgundy/10 card-hover"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-burgundy/10 flex-shrink-0">
                    <item.icon className="w-5 h-5 text-burgundy" />
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal text-sm md:text-base">
                      {item.role}
                    </p>
                    <p className="text-muted-foreground text-sm">{item.org}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </section>

        <div className="elegant-divider" />

        {/* ════════════════════ FOOTER ════════════════════ */}
        <footer className="bg-sidebar text-sidebar-foreground py-12 px-6 md:px-12 mt-auto">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold tracking-wide text-cream-dark">
                  ABU <span className="text-burgundy-200">SANNY</span>
                </h3>
                <p className="text-sm text-sidebar-foreground/60 mt-1">
                  Interdisciplinary AI Researcher
                </p>
              </div>

              <div className="flex items-center gap-5">
                <a
                  href="mailto:m22id008@iitj.ac.in"
                  className="text-sidebar-foreground/60 hover:text-burgundy-200 transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a
                  href="tel:+918346807930"
                  className="text-sidebar-foreground/60 hover:text-burgundy-200 transition-colors"
                  aria-label="Phone"
                >
                  <Phone className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/abusanny"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sidebar-foreground/60 hover:text-burgundy-200 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/abusanny"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sidebar-foreground/60 hover:text-burgundy-200 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            <Separator className="bg-sidebar-border my-6" />

            <p className="text-center text-sm text-sidebar-foreground/50 italic max-w-2xl mx-auto">
              &ldquo;Committed to building interpretable, equitable, and clinically
              deployable AI for global healthcare&rdquo;
            </p>

            <p className="text-center text-xs text-sidebar-foreground/30 mt-4">
              © {new Date().getFullYear()} Abu Sanny. All rights reserved.
            </p>
          </div>
        </footer>
      </main>

      {/* ─── Back to Top Button ─── */}
      <button
        onClick={scrollToTop}
        className={`back-to-top fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-burgundy text-white shadow-lg shadow-burgundy/30 flex items-center justify-center hover:bg-burgundy-dark transition-colors ${
          showBackToTop ? 'visible' : ''
        }`}
        aria-label="Back to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </div>
  )
}
