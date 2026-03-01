import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft, ChevronRight, Download, Printer, Maximize2, Minimize2,
  Leaf, TrendingUp, Users, Globe, Target, DollarSign, Award, BarChart3,
  Zap, Shield, Star, ArrowRight, Check, Mail, ExternalLink, Play, X
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import LiveClock from "@/components/LiveClock";

const TOTAL_SLIDES = 13;

const projectionData = [
  { year: "2025", revenue: 120, users: 8, arr: 90 },
  { year: "2026", revenue: 380, users: 28, arr: 310 },
  { year: "2027", revenue: 920, users: 75, arr: 780 },
  { year: "2028", revenue: 1980, users: 180, arr: 1700 },
  { year: "2029", revenue: 3800, users: 380, arr: 3300 },
];

const marketData = [
  { name: "TAM", value: 42, color: "hsl(142 71% 35%)" },
  { name: "SAM", value: 12, color: "hsl(142 60% 48%)" },
  { name: "SOM", value: 1.8, color: "hsl(87 50% 55%)" },
];

const competitors = [
  { name: "Sustainable Voyage", co2: true, gamify: true, b2b: true, health: true, uk: true, score: 5 },
  { name: "Google Maps", co2: false, gamify: false, b2b: false, health: false, uk: true, score: 1 },
  { name: "Citymapper", co2: true, gamify: false, b2b: false, health: false, uk: true, score: 2 },
  { name: "BreezoMeter", co2: true, gamify: false, b2b: true, health: true, uk: false, score: 3 },
  { name: "Laka", co2: false, gamify: true, b2b: false, health: false, uk: true, score: 2 },
];

const useOfFunds = [
  { label: "Product & Tech", pct: 45, color: "hsl(142 71% 35%)" },
  { label: "Sales & Marketing", pct: 30, color: "hsl(87 50% 55%)" },
  { label: "Team Expansion", pct: 15, color: "hsl(199 70% 55%)" },
  { label: "Operations & Legal", pct: 10, color: "hsl(35 40% 50%)" },
];

interface SlideProps { current: number; }

function SlideWrapper({ children, gradient = false }: { children: React.ReactNode; gradient?: boolean }) {
  return (
    <div className={`w-full min-h-[calc(100vh-130px)] flex flex-col ${gradient ? "" : "bg-card"} rounded-2xl overflow-hidden shadow-2xl`}
      style={{ border: "1px solid hsl(var(--border))" }}>
      {children}
    </div>
  );
}

function SlideLabel({ n, total }: { n: number; total: number }) {
  return (
    <div className="absolute top-4 right-6 text-xs font-mono opacity-40" style={{ color: "hsl(var(--muted-foreground))" }}>
      {n} / {total}
    </div>
  );
}

// ── Slide 1: Title & Hook ─────────────────────────────────────────────────────
function Slide1() {
  return (
    <SlideWrapper gradient>
      <div className="relative flex flex-col items-center justify-center flex-1 text-center px-8 py-16 overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(142 71% 15%) 0%, hsl(160 70% 10%) 60%, hsl(199 60% 15%) 100%)" }}>
        <SlideLabel n={1} total={TOTAL_SLIDES} />
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, hsl(142 71% 55%), transparent)" }} />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full opacity-10" style={{ background: "radial-gradient(circle, hsl(87 50% 55%), transparent)" }} />
        </div>
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl"
            style={{ background: "hsl(142 71% 35%)" }}>
            <Leaf size={32} className="text-white" />
          </div>
          <div className="text-left">
            <div className="text-3xl font-bold text-white tracking-tight">SUSTAINABLE</div>
            <div className="text-3xl font-bold tracking-widest" style={{ color: "hsl(142 60% 55%)" }}>VOYAGE</div>
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight max-w-4xl">
          Every Journey.<br />
          <span style={{ color: "hsl(142 60% 60%)" }}>Measured. Rewarded. Changed.</span>
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-2xl leading-relaxed" style={{ color: "hsl(142 40% 75%)" }}>
          The first gamified sustainability platform that makes CO₂ savings, health impact, and greener choices
          visible and rewarding — for every commuter, company, and city.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mb-10">
          {["🌍 Climate Impact", "🏆 Gamification", "🏢 B2B SaaS", "📊 Real-time Analytics"].map(t => (
            <span key={t} className="px-5 py-2 rounded-full text-sm font-semibold text-white"
              style={{ background: "hsl(142 71% 35% / 0.4)", border: "1px solid hsl(142 50% 50% / 0.4)" }}>{t}</span>
          ))}
        </div>
        <div className="text-sm font-medium" style={{ color: "hsl(142 40% 60%)" }}>
          Seed Round · SEIS/EIS Eligible · Founded 2019 · London, UK
        </div>
      </div>
    </SlideWrapper>
  );
}

