import { Link } from "react-router-dom";
import { Leaf, Twitter, Linkedin, Instagram, Facebook, Youtube, Mail, Phone, MapPin, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer style={{ background: "hsl(160 30% 10%)", color: "hsl(142 10% 85%)" }} className="relative">
      {/* Scroll to top */}
      <button onClick={scrollTop} className="absolute -top-5 right-8 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{ background: "hsl(var(--primary))", color: "white" }}>
        <ArrowUp size={18} />
      </button>

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "hsl(var(--primary))" }}>
                <Leaf size={20} style={{ color: "white" }} />
              </div>
              <div>
                <div className="font-bold text-sm leading-tight" style={{ color: "hsl(var(--primary))" }}>SUSTAINABLE</div>
                <div className="font-bold text-sm leading-tight tracking-widest" style={{ color: "hsl(142 50% 60%)" }}>VOYAGE</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5 max-w-xs" style={{ color: "hsl(142 10% 65%)" }}>
              Making sustainability visible, measurable, and rewarding—one journey at a time. Join millions choosing a greener path.
            </p>
            <div className="flex gap-3">
              {[Twitter, Linkedin, Instagram, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ background: "hsl(142 30% 18%)", color: "hsl(var(--primary))" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "hsl(var(--primary))")}
                  onMouseLeave={e => (e.currentTarget.style.background = "hsl(142 30% 18%)")}
                >
                  <Icon size={14} style={{ color: "hsl(142 10% 90%)" }} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm mb-4" style={{ color: "hsl(var(--primary))" }}>PLATFORM</h4>
            <ul className="space-y-2.5 text-sm">
              {["Home", "Services", "About Us", "Subscription"].map(l => (
                <li key={l}><Link to={l === "Home" ? "/" : `/${l.toLowerCase().replace(" ", "-").replace(" ", "")}`} className="hover:text-primary transition-colors" style={{ color: "hsl(142 10% 65%)" }}>{l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-4" style={{ color: "hsl(var(--primary))" }}>RESOURCES</h4>
            <ul className="space-y-2.5 text-sm">
              {["Trainings & Resources", "Clients", "Partners", "Contact Us"].map(l => (
                <li key={l}><Link to={`/${l.toLowerCase().replace(/[& ]+/g, "-")}`} className="hover:text-primary transition-colors" style={{ color: "hsl(142 10% 65%)" }}>{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm mb-4" style={{ color: "hsl(var(--primary))" }}>CONTACT</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2" style={{ color: "hsl(142 10% 65%)" }}>
                <Mail size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--primary))" }} />
                <span>hello@sustainablevoyage.com</span>
              </li>
              <li className="flex items-start gap-2" style={{ color: "hsl(142 10% 65%)" }}>
                <Phone size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--primary))" }} />
                <span>+1 (555) 0-VOYAGE</span>
              </li>
              <li className="flex items-start gap-2" style={{ color: "hsl(142 10% 65%)" }}>
                <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--primary))" }} />
                <span>Green Innovation Hub, London, UK</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="rounded-2xl p-6 mb-8" style={{ background: "hsl(142 30% 15%)", border: "1px solid hsl(142 30% 22%)" }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-bold mb-1">🌱 Stay updated on sustainable travel</div>
              <div className="text-sm" style={{ color: "hsl(142 10% 65%)" }}>Weekly insights, tips, and your impact report</div>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input placeholder="Your email address" className="flex-1 md:w-64 px-4 py-2.5 rounded-xl text-sm outline-none" style={{ background: "hsl(142 20% 20%)", border: "1px solid hsl(142 25% 28%)", color: "hsl(142 10% 90%)" }} />
              <button className="btn-primary whitespace-nowrap text-xs px-4 py-2.5">Subscribe</button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6" style={{ borderTop: "1px solid hsl(142 20% 18%)" }}>
          <span className="text-xs" style={{ color: "hsl(142 10% 50%)" }}>© 2025 Sustainable Voyage. All rights reserved.</span>
          <div className="flex gap-4 text-xs" style={{ color: "hsl(142 10% 50%)" }}>
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
