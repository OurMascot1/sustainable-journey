import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Mail, Phone, MapPin, MessageSquare, Send, Clock } from "lucide-react";
import LiveClock from "@/components/LiveClock";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", type: "general" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", subject: "", message: "", type: "general" });
  };

  return (
    <div className="page-transition">
      <div className="py-16 px-6" style={{ background: "linear-gradient(135deg, hsl(142 71% 20%), hsl(160 60% 15%))" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs mb-4" style={{ color: "hsl(142 40% 70%)" }}>
            <Link to="/" className="hover:text-white">Home</Link> <span>/</span> <span style={{ color: "white" }}>Contact Us</span>
          </div>
          <h1 className="hero-title text-4xl md:text-5xl mb-3" style={{ color: "white" }}>Get in Touch</h1>
          <p className="text-lg" style={{ color: "hsl(142 40% 75%)" }}>We'd love to hear from you</p>
        </div>
      </div>

      <div className="flex items-center justify-between px-6 py-3" style={{ background: "hsl(142 25% 97%)", borderBottom: "1px solid hsl(var(--border))" }}>
        <Link to="/trainings" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium" style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
          <ChevronLeft size={16} /> Trainings
        </Link>
        <Link to="/" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium" style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
          Home <ChevronRight size={16} />
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Info */}
          <div>
            <h2 className="text-xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-4 mb-8">
              {[
                { icon: Mail, label: "Email", value: "hello@sustainablevoyage.com" },
                { icon: Phone, label: "Phone", value: "+1 (555) 0-VOYAGE" },
                { icon: MapPin, label: "Address", value: "Green Innovation Hub, 42 Eco Street, London EC1A 1BB, UK" },
                { icon: Clock, label: "Hours", value: "Mon–Fri: 9am–6pm GMT" },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "hsl(var(--primary) / 0.1)" }}>
                    <c.icon size={16} style={{ color: "hsl(var(--primary))" }} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold mb-0.5" style={{ color: "hsl(var(--primary))" }}>{c.label}</div>
                    <div className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>{c.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl p-5" style={{ background: "hsl(142 25% 96%)", border: "1px solid hsl(142 30% 88%)" }}>
              <div className="font-bold mb-2">🤖 AI Assistant</div>
              <p className="text-sm mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>Get instant answers from our virtual assistant.</p>
              <button className="btn-primary text-xs py-2 px-4">Open Chat</button>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {sent && (
              <div className="mb-6 rounded-2xl p-4 flex items-center gap-3 animate-fade-up" style={{ background: "hsl(142 50% 95%)", border: "1px solid hsl(142 50% 80%)" }}>
                <span className="text-2xl">✅</span>
                <div>
                  <div className="font-bold">Message sent!</div>
                  <div className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>We'll get back to you within 24 hours. Check your email for a confirmation.</div>
                </div>
              </div>
            )}
            <div className="card-glass p-8">
              <h2 className="text-xl font-bold mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-3">
                  {["general", "support", "partnership", "media"].map(t => (
                    <button key={t} type="button" onClick={() => setForm(f => ({ ...f, type: t }))}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize"
                      style={form.type === t ? { background: "hsl(var(--primary))", color: "white" } : { background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}>
                      {t}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Full Name *</label>
                    <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Your name" className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                      style={{ border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Email Address *</label>
                    <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="you@example.com" className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                      style={{ border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Subject *</label>
                  <input required value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    placeholder="How can we help?" className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                    style={{ border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Message *</label>
                  <textarea required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Tell us more…" rows={5} className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none"
                    style={{ border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }} />
                </div>
                <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                  Submitted: <LiveClock dark showDate />
                </div>
                <button type="submit" className="btn-primary w-full justify-center">
                  <Send size={16} /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