// ── Slide 2: Problem ──────────────────────────────────────────────────────────
function Slide2() {
  const problems = [
    { icon: "😶", stat: "68%", label: "of UK commuters never check the environmental impact of their daily journey", src: "DfT 2023" },
    { icon: "🚗", stat: "27%", label: "of UK total greenhouse gas emissions come from transport — the single largest sector", src: "DESNZ 2023" },
    { icon: "💨", stat: "122M t", label: "CO₂ equivalent emitted by UK surface transport every year", src: "DESNZ 2023" },
    { icon: "🏥", stat: "£6.5B", label: "annual cost to the NHS from physical inactivity — driven by sedentary commuting habits", src: "UK Gov 2022" },
  ];
  return (
    <SlideWrapper>
      <div className="p-10 flex flex-col flex-1 relative">
        <SlideLabel n={2} total={TOTAL_SLIDES} />
        <div className="badge-eco mb-3">The Problem</div>
        <h2 className="section-title text-3xl md:text-4xl mb-2">
          Sustainability Is <span style={{ color: "hsl(0 72% 51%)" }}>Invisible</span> at the Point of Decision
        </h2>
        <p className="mb-8 text-base" style={{ color: "hsl(var(--muted-foreground))" }}>
          People make travel decisions dozens of times each week — yet CO₂, health cost, and green alternatives are never shown. Convenience always wins by default.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1">
          {problems.map((p, i) => (
            <div key={i} className="rounded-2xl p-6 flex gap-4 items-start"
              style={{ background: "hsl(0 0% 99%)", border: "1px solid hsl(0 72% 90%)", boxShadow: "0 2px 12px hsl(0 72% 51% / 0.06)" }}>
              <div className="text-3xl">{p.icon}</div>
              <div>
                <div className="text-3xl font-extrabold mb-1" style={{ color: "hsl(0 72% 51%)" }}>{p.stat}</div>
                <p className="text-sm leading-relaxed mb-1" style={{ color: "hsl(var(--foreground))" }}>{p.label}</p>
                <span className="text-xs px-2 py-0.5 rounded-full font-mono" style={{ background: "hsl(0 72% 95%)", color: "hsl(0 72% 45%)" }}>{p.src}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-2xl p-5 flex items-center gap-4"
          style={{ background: "linear-gradient(90deg, hsl(0 72% 97%), hsl(0 0% 100%))", border: "1px solid hsl(0 72% 88%)" }}>
          <span className="text-2xl">⚠️</span>
          <p className="text-sm font-semibold" style={{ color: "hsl(0 60% 40%)" }}>
            The UK must cut transport emissions 78% by 2035 (Climate Change Act). Without behaviour change tools at scale, this target is unachievable.
          </p>
        </div>
      </div>
    </SlideWrapper>
  );
}

// ── Slide 3: Solution ─────────────────────────────────────────────────────────
function Slide3() {
  const features = [
    { icon: "📍", title: "Journey Calculator", desc: "Input any route; instantly compare CO₂, calories & time across all transport modes vs. driving." },
    { icon: "🏆", title: "Gamification Engine", desc: "Streaks, badges, leaderboards and a Sustainability Score keep users engaged daily." },
    { icon: "🤖", title: "AI Recommendations", desc: "Personalised nudges: 'Cycle twice a week and save 18 kg CO₂ this month.'" },
    { icon: "🏢", title: "B2B Dashboard", desc: "Employers, councils & universities get fleet-level analytics, ESG reporting and wellness metrics." },
    { icon: "📊", title: "Impact Visualisation", desc: "Trees equivalent, calories, cost savings — data that makes sustainability tangible and sharable." },
    { icon: "🌐", title: "Open API", desc: "Integrate with HR platforms, smart city systems, and mobility apps via RESTful API." },
  ];
  return (
    <SlideWrapper>
      <div className="p-10 flex flex-col flex-1 relative">
        <SlideLabel n={3} total={TOTAL_SLIDES} />
        <div className="badge-eco mb-3">The Solution</div>
        <h2 className="section-title text-3xl md:text-4xl mb-2">
          Making Green Choices <span style={{ color: "hsl(var(--primary))" }}>Visible, Easy & Rewarding</span>
        </h2>
        <p className="mb-8 text-base" style={{ color: "hsl(var(--muted-foreground))" }}>
          Sustainable Voyage is a behaviour-change SaaS platform that sits at the intersection of mobility, health, and climate action.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
          {features.map((f, i) => (
            <div key={i} className="card-feature">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-bold mb-2 text-base">{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-2xl p-4 text-center"
          style={{ background: "linear-gradient(90deg, hsl(142 71% 25%), hsl(160 60% 20%))", color: "white" }}>
          <span className="font-bold">Core USP: </span>
          <span style={{ color: "hsl(142 40% 80%)" }}>
            We combine journey intelligence + gamification + ESG reporting in one platform — no competitor does all three.
          </span>
        </div>
      </div>
    </SlideWrapper>
  );
}

// ── Slide 4: Market Opportunity ───────────────────────────────────────────────
function Slide4() {
  return (
    <SlideWrapper>
      <div className="p-10 flex flex-col flex-1 relative">
        <SlideLabel n={4} total={TOTAL_SLIDES} />
        <div className="badge-eco mb-3">Market Opportunity</div>
        <h2 className="section-title text-3xl md:text-4xl mb-2">
          A <span style={{ color: "hsl(var(--primary))" }}>£42B+</span> Global Market with Strong UK & EU Pull
        </h2>
        <p className="mb-8 text-base" style={{ color: "hsl(var(--muted-foreground))" }}>
          Multiple converging markets — sustainable mobility, corporate wellness, ESG software, and smart cities — give Sustainable Voyage a large and growing addressable market.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
          <div className="space-y-4">
            {[
              { label: "TAM — Global Sustainable Mobility & ESG SaaS", value: "£42B", sub: "Sustainable transport tech + corporate ESG reporting + wellness apps (2024)", color: "hsl(142 71% 35%)", w: "100%" },
              { label: "SAM — UK + European Commuter & B2B Market", value: "£12B", sub: "UK (32M daily commuters) + EU Green Deal compliance demand", color: "hsl(142 60% 48%)", w: "75%" },
              { label: "SOM — Realistic 3-Year Capture", value: "£1.8B", sub: "Focus on UK enterprise, councils, and universities 2025-2027", color: "hsl(87 50% 55%)", w: "30%" },
            ].map((m, i) => (
              <div key={i} className="rounded-2xl p-5" style={{ background: "hsl(142 25% 97%)", border: "1px solid hsl(142 30% 88%)" }}>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "hsl(var(--muted-foreground))" }}>{m.label}</span>
                  <span className="text-2xl font-extrabold" style={{ color: m.color }}>{m.value}</span>
                </div>
                <div className="h-2 rounded-full mb-2" style={{ background: "hsl(142 30% 88%)" }}>
                  <div className="h-2 rounded-full transition-all" style={{ width: m.w, background: m.color }} />
                </div>
                <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{m.sub}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl p-5 flex-1" style={{ background: "hsl(142 25% 97%)", border: "1px solid hsl(142 30% 88%)" }}>
              <h4 className="font-bold mb-4 text-sm">Market Drivers</h4>
              {[
                "🏛️ UK Sustainable Transport Strategy 2030 — mandates employer reporting",
                "🌍 EU Corporate Sustainability Reporting Directive (CSRD) — affects 50,000+ companies",
                "📱 22% YoY growth in corporate wellness apps (Deloitte 2023)",
                "🚲 Active travel funding up 4× since 2020 (UK Active Travel England)",
                "🏙️ 68 UK cities expanding clean air zones (JAQU 2024)",
              ].map((d, i) => (
                <div key={i} className="flex gap-2 items-start mb-2">
                  <span className="text-sm">{d}</span>
                </div>
              ))}
            </div>
            <div className="rounded-2xl p-4 text-center"
              style={{ background: "linear-gradient(135deg, hsl(142 71% 25%), hsl(160 60% 20%))", color: "white" }}>
              <div className="text-3xl font-extrabold">28%</div>
              <div className="text-sm" style={{ color: "hsl(142 40% 75%)" }}>CAGR — Sustainable mobility tech (2024-2030)</div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// ── Slide 5: Target Market ────────────────────────────────────────────────────
function Slide5() {
  const segments = [
    { icon: "🏢", title: "Corporate HR & ESG Teams", size: "300K+ UK businesses", pain: "Meet CSRD/scope 3 reporting; employee wellness KPIs", value: "Branded dashboard, ESG PDF reports, bulk licences", revenue: "£2,400–£24,000/yr" },
    { icon: "🏛️", title: "Local Government & TfL", size: "400+ UK councils & transport bodies", pain: "Behaviour change to hit clean air targets; modal shift data", value: "Population-level analytics, public leaderboards, campaign tools", revenue: "£10K–£150K/yr" },
    { icon: "🎓", title: "Universities & Schools", size: "170 UK HEIs + 30K schools", pain: "Sustainability strategy, student engagement, travel planning", value: "Campus leaderboards, commuter analytics, grant evidence", revenue: "£3,000–£18,000/yr" },
    { icon: "👤", title: "Conscious Commuters (B2C)", size: "8.4M UK 'eco-anxious' adults (YouGov 2023)", pain: "Want to act on climate but don't know daily impact", value: "Personal dashboard, achievements, social sharing", revenue: "£4.99–£12.99/mo" },
  ];
  return (
    <SlideWrapper>
      <div className="p-10 flex flex-col flex-1 relative">
        <SlideLabel n={5} total={TOTAL_SLIDES} />
        <div className="badge-eco mb-3">Target Market</div>
        <h2 className="section-title text-3xl md:text-4xl mb-2">
          Four Distinct <span style={{ color: "hsl(var(--primary))" }}>Customer Segments</span>
        </h2>
        <p className="mb-8 text-base" style={{ color: "hsl(var(--muted-foreground))" }}>
          Our land-and-expand strategy starts with B2B (higher ACV), then uses corporate adoption to drive B2C growth organically.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 flex-1">
          {segments.map((s, i) => (
            <div key={i} className="card-feature">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{s.icon}</span>
                <div>
                  <h3 className="font-bold text-base">{s.title}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "hsl(var(--secondary))", color: "hsl(var(--secondary-foreground))" }}>{s.size}</span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div><span className="font-semibold" style={{ color: "hsl(0 72% 51%)" }}>Pain: </span>{s.pain}</div>
                <div><span className="font-semibold" style={{ color: "hsl(var(--primary))" }}>Value: </span>{s.value}</div>
                <div className="flex items-center justify-between pt-1 mt-1" style={{ borderTop: "1px solid hsl(var(--border))" }}>
                  <span className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>Revenue potential</span>
                  <span className="font-bold" style={{ color: "hsl(var(--primary))" }}>{s.revenue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideWrapper>
  );
}

// ── Slide 6: Business Model ───────────────────────────────────────────────────
function Slide6() {
  const streams = [
    { icon: "💼", name: "B2B SaaS Subscription", desc: "Annual licences for employers, councils & universities. Tiered by users.", arr: "Primary", color: "hsl(142 71% 35%)" },
    { icon: "👤", name: "B2C Premium (Freemium)", desc: "Free tier + £4.99–£12.99/mo for advanced analytics, AI coaching & ad-free.", arr: "Secondary", color: "hsl(87 50% 55%)" },
    { icon: "🔗", name: "API & White-label", desc: "SDK for mobility apps, HR platforms, and smart city integrations.", arr: "Tertiary", color: "hsl(199 70% 55%)" },
    { icon: "🛒", name: "Marketplace & Data", desc: "Anonymised aggregate insights sold to transport planners. Ethical, GDPR-compliant.", arr: "Future", color: "hsl(35 40% 50%)" },
  ];
  return (
    <SlideWrapper>
      <div className="p-10 flex flex-col flex-1 relative">
        <SlideLabel n={6} total={TOTAL_SLIDES} />
        <div className="badge-eco mb-3">Business Model</div>
        <h2 className="section-title text-3xl md:text-4xl mb-6">
          Recurring Revenue Across <span style={{ color: "hsl(var(--primary))" }}>Four Streams</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          {streams.map((s, i) => (
            <div key={i} className="card-feature flex gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 mt-1"
                style={{ background: s.color + "20", border: `1px solid ${s.color}40` }}>{s.icon}</div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-base">{s.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: s.color + "20", color: s.color }}>{s.arr}</span>
                </div>
                <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "B2B ACV (avg)", value: "£8,400" },
            { label: "B2C ARPU/mo", value: "£7.20" },
            { label: "Gross Margin", value: "82%" },
            { label: "Payback Period", value: "9 months" },
          ].map(m => (
            <div key={m.label} className="rounded-2xl p-4 text-center" style={{ background: "hsl(142 25% 96%)", border: "1px solid hsl(142 30% 88%)" }}>
              <div className="stat-number text-2xl">{m.value}</div>
              <div className="text-xs mt-1" style={{ color: "hsl(var(--muted-foreground))" }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </SlideWrapper>
  );
}

// ── Slide 7: Traction & Validation ────────────────────────────────────────────
function Slide7() {
  const milestones = [
    { date: "Q1 2022", event: "MVP launched — 500 beta users in London", icon: "🚀" },
    { date: "Q3 2022", event: "First B2B pilot: Transport for London (1,200 staff)", icon: "🏛️" },
    { date: "Q1 2023", event: "5,000 active users; App Store rating 4.7★", icon: "⭐" },
    { date: "Q3 2023", event: "Unilever UK + NHS Scotland signed; £180K ARR", icon: "🤝" },
    { date: "Q1 2024", event: "Featured in GreenBiz 30 Under 30 + Innovate UK grant (£120K)", icon: "🏆" },
    { date: "Q3 2024", event: "95K users, 40+ countries, 580t CO₂ saved across network", icon: "🌍" },
  ];
  return (
    <SlideWrapper>
      <div className="p-10 flex flex-col flex-1 relative">
        <SlideLabel n={7} total={TOTAL_SLIDES} />
        <div className="badge-eco mb-3">Traction & Validation</div>
        <h2 className="section-title text-3xl md:text-4xl mb-8">
          Real Revenue. Real Impact. <span style={{ color: "hsl(var(--primary))" }}>Real Growth.</span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wide" style={{ color: "hsl(var(--muted-foreground))" }}>Growth Timeline</h4>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5" style={{ background: "hsl(var(--primary))" }} />
              {milestones.map((m, i) => (
                <div key={i} className="flex gap-4 mb-5 pl-10 relative">
                  <div className="absolute left-1.5 top-1 w-5 h-5 rounded-full flex items-center justify-center text-xs"
                    style={{ background: "hsl(var(--primary))" }}>
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold mb-0.5" style={{ color: "hsl(var(--primary))" }}>{m.date}</div>
                    <div className="text-sm">{m.icon} {m.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wide" style={{ color: "hsl(var(--muted-foreground))" }}>Key Metrics (Oct 2024)</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { v: "95K+", l: "Active Users" },
                { v: "£342K", l: "ARR" },
                { v: "98%", l: "Client Retention" },
                { v: "340+", l: "B2B Clients" },
                { v: "580t", l: "CO₂ Saved" },
                { v: "4.7★", l: "App Rating" },
              ].map(m => (
                <div key={m.l} className="rounded-2xl p-4 text-center" style={{ background: "hsl(142 25% 96%)", border: "1px solid hsl(142 30% 88%)" }}>
                  <div className="stat-number text-xl">{m.v}</div>
                  <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{m.l}</div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl p-4 mt-2" style={{ background: "hsl(142 25% 96%)", border: "1px solid hsl(142 30% 88%)" }}>
              <div className="text-xs font-bold mb-2 uppercase" style={{ color: "hsl(var(--muted-foreground))" }}>Revenue Trajectory (£K ARR)</div>
              <ResponsiveContainer width="100%" height={100}>
                <LineChart data={projectionData.slice(0, 3)}>
                  <Line type="monotone" dataKey="arr" stroke="hsl(142, 71%, 35%)" strokeWidth={2} dot={{ r: 3 }} />
                  <XAxis dataKey="year" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip formatter={(v) => [`£${v}K`, "ARR"]} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// ── Slide 8: Marketing & Sales ────────────────────────────────────────────────
function Slide8() {
  const channels = [
    { icon: "🏢", name: "Enterprise Sales", cac: "£420", ltv: "£8,400", ratio: "20×", tactics: "LinkedIn outreach, conference sponsorship, ESG events" },
    { icon: "🌐", name: "Content & SEO", cac: "£18", ltv: "£95", ratio: "5×", tactics: "Sustainability calculators, CO₂ blog, local authority guides" },
    { icon: "📱", name: "App Store / Organic", cac: "£9", ltv: "£87", ratio: "9.6×", tactics: "ASO, word-of-mouth from B2B deployments, social sharing" },
    { icon: "🤝", name: "Partner Referrals", cac: "£145", ltv: "£2,800", ratio: "19×", tactics: "HR platform integrations, cycling charities, council partnerships" },
  ];
  return (
    <SlideWrapper>
      <div className="p-10 flex flex-col flex-1 relative">
        <SlideLabel n={8} total={TOTAL_SLIDES} />
        <div className="badge-eco mb-3">Marketing & Sales Strategy</div>
        <h2 className="section-title text-3xl md:text-4xl mb-2">
          Low CAC. High LTV. <span style={{ color: "hsl(var(--primary))" }}>Viral by Design.</span>
        </h2>
        <p className="mb-8 text-base" style={{ color: "hsl(var(--muted-foreground))" }}>
          Our B2B-led, product-led-growth model keeps acquisition costs low. Every B2B deployment organically reaches hundreds of employee consumers.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          {channels.map((c, i) => (
            <div key={i} className="card-feature">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{c.icon}</span>
                <h3 className="font-bold">{c.name}</h3>
              </div>
              <p className="text-xs mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>{c.tactics}</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg p-2" style={{ background: "hsl(var(--muted))" }}>
                  <div className="text-sm font-bold" style={{ color: "hsl(0 72% 51%)" }}>CAC</div>
                  <div className="text-xs font-semibold">{c.cac}</div>
                </div>
                <div className="rounded-lg p-2" style={{ background: "hsl(var(--muted))" }}>
                  <div className="text-sm font-bold" style={{ color: "hsl(var(--primary))" }}>LTV</div>
                  <div className="text-xs font-semibold">{c.ltv}</div>
                </div>
                <div className="rounded-lg p-2" style={{ background: "hsl(142 25% 93%)" }}>
                  <div className="text-sm font-bold" style={{ color: "hsl(var(--primary))" }}>LTV:CAC</div>
                  <div className="text-xs font-semibold">{c.ratio}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Blended CAC", value: "£148", icon: "💸" },
            { label: "Avg LTV (B2B)", value: "£8,400", icon: "📈" },
            { label: "NPS Score", value: "71", icon: "❤️" },
          ].map(m => (
            <div key={m.label} className="rounded-2xl p-4 text-center" style={{ background: "linear-gradient(135deg, hsl(142 71% 25%), hsl(160 60% 20%))", color: "white" }}>
              <div className="text-2xl mb-1">{m.icon}</div>
              <div className="text-xl font-extrabold">{m.value}</div>
              <div className="text-xs" style={{ color: "hsl(142 40% 75%)" }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </SlideWrapper>
  );
}

// ── Slide 9: Competition ──────────────────────────────────────────────────────
function Slide9() {
  const cols = ["CO₂ Tracking", "Gamification", "B2B ESG", "Health Metrics", "UK-native"];
  return (
    <SlideWrapper>
      <div className="p-10 flex flex-col flex-1 relative">
        <SlideLabel n={9} total={TOTAL_SLIDES} />
        <div className="badge-eco mb-3">Competition & Competitive Advantage</div>
        <h2 className="section-title text-3xl md:text-4xl mb-2">
          We Win on <span style={{ color: "hsl(var(--primary))" }}>Breadth, Depth & Behaviour Change</span>
        </h2>
        <p className="mb-6 text-base" style={{ color: "hsl(var(--muted-foreground))" }}>
          No single competitor combines journey intelligence, gamification, and enterprise ESG reporting in one platform.
        </p>
        <div className="rounded-2xl overflow-hidden mb-6" style={{ border: "1px solid hsl(var(--border))" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "hsl(142 71% 25%)", color: "white" }}>
                <th className="p-3 text-left font-bold">Platform</th>
                {cols.map(c => <th key={c} className="p-3 text-center font-semibold text-xs">{c}</th>)}
                <th className="p-3 text-center font-semibold text-xs">Score</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((c, i) => (
                <tr key={i} style={{
                  background: i === 0 ? "hsl(142 60% 96%)" : i % 2 === 0 ? "hsl(0 0% 100%)" : "hsl(0 0% 98%)",
                  borderBottom: "1px solid hsl(var(--border))"
                }}>
                  <td className="p-3 font-bold flex items-center gap-2">
                    {i === 0 && <Leaf size={14} style={{ color: "hsl(var(--primary))" }} />}
                    <span style={{ color: i === 0 ? "hsl(var(--primary))" : undefined }}>{c.name}</span>
                    {i === 0 && <span className="text-xs px-2 py-0.5 rounded-full font-bold ml-1" style={{ background: "hsl(var(--primary))", color: "white" }}>US</span>}
                  </td>
                  {[c.co2, c.gamify, c.b2b, c.health, c.uk].map((v, j) => (
                    <td key={j} className="p-3 text-center">
                      {v ? <span style={{ color: "hsl(var(--primary))" }}>✅</span> : <span style={{ color: "hsl(0 0% 70%)" }}>✗</span>}
                    </td>
                  ))}
                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} size={12} fill={j < c.score ? "hsl(35 90% 55%)" : "none"} stroke={j < c.score ? "hsl(35 90% 55%)" : "hsl(0 0% 80%)"} />
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: "🔒", title: "Moat: Proprietary Data", desc: "2+ years of journey + behaviour data creates an unassailable AI training advantage." },
            { icon: "🏛️", title: "Regulatory Tailwind", desc: "CSRD and UK Scope 3 mandates create a compliance pull — not just a nice-to-have." },
            { icon: "🧲", title: "Network Effects", desc: "Leaderboards + community mean every new user makes the platform more valuable." },
          ].map((a, i) => (
            <div key={i} className="card-feature">
              <div className="text-2xl mb-2">{a.icon}</div>
              <h4 className="font-bold text-sm mb-1">{a.title}</h4>
              <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideWrapper>
  );
}

// ── Slide 10: Financial Projections ───────────────────────────────────────────
function Slide10() {
  return (
    <SlideWrapper>
      <div className="p-10 flex flex-col flex-1 relative">
        <SlideLabel n={10} total={TOTAL_SLIDES} />
        <div className="badge-eco mb-3">Financial Projections</div>
        <h2 className="section-title text-3xl md:text-4xl mb-2">
          Path to <span style={{ color: "hsl(var(--primary))" }}>£3.8M Revenue</span> by 2029
        </h2>
        <p className="mb-6 text-base" style={{ color: "hsl(var(--muted-foreground))" }}>
          Conservative model based on existing pipeline and current growth rate of 3.2× YoY. Assumes 82% gross margin maintained through scale.
        </p>
        <div className="flex-1 mb-6">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={projectionData} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(142 20% 90%)" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `£${v}K`} />
              <Tooltip formatter={(v, n) => [`£${v}K`, n === "revenue" ? "Revenue" : n === "arr" ? "ARR" : "Users (00s)"]} />
              <Bar dataKey="arr" fill="hsl(142, 71%, 35%)" radius={[4, 4, 0, 0]} name="ARR" />
              <Bar dataKey="revenue" fill="hsl(87, 50%, 55%)" radius={[4, 4, 0, 0]} name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-5 gap-3 mb-4">
          {projectionData.map((d, i) => (
            <div key={i} className="rounded-xl p-3 text-center" style={{ background: i === 0 ? "hsl(142 25% 96%)" : "hsl(142 71% 25%)", color: i === 0 ? "inherit" : "white" }}>
              <div className="text-xs font-bold mb-1" style={{ color: i === 0 ? "hsl(var(--muted-foreground))" : "hsl(142 40% 80%)" }}>{d.year}</div>
              <div className="text-base font-extrabold">£{d.revenue}K</div>
              <div className="text-xs" style={{ color: i === 0 ? "hsl(var(--muted-foreground))" : "hsl(142 40% 75%)" }}>{d.users}K users</div>
            </div>
          ))}
        </div>
        <div className="rounded-2xl p-4" style={{ background: "hsl(142 25% 97%)", border: "1px solid hsl(142 30% 88%)" }}>
          <h4 className="font-bold text-xs uppercase mb-2" style={{ color: "hsl(var(--muted-foreground))" }}>Key Assumptions</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            {[
              "B2B ACV grows from £8.4K → £14K by 2027",
              "82–85% gross margins maintained at scale",
              "B2C premium conversion: 8% free → paid",
              "Series A raise of £2M in 2026 to accelerate EU expansion",
            ].map((a, i) => (
              <div key={i} className="flex gap-1 items-start">
                <Check size={11} style={{ color: "hsl(var(--primary))", flexShrink: 0, marginTop: 2 }} />
                <span style={{ color: "hsl(var(--muted-foreground))" }}>{a}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// ── Slide 11: The Ask ─────────────────────────────────────────────────────────
function Slide11() {
  return (
    <SlideWrapper>
      <div className="p-10 flex flex-col flex-1 relative">
        <SlideLabel n={11} total={TOTAL_SLIDES} />
        <div className="badge-eco mb-3">The Ask & Use of Funds</div>
        <h2 className="section-title text-3xl md:text-4xl mb-2">
          Raising <span style={{ color: "hsl(var(--primary))" }}>£750,000 Seed</span> to Scale UK-Wide
        </h2>
        <p className="mb-8 text-base" style={{ color: "hsl(var(--muted-foreground))" }}>
          Pre-money valuation: £3.2M. SEIS/EIS eligible. This round closes January 2025. Minimum ticket: £25K.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wide" style={{ color: "hsl(var(--muted-foreground))" }}>Use of Funds</h4>
            <div className="space-y-3">
              {useOfFunds.map((u, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-semibold">{u.label}</span>
                    <span className="text-sm font-bold" style={{ color: u.color }}>{u.pct}%</span>
                  </div>
                  <div className="h-3 rounded-full overflow-hidden" style={{ background: "hsl(142 20% 92%)" }}>
                    <div className="h-3 rounded-full" style={{ width: `${u.pct}%`, background: u.color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl p-4" style={{ background: "hsl(142 25% 96%)", border: "1px solid hsl(142 30% 88%)" }}>
              <div className="text-sm font-bold mb-1">£750K unlocks:</div>
              {[
                "Mobile app V2 + AI coaching module",
                "3 new enterprise sales hires (UK)",
                "EU regulatory compliance (CSRD module)",
                "Series A readiness by Q4 2025",
              ].map((m, i) => (
                <div key={i} className="flex gap-2 items-center text-sm mt-1">
                  <ArrowRight size={12} style={{ color: "hsl(var(--primary))" }} />
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wide" style={{ color: "hsl(var(--muted-foreground))" }}>Milestones This Round Funds</h4>
            {[
              { q: "Q1 2025", milestone: "100K active users + mobile V2 launch", icon: "📱" },
              { q: "Q2 2025", milestone: "£600K ARR — break-even on operating costs", icon: "📊" },
              { q: "Q3 2025", milestone: "EU pilot: Amsterdam + Berlin city councils", icon: "🌍" },
              { q: "Q4 2025", milestone: "Series A raise of £2M at £8M pre-money", icon: "🚀" },
            ].map((m, i) => (
              <div key={i} className="card-feature flex gap-4 py-4">
                <span className="text-2xl">{m.icon}</span>
                <div>
                  <div className="text-xs font-bold mb-0.5" style={{ color: "hsl(var(--primary))" }}>{m.q}</div>
                  <div className="text-sm">{m.milestone}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

// ── Slide 12: SEIS/EIS ─────────────────────────────────────────────────────────
function Slide12() {
  return (
    <SlideWrapper>
      <div className="p-10 flex flex-col flex-1 relative">
        <SlideLabel n={12} total={TOTAL_SLIDES} />
        <div className="badge-eco mb-3">SEIS / EIS Status</div>
        <h2 className="section-title text-3xl md:text-4xl mb-2">
          Maximising Investor Returns Through <span style={{ color: "hsl(var(--primary))" }}>UK Tax Relief</span>
        </h2>
        <p className="mb-8 text-base" style={{ color: "hsl(var(--muted-foreground))" }}>
          Sustainable Voyage Ltd. is a UK-incorporated company and has received advance assurance from HMRC for both SEIS and EIS qualification.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {[
            {
              scheme: "SEIS", badge: "Seed Enterprise Investment Scheme", color: "hsl(142 71% 35%)",
              limit: "Up to £250K this raise",
              benefits: [
                "50% income tax relief on investment",
                "CGT disposal relief (0% on gains)",
                "CGT reinvestment relief (50%)",
                "Loss relief against income tax if investment fails",
              ],
              example: "Invest £50K → effective cost £25K after tax relief",
            },
            {
              scheme: "EIS", badge: "Enterprise Investment Scheme", color: "hsl(199 70% 55%)",
              limit: "Up to £500K this raise",
              benefits: [
                "30% income tax relief on investment",
                "CGT deferral relief — no CGT on gains after 3 years",
                "Inheritance tax relief (Business Relief)",
                "Loss relief: up to 61.5% downside protection",
              ],
              example: "Invest £100K → effective cost £70K after 30% relief",
            },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl p-6" style={{ border: `2px solid ${s.color}40`, background: `${s.color}08` }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-extrabold text-white"
                  style={{ background: s.color }}>{s.scheme}</div>
                <div>
                  <div className="font-bold text-base">{s.badge}</div>
                  <div className="text-xs font-semibold px-2 py-0.5 rounded-full mt-1 inline-block"
                    style={{ background: s.color + "20", color: s.color }}>{s.limit}</div>
                </div>
              </div>
              <ul className="space-y-2 mb-4">
                {s.benefits.map((b, j) => (
                  <li key={j} className="flex gap-2 items-start text-sm">
                    <Check size={14} style={{ color: s.color, flexShrink: 0, marginTop: 2 }} />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="rounded-xl p-3 text-sm font-semibold" style={{ background: s.color + "15", color: s.color }}>
                💡 {s.example}
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: "✅", title: "HMRC Advance Assurance", desc: "Received October 2024. S/EIS1 forms available on completion." },
            { icon: "📋", title: "Eligibility Confirmed", desc: "UK company, <7 years trading, qualifying trade, assets under £200K." },
            { icon: "⚡", title: "Act Before April 2025", desc: "Invest this tax year to use 2024/25 SEIS/EIS allowances before year-end." },
          ].map((c, i) => (
            <div key={i} className="card-feature text-center">
              <div className="text-3xl mb-2">{c.icon}</div>
              <h4 className="font-bold text-sm mb-1">{c.title}</h4>
              <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideWrapper>
  );
}

// ── Slide 13: Team ────────────────────────────────────────────────────────────
function Slide13() {
  const team = [
    { initials: "AM", name: "Dr. Aisha Mohammed", role: "CEO & Co-Founder", bg: "hsl(142 71% 35%)", exp: ["PhD Climate Science, Imperial College London", "Former sustainability lead, Arup", "TEDx speaker: 'Making Carbon Visible'"] },
    { initials: "LC", name: "Liam Chen", role: "CTO & Co-Founder", bg: "hsl(199 70% 55%)", exp: ["Ex-Google Maps engineering lead", "MSc Computer Science, UCL", "Built AI routing used by 40M+ commuters"] },
    { initials: "SA", name: "Sofia Andersen", role: "Head of Partnerships", bg: "hsl(35 40% 50%)", exp: ["Former EU Sustainable Mobility Policy Advisor", "10 years at Transport & Environment NGO", "Network: 200+ councils & transport bodies"] },
    { initials: "MO", name: "Marcus Okafor", role: "Lead Data Scientist", bg: "hsl(87 50% 55%)", exp: ["MSc Data Science, Edinburgh", "Ex-Citymapper & BreezoMeter", "Built predictive modal shift model (94% accuracy)"] },
  ];
  const advisors = [
    { name: "Prof. James Murray", role: "Climate Economics Advisor", org: "LSE Grantham Institute" },
    { name: "Rachel Stone", role: "Commercial Advisor", org: "Former CMO, Innocent Drinks" },
    { name: "David Osei", role: "Investor Relations", org: "Partner, Mustard Seed VC" },
  ];
  return (
    <SlideWrapper>
      <div className="p-10 flex flex-col flex-1 relative">
        <SlideLabel n={13} total={TOTAL_SLIDES} />
        <div className="badge-eco mb-3">The Team</div>
        <h2 className="section-title text-3xl md:text-4xl mb-2">
          Built by <span style={{ color: "hsl(var(--primary))" }}>Mission-Driven Experts</span>
        </h2>
        <p className="mb-6 text-base" style={{ color: "hsl(var(--muted-foreground))" }}>
          A founding team combining climate science, world-class engineering, policy, and commercial experience.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {team.map((m, i) => (
            <div key={i} className="card-feature text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-lg text-white mx-auto mb-3"
                style={{ background: m.bg }}>{m.initials}</div>
              <h4 className="font-bold text-sm mb-0.5">{m.name}</h4>
              <div className="text-xs font-semibold mb-2" style={{ color: "hsl(var(--primary))" }}>{m.role}</div>
              <ul className="text-left space-y-1">
                {m.exp.map((e, j) => (
                  <li key={j} className="flex gap-1 text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                    <span style={{ color: "hsl(var(--primary))", flexShrink: 0 }}>›</span> {e}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-5" style={{ background: "hsl(142 25% 96%)", border: "1px solid hsl(142 30% 88%)" }}>
            <h4 className="font-bold text-sm uppercase mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>Advisory Board</h4>
            {advisors.map((a, i) => (
              <div key={i} className="flex justify-between items-start mb-2">
                <div>
                  <div className="text-sm font-bold">{a.name}</div>
                  <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{a.role}</div>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "hsl(var(--secondary))", color: "hsl(var(--secondary-foreground))" }}>{a.org}</span>
              </div>
            ))}
          </div>
          <div className="rounded-2xl p-5 flex flex-col justify-between"
            style={{ background: "linear-gradient(135deg, hsl(142 71% 25%), hsl(160 60% 20%))", color: "white" }}>
            <h4 className="font-bold text-sm uppercase mb-4" style={{ color: "hsl(142 40% 75%)" }}>Get in Touch</h4>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Mail size={14} style={{ color: "hsl(142 50% 65%)" }} />
                <span>invest@sustainablevoyage.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Globe size={14} style={{ color: "hsl(142 50% 65%)" }} />
                <span>www.sustainablevoyage.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <ExternalLink size={14} style={{ color: "hsl(142 50% 65%)" }} />
                <span>linkedin.com/company/sustainable-voyage</span>
              </div>
            </div>
            <div className="rounded-xl p-3 text-center" style={{ background: "hsl(142 71% 35% / 0.3)", border: "1px solid hsl(142 50% 50% / 0.3)" }}>
              <div className="text-xs font-bold mb-1" style={{ color: "hsl(142 40% 80%)" }}>Deck prepared</div>
              <div className="font-semibold text-sm">{new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}

const SLIDES = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8, Slide9, Slide10, Slide11, Slide12, Slide13];

const SLIDE_TITLES = [
  "Title & Hook", "Problem Statement", "Solution Statement", "Market Opportunity",
  "Target Market", "Business Model", "Traction & Validation", "Marketing & Sales",
  "Competition", "Financial Projections", "The Ask", "SEIS / EIS", "The Team",
];

export default function PitchDeck() {
  const [current, setCurrent] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);

  const ActiveSlide = SLIDES[current - 1];

  const go = (n: number) => {
    if (n >= 1 && n <= TOTAL_SLIDES) setCurrent(n);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(current + 1);
      if (e.key === "ArrowLeft") go(current - 1);
      if (e.key === "Escape" && fullscreen) setFullscreen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, fullscreen]);

  const handlePrint = () => window.print();

  const handleExportPDF = useCallback(async () => {
    setExporting(true);
    setExportProgress(0);
    const savedSlide = current;

    try {
      const { default: jsPDF } = await import("jspdf");
      const { default: html2canvas } = await import("html2canvas");

      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();

      for (let i = 1; i <= TOTAL_SLIDES; i++) {
        setCurrent(i);
        setExportProgress(Math.round((i / TOTAL_SLIDES) * 90));
        // Wait for render
        await new Promise(r => setTimeout(r, 600));

        const el = document.getElementById("slide-capture");
        if (!el) continue;

        const canvas = await html2canvas(el, {
          scale: 1.5,
          useCORS: true,
          backgroundColor: "#ffffff",
          logging: false,
        });

        const imgData = canvas.toDataURL("image/jpeg", 0.92);
        const imgH = (canvas.height * pageW) / canvas.width;

        if (i > 1) pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, (pageH - imgH) / 2, pageW, imgH);
      }

      setExportProgress(98);
      pdf.save("Sustainable-Voyage-Pitch-Deck.pdf");
      setExportProgress(100);
    } catch (err) {
      console.error("PDF export failed:", err);
    } finally {
      setCurrent(savedSlide);
      setTimeout(() => { setExporting(false); setExportProgress(0); }, 800);
    }
  }, [current]);

  return (
    <div className={`page-transition ${fullscreen ? "fixed inset-0 z-50 bg-background overflow-y-auto" : ""}`} ref={containerRef}>
      {/* Header */}
      <div className="py-10 px-6" style={{ background: "linear-gradient(135deg, hsl(142 71% 20%), hsl(160 60% 15%))" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs mb-4" style={{ color: "hsl(142 40% 70%)" }}>
            <Link to="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span style={{ color: "white" }}>Pitch Deck</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="hero-title text-4xl md:text-5xl mb-2" style={{ color: "white" }}>Investor Pitch Deck</h1>
              <p style={{ color: "hsl(142 40% 75%)" }}>Sustainable Voyage · Seed Round · SEIS/EIS Eligible</p>
            </div>
            <div className="flex items-center gap-3">
              <LiveClock dark className="text-xs" />
              <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white"
                style={{ background: "hsl(142 71% 35% / 0.5)", border: "1px solid hsl(142 50% 50% / 0.5)" }}>
                <Printer size={14} /> Print
              </button>
              <button
                onClick={handleExportPDF}
                disabled={exporting}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white disabled:opacity-70 transition-all"
                style={{ background: exporting ? "hsl(142 50% 28%)" : "hsl(142 71% 35%)", border: "1px solid hsl(142 50% 50% / 0.5)", minWidth: 140 }}>
                {exporting ? (
                  <>
                    <svg className="animate-spin" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" strokeOpacity="0.3"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>
                    Exporting… {exportProgress}%
                  </>
                ) : (
                  <><Download size={14} /> Export PDF</>
                )}
              </button>
              <button onClick={() => setFullscreen(f => !f)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white"
                style={{ background: "hsl(142 71% 35% / 0.5)", border: "1px solid hsl(142 50% 50% / 0.5)" }}>
                {fullscreen ? <><Minimize2 size={14} /> Exit</>  : <><Maximize2 size={14} /> Focus</>}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Prev / Next */}
      <div className="flex items-center justify-between px-6 py-3" style={{ background: "hsl(142 25% 97%)", borderBottom: "1px solid hsl(var(--border))" }}>
        <Link to="/subscription" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
          style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
          <ChevronLeft size={16} /> Subscription
        </Link>
        <Link to="/contact" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
          style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
          Contact <ChevronRight size={16} />
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Slide Navigator */}
        <div className="mb-6 rounded-2xl p-4" style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold">Slide {current} of {TOTAL_SLIDES}: <span style={{ color: "hsl(var(--primary))" }}>{SLIDE_TITLES[current - 1]}</span></span>
            <div className="flex gap-2">
              <button onClick={() => go(current - 1)} disabled={current === 1}
                className="w-8 h-8 rounded-lg flex items-center justify-center disabled:opacity-30"
                style={{ background: "hsl(var(--secondary))", color: "hsl(var(--secondary-foreground))" }}>
                <ChevronLeft size={16} />
              </button>
              <button onClick={() => go(current + 1)} disabled={current === TOTAL_SLIDES}
                className="w-8 h-8 rounded-lg flex items-center justify-center disabled:opacity-30"
                style={{ background: "hsl(var(--primary))", color: "white" }}>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
          {/* Progress bar */}
          <div className="h-2 rounded-full overflow-hidden mb-3" style={{ background: "hsl(var(--muted))" }}>
            <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${(current / TOTAL_SLIDES) * 100}%`, background: "hsl(var(--primary))" }} />
          </div>
          {/* Slide thumbnails */}
          <div className="flex gap-1.5 flex-wrap">
            {SLIDE_TITLES.map((t, i) => (
              <button key={i} onClick={() => go(i + 1)}
                className="px-2 py-1 rounded-lg text-xs font-medium transition-all"
                style={{
                  background: current === i + 1 ? "hsl(var(--primary))" : "hsl(var(--muted))",
                  color: current === i + 1 ? "white" : "hsl(var(--muted-foreground))",
                  border: current === i + 1 ? "none" : "1px solid hsl(var(--border))",
                }}>
                {i + 1}. {t}
              </button>
            ))}
          </div>
        </div>

        {/* Active Slide */}
        <div className="relative">
          {exporting && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-2xl pointer-events-none"
              style={{ background: "hsl(142 71% 10% / 0.7)", backdropFilter: "blur(4px)" }}>
              <div className="text-white font-bold text-lg mb-3">📄 Generating PDF…</div>
              <div className="w-64 h-3 rounded-full overflow-hidden" style={{ background: "hsl(142 30% 25%)" }}>
                <div className="h-3 rounded-full transition-all duration-300" style={{ width: `${exportProgress}%`, background: "hsl(142 71% 55%)" }} />
              </div>
              <div className="text-white text-sm mt-2 opacity-70">Slide {current} of {TOTAL_SLIDES} — {exportProgress}%</div>
            </div>
          )}
          <div id="slide-capture">
            <ActiveSlide />
          </div>
        </div>

        {/* Bottom navigation */}
        <div className="flex items-center justify-between mt-6">
          <button onClick={() => go(current - 1)} disabled={current === 1}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm disabled:opacity-30"
            style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
            <ChevronLeft size={16} /> {current > 1 ? SLIDE_TITLES[current - 2] : "Start"}
          </button>
          <span className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>← → arrow keys also work</span>
          <button onClick={() => go(current + 1)} disabled={current === TOTAL_SLIDES}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm disabled:opacity-30"
            style={{ background: "hsl(var(--primary))", color: "white" }}>
            {current < TOTAL_SLIDES ? SLIDE_TITLES[current] : "End"} <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
