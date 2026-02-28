import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

const plans = [
  {
    name: "Explorer",
    price: "Free",
    period: "",
    desc: "Perfect for individuals starting their sustainable journey",
    color: "hsl(142 20% 88%)",
    features: ["5 journey calculations/day", "Basic CO₂ tracking", "Sustainability score", "Community leaderboard", "Mobile app access"],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Voyager",
    price: "£9",
    period: "/month",
    desc: "For committed green travellers who want full insights",
    color: "hsl(142 71% 35%)",
    features: ["Unlimited journey tracking", "Advanced AI recommendations", "Full comparison charts", "Achievement badges & streaks", "PDF/print reports", "Priority support", "Team challenges"],
    cta: "Start 14-Day Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For organisations, fleets, and cities at scale",
    color: "hsl(160 40% 30%)",
    features: ["Everything in Voyager", "Multi-user dashboards", "Fleet CO₂ reporting", "API access", "White-label options", "Dedicated account manager", "Custom integrations", "SSO & MFA"],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function Subscription() {
  return (
    <div className="page-transition">
      <div className="py-16 px-6" style={{ background: "linear-gradient(135deg, hsl(142 71% 20%), hsl(160 60% 15%))" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs mb-4" style={{ color: "hsl(142 40% 70%)" }}>
            <Link to="/" className="hover:text-white">Home</Link> <span>/</span> <span style={{ color: "white" }}>Subscription</span>
          </div>
          <h1 className="hero-title text-4xl md:text-5xl mb-3" style={{ color: "white" }}>Choose Your Plan</h1>
          <p className="text-lg" style={{ color: "hsl(142 40% 75%)" }}>Start free, scale when ready</p>
        </div>
      </div>

      <div className="flex items-center justify-between px-6 py-3" style={{ background: "hsl(142 25% 97%)", borderBottom: "1px solid hsl(var(--border))" }}>
        <Link to="/partners" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium" style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
          <ChevronLeft size={16} /> Partners
        </Link>
        <Link to="/trainings" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium" style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
          Trainings <ChevronRight size={16} />
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="section-title mb-3">Simple, <span style={{ color: "hsl(var(--primary))" }}>Transparent</span> Pricing</h2>
          <p className="section-subtitle">No hidden fees. Cancel anytime. Every plan includes a 14-day free trial.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((p, i) => (
            <div key={i} className={`rounded-3xl p-8 relative transition-all duration-300 hover:-translate-y-2 ${p.popular ? "shadow-2xl" : "shadow-md"}`}
              style={{
                background: p.popular ? `linear-gradient(135deg, hsl(142 71% 25%), hsl(142 60% 35%))` : "hsl(0 0% 100%)",
                border: p.popular ? "none" : "1px solid hsl(142 20% 88%)",
                color: p.popular ? "white" : "hsl(var(--foreground))"
              }}>
              {p.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold"
                  style={{ background: "hsl(45 90% 55%)", color: "hsl(45 50% 20%)" }}>
                  🌟 Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">{p.name}</h3>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-bold">{p.price}</span>
                  <span className="text-sm opacity-70 mb-1">{p.period}</span>
                </div>
                <p className="text-sm opacity-75">{p.desc}</p>
              </div>
              <ul className="space-y-2.5 mb-8">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm">
                    <Check size={15} className="mt-0.5 shrink-0" style={{ color: p.popular ? "hsl(142 60% 70%)" : "hsl(var(--primary))" }} />
                    <span style={{ opacity: 0.9 }}>{f}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:-translate-y-1"
                style={p.popular
                  ? { background: "white", color: "hsl(142 71% 30%)" }
                  : { background: "hsl(var(--primary))", color: "white" }}>
                {p.cta}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          {[
            { q: "Can I switch plans anytime?", a: "Yes! Upgrade or downgrade at any time. Changes take effect on your next billing cycle." },
            { q: "Is there a free trial?", a: "All paid plans come with a 14-day free trial. No credit card required for the Explorer plan." },
            { q: "What payment methods do you accept?", a: "We accept all major credit/debit cards, PayPal, and bank transfers for enterprise plans." },
            { q: "Is my data secure?", a: "Yes. We use bank-grade encryption, MFA, and are GDPR compliant. Your data is never sold." },
          ].map((f, i) => (
            <div key={i} className="mb-4 p-5 rounded-2xl" style={{ background: "hsl(142 25% 97%)", border: "1px solid hsl(142 20% 90%)" }}>
              <div className="font-bold mb-2">{f.q}</div>
              <div className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>{f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
