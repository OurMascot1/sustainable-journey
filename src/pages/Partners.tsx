import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Globe, Handshake } from "lucide-react";

const partners = [
  { name: "World Resources Institute", type: "Research", desc: "Global research org providing data on sustainable transport pathways.", initials: "WRI", color: "hsl(199 70% 50%)" },
  { name: "European Cyclists' Federation", type: "Advocacy", desc: "Champions cycling as a sustainable urban mobility solution.", initials: "ECF", color: "hsl(142 60% 40%)" },
  { name: "ICLEI – Local Governments", type: "Government", desc: "Network of 2,500+ local governments committed to climate action.", initials: "ICLEI", color: "hsl(270 55% 55%)" },
  { name: "Google Maps Platform", type: "Technology", desc: "Powers our route calculation and real-time mapping features.", initials: "GMP", color: "hsl(15 80% 55%)" },
  { name: "Carbon Trust", type: "Certification", desc: "Certifies our CO₂ calculations for accuracy and credibility.", initials: "CT", color: "hsl(45 80% 50%)" },
  { name: "UN Environment Programme", type: "International", desc: "Strategic partner for global sustainable transport initiatives.", initials: "UNEP", color: "hsl(220 70% 55%)" },
];

export default function Partners() {
  return (
    <div className="page-transition">
      <div className="py-16 px-6" style={{ background: "linear-gradient(135deg, hsl(142 71% 20%), hsl(160 60% 15%))" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs mb-4" style={{ color: "hsl(142 40% 70%)" }}>
            <Link to="/" className="hover:text-white">Home</Link> <span>/</span> <span style={{ color: "white" }}>Partners</span>
          </div>
          <h1 className="hero-title text-4xl md:text-5xl mb-3" style={{ color: "white" }}>Our Partners</h1>
          <p className="text-lg" style={{ color: "hsl(142 40% 75%)" }}>Collaborating with world-class organisations for impact</p>
        </div>
      </div>

      <div className="flex items-center justify-between px-6 py-3" style={{ background: "hsl(142 25% 97%)", borderBottom: "1px solid hsl(var(--border))" }}>
        <Link to="/clients" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium" style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
          <ChevronLeft size={16} /> Clients
        </Link>
        <Link to="/subscription" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium" style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
          Subscription <ChevronRight size={16} />
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="section-title mb-3">Partnerships That <span style={{ color: "hsl(var(--primary))" }}>Drive Impact</span></h2>
          <p className="section-subtitle max-w-xl mx-auto">We collaborate with research institutions, governments, tech giants, and NGOs to deliver the most accurate, impactful sustainable travel platform.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {partners.map((p, i) => (
            <div key={i} className="card-feature group">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-xs shrink-0 transition-transform group-hover:scale-110"
                  style={{ background: p.color }}>{p.initials}</div>
                <div>
                  <h3 className="font-bold leading-snug">{p.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "hsl(var(--secondary))", color: "hsl(var(--secondary-foreground))" }}>{p.type}</span>
                </div>
              </div>
              <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Become a partner */}
        <div className="rounded-3xl p-10" style={{ background: "hsl(142 25% 97%)", border: "1px solid hsl(142 30% 88%)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="badge-eco mb-4"><Handshake size={12} /> Become a Partner</div>
              <h2 className="text-3xl font-bold mb-4">Partner With Us</h2>
              <p className="text-base mb-6" style={{ color: "hsl(var(--muted-foreground))" }}>
                Are you a research institution, technology provider, NGO, or government agency committed to sustainable transport? Let's create impact together.
              </p>
              <div className="space-y-2 text-sm mb-6">
                {["Co-develop sustainability tools & APIs", "Access our 95K+ user research panel", "Joint publications & thought leadership", "Revenue sharing opportunities"].map((b, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs" style={{ background: "hsl(var(--primary))", color: "white" }}>✓</div>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="btn-primary">Enquire About Partnership</Link>
            </div>
            <div className="rounded-2xl p-6" style={{ background: "hsl(0 0% 100%)", border: "1px solid hsl(var(--border))" }}>
              <h3 className="font-bold mb-4">Partnership Tiers</h3>
              {[
                { tier: "Silver", desc: "Logo placement, co-marketing", price: "From £2,000/yr" },
                { tier: "Gold", desc: "API access + co-branded features", price: "From £8,000/yr" },
                { tier: "Platinum", desc: "Full integration + joint R&D", price: "Custom" },
              ].map((t, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl mb-2" style={{ background: "hsl(142 25% 97%)", border: "1px solid hsl(142 20% 90%)" }}>
                  <div>
                    <div className="font-semibold text-sm">{t.tier}</div>
                    <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{t.desc}</div>
                  </div>
                  <div className="font-bold text-sm" style={{ color: "hsl(var(--primary))" }}>{t.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
