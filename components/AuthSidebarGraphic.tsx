"use client";

export default function AuthSidebarGraphic() {
  return (
    <div className="w-full h-full flex flex-col justify-between p-12 bg-gradient-to-br from-amber-50 to-orange-100/40 border-l border-border relative overflow-hidden select-none">
      {/* Decorative organic warm background shapes */}
      <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] rounded-full bg-wine/5 blur-3xl pointer-events-none" />

      {/* Top text */}
      <div className="z-10">
        <h2 className="text-[10px] uppercase tracking-widest font-bold text-gold-text">
          Cozy Reading Space
        </h2>
      </div>

      {/* Center SVG Cozy Nook Illustration */}
      <div className="flex-1 flex items-center justify-center z-10 my-8">
        <svg
          viewBox="0 0 400 400"
          className="w-72 h-72 text-parchment-dim drop-shadow-sm"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Hanging Cord & Light Bulb */}
          <line x1="200" y1="0" x2="200" y2="100" strokeWidth="1.5" stroke="#ea580c" />
          <path d="M190,100 L210,100 L206,108 L194,108 Z" fill="#7a6657" stroke="#7a6657" />
          {/* Bulb shape */}
          <path
            d="M200,108 C180,108 175,130 185,145 C190,152 190,158 190,165 L210,165 C210,158 210,152 215,145 C225,130 220,108 200,108 Z"
            fill="#ffffff"
            fillOpacity="0.8"
            stroke="#ea580c"
            strokeWidth="1.5"
          />
          {/* Filament */}
          <path d="M196,135 L196,120 M204,135 L204,120 M196,122 L204,122" stroke="#ea580c" strokeWidth="1" />
          {/* Glowing Radial Wave lines */}
          <circle cx="200" cy="135" r="45" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" className="animate-pulse" />
          <circle cx="200" cy="135" r="70" stroke="#fef3c7" strokeWidth="1" strokeDasharray="4 4" className="opacity-80" />

          {/* Background Wall Line */}
          <line x1="40" y1="320" x2="360" y2="320" stroke="#ac9482" strokeWidth="1" strokeDasharray="4 4" />

          {/* Chair (Left Side) */}
          {/* Backrest */}
          <line x1="100" y1="210" x2="100" y2="320" strokeWidth="2" stroke="#7a6657" />
          {/* Slats */}
          <line x1="110" y1="220" x2="110" y2="270" strokeWidth="1" stroke="#ac9482" />
          <line x1="120" y1="220" x2="120" y2="270" strokeWidth="1" stroke="#ac9482" />
          {/* Seat */}
          <rect x="95" y="270" width="35" height="4" rx="1" fill="#7a6657" stroke="#7a6657" />
          {/* Chair Legs */}
          <line x1="103" y1="274" x2="103" y2="320" strokeWidth="2" stroke="#7a6657" />
          <line x1="127" y1="274" x2="127" y2="320" strokeWidth="2" stroke="#7a6657" />

          {/* Table (Right/Center Side) */}
          {/* Table Top */}
          <rect x="160" y="260" width="140" height="8" rx="2" fill="#7a6657" stroke="#7a6657" />
          {/* Table Legs */}
          <line x1="180" y1="268" x2="180" y2="320" strokeWidth="2.5" stroke="#7a6657" />
          <line x1="280" y1="268" x2="280" y2="320" strokeWidth="2.5" stroke="#7a6657" />
          {/* Table Stretcher bar */}
          <line x1="180" y1="300" x2="280" y2="300" strokeWidth="1.5" stroke="#7a6657" />

          {/* Open Book on Table */}
          {/* Book base / pages */}
          <path
            d="M210,256 C220,250 230,250 240,256 C250,250 260,250 270,256 L270,248 C260,242 250,242 240,248 C230,242 220,242 210,248 Z"
            fill="#ffffff"
            stroke="#f97316"
            strokeWidth="1.5"
          />
          {/* Bookmark ribbon */}
          <path d="M240,248 L240,258 L244,255 L248,258 L248,248" fill="#e11d48" stroke="none" />

          {/* Coffee Mug on Table */}
          <rect x="282" y="246" width="10" height="14" rx="1.5" fill="#fdfaf6" stroke="#7a6657" strokeWidth="1.5" />
          <path d="M292,249 C295,249 295,257 292,257" stroke="#7a6657" strokeWidth="1.5" />
          {/* Rising Steam */}
          <path d="M285,240 C286,236 284,234 286,230" stroke="#ac9482" strokeWidth="1" />
          <path d="M289,241 C290,237 288,235 290,231" stroke="#ac9482" strokeWidth="1" />
        </svg>
      </div>

      {/* Bottom text */}
      <div className="z-10 space-y-2">
        <h3 className="text-lg font-bold tracking-tight text-parchment" style={{ fontFamily: "var(--font-display)" }}>
          Spine
        </h3>
        <p className="text-xs leading-relaxed text-parchment-dim">
          A cozy, warm corner built for logging your reads, tracking progress, and cataloging your favorite shelves.
        </p>
      </div>
    </div>
  );
}
