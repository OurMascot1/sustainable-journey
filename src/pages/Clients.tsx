import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Leaf } from "lucide-react";

const clients = [
  { name: "Transport for London", sector: "Government", size: "Enterprise", co2Saved: "142t", initials: "TfL", color: "hsl(220 70% 55%)" },
  { name: "Unilever UK", sector: "Corporate", size: "Enterprise", co2Saved: "88t", initials: "UL", color: "hsl(30 80% 55%)" },
  { name: "University of Edinburgh", sector: "Education", size: "Large", co2Saved: "24t", initials: "UoE", color: "hsl(270 60% 55%)" },
  { name: "NHS Scotland", sector: "Healthcare", size: "Enterprise", co2Saved: "56t", initials: "NHS", color: "hsl(199 70% 55%)" },
  { name: "Patagonia Europe", sector: "Retail", size: "Medium", co2Saved: "18t", initials: "PAT", color: "hsl(142 60% 40%)" },
  { name: "City of Amsterdam", sector: "Government", size: "Enterprise", co2Saved: "210t", initials: "AMS", color: "hsl(15 80% 55%)" },
  { name: "Deloitte Green Team", sector: "Consulting", size: "Large", co2Saved: "34t", initials: "DLT", color: "hsl(200 50% 45%)" },
  { name: "Riders Unite NGO", sector: "Non-Profit", size: "Small", co2Saved: "8t", initials: "RU", color: "hsl(87 50% 50%)" },
];

export default function Clients() {
  return (
    <div className="page-transition">
      <div className="py-16 px-6" style={{ background: "linear-gradient(135deg, hsl(142 71% 20%), hsl(160 60% 15%))" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs mb-4" style={{ color: "hsl(142 40% 70%)" }}>
            <Link to="/" className="hover:text-white">Home</Link> <span>/</span> <span style={{ color: "white" }}>Clients</span>
          </div>
          <h1 className="hero-title text-4xl md:text-5xl mb-3" style={{ color: "white" }}>Our Clients</h1>
          <p className="text-lg" style={{ color: "hsl(142 40% 75%)" }}>Organisations driving measurable change with Sustainable Voyage</p>
        </div>
      </div>

      <div className="flex items-center justify-between px-6 py-3" style={{ background: "hsl(142 25% 97%)", borderBottom: "1px solid hsl(var(--border))" }}>
        <Link to="/about" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium" style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
          <ChevronLeft size={16} /> About Us
        </Link>
        <Link to="/partners" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium" style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
          Partners <ChevronRight size={16} />
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[{ v: "340+", l: "Client Organisations" }, { v: "40", l: "Countries" }, { v: "580t", l: "CO₂ Saved Together" }, { v: "98%", l: "Client Retention" }].map(s => (
            <div key={s.l} className="card-feature text-center">
              <div className="stat-number text-2xl mb-1">{s.v}</div>
              <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{s.l}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {clients.map((c, i) => (
            <div key={i} className="card-feature group">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-sm mb-4 transition-transform group-hover:scale-110"
                style={{ background: c.color }}>{c.initials}</div>
              <h3 className="font-bold mb-1">{c.name}</h3>
              <div className="flex gap-2 mb-3">
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "hsl(var(--secondary))", color: "hsl(var(--secondary-foreground))" }}>{c.sector}</span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}>{c.size}</span>
              </div>
              <div className="flex items-center gap-1">
                <Leaf size={12} style={{ color: "hsl(var(--primary))" }} />
                <span className="text-xs font-semibold" style={{ color: "hsl(var(--primary))" }}>{c.co2Saved} CO₂ saved</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-3xl p-10 text-center" style={{ background: "linear-gradient(135deg, hsl(142 71% 25%), hsl(160 60% 20%))", color: "white" }}>
          <h2 className="text-3xl font-bold mb-4">Join Our Growing Client Community</h2>
          <p className="text-lg mb-8" style={{ color: "hsl(142 40% 75%)" }}>Whether you're a startup or a city government, we have a solution for you.</p>
          <Link to="/contact" className="btn-hero">Get in Touch</Link>
        </div>
      </div>
    </div>
  );
}
