import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Zap, TrendingDown, Heart, Award, Users, MapPin, ChevronDown, Play } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import aboutTeam from "@/assets/about-team.jpg";
import cyclingImg from "@/assets/cycling.jpg";
import LiveClock from "@/components/LiveClock";

const stats = [
  { value: "2.4M+", label: "Journeys Tracked" },
  { value: "12,400t", label: "CO₂ Saved" },
  { value: "180M", label: "Calories Burned" },
  { value: "95K+", label: "Active Voyagers" },
];

const features = [
  { icon: MapPin, title: "Journey Input", desc: "Enter your distance or route. Choose from walking, cycling, bus, train, e-bike, and more.", color: "hsl(142 71% 35%)", href: "/services" },
  { icon: TrendingDown, title: "CO₂ Calculator", desc: "Real-time CO₂ emissions compared to driving. See impact in trees, cups of coffee, and more.", color: "hsl(199 70% 50%)", href: "/services" },
  { icon: Heart, title: "Calories Burned", desc: "Track health impact alongside environmental impact. Your journey, your health story.", color: "hsl(15 80% 55%)", href: "/services" },
  { icon: Award, title: "Achievements", desc: "Earn badges, climb leaderboards, and build streaks. Sustainability is now a game you can win.", color: "hsl(45 90% 55%)", href: "/services" },
  { icon: Zap, title: "Smart Insights", desc: "AI-powered recommendations tailored to your habits. Know exactly how to improve your score.", color: "hsl(270 60% 60%)", href: "/services" },
  { icon: Users, title: "Community", desc: "Compare with friends, join challenges, and celebrate collective wins for the planet.", color: "hsl(87 50% 50%)", href: "/services" },
];

const testimonials = [
  { name: "Sarah K.", role: "Daily Commuter", text: "I never knew my cycling commute saved so much CO₂. Sustainable Voyage made it real and rewarding.", avatar: "SK", stars: 5 },
  { name: "James O.", role: "Urban Planner", text: "We use this tool city-wide to nudge residents toward greener transport. The data is brilliant.", avatar: "JO", stars: 5 },
  { name: "Priya M.", role: "Sustainability Lead", text: "Our team's sustainability score jumped 40% in just 2 months. The streak system is addictive!", avatar: "PM", stars: 5 },
];

const transportModes = [
  { icon: "🚗", label: "Car", co2: 171, calories: 0 },
  { icon: "🚌", label: "Bus", co2: 89, calories: 0 },
  { icon: "🚂", label: "Train", co2: 41, calories: 0 },
  { icon: "🚲", label: "Cycling", co2: 0, calories: 35 },
  { icon: "🚶", label: "Walking", co2: 0, calories: 65 },
];

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 20);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <div ref={ref} className="stat-number text-4xl md:text-5xl">{count.toLocaleString()}{suffix}</div>;
}

