"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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

export default function Home() {
  const full = useMemo(() => "Hi, I’m 4PPL3 — Building Sleek, Performant Interfaces", []);
  const [typed, setTyped] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      setTyped(full.slice(0, i));
      if (i >= full.length) clearInterval(timer);
    }, 35);
    return () => clearInterval(timer);
  }, [full]);

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

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <div className="fixed top-0 left-0 h-[3px] bg-purple-500 z-50" style={{ width: `${progress}%` }} />

      <div className="pointer-events-none fixed inset-0 -z-10 opacity-20" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(transparent_95%,rgba(168,85,247,0.4)_95%),linear-gradient(90deg,transparent_95%,rgba(168,85,247,0.4)_95%)] bg-[length:24px_24px] animate-[pulse_6s_ease-in-out_infinite]" />
      </div>

      <nav className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/5 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <span className="font-bold tracking-tight">4PPL3</span>
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
          <h1 className="mt-3 text-4xl md:text-6xl font-extrabold leading-[1.05]">
            <span className="drop-shadow">{typed}</span>
            <span className="ml-1 inline-block w-[1ch] animate-pulse">|</span>
          </h1>
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <GlowCard key={i} title={`Project ${i}`}>
                Interactive showcase with scroll-triggered reveals and subtle glows.
              </GlowCard>
            ))}
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <ol className="relative border-l border-white/10 pl-6 space-y-8">
            {["Senior Developer @ NeoTech", "Frontend Engineer @ VisionLabs", "UI Engineer @ Hyper"].map((role) => (
              <li key={role} className="relative">
                <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.9)]" />
                <h4 className="text-lg font-semibold">{role}</h4>
                <p className="text-white/70 text-sm">Shipped high-impact features, improved performance, and led motion design.</p>
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
          © {new Date().getFullYear()} 4PPL3 — All rights reserved.
        </div>
      </footer>
    </div>
  );
}
