import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { MapPin, TrendingDown, BarChart3, Award, Zap, Users, Download, Printer, ChevronLeft, ChevronRight, Share2, Star, Flame, Trophy, Leaf, Clock, Navigation } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

/* ======== DATA & CONSTANTS ======== */
const TRANSPORT_MODES = [
  { id: "car", label: "Car (Petrol)", icon: "🚗", co2PerKm: 171, calPerKm: 0, speedKmh: 50, color: "#ef4444" },
  { id: "car_ev", label: "Electric Car", icon: "🔋", co2PerKm: 53, calPerKm: 0, speedKmh: 50, color: "#f97316" },
  { id: "bus", label: "Bus", icon: "🚌", co2PerKm: 89, calPerKm: 0, speedKmh: 25, color: "#eab308" },
  { id: "train", label: "Train", icon: "🚂", co2PerKm: 41, calPerKm: 0, speedKmh: 80, color: "#3b82f6" },
  { id: "bike", label: "Cycling", icon: "🚲", co2PerKm: 0, calPerKm: 35, speedKmh: 18, color: "#22c55e" },
  { id: "ebike", label: "E-Bike", icon: "⚡", co2PerKm: 8, calPerKm: 15, speedKmh: 22, color: "#10b981" },
  { id: "walk", label: "Walking", icon: "🚶", co2PerKm: 0, calPerKm: 65, speedKmh: 5, color: "#84cc16" },
  { id: "scooter", label: "Scooter", icon: "🛵", co2PerKm: 80, calPerKm: 0, speedKmh: 30, color: "#a855f7" },
];

const CAR = TRANSPORT_MODES[0];

const LEADERBOARD = [
  { rank: 1, name: "Amara T.", score: 94, co2: 48.2, cals: 12400, streak: 21 },
  { rank: 2, name: "Liu W.", score: 91, co2: 44.1, cals: 10800, streak: 18 },
  { rank: 3, name: "Marco S.", score: 88, co2: 40.5, cals: 9600, streak: 15 },
  { rank: 4, name: "Priya N.", score: 82, co2: 35.2, cals: 8200, streak: 12 },
  { rank: 5, name: "You", score: 75, co2: 28.4, cals: 7100, streak: 7, isUser: true },
];

const ACHIEVEMENTS = [
  { id: 1, icon: "🔥", title: "First Journey", desc: "Log your first trip", unlocked: true, xp: 50 },
  { id: 2, icon: "🌱", title: "5 Journeys", desc: "Log 5 sustainable trips", unlocked: true, xp: 100 },
  { id: 3, icon: "❤️", title: "1,000 Calories", desc: "Burn 1,000 calories total", unlocked: true, xp: 150 },
  { id: 4, icon: "🏆", title: "20kg CO₂ Saved", desc: "Save 20kg CO₂ total", unlocked: false, xp: 300 },
  { id: 5, icon: "⚡", title: "Speed Racer", desc: "Complete 5 cycling journeys", unlocked: false, xp: 200 },
  { id: 6, icon: "🌍", title: "Green Champion", desc: "7-day streak", unlocked: false, xp: 500 },
];

const SERVICE_SECTIONS = ["calculator", "tracker", "comparison", "score"];

