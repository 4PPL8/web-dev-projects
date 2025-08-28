"use client";

import { useEffect, useMemo, useState } from "react";

const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="relative w-full max-w-6xl mx-auto px-6 py-20">
    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-emerald-400 drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]">
        {title}
      </span>
    </h2>
    <div className="backdrop-blur-md bg-white/5 dark:bg-black/20 border border-white/10 rounded-2xl p-6 shadow-[0_0_40px_-15px_rgba(56,189,248,0.5)]">
      {children}
    </div>
  </section>
);

export default function Home() {
  const full = useMemo(() => "Hi, I’m 4PPL3 — Futuristic Full‑Stack Developer", []);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      setTyped(full.slice(0, i));
      if (i >= full.length) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, [full]);

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(60%_40%_at_50%_0%,rgba(56,189,248,0.15),transparent),radial-gradient(40%_30%_at_80%_10%,rgba(168,85,247,0.12),transparent)]">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-60 bg-[conic-gradient(at_30%_10%,#00E5FF_0deg,#8A2BE2_120deg,#39FF14_240deg,#00E5FF_360deg)] blur-3xl" />
        <div className="max-w-6xl mx-auto px-6 py-28 md:py-36">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-400/80">Welcome</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-extrabold leading-[1.05]">
            <span className="text-white drop-shadow">{typed}</span>
            <span className="ml-1 inline-block w-[1ch] animate-pulse">|</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base md:text-lg text-white/70">
            Building high-performance web experiences with Next.js, React, 3D visuals, and delightful micro-interactions.
          </p>
          <div className="mt-10 flex items-center gap-4">
            <a href="#projects" className="px-5 py-3 rounded-full bg-cyan-500 text-black font-semibold shadow-[0_0_25px_rgba(56,189,248,0.55)] hover:shadow-[0_0_35px_rgba(56,189,248,0.8)] transition-shadow">View Projects</a>
            <a href="#contact" className="px-5 py-3 rounded-full border border-white/20 text-white/90 hover:bg-white/10 transition">Contact</a>
          </div>
        </div>
      </header>

      <main>
        <Section id="about" title="About Me">
          <p className="text-white/80 leading-relaxed">
            I craft immersive, performant interfaces with a focus on motion, accessibility, and clean code. Passionate about Three.js, Framer Motion, and modern web tooling.
          </p>
        </Section>

        <Section id="skills" title="Skills">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            {["Next.js", "React", "TypeScript", "Tailwind", "Framer Motion", "Three.js", "Node.js", "Vercel"].map((s) => (
              <div key={s} className="rounded-xl border border-white/10 bg-white/5 dark:bg-black/20 px-4 py-3 text-white/90 hover:bg-white/10 transition">
                {s}
              </div>
            ))}
          </div>
        </Section>

        <Section id="projects" title="Projects">
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-5">
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(56,189,248,0.15), transparent 40%)" }} />
                <h3 className="text-xl font-semibold mb-2">Futuristic Project {i}</h3>
                <p className="text-white/70 text-sm">Interactive showcase with animations, optimized media, and responsive design.</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <ol className="relative border-l border-white/10 pl-6 space-y-8">
            {["Senior Developer @ NeoTech", "Frontend Engineer @ VisionLabs"].map((role, idx) => (
              <li key={role} className="relative">
                <span className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(56,189,248,0.9)]" />
                <h4 className="text-lg font-semibold">{role}</h4>
                <p className="text-white/70 text-sm">Built delightful UIs, improved performance, and led animation/3D initiatives.</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="contact" title="Contact">
          <form className="grid gap-4 md:grid-cols-2">
            <input className="col-span-1 rounded-lg bg-black/20 border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500/60" placeholder="Your name" />
            <input className="col-span-1 rounded-lg bg-black/20 border border-white/15 px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500/60" placeholder="Email" />
            <textarea className="md:col-span-2 rounded-lg bg-black/20 border border-white/15 px-4 py-3 outline-none min-h-32 focus:ring-2 focus:ring-cyan-500/60" placeholder="Message" />
            <div>
              <button type="submit" className="px-5 py-3 rounded-full bg-emerald-400 text-black font-semibold shadow-[0_0_25px_rgba(16,185,129,0.55)] hover:shadow-[0_0_35px_rgba(16,185,129,0.85)] transition-shadow">Send Message</button>
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
