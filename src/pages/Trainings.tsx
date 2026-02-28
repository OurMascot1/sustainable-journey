import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, BookOpen, Video, FileText, Award, Download, Star } from "lucide-react";

const resources = [
  { type: "Course", icon: "🎓", title: "Sustainable Urban Mobility Fundamentals", level: "Beginner", duration: "4h 30min", rating: 4.9, enrolled: 2840 },
  { type: "Workshop", icon: "🔬", title: "Carbon Accounting for Travel Managers", level: "Intermediate", duration: "2h", rating: 4.8, enrolled: 1230 },
  { type: "Guide", icon: "📖", title: "The Green Commuter Handbook 2025", level: "All Levels", duration: "45min read", rating: 4.7, enrolled: 5600 },
  { type: "Webinar", icon: "🎥", title: "Behaviour Change in Transport Policy", level: "Advanced", duration: "1h 20min", rating: 4.9, enrolled: 890 },
  { type: "Toolkit", icon: "🛠️", title: "Corporate Fleet Sustainability Toolkit", level: "Intermediate", duration: "Self-paced", rating: 4.6, enrolled: 650 },
  { type: "Certification", icon: "🏅", title: "Certified Sustainable Voyage Navigator", level: "Advanced", duration: "8h program", rating: 5.0, enrolled: 320 },
];

const categories = ["All", "Courses", "Workshops", "Guides", "Webinars", "Certifications"];

export default function Trainings() {
  return (
    <div className="page-transition">
      <div className="py-16 px-6" style={{ background: "linear-gradient(135deg, hsl(142 71% 20%), hsl(160 60% 15%))" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs mb-4" style={{ color: "hsl(142 40% 70%)" }}>
            <Link to="/" className="hover:text-white">Home</Link> <span>/</span> <span style={{ color: "white" }}>Trainings & Resources</span>
          </div>
          <h1 className="hero-title text-4xl md:text-5xl mb-3" style={{ color: "white" }}>Trainings & Resources</h1>
          <p className="text-lg" style={{ color: "hsl(142 40% 75%)" }}>Learn, grow, and certify your sustainability knowledge</p>
        </div>
      </div>

      <div className="flex items-center justify-between px-6 py-3" style={{ background: "hsl(142 25% 97%)", borderBottom: "1px solid hsl(var(--border))" }}>
        <Link to="/subscription" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium" style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
          <ChevronLeft size={16} /> Subscription
        </Link>
        <Link to="/contact" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium" style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
          Contact Us <ChevronRight size={16} />
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: "🎓", val: "24", label: "Courses & Workshops" },
            { icon: "👥", val: "11,540", label: "Learners Enrolled" },
            { icon: "📜", val: "3,200+", label: "Certificates Issued" },
            { icon: "⭐", val: "4.8/5", label: "Average Rating" },
          ].map((s, i) => (
            <div key={i} className="card-feature text-center">
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="stat-number text-xl mb-1">{s.val}</div>
              <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((c, i) => (
            <button key={i} className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
              style={i === 0 ? { background: "hsl(var(--primary))", color: "white" } : { background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}>
              {c}
            </button>
          ))}
        </div>

        {/* Resources grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((r, i) => (
            <div key={i} className="card-feature group">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-2xl">{r.icon}</span>
                  <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "hsl(var(--primary) / 0.1)", color: "hsl(var(--primary))" }}>{r.type}</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: r.level === "Beginner" ? "hsl(142 50% 93%)" : r.level === "Advanced" ? "hsl(0 60% 93%)" : "hsl(45 90% 93%)",
                    color: r.level === "Beginner" ? "hsl(142 60% 30%)" : r.level === "Advanced" ? "hsl(0 60% 40%)" : "hsl(45 60% 30%)" }}>
                  {r.level}
                </span>
              </div>
              <h3 className="font-bold text-base mb-2 leading-snug">{r.title}</h3>
              <div className="flex items-center gap-4 text-xs mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>
                <span>⏱️ {r.duration}</span>
                <span>👥 {r.enrolled.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={12} fill={j < Math.floor(r.rating) ? "hsl(45 90% 55%)" : "none"} style={{ color: "hsl(45 90% 55%)" }} />
                ))}
                <span className="text-xs ml-1 font-semibold">{r.rating}</span>
              </div>
              <div className="flex gap-2">
                <button className="btn-primary flex-1 justify-center text-xs py-2">Enroll</button>
                <button className="btn-outline text-xs px-3 py-2">
                  <Download size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