/* ======== MAIN COMPONENT ======== */
export default function Services() {
  const [activeSection, setActiveSection] = useState(0);
  const [distance, setDistance] = useState(15);
  const [selectedMode, setSelectedMode] = useState(TRANSPORT_MODES[4]); // cycling
  const [journeys, setJourneys] = useState<Array<{ mode: typeof TRANSPORT_MODES[0]; dist: number; date: string }>>([]);
  const [step, setStep] = useState(1);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const printRef = useRef<HTMLDivElement>(null);

  // Calculations
  const co2Saved = ((CAR.co2PerKm - selectedMode.co2PerKm) * distance) / 1000;
  const calories = selectedMode.calPerKm * distance;
  const travelTime = (distance / selectedMode.speedKmh) * 60;
  const trees = (co2Saved / 0.021).toFixed(1);
  const coffees = (co2Saved / 0.21).toFixed(0);

  const carCo2 = (CAR.co2PerKm * distance) / 1000;
  const modeCo2 = (selectedMode.co2PerKm * distance) / 1000;
  const sustainabilityScore = Math.min(100, Math.round(((carCo2 - modeCo2) / carCo2) * 100 + (calories > 0 ? 15 : 0)));

  const chartData = TRANSPORT_MODES.map(m => ({
    name: m.icon + " " + m.label.split(" ")[0],
    co2: +((m.co2PerKm * distance) / 1000).toFixed(2),
    fill: m.color,
  }));

  const handleLog = () => {
    setJourneys(prev => [{
      mode: selectedMode,
      dist: distance,
      date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
    }, ...prev.slice(0, 9)]);
    alert(`✅ Journey logged! You saved ${co2Saved.toFixed(2)}kg CO₂ and burned ${calories} calories!`);
  };

  const handlePrint = () => window.print();
  const handleDownload = () => {
    const data = `SUSTAINABLE VOYAGE - Journey Report\nDate: ${new Date().toLocaleString()}\nOrigin: ${origin || "Not set"}\nDestination: ${destination || "Not set"}\nDistance: ${distance} km\nTransport: ${selectedMode.label}\nCO₂ Saved: ${co2Saved.toFixed(2)} kg\nCalories Burned: ${calories} kcal\nTravel Time: ${Math.round(travelTime)} min\nSustainability Score: ${sustainabilityScore}/100`;
    const blob = new Blob([data], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "voyage-report.txt";
    a.click();
  };

  const sectionTitles = ["🧮 Journey Calculator", "📊 Output Metrics & Tracker", "📈 Comparison & Visualisation", "🏆 Score, Leaderboard & Achievements"];

  return (
    <div className="page-transition min-h-screen" style={{ background: "hsl(var(--background))" }}>
      {/* Header */}
      <div className="py-12 px-6" style={{ background: "linear-gradient(135deg, hsl(142 71% 20%), hsl(160 60% 15%))" }}>
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs mb-4" style={{ color: "hsl(142 40% 70%)" }}>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span style={{ color: "white" }}>Services</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="hero-title text-4xl md:text-5xl mb-3" style={{ color: "white" }}>Our Services</h1>
              <p className="text-lg" style={{ color: "hsl(142 40% 75%)" }}>Measure, compare, and improve your travel impact</p>
            </div>
            <div className="flex gap-2">
              <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all no-print" style={{ background: "hsl(0 0% 100% / 0.15)", color: "white", border: "1px solid hsl(0 0% 100% / 0.2)" }}>
                <Printer size={14} /> Print
              </button>
              <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all no-print" style={{ background: "hsl(0 0% 100% / 0.15)", color: "white", border: "1px solid hsl(0 0% 100% / 0.2)" }}>
                <Download size={14} /> Download PDF
              </button>
            </div>
          </div>

          {/* Section nav */}
          <div className="flex flex-wrap gap-2 mt-8 no-print">
            {sectionTitles.map((t, i) => (
              <button key={i} onClick={() => setActiveSection(i)}
                className="px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
                style={activeSection === i
                  ? { background: "hsl(142 71% 35%)", color: "white" }
                  : { background: "hsl(0 0% 100% / 0.1)", color: "hsl(142 40% 75%)", border: "1px solid hsl(0 0% 100% / 0.15)" }
                }>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Prev/Next */}
      <div className="flex items-center justify-between px-6 py-3 no-print" style={{ background: "hsl(142 25% 97%)", borderBottom: "1px solid hsl(var(--border))" }}>
        <button onClick={() => setActiveSection(Math.max(0, activeSection - 1))} disabled={activeSection === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-40"
          style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
          <ChevronLeft size={16} /> Previous
        </button>
        <span className="text-sm font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
          {activeSection + 1} / {sectionTitles.length}
        </span>
        <button onClick={() => setActiveSection(Math.min(sectionTitles.length - 1, activeSection + 1))} disabled={activeSection === sectionTitles.length - 1}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-40"
          style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}>
          Next <ChevronRight size={16} />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12" ref={printRef}>

        {/* ===== SECTION 0: JOURNEY CALCULATOR ===== */}
        {activeSection === 0 && (
          <div className="animate-fade-up">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "hsl(var(--primary))" }}>
                <MapPin size={18} style={{ color: "white" }} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Journey Input</h2>
                <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>Enter your route and select transport mode</p>
              </div>
            </div>

            {/* Multi-step form */}
            <div className="flex gap-2 mb-8">
              {[1, 2, 3].map(s => (
                <div key={s} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ background: step >= s ? "hsl(var(--primary))" : "hsl(var(--muted))", color: step >= s ? "white" : "hsl(var(--muted-foreground))" }}>
                    {s}
                  </div>
                  {s < 3 && <div className="w-12 h-0.5 rounded" style={{ background: step > s ? "hsl(var(--primary))" : "hsl(var(--muted))" }} />}
                </div>
              ))}
              <span className="text-xs ml-2 self-center" style={{ color: "hsl(var(--muted-foreground))" }}>
                {step === 1 ? "Route Details" : step === 2 ? "Transport Mode" : "Review & Log"}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form */}
              <div className="space-y-5">
                {step === 1 && (
                  <div className="card-glass p-6 space-y-4">
                    <h3 className="font-bold">Step 1: Route Details</h3>
                    <div>
                      <label className="text-sm font-medium mb-1 block">From (Origin)</label>
                      <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border" style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--card))" }}>
                        <Navigation size={14} style={{ color: "hsl(var(--primary))" }} />
                        <input value={origin} onChange={e => setOrigin(e.target.value)} placeholder="e.g. King's Cross, London"
                          className="flex-1 bg-transparent text-sm outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">To (Destination)</label>
                      <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border" style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--card))" }}>
                        <MapPin size={14} style={{ color: "hsl(var(--destructive))" }} />
                        <input value={destination} onChange={e => setDestination(e.target.value)} placeholder="e.g. Canary Wharf, London"
                          className="flex-1 bg-transparent text-sm outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Distance: <span style={{ color: "hsl(var(--primary))" }}>{distance} km</span></label>
                      <input type="range" min={1} max={200} value={distance} onChange={e => setDistance(+e.target.value)}
                        className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                        style={{ background: `linear-gradient(to right, hsl(142 71% 35%) ${distance / 2}%, hsl(142 20% 88%) ${distance / 2}%)` }} />
                      <div className="flex justify-between text-xs mt-1" style={{ color: "hsl(var(--muted-foreground))" }}>
                        <span>1 km</span><span>200 km</span>
                      </div>
                    </div>
                    <button onClick={() => setStep(2)} className="btn-primary w-full justify-center">Next: Choose Transport →</button>
                  </div>
                )}

                {step === 2 && (
                  <div className="card-glass p-6">
                    <h3 className="font-bold mb-4">Step 2: Select Transport Mode</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {TRANSPORT_MODES.map(m => (
                        <button key={m.id} onClick={() => setSelectedMode(m)}
                          className="flex items-center gap-2 p-3 rounded-xl border-2 transition-all text-sm font-medium text-left"
                          style={{
                            borderColor: selectedMode.id === m.id ? m.color : "hsl(var(--border))",
                            background: selectedMode.id === m.id ? `${m.color}15` : "hsl(var(--card))",
                            color: selectedMode.id === m.id ? m.color : "hsl(var(--foreground))"
                          }}>
                          <span className="text-xl">{m.icon}</span>
                          <div>
                            <div className="font-semibold text-xs">{m.label}</div>
                            <div className="text-xs opacity-60">{m.speedKmh} km/h</div>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button onClick={() => setStep(1)} className="btn-outline flex-1 justify-center text-xs py-2.5">← Back</button>
                      <button onClick={() => setStep(3)} className="btn-primary flex-1 justify-center text-xs py-2.5">Next: Review →</button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="card-glass p-6">
                    <h3 className="font-bold mb-4">Step 3: Review & Log Journey</h3>
                    <div className="space-y-2 text-sm mb-5">
                      <div className="flex justify-between py-2" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
                        <span style={{ color: "hsl(var(--muted-foreground))" }}>Route</span>
                        <span className="font-medium">{origin || "Origin"} → {destination || "Destination"}</span>
                      </div>
                      <div className="flex justify-between py-2" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
                        <span style={{ color: "hsl(var(--muted-foreground))" }}>Distance</span>
                        <span className="font-medium">{distance} km</span>
                      </div>
                      <div className="flex justify-between py-2" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
                        <span style={{ color: "hsl(var(--muted-foreground))" }}>Transport</span>
                        <span className="font-medium">{selectedMode.icon} {selectedMode.label}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span style={{ color: "hsl(var(--muted-foreground))" }}>Timestamp</span>
                        <span className="font-medium text-xs">{new Date().toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setStep(2)} className="btn-outline flex-1 justify-center text-xs py-2.5">← Back</button>
                      <button onClick={handleLog} className="btn-primary flex-1 justify-center text-xs py-2.5">✓ Log Journey</button>
                    </div>
                  </div>
                )}

                {/* Journey History */}
                {journeys.length > 0 && (
                  <div className="card-glass p-5">
                    <h4 className="font-bold text-sm mb-3">Recent Journeys</h4>
                    <div className="space-y-2">
                      {journeys.slice(0, 4).map((j, i) => (
                        <div key={i} className="flex items-center justify-between py-2 text-xs" style={{ borderBottom: i < 3 ? "1px solid hsl(var(--border))" : "none" }}>
                          <div className="flex items-center gap-2">
                            <span>{j.mode.icon}</span>
                            <span>{j.mode.label} • {j.dist}km</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span style={{ color: "hsl(var(--primary))" }}>-{((CAR.co2PerKm - j.mode.co2PerKm) * j.dist / 1000).toFixed(2)}kg CO₂</span>
                            <span style={{ color: "hsl(var(--muted-foreground))" }}>{j.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Live preview */}
              <div className="space-y-4">
                <div className="rounded-2xl p-6" style={{ background: "linear-gradient(135deg, hsl(142 71% 25%), hsl(160 60% 20%))", color: "white" }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-lg font-bold">{selectedMode.icon} {selectedMode.label}</div>
                    <div className="badge-eco" style={{ background: "hsl(142 71% 35% / 0.3)", color: "hsl(142 50% 80%)", borderColor: "hsl(142 50% 50% / 0.3)" }}>Live Preview</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl p-3" style={{ background: "hsl(0 0% 100% / 0.1)" }}>
                      <div className="text-xs opacity-70 mb-1">Travel Time</div>
                      <div className="text-xl font-bold">{Math.round(travelTime)} min</div>
                    </div>
                    <div className="rounded-xl p-3" style={{ background: "hsl(0 0% 100% / 0.1)" }}>
                      <div className="text-xs opacity-70 mb-1">CO₂ Saved</div>
                      <div className="text-xl font-bold">{co2Saved.toFixed(2)} kg</div>
                    </div>
                    <div className="rounded-xl p-3" style={{ background: "hsl(0 0% 100% / 0.1)" }}>
                      <div className="text-xs opacity-70 mb-1">Calories</div>
                      <div className="text-xl font-bold">{calories} kcal</div>
                    </div>
                    <div className="rounded-xl p-3" style={{ background: "hsl(0 0% 100% / 0.1)" }}>
                      <div className="text-xs opacity-70 mb-1">Trees Equiv.</div>
                      <div className="text-xl font-bold">🌳 {trees}</div>
                    </div>
                  </div>
                  {co2Saved > 0 && (
                    <div className="mt-4 rounded-xl p-3 text-sm" style={{ background: "hsl(142 60% 40% / 0.3)", border: "1px solid hsl(142 60% 50% / 0.3)" }}>
                      💡 Equivalent to {coffees} cups of coffee in CO₂!
                    </div>
                  )}
                </div>

                {/* Smart Recommendation */}
                <div className="card-glass p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "hsl(199 70% 50% / 0.15)" }}>
                      <Zap size={16} style={{ color: "hsl(199 70% 50%)" }} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm mb-1">Smart Recommendation</div>
                      {selectedMode.id === "car" || selectedMode.id === "scooter" ? (
                        <p className="text-xs leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
                          🚲 If you cycle instead of driving twice a week, you could save <strong style={{ color: "hsl(var(--primary))" }}>{(co2Saved * 8).toFixed(1)}kg CO₂ per month</strong> and burn <strong>{calories * 8} extra calories</strong>!
                        </p>
                      ) : (
                        <p className="text-xs leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
                          ✅ Great choice! You're already on a sustainable mode. Keep it up for {Math.round(travelTime)} min — you're doing brilliantly!
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== SECTION 1: OUTPUT METRICS ===== */}
        {activeSection === 1 && (
          <div className="animate-fade-up">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "hsl(199 70% 50%)" }}>
                <TrendingDown size={18} style={{ color: "white" }} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Output Metrics</h2>
                <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>Your detailed impact breakdown</p>
              </div>
            </div>

            {/* Select mode for this section too */}
            <div className="flex flex-wrap gap-2 mb-8">
              {TRANSPORT_MODES.map(m => (
                <button key={m.id} onClick={() => setSelectedMode(m)}
                  className="transport-pill" style={selectedMode.id === m.id ? { borderColor: m.color, background: `${m.color}15`, color: m.color } : {}}>
                  {m.icon} {m.label.split(" ")[0]}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="card-feature text-center">
                <div className="text-5xl mb-3">⏱️</div>
                <div className="text-3xl font-bold mb-1" style={{ color: "hsl(var(--primary))" }}>{Math.round(travelTime)} min</div>
                <div className="font-semibold mb-1">Estimated Travel Time</div>
                <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>At {selectedMode.speedKmh} km/h for {distance} km</div>
                <div className="mt-3 text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>vs 🚗 {Math.round((distance / CAR.speedKmh) * 60)} min by car</div>
              </div>

              <div className="card-feature text-center">
                <div className="text-5xl mb-3">🌿</div>
                <div className="text-3xl font-bold mb-1" style={{ color: "hsl(142 60% 40%)" }}>
                  {co2Saved > 0 ? `${co2Saved.toFixed(2)}kg` : `${modeCo2.toFixed(2)}kg`}
                </div>
                <div className="font-semibold mb-1">{co2Saved > 0 ? "CO₂ Saved" : "CO₂ Emitted"}</div>
                <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>vs driving {distance}km</div>
                <div className="mt-3 text-xs" style={{ color: "hsl(var(--primary))" }}>🌳 = {trees} trees for 1 year</div>
              </div>

              <div className="card-feature text-center">
                <div className="text-5xl mb-3">❤️</div>
                <div className="text-3xl font-bold mb-1" style={{ color: "hsl(15 80% 55%)" }}>{calories} kcal</div>
                <div className="font-semibold mb-1">Calories Burned</div>
                <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>Active movement for {distance} km</div>
                <div className="mt-3 text-xs" style={{ color: "hsl(15 80% 55%)" }}>🍕 = {(calories / 250).toFixed(1)} pizza slices burned</div>
              </div>
            </div>

            {/* Impact Summary */}
            <div className="rounded-2xl p-6 mb-6" style={{ background: "hsl(142 25% 96%)", border: "1px solid hsl(142 30% 88%)" }}>
              <h3 className="font-bold text-lg mb-4" style={{ color: "hsl(var(--primary))" }}>📊 Impact Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: "🌱", val: `${co2Saved.toFixed(2)} kg`, label: "CO₂ Avoided" },
                  { icon: "🌳", val: `${trees} trees`, label: "Year Equivalent" },
                  { icon: "☕", val: `${coffees} cups`, label: "Coffee Equivalent" },
                  { icon: "🔥", val: `${calories} kcal`, label: "Calories Active" },
                ].map((item, i) => (
                  <div key={i} className="text-center p-4 rounded-xl" style={{ background: "hsl(0 0% 100%)" }}>
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <div className="font-bold" style={{ color: "hsl(var(--primary))" }}>{item.val}</div>
                    <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress bars */}
            <div className="card-glass p-6">
              <h3 className="font-bold mb-4">Your Progress This Month</h3>
              {[
                { label: "CO₂ Saved Goal (50kg)", val: 56, max: 100 },
                { label: "Calories Burned Goal (10,000 kcal)", val: 71, max: 100 },
                { label: "Journeys Logged (20 trips)", val: 45, max: 100 },
                { label: "Sustainability Score", val: sustainabilityScore, max: 100 },
              ].map((p, i) => (
                <div key={i} className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{p.label}</span>
                    <span style={{ color: "hsl(var(--primary))" }}>{p.val}%</span>
                  </div>
                  <div className="progress-green">
                    <div className="progress-green-fill" style={{ width: `${p.val}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== SECTION 2: COMPARISON ===== */}
        {activeSection === 2 && (
          <div className="animate-fade-up">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "hsl(45 90% 55%)" }}>
                <BarChart3 size={18} style={{ color: "white" }} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Comparison & Visualisation</h2>
                <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>See how all transport modes stack up</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="text-sm font-semibold mb-2 block">Compare for: <span style={{ color: "hsl(var(--primary))" }}>{distance} km</span></label>
              <input type="range" min={1} max={200} value={distance} onChange={e => setDistance(+e.target.value)}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{ background: `linear-gradient(to right, hsl(142 71% 35%) ${distance / 2}%, hsl(142 20% 88%) ${distance / 2}%)` }} />
            </div>

            {/* Bar chart */}
            <div className="card-glass p-6 mb-6">
              <h3 className="font-bold mb-4">CO₂ Emissions by Transport Mode ({distance}km)</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} unit="kg" />
                  <Tooltip formatter={(v: number) => [`${v} kg CO₂`, "Emissions"]} contentStyle={{ borderRadius: 12, border: "1px solid hsl(142 20% 88%)" }} />
                  <Bar dataKey="co2" radius={[6, 6, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Side-by-side cards */}
            <h3 className="font-bold mb-4">Side-by-Side Comparison vs Driving</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {TRANSPORT_MODES.filter(m => m.id !== "car").map(m => {
                const saving = ((CAR.co2PerKm - m.co2PerKm) * distance) / 1000;
                const pct = Math.round(((CAR.co2PerKm - m.co2PerKm) / CAR.co2PerKm) * 100);
                return (
                  <div key={m.id} className="card-feature">
                    <div className="text-3xl mb-2">{m.icon}</div>
                    <div className="font-bold text-sm mb-3">{m.label}</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span style={{ color: "hsl(var(--muted-foreground))" }}>CO₂ Saved</span>
                        <span className="font-semibold" style={{ color: saving > 0 ? "hsl(var(--primary))" : "hsl(var(--destructive))" }}>
                          {saving > 0 ? `-${saving.toFixed(2)}kg` : `+${Math.abs(saving).toFixed(2)}kg`}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span style={{ color: "hsl(var(--muted-foreground))" }}>vs Driving</span>
                        <span className="font-semibold" style={{ color: pct > 0 ? "hsl(var(--primary))" : "hsl(var(--destructive))" }}>
                          {pct > 0 ? `${pct}% less` : `${Math.abs(pct)}% more`}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span style={{ color: "hsl(var(--muted-foreground))" }}>Travel Time</span>
                        <span className="font-semibold">{Math.round((distance / m.speedKmh) * 60)} min</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span style={{ color: "hsl(var(--muted-foreground))" }}>Calories</span>
                        <span className="font-semibold" style={{ color: "hsl(15 80% 55%)" }}>{m.calPerKm * distance} kcal</span>
                      </div>
                    </div>
                    <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: "hsl(var(--muted))" }}>
                      <div className="h-full rounded-full" style={{ width: `${Math.max(5, 100 - Math.round((m.co2PerKm / CAR.co2PerKm) * 100))}%`, background: m.color }} />
                    </div>
                    <div className="text-center mt-1 text-xs font-semibold" style={{ color: m.color }}>
                      {pct > 0 ? `${pct}% greener` : "Higher emissions"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===== SECTION 3: SCORE, LEADERBOARD & ACHIEVEMENTS ===== */}
        {activeSection === 3 && (
          <div className="animate-fade-up">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "hsl(45 90% 55%)" }}>
                <Award size={18} style={{ color: "white" }} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Score, Leaderboard & Achievements</h2>
                <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>Track your sustainability milestones</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Score */}
              <div>
                <h3 className="font-bold mb-4">Your Sustainability Score</h3>
                <div className="card-glass p-6 text-center mb-4">
                  <div className="relative inline-flex items-center justify-center w-32 h-32 mb-4">
                    <svg width="128" height="128" className="-rotate-90">
                      <circle cx="64" cy="64" r="54" fill="none" strokeWidth="12" stroke="hsl(142 20% 88%)" />
                      <circle cx="64" cy="64" r="54" fill="none" strokeWidth="12"
                        stroke="hsl(142 71% 35%)"
                        strokeDasharray={`${(sustainabilityScore / 100) * 339} 339`}
                        strokeLinecap="round" />
                    </svg>
                    <div className="absolute text-center">
                      <div className="text-3xl font-bold" style={{ color: "hsl(var(--primary))" }}>{sustainabilityScore}</div>
                      <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>/ 100</div>
                    </div>
                  </div>
                  <div className="font-bold text-lg mb-1">{sustainabilityScore > 80 ? "🌟 Eco Champion" : sustainabilityScore > 50 ? "🌱 Green Traveller" : "🚗 Getting Started"}</div>
                  <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>Based on CO₂ saved, mode choice & frequency</div>
                </div>

                {/* Streaks */}
                <div className="card-glass p-5">
                  <h4 className="font-bold mb-3 flex items-center gap-2"><Flame size={16} style={{ color: "hsl(15 80% 55%)" }} /> Streak System</h4>
                  <div className="space-y-2">
                    {[
                      { label: "3-Day Sustainable Streak", done: true, icon: "🔥" },
                      { label: "7-Day Low-Carbon Commuter", done: true, icon: "⚡" },
                      { label: "30-Day Green Habit", done: false, icon: "🌿" },
                    ].map((s, i) => (
                      <div key={i} className="flex items-center gap-3 p-2 rounded-xl" style={{ background: s.done ? "hsl(142 25% 96%)" : "hsl(var(--muted))" }}>
                        <span>{s.icon}</span>
                        <span className="text-sm flex-1">{s.label}</span>
                        {s.done ? <span className="text-xs font-bold" style={{ color: "hsl(var(--primary))" }}>✓ Done</span>
                          : <span className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>Locked</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Leaderboard */}
              <div>
                <h3 className="font-bold mb-4">🏆 Leaderboard</h3>
                <div className="card-glass p-5">
                  <div className="flex gap-2 mb-4">
                    {["CO₂ Saved", "Calories", "Score"].map((t, i) => (
                      <button key={i} className="text-xs px-3 py-1 rounded-lg font-medium transition-all"
                        style={{ background: i === 0 ? "hsl(var(--primary))" : "hsl(var(--muted))", color: i === 0 ? "white" : "hsl(var(--muted-foreground))" }}>
                        {t}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {LEADERBOARD.map(p => (
                      <div key={p.rank} className={`leaderboard-row ${p.rank === 1 ? "gold" : p.rank === 2 ? "silver" : p.rank === 3 ? "bronze" : ""}`}
                        style={p.isUser ? { background: "hsl(142 50% 96%)", border: "2px solid hsl(var(--primary))" } : {}}>
                        <div className="w-6 text-center font-bold text-sm">
                          {p.rank === 1 ? "🥇" : p.rank === 2 ? "🥈" : p.rank === 3 ? "🥉" : p.rank}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold">{p.name} {p.isUser && <span className="text-xs" style={{ color: "hsl(var(--primary))" }}>(You)</span>}</div>
                          <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>🔥 {p.streak} day streak</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-sm" style={{ color: "hsl(var(--primary))" }}>{p.co2}kg</div>
                          <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>CO₂ saved</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="font-bold mb-4">🏅 Achievements</h3>
                <div className="grid grid-cols-2 gap-3">
                  {ACHIEVEMENTS.map(a => (
                    <div key={a.id} className={`rounded-2xl p-4 text-center transition-all duration-300 ${a.unlocked ? "" : "opacity-50"}`}
                      style={{
                        background: a.unlocked ? "linear-gradient(135deg, hsl(45 90% 55%), hsl(35 90% 50%))" : "hsl(var(--muted))",
                        color: a.unlocked ? "white" : "hsl(var(--muted-foreground))"
                      }}>
                      <div className="text-3xl mb-1">{a.icon}</div>
                      <div className="font-bold text-xs mb-0.5">{a.title}</div>
                      <div className="text-xs opacity-75">{a.desc}</div>
                      {a.unlocked && <div className="mt-2 text-xs font-bold">+{a.xp} XP ✓</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div className="flex items-center justify-between px-6 py-4 no-print" style={{ background: "hsl(142 25% 97%)", borderTop: "1px solid hsl(var(--border))" }}>
        <Link to="/" className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary" style={{ color: "hsl(var(--muted-foreground))" }}>
          <ChevronLeft size={16} /> Back to Home
        </Link>
        <button onClick={() => setActiveSection(Math.min(sectionTitles.length - 1, activeSection + 1))} disabled={activeSection === sectionTitles.length - 1}
          className="flex items-center gap-2 text-sm font-medium disabled:opacity-40" style={{ color: "hsl(var(--primary))" }}>
          Next Section <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
