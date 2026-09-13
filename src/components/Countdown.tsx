import { useEffect, useState } from "react";
import { DROP_DATE } from "@/lib/drop";

const pad = (n: number) => String(n).padStart(2, "0");

function diff() {
  const ms = Math.max(0, DROP_DATE.getTime() - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms % 86400000) / 3600000),
    minutes: Math.floor((ms % 3600000) / 60000),
    seconds: Math.floor((ms % 60000) / 1000),
    done: ms === 0,
  };
}

export const Countdown = ({ className = "" }: { className?: string }) => {
  const [time, setTime] = useState(diff);

  useEffect(() => {
    const id = setInterval(() => setTime(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  if (time.done) return null;

  const blocks = [
    { value: time.days, label: "dias" },
    { value: time.hours, label: "horas" },
    { value: time.minutes, label: "min" },
    { value: time.seconds, label: "seg" },
  ];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {blocks.map((b) => (
        <div
          key={b.label}
          className="holo-border rounded-xl bg-ink-soft/80 px-4 py-2 text-center min-w-[68px] backdrop-blur-sm"
        >
          <div className="font-display text-3xl md:text-4xl tracking-wider text-electric leading-none">
            {pad(b.value)}
          </div>
          <div className="font-body text-[10px] uppercase tracking-widest text-white/60 mt-1">{b.label}</div>
        </div>
      ))}
    </div>
  );
};