export default function Index() {
  const [activeTransport, setActiveTransport] = useState(3); // cycling
  const [distance, setDistance] = useState(10);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bgOpacity = Math.min(scrollY / 500, 0.6);
  const selected = transportModes[activeTransport];
  const co2Saved = ((171 - selected.co2) * distance) / 1000;
  const cals = selected.calories * distance;
  const trees = (co2Saved / 0.021).toFixed(0);

  return (
    <div className="page-transition">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 transition-all duration-100" style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: `center ${scrollY * 0.3}px`,
        }} />
        <div className="hero-overlay absolute inset-0" style={{ opacity: 0.88 + bgOpacity * 0.1 }} />

        {/* Floating elements */}
        <div className="absolute top-24 right-12 animate-float hidden lg:block">
          <div className="card-glass rounded-2xl px-4 py-3 text-sm font-semibold shadow-lg" style={{ color: "hsl(142 71% 30%)" }}>
            🌱 You saved 2.4kg CO₂ today!
          </div>
        </div>
        <div className="absolute bottom-32 right-20 animate-float hidden lg:block" style={{ animationDelay: "1s" }}>
          <div className="card-glass rounded-2xl px-4 py-3 text-sm shadow-lg">
            🏆 #3 Top CO₂ Saver this week
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="badge-eco mb-6 inline-flex" style={{ background: "hsl(142 71% 35% / 0.2)", color: "hsl(142 60% 75%)", borderColor: "hsl(142 60% 50% / 0.3)" }}>
              <Leaf size={12} />
              <span>Impact-Driven Travel Platform</span>
            </div>
            <h1 className="hero-title text-5xl md:text-7xl mb-6 leading-tight" style={{ color: "white" }}>
              Every Journey.<br />
              <span style={{ color: "hsl(142 60% 65%)" }}>Every Choice.</span><br />
              Measurable Impact.
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl leading-relaxed" style={{ color: "hsl(0 0% 90%)" }}>
              Compare transport modes, track your CO₂ savings, calories burned, and sustainability score—in real time. Make sustainability visible.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/services" className="btn-hero">
                Calculate Your Journey <ArrowRight size={18} />
              </Link>
              <Link to="/about" className="btn-hero-outline">
                <Play size={18} /> Watch How It Works
              </Link>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-6 mt-12">
              {stats.map(s => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-bold" style={{ color: "hsl(142 60% 65%)" }}>{s.value}</div>
                  <div className="text-xs" style={{ color: "hsl(0 0% 70%)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <a href="#features" className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator flex flex-col items-center gap-1" style={{ color: "hsl(0 0% 80%)" }}>
          <span className="text-xs">Scroll to explore</span>
          <ChevronDown size={20} />
        </a>
      </section>

      {/* LIVE STATS TICKER */}
      <div className="py-3 overflow-hidden" style={{ background: "hsl(142 71% 35%)", color: "white" }}>
        <div className="flex gap-12 animate-[marquee_20s_linear_infinite] whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-12 shrink-0">
              <span className="text-sm font-medium">🌍 95,432 Voyagers active</span>
              <span className="text-sm font-medium">🚲 12,400 tonnes CO₂ saved</span>
              <span className="text-sm font-medium">🏆 New leaderboard updated</span>
              <span className="text-sm font-medium">🌱 4.2M trees equivalent saved</span>
              <span className="text-sm font-medium">❤️ 180M calories burned</span>
            </div>
          ))}
        </div>
      </div>

      {/* QUICK CALCULATOR PREVIEW */}
      <section id="features" className="py-20" style={{ background: "hsl(142 25% 97%)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="badge-eco mx-auto mb-4">⚡ Try It Now</div>
            <h2 className="section-title mb-3">See Your Impact <span style={{ color: "hsl(var(--primary))" }}>Instantly</span></h2>
            <p className="section-subtitle max-w-xl mx-auto">Pick a transport mode and distance — watch your impact come alive in seconds.</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="card-glass p-8">
              {/* Distance slider */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2" style={{ color: "hsl(var(--foreground))" }}>
                  Distance: <span style={{ color: "hsl(var(--primary))" }}>{distance} km</span>
                </label>
                <input type="range" min={1} max={100} value={distance} onChange={e => setDistance(+e.target.value)}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{ background: `linear-gradient(to right, hsl(142 71% 35%) ${distance}%, hsl(142 20% 88%) ${distance}%)` }}
                />
                <div className="flex justify-between text-xs mt-1" style={{ color: "hsl(var(--muted-foreground))" }}>
                  <span>1 km</span><span>100 km</span>
                </div>
              </div>

              {/* Transport mode */}
              <div className="flex flex-wrap gap-2 mb-8">
                {transportModes.map((t, i) => (
                  <button key={i} onClick={() => setActiveTransport(i)}
                    className={`transport-pill ${activeTransport === i ? "active" : ""}`}>
                    <span>{t.icon}</span><span>{t.label}</span>
                  </button>
                ))}
              </div>

              {/* Results */}
              <div className="grid grid-cols-3 gap-4">
                <div className="metric-card">
                  <div className="text-2xl font-bold mb-1">{co2Saved.toFixed(2)} kg</div>
                  <div className="text-xs opacity-80">CO₂ Saved vs Driving</div>
                </div>
                <div className="rounded-2xl p-5 text-center" style={{ background: "hsl(45 90% 55%)", color: "white" }}>
                  <div className="text-2xl font-bold mb-1">🌳 {trees}</div>
                  <div className="text-xs opacity-80">Trees Equivalent</div>
                </div>
                <div className="rounded-2xl p-5 text-center" style={{ background: "hsl(15 80% 55%)", color: "white" }}>
                  <div className="text-2xl font-bold mb-1">{cals} kcal</div>
                  <div className="text-xs opacity-80">Calories Burned</div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <Link to="/services" className="btn-primary">
                  Full Journey Analysis <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="section-title mb-3">Everything You Need to <span style={{ color: "hsl(var(--primary))" }}>Travel Greener</span></h2>
            <p className="section-subtitle max-w-xl mx-auto">Powerful tools that make sustainability tangible, measurable, and rewarding.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <Link to={f.href} key={i} className="card-feature group" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110" style={{ background: `${f.color}20` }}>
                  <f.icon size={22} style={{ color: f.color }} />
                </div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>{f.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium" style={{ color: "hsl(var(--primary))" }}>
                  Explore <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT NUMBERS */}
      <section className="py-20" style={{ background: "hsl(var(--primary))" }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "white" }}>Our Collective Impact</h2>
          <p className="text-lg mb-12" style={{ color: "hsl(142 40% 80%)" }}>Every journey logged contributes to a measurable global change</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { n: 2400000, s: "+", l: "Journeys Tracked" },
              { n: 12400, s: "t", l: "CO₂ Saved" },
              { n: 180, s: "M kcal", l: "Calories Burned" },
              { n: 95000, s: "+", l: "Active Voyagers" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <AnimatedCounter target={s.n} suffix={s.s} />
                <div className="text-sm mt-2" style={{ color: "hsl(142 40% 80%)" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-left">
              <div className="badge-eco mb-4">About Our Mission</div>
              <h2 className="section-title mb-4">Sustainability Needs to Be <span style={{ color: "hsl(var(--primary))" }}>Seen to Be Believed</span></h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>
                CO₂ is invisible. Health impact is abstract. Travel decisions happen every day, but sustainability is rarely visible when people need it most — at the point of choice.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: "hsl(var(--muted-foreground))" }}>
                Sustainable Voyage bridges that gap. We make the invisible visible, the abstract concrete, and the inconvenient… rewarding.
              </p>
              <Link to="/about" className="btn-primary">Our Story <ArrowRight size={16} /></Link>
            </div>
            <div className="relative animate-slide-right">
              <img src={aboutTeam} alt="Our team" className="rounded-3xl shadow-2xl w-full object-cover" style={{ height: 380 }} />
              <div className="absolute -bottom-4 -left-4 card-glass rounded-2xl px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg">🏆</div>
                  <div>
                    <div className="font-bold text-sm">B Corp Certified</div>
                    <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>Climate positive company</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20" style={{ background: "hsl(142 25% 97%)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="section-title mb-3">What <span style={{ color: "hsl(var(--primary))" }}>Voyagers</span> Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="card-feature">
                <div className="flex mb-3">
                  {[...Array(t.stars)].map((_, j) => <span key={j} style={{ color: "hsl(45 90% 55%)" }}>★</span>)}
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "hsl(var(--primary))", color: "white" }}>{t.avatar}</div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGE FEATURE STRIP */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={cyclingImg} alt="Cycling" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "hsl(142 71% 20% / 0.88)" }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="hero-title text-4xl md:text-5xl mb-6" style={{ color: "white" }}>
            Ready to Make Your Journey Count?
          </h2>
          <p className="text-xl mb-8" style={{ color: "hsl(142 40% 80%)" }}>
            Join 95,000+ voyagers tracking their impact. Your first journey calculation is free.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/services" className="btn-hero">Start Calculating <ArrowRight size={18} /></Link>
            <Link to="/subscription" className="btn-hero-outline">View Plans</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
