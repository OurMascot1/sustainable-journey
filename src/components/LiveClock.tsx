import { useState, useEffect } from "react";

interface LiveClockProps {
  className?: string;
  showDate?: boolean;
  dark?: boolean;
}

export default function LiveClock({ className = "", showDate = true, dark = false }: LiveClockProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const timeStr = `${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}`;
  const dateStr = time.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });

  return (
    <span className={`live-clock inline-flex items-center gap-2 text-xs ${className}`} style={{ color: dark ? "hsl(var(--muted-foreground))" : "inherit" }}>
      {showDate && <span>{dateStr}</span>}
      <span className="font-bold">{timeStr}</span>
    </span>
  );
}
