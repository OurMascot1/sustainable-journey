import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Leaf, ChevronDown, Search, Bell, Globe, User } from "lucide-react";
import LiveClock from "./LiveClock";

const navItems = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    dropdown: [
      { label: "Journey Calculator", href: "/services#calculator" },
      { label: "CO₂ Tracker", href: "/services#tracker" },
      { label: "Comparison Tool", href: "/services#comparison" },
      { label: "Sustainability Score", href: "/services#score" },
    ],
  },
  { label: "About Us", href: "/about" },
  { label: "Clients", href: "/clients" },
  { label: "Partners", href: "/partners" },
  { label: "Subscription", href: "/subscription" },
  { label: "Trainings & Resources", href: "/trainings" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); setActiveDropdown(null); }, [location]);

  return (
    <>
      {/* Top bar */}
      <div className="hidden md:flex items-center justify-between px-6 py-1.5 text-xs border-b" style={{ background: "hsl(142 71% 35%)", color: "white", borderColor: "hsl(142 60% 30%)" }}>
        <div className="flex items-center gap-4">
          <Globe size={12} />
          <span>Making every journey count for the planet 🌍</span>
        </div>
        <div className="flex items-center gap-4">
          <LiveClock />
          <span>|</span>
          <span>🌱 Carbon neutral platform</span>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "shadow-lg backdrop-blur-lg" : ""
        }`}
        style={{
          background: scrolled ? "hsl(0 0% 100% / 0.97)" : "hsl(0 0% 100%)",
          borderBottom: "1px solid hsl(142 20% 90%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ background: "hsl(142 71% 35%)" }}>
                <Leaf size={18} style={{ color: "white" }} />
              </div>
              <div>
                <div className="font-bold text-sm leading-tight" style={{ color: "hsl(142 71% 30%)" }}>SUSTAINABLE</div>
                <div className="font-bold text-sm leading-tight tracking-widest" style={{ color: "hsl(142 71% 35%)" }}>VOYAGE</div>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      location.pathname === item.href
                        ? "text-primary bg-secondary"
                        : "text-foreground hover:text-primary hover:bg-secondary"
                    }`}
                  >
                    {item.label}
                    {item.dropdown && <ChevronDown size={13} className={`transition-transform ${activeDropdown === item.label ? "rotate-180" : ""}`} />}
                  </Link>
                  {item.dropdown && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 w-52 rounded-xl shadow-lg overflow-hidden animate-fade-up z-50" style={{ background: "hsl(0 0% 100%)", border: "1px solid hsl(142 20% 88%)" }}>
                      {item.dropdown.map((sub) => (
                        <Link key={sub.label} to={sub.href} className="block px-4 py-2.5 text-sm hover:text-primary transition-colors" style={{ color: "hsl(160 20% 20%)" }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(142 25% 96%)")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right actions */}
            <div className="hidden lg:flex items-center gap-2">
              <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 rounded-lg transition-colors hover:text-primary" style={{ color: "hsl(160 15% 40%)" }}>
                <Search size={18} />
              </button>
              <button className="p-2 rounded-lg transition-colors hover:text-primary relative" style={{ color: "hsl(160 15% 40%)" }}>
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: "hsl(var(--primary))" }}></span>
              </button>
              <Link to="/subscription" className="btn-primary text-xs px-4 py-2">Get Started</Link>
              <Link to="/services" className="p-2 rounded-lg transition-colors hover:text-primary" style={{ color: "hsl(160 15% 40%)" }}>
                <User size={18} />
              </Link>
            </div>

            {/* Mobile toggle */}
            <button className="lg:hidden p-2 rounded-lg transition-all duration-300" onClick={() => setIsOpen(!isOpen)} style={{ color: "hsl(var(--primary))" }}>
              {isOpen ? <X size={22} className="animate-scale-in" /> : <Menu size={22} />}
            </button>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="pb-3 animate-fade-up">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl border" style={{ borderColor: "hsl(var(--primary) / 0.3)", background: "hsl(142 25% 97%)" }}>
                <Search size={16} style={{ color: "hsl(var(--primary))" }} />
                <input autoFocus placeholder="Search routes, tips, resources…" className="flex-1 bg-transparent text-sm outline-none" style={{ color: "hsl(var(--foreground))" }} />
              </div>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden border-t animate-fade-up" style={{ background: "hsl(0 0% 100%)", borderColor: "hsl(var(--border))" }}>
            <div className="px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link to={item.href} className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors"
                    style={{ color: location.pathname === item.href ? "hsl(var(--primary))" : "hsl(var(--foreground))" }}
                    onClick={() => !item.dropdown && setIsOpen(false)}
                  >
                    {item.label}
                    {item.dropdown && <ChevronDown size={14} />}
                  </Link>
                  {item.dropdown && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.dropdown.map((sub) => (
                        <Link key={sub.label} to={sub.href} className="block px-3 py-2 text-xs rounded-lg" style={{ color: "hsl(var(--muted-foreground))" }} onClick={() => setIsOpen(false)}>
                          → {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-2 pb-1 flex gap-2">
                <Link to="/subscription" className="btn-primary flex-1 text-center text-xs py-2.5" onClick={() => setIsOpen(false)}>Get Started</Link>
                <Link to="/services" className="btn-outline flex-1 text-center text-xs py-2.5" onClick={() => setIsOpen(false)}>Calculate Trip</Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
