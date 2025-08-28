"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import React from "react";

function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "-10% 0px -10% 0px", threshold: 0.1, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);
  return { ref, inView } as const;
}

function GlowCard({ title, children }: { title: string; children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  function onMouseMove(e: React.MouseEvent) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--x", `${x}%`);
    el.style.setProperty("--y", `${y}%`);
  }
  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 transition-transform duration-300 will-change-transform hover:scale-[1.02]"
      style={{
        backgroundImage: "radial-gradient(350px circle at var(--x,50%) var(--y,50%), rgba(168,85,247,0.18), transparent 45%)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <div className="text-white/75 text-sm">{children}</div>
    </div>
  );
}

const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <section
      id={id}
      ref={ref}
      className={`relative w-full max-w-6xl mx-auto px-6 py-20 transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 text-white">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-purple-500">
          {title}
        </span>
      </h2>
      <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 shadow-[0_0_40px_-15px_rgba(168,85,247,0.45)]">
        {children}
      </div>
    </section>
  );
};

// TypewriterHero component for animated header
const TypewriterHero = React.memo(function TypewriterHero() {
  const phrases = [
    "Building Sleek, Performant Interfaces",
    "Crafting Modern Web Experiences",
    "Designing Smooth, Animated UIs",
    "Delivering Responsive, Accessible Sites",
    "Optimizing for Speed & Delight"
  ];
  const [typed, setTyped] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const current = phrases[phraseIdx];
    if (!isDeleting) {
      if (charIdx < current.length) {
        timer = setTimeout(() => {
          setTyped(current.slice(0, charIdx + 1));
          setCharIdx((i) => i + 1);
        }, 55);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 5000); // 5s pause before delete
      }
    } else {
      if (charIdx > 0) {
        timer = setTimeout(() => {
          setTyped(current.slice(0, charIdx - 1));
          setCharIdx((i) => i - 1);
        }, 35);
      } else {
        setIsDeleting(false);
        setPhraseIdx((i) => (i + 1) % phrases.length);
      }
    }
    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, phraseIdx]); // Remove phrases from deps to avoid re-renders

  return (
    <h1 className="mt-3 text-4xl md:text-6xl font-extrabold leading-[1.05]">
      <span>Hi, I’m Qasim Arshad — </span>
      <span>{typed}</span>
      <span className="ml-1 inline-block w-[1ch] animate-pulse">|</span>
    </h1>
  );
});

export default function Home() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = Math.min(100, Math.max(0, (scrollTop / (docHeight || 1)) * 100));
      setProgress(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jobs = [
    {
      title: "Senior Developer",
      company: "NeoTech",
      period: "2022 — 2025",
      bullets: [
        "Led motion and performance initiatives across web apps.",
        "Improved Core Web Vitals (LCP/FID/CLS) by 25% YoY.",
        "Mentored 4 engineers; established animation guidelines.",
      ],
    },
    {
      title: "Frontend Engineer",
      company: "VisionLabs",
      period: "2020 — 2022",
      bullets: [
        "Delivered interactive dashboards with smooth scroll/reveal.",
        "Reduced bundle size by 35% via code-splitting and image optimizations.",
        "Collaborated with design for pixel-perfect UI.",
      ],
    },
    {
      title: "UI Engineer",
      company: "Hyper",
      period: "2018 — 2020",
      bullets: [
        "Built component libraries with strong a11y foundations.",
        "Introduced micro-animations and hover states increasing engagement.",
        "Owned CI checks for lint, types, and performance budgets.",
      ],
    },
  ];

  // Projects carousel (vanilla JS behavior, no external libs)
  type Project = {
    title: string;
    tags: string[];
    features: string[];
    tech: string[];
  };

  const projectsData: Project[] = [
    {
      title: "Portfolio V3",
      tags: ["Next.js", "Tailwind", "Animations"],
      features: ["Ultra-fast routing", "Dark theme", "Scroll reveals"],
      tech: ["TS", "SSR", "SEO"],
    },
    {
      title: "RAG Chatbot",
      tags: ["AI", "RAG", "Streaming"],
      features: ["Local vectors", "Realtime UI", "Prompt templates"],
      tech: ["WebWorkers", "Embeddings"],
    },
    {
      title: "3D Space Grid",
      tags: ["Three.js", "R3F"],
      features: ["Orbit controls", "DoF", "Performance toggle"],
      tech: ["GLTF", "Draco"],
    },
    {
      title: "Realtime Board",
      tags: ["WebSocket", "Collab"],
      features: ["Presence", "Optimistic updates", "Undo/redo"],
      tech: ["WS", "Zustand"],
    },
    {
      title: "Design System",
      tags: ["UI", "A11y", "Docs"],
      features: ["Radix primitives", "Tokens", "MDX examples"],
      tech: ["MDX", "ESLint"],
    },
    {
      title: "Analytics Panel",
      tags: ["Charts", "Filters"],
      features: ["Animated transitions", "Drill-down", "Export CSV"],
      tech: ["D3", "CSV"],
    },
    {
      title: "Video Showcase",
      tags: ["Media", "Hover"],
      features: ["Autoplay previews", "Hover scrub", "Responsive"],
      tech: ["MP4", "WebM"],
    },
    {
      title: "Ecommerce UI",
      tags: ["Shop", "Cart"],
      features: ["Filters", "Variants", "Payments"],
      tech: ["Stripe", "Zod"],
    },
    {
      title: "Blog Engine",
      tags: ["Content", "MDX"],
      features: ["Code demos", "SEO", "Sitemap"],
      tech: ["Contentlayer", "OG"],
    },
    {
      title: "CLI Dashboard",
      tags: ["Terminal", "Keyboard"],
      features: ["Shortcuts", "Split panes", "Themes"],
      tech: ["ARIA", "KeyNav"],
    },
  ];

  function ProjectCard({ idx, project, style, opacity, onMouseEnter, onMouseLeave, onFocus, onBlur }: { idx: number; project: Project; style: React.CSSProperties; opacity: number; onMouseEnter?: React.MouseEventHandler<HTMLDivElement>; onMouseLeave?: React.MouseEventHandler<HTMLDivElement>; onFocus?: React.FocusEventHandler<HTMLDivElement>; onBlur?: React.FocusEventHandler<HTMLDivElement>; }) {
    return (
      <div
        role="group"
        aria-roledescription="slide"
        aria-label={`${project.title}`}
        className="proj-card absolute top-1/2 -translate-y-1/2 select-none rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.35)] w-[18rem] sm:w-[22rem] md:w-[24rem] lg:w-[26rem] px-5 py-4 transition-[transform,opacity,filter] duration-500 ease-out filter grayscale hover:grayscale-0 hover:bg-gradient-to-br hover:from-purple-900/40 hover:to-purple-800/40 hover:shadow-[0_10px_40px_rgba(168,85,247,0.25)]"
        style={{ ...style, opacity }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-purple-900/60 text-purple-300 text-sm font-bold">{idx + 1}</span>
            <h3 className="text-xl font-semibold text-white">{project.title}</h3>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="text-xs rounded-full border border-purple-400/40 bg-purple-500/10 px-2 py-0.5 text-purple-200">{t}</span>
          ))}
        </div>
        <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-white/85">
          {project.features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/70">
          {project.tech.map((tech) => (
            <span key={tech} className="rounded-md bg-white/5 px-2 py-0.5 border border-white/10">{tech}</span>
          ))}
        </div>
      </div>
    );
  }

  function ProjectCarousel({ projects }: { projects: Project[] }) {
    const [index, setIndex] = useState(0); // center index (allow first)
    const [compactStep, setCompactStep] = useState(160); // overlapped spacing
    const [expandedStep, setExpandedStep] = useState(360); // non-overlapped spacing
    const [hovered, setHovered] = useState<number | null>(null);
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const touch = useRef<{x: number | null}>({ x: null });
    const throttleRef = useRef<number>(0);

    // Recalculate step based on first card width + gap
    useEffect(() => {
      function recalc() {
        const el = wrapRef.current?.querySelector<HTMLElement>(".proj-card");
        if (el) {
          const rect = el.getBoundingClientRect();
          setExpandedStep(Math.round(rect.width + 24));
          setCompactStep(Math.max(80, Math.round(rect.width * 0.4)));
        }
      }
      recalc();
      window.addEventListener("resize", recalc);
      return () => window.removeEventListener("resize", recalc);
    }, []);

    // Clamp index to valid range (allow first and last)
    const maxCenter = Math.max(0, projects.length - 1);
    const center = Math.min(Math.max(0, index), maxCenter);

    function advance(dir: number) {
      const now = Date.now();
      if (now - throttleRef.current < 200) return; // throttle
      throttleRef.current = now;
      setIndex((i) => Math.min(Math.max(0, i + dir), maxCenter));
    }

    function handleWheel(e: React.WheelEvent) {
      e.preventDefault();
      const dir = e.deltaY > 0 || e.deltaX > 0 ? 1 : -1;
      advance(dir);
    }

    function onKey(e: React.KeyboardEvent) {
      if (e.key === "ArrowRight") advance(1);
      if (e.key === "ArrowLeft") advance(-1);
    }

    function onTouchStart(e: React.TouchEvent) {
      touch.current.x = e.touches[0].clientX;
    }
    function onTouchEnd(e: React.TouchEvent) {
      if (touch.current.x == null) return;
      const dx = e.changedTouches[0].clientX - touch.current.x;
      if (Math.abs(dx) > 40) advance(dx < 0 ? 1 : -1);
      touch.current.x = null;
    }

    // Opacity based on distance from center
    function opacityFor(offset: number) {
      const d = Math.abs(offset);
      if (d <= 1) return 1;
      if (d === 2) return 0.7;
      if (d === 3) return 0.3;
      return 0.1;
    }

    return (
      <div
        role="region"
        aria-label="Projects carousel"
        tabIndex={0}
        onKeyDown={onKey}
        onWheel={handleWheel}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        ref={wrapRef}
        className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-xl border border-white/10 bg-black/40 py-12"
      >
        <div className="relative h-[22rem]">
          {projects.map((p, i) => {
            const offset = i - center;
            const step = hovered !== null ? expandedStep : compactStep;
            const transform = `translateX(calc(-50% + ${offset * step}px))`;
            const opacity = opacityFor(offset);
            const zIndex = hovered === i ? 50 : 10 - Math.abs(offset);
            return (
              <ProjectCard
                key={i}
                idx={i}
                project={p}
                style={{ left: "50%", transform, zIndex }}
                opacity={opacity}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
              />
            );
          })}
        </div>

        {/* Indicator dots */}
        <div className="mt-6 flex items-center justify-center gap-2" aria-hidden>
          {projects.map((_, i) => (
            <span key={i} className={`h-1.5 rounded-full bg-white/20 transition-all ${i === center ? "w-6 bg-purple-400" : "w-2"}`} />
          ))}
        </div>

        {/* Nav buttons (always clickable, highest z-index) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-[200] flex items-center justify-between px-4">
          <button
            aria-label="Previous project"
            onClick={() => advance(-1)}
            className="pointer-events-auto z-[210] rounded-full border border-white/10 bg-black/60 px-3 py-2 text-white/90 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-400/60"
          >
            ‹
          </button>
          <button
            aria-label="Next project"
            onClick={() => advance(1)}
            className="pointer-events-auto z-[210] rounded-full border border-white/10 bg-black/60 px-3 py-2 text-white/90 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-400/60"
          >
            ›
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <div className="fixed top-0 left-0 h-[3px] bg-purple-500 z-50" style={{ width: `${progress}%` }} />

      <div className="pointer-events-none fixed inset-0 -z-10 opacity-20" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(transparent_95%,rgba(168,85,247,0.4)_95%),linear-gradient(90deg,transparent_95%,rgba(168,85,247,0.4)_95%)] bg-[length:24px_24px] animate-[pulse_6s_ease-in-out_infinite]" />
      </div>

      <nav className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/5 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <span className="font-bold">Qasim Arshad</span>
          <div className="hidden md:flex items-center gap-6 text-sm text-white/80">
            <a href="#about" className="hover:text-purple-300 transition">About</a>
            <a href="#skills" className="hover:text-purple-300 transition">Skills</a>
            <a href="#projects" className="hover:text-purple-300 transition">Projects</a>
            <a href="#experience" className="hover:text-purple-300 transition">Experience</a>
            <a href="#contact" className="hover:text-purple-300 transition">Contact</a>
          </div>
        </div>
      </nav>

      <header className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-60 bg-[conic-gradient(at_30%_10%,rgba(168,85,247,0.15)_0deg,transparent_120deg,rgba(168,85,247,0.15)_240deg,transparent_360deg)] blur-3xl" />
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-36">
          <p className="text-sm uppercase tracking-[0.2em] text-purple-300/80">Welcome</p>
          <TypewriterHero />
          <p className="mt-6 max-w-2xl text-base md:text-lg text-white/70">
            Black, white, and purple — minimal yet bold. Smooth motion, clean code, and responsive design.
          </p>
          <div className="mt-10 flex items-center gap-4">
            <a href="#projects" className="px-5 py-3 rounded-full bg-purple-500 text-black font-semibold shadow-[0_0_25px_rgba(168,85,247,0.55)] hover:shadow-[0_0_35px_rgba(168,85,247,0.8)] transition-shadow">View Projects</a>
            <a href="#contact" className="px-5 py-3 rounded-full border border-white/20 text-white/90 hover:bg-white/10 transition">Contact</a>
          </div>
        </div>
      </header>

      <main>
        <Section id="about" title="About Me">
          <p className="leading-relaxed text-white/80">
            I craft immersive, performant interfaces with a focus on motion, accessibility, and clean architecture. Passion for animation and DX.
          </p>
        </Section>

        <Section id="skills" title="Skills">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-sm">
            {["Next.js", "React", "TypeScript", "Tailwind", "Animations", "Accessibility", "Three.js", "Node.js"].map((s) => (
              <div key={s} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/90 hover:bg-white/[0.08] transition">
                {s}
              </div>
            ))}
          </div>
        </Section>

        <Section id="projects" title="Projects">
          <ProjectCarousel projects={projectsData} />
        </Section>

        <Section id="experience" title="Experience">
          <ol className="relative border-l border-white/10 pl-12 space-y-10">
            {jobs.map((job, idx) => (
              <li key={idx} className="relative">
                <span className="absolute -left-[11px] top-1.5 h-3.5 w-3.5 rounded-full bg-purple-500 ring-2 ring-purple-400/60 pointer-events-none" />
                <div className="rounded-xl bg-white/5 border border-white/10 p-5">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h4 className="text-lg font-semibold">{job.title}</h4>
                    <span className="text-white/60">·</span>
                    <span className="text-white/80">{job.company}</span>
                    <span className="ml-auto text-xs text-white/60">{job.period}</span>
                  </div>
                  <ul className="mt-3 list-disc pl-5 space-y-2 text-sm text-white/80">
                    {job.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="contact" title="Contact">
          <form className="grid gap-4 md:grid-cols-2">
            <input className="col-span-1 rounded-lg bg-black/40 border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/60" placeholder="Your name" />
            <input className="col-span-1 rounded-lg bg-black/40 border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/60" placeholder="Email" />
            <textarea className="md:col-span-2 rounded-lg bg-black/40 border border-white/15 px-4 py-3 outline-none min-h-32 focus:ring-2 focus:ring-purple-500/60" placeholder="Message" />
            <div>
              <button type="submit" className="px-5 py-3 rounded-full bg-purple-500 text-black font-semibold shadow-[0_0_25px_rgba(168,85,247,0.55)] hover:shadow-[0_0_35px_rgba(168,85,247,0.85)] transition-shadow">Send Message</button>
            </div>
          </form>
        </Section>
      </main>

      <footer className="border-t border-white/10 mt-10">
        <div className="max-w-6xl mx-auto px-6 py-10 text-sm text-white/60">
          © {new Date().getFullYear()} Qasim Arshad — All rights reserved.
        </div>
      </footer>
    </div>
  );
}
