import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Leaf, Target, Globe, Award } from "lucide-react";
import aboutTeam from "@/assets/about-team.jpg";
import LiveClock from "@/components/LiveClock";

const team = [
  { name: "Dr. Aisha Mohammed", role: "CEO & Co-Founder", bio: "Climate scientist turned entrepreneur. 15 years in sustainable transport research.", initials: "AM" },
  { name: "Liam Chen", role: "CTO & Co-Founder", bio: "Ex-Google engineer passionate about using tech for planetary good.", initials: "LC" },
  { name: "Sofia Andersen", role: "Head of Partnerships", bio: "Former EU sustainability policy advisor with global networks.", initials: "SA" },
  { name: "Marcus Okafor", role: "Lead Data Scientist", bio: "Builds AI models that turn travel data into actionable insight.", initials: "MO" },
];

const values = [
  { icon: "🌍", title: "Planet First", desc: "Every feature decision starts with: 'Does this help reduce emissions?'" },
  { icon: "👁️", title: "Radical Visibility", desc: "Sustainability must be seen to be believed. We make the invisible, visible." },
  { icon: "🏆", title: "Behaviour Change", desc: "We don't just measure—we motivate. Rewards, streaks, and community drive real change." },
  { icon: "🤝", title: "Inclusive by Design", desc: "Our tools work for everyone: commuters, companies, cities, and schools." },
];

export default function About() {
  return (
    <div className="page-transition">
      {/* Header */}
      <div className="py-16 px-6" style={{ background: "linear-gradient(135deg, hsl(142 71% 20%), hsl(160 60% 15%))" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs mb-4" style={{ color: "hsl(142 40% 70%)" }}>
            <Link to="/" className="hover:text-white">Home</Link> <span>/</span> <span style={{ color: "white" }}>About Us</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="hero-title text-4xl md:text-5xl mb-3" style={{ color: "white" }}>About Us</h1>
              <p className="text-lg" style={{ color: "hsl(142 40% 75%)" }}>We're on a mission to make every journey count</p>
            </div>
            <LiveClock dark className="text-xs" />
          </div>
        </div>
      </div>

      {/* Prev/Next */}
      <div className="flex items-center justify-between px-6 py-3" style={{ background: "hsl(142 25% 97%)", borderBottom: "1px solid hsl(var(--border))" }}>
        <Link to="/" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium" style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
          <ChevronLeft size={16} /> Home
        </Link>
        <Link to="/services" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium" style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
          Services <ChevronRight size={16} />
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <div className="badge-eco mb-4">Our Mission</div>
            <h2 className="section-title mb-5">Making Sustainability <span style={{ color: "hsl(var(--primary))" }}>Tangible & Rewarding</span></h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>
              Sustainable Voyage was born from a simple observation: people make travel decisions every day, yet sustainability is almost never visible at the point of choice. CO₂ is abstract. Health impact is hidden. And convenience? Convenience dominates.
            </p>
            <p className="text-base leading-relaxed mb-6" style={{ color: "hsl(var(--muted-foreground))" }}>
              We built a platform that changes that equation. By making environmental and health impact instantly visible, measurable, and rewarding, we help individuals and organisations make better decisions—not out of guilt, but out of genuine empowerment.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[{ v: "2019", l: "Founded" }, { v: "95K+", l: "Voyagers" }, { v: "40+", l: "Countries" }, { v: "B Corp", l: "Certified" }].map(s => (
                <div key={s.l} className="rounded-xl p-4 text-center" style={{ background: "hsl(142 25% 96%)", border: "1px solid hsl(142 30% 88%)" }}>
                  <div className="stat-number text-2xl">{s.v}</div>
                  <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img src={aboutTeam} alt="Our team" className="rounded-3xl shadow-2xl w-full object-cover" style={{ height: 420 }} />
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="section-title mb-3">Our <span style={{ color: "hsl(var(--primary))" }}>Core Values</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="card-feature text-center">
                <div className="text-4xl mb-3">{v.icon}</div>
                <h3 className="font-bold mb-2">{v.title}</h3>
                <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <div className="text-center mb-10">
            <h2 className="section-title mb-3">Meet the <span style={{ color: "hsl(var(--primary))" }}>Team</span></h2>
            <p className="section-subtitle">Passionate people building a greener future</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m, i) => (
              <div key={i} className="card-feature text-center group">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-4 transition-transform group-hover:scale-110"
                  style={{ background: "hsl(var(--primary))", color: "white" }}>{m.initials}</div>
                <h3 className="font-bold mb-1">{m.name}</h3>
                <div className="text-xs font-semibold mb-2" style={{ color: "hsl(var(--primary))" }}>{m.role}</div>
                <p className="text-xs leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
