import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

const BG_IMAGE_1 =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_125121_afb71ce9-9c64-4c54-90b5-c89c0764c052.png&w=1920&q=85";
const BG_IMAGE_2 =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_135737_0da59642-725b-451a-997b-b0283d95a42a.png&w=1280&q=85";

const LOGO_PATH =
  "M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 96 95 L 63.5 128 L 64 128 L 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 64 L 64 0 L 192 0 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z";

const NAV_LINKS = ["Module", "Case Records", "Biotech", "Tiers", "Live Demo"];

function Logo({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="currentColor" className="text-white">
      <path d={LOGO_PATH} />
    </svg>
  );
}

const CX = -110;
const CY = 300;

const ARCS = [
  { r: 330, from: -92, to: 16, dot: -46, value: "10", suffix: "+", label: "Years Real" },
  { r: 395, from: -56, to: 60, dot: 2, value: "40", suffix: "+", label: "Use Forms" },
  { r: 460, from: -14, to: 72, dot: 44, value: "95", suffix: "%", label: "Repeat Members" },
];

const polar = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
};

export default function CyberHero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const revealRef = useRef<HTMLDivElement | null>(null);
  const patternRef = useRef<SVGPatternElement | null>(null);

  useEffect(() => {
    const mouse = { x: -999, y: -999 };
    const smooth = { x: -999, y: -999 };
    const grid = { x: 0, y: 0 };
    const gridTarget = { x: 0, y: 0 };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      gridTarget.x = (e.clientX / window.innerWidth - 0.5) * 16;
      gridTarget.y = (e.clientY / window.innerHeight - 0.5) * 16;
    };
    window.addEventListener("mousemove", onMove);

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d") ?? null;
    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const loop = () => {
      smooth.x += (mouse.x - smooth.x) * 0.1;
      smooth.y += (mouse.y - smooth.y) * 0.1;
      grid.x += (gridTarget.x - grid.x) * 0.06;
      grid.y += (gridTarget.y - grid.y) * 0.06;

      if (patternRef.current) {
        patternRef.current.setAttribute("x", String(grid.x));
        patternRef.current.setAttribute("y", String(grid.y));
      }

      if (canvas && ctx && revealRef.current) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const R = 260;
        const g = ctx.createRadialGradient(smooth.x, smooth.y, 0, smooth.x, smooth.y, R);
        g.addColorStop(0, "rgba(255,255,255,1)");
        g.addColorStop(0.4, "rgba(255,255,255,1)");
        g.addColorStop(0.6, "rgba(255,255,255,0.75)");
        g.addColorStop(0.75, "rgba(255,255,255,0.4)");
        g.addColorStop(0.88, "rgba(255,255,255,0.12)");
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(smooth.x, smooth.y, R, 0, Math.PI * 2);
        ctx.fill();
        const url = canvas.toDataURL();
        const s = revealRef.current.style;
        s.maskImage = `url(${url})`;
        s.webkitMaskImage = `url(${url})`;
        s.maskSize = "100% 100%";
        s.webkitMaskSize = "100% 100%";
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="min-h-screen bg-white tracking-[-0.02em]"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between md:justify-center p-4 sm:p-5">
        {/* desktop pill */}
        <div className="nav-drop hidden md:flex bg-black/60 backdrop-blur-md rounded-full pl-3 pr-2 py-2 items-center gap-1">
          <Logo />
          {NAV_LINKS.map((l, i) => (
            <button
              key={l}
              className={`text-sm font-medium px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-colors ${
                i === 0 ? "text-white" : "text-gray-300"
              }`}
            >
              {l}
            </button>
          ))}
          <button className="bg-white text-gray-900 text-sm font-semibold px-5 py-1.5 rounded-full hover:bg-gray-100 ml-1 transition-colors">
            Connect
          </button>
        </div>

        {/* mobile */}
        <div className="nav-drop md:hidden bg-black/60 backdrop-blur-md rounded-full p-2.5 flex items-center">
          <Logo />
        </div>
        <button
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="nav-drop md:hidden bg-black/60 backdrop-blur-md rounded-full p-2.5 text-white relative z-50"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {menuOpen && (
          <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white pt-16 pb-6 px-5 shadow-lg">
            {NAV_LINKS.map((l) => (
              <button
                key={l}
                onClick={() => setMenuOpen(false)}
                className="block w-full text-left text-gray-800 py-3 border-b border-gray-100"
              >
                {l}
              </button>
            ))}
            <button className="mt-5 w-full bg-gray-900 text-white text-sm font-semibold py-3 rounded-full">
              Connect
            </button>
          </div>
        )}
      </nav>

      <section className="relative overflow-hidden" style={{ height: "100dvh" }}>
        {/* grid */}
        <svg className="absolute inset-0 z-0 h-full w-full" style={{ opacity: 0.1 }}>
          <defs>
            <pattern
              ref={patternRef}
              id="hero-grid"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#64748b" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>

        {/* base image */}
        <div
          className="absolute inset-0 z-10 bg-center bg-cover ken-burns"
          style={{ backgroundImage: `url("${BG_IMAGE_1}")` }}
        />

        {/* reveal image */}
        <div
          ref={revealRef}
          className="absolute inset-0 z-30 bg-center bg-cover"
          style={{ backgroundImage: `url("${BG_IMAGE_2}")` }}
        />
        <canvas ref={canvasRef} className="hidden" />

        {/* stats arc */}
        <div className="absolute inset-y-0 right-0 z-50 pointer-events-none hidden sm:block">
          <svg
            viewBox="0 0 380 700"
            preserveAspectRatio="xMaxYMid meet"
            className="h-full w-auto"
          >
            <defs>
              {ARCS.map((a, i) => {
                const s = polar(a.r, a.from);
                const e = polar(a.r, a.to);
                return (
                  <linearGradient
                    key={i}
                    id={`arcGrad${i}`}
                    gradientUnits="userSpaceOnUse"
                    x1={s.x}
                    y1={s.y}
                    x2={e.x}
                    y2={e.y}
                  >
                    <stop offset="0%" stopColor="#fff" stopOpacity="0" />
                    <stop offset="22%" stopColor="#fff" stopOpacity="0.5" />
                    <stop offset="55%" stopColor="#fff" stopOpacity="0.5" />
                    <stop offset="85%" stopColor="#fff" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                  </linearGradient>
                );
              })}
            </defs>
            {ARCS.map((a, i) => {
              const s = polar(a.r, a.from);
              const e = polar(a.r, a.to);
              const d = polar(a.r, a.dot);
              const len = a.r * (((a.to - a.from) * Math.PI) / 180);
              const lineDelay = 0.4 + i * 0.22;
              const markDelay = lineDelay + 0.9;
              return (
                <g key={i}>
                  <path
                    className="arc-line"
                    d={`M ${s.x} ${s.y} A ${a.r} ${a.r} 0 0 1 ${e.x} ${e.y}`}
                    fill="none"
                    stroke={`url(#arcGrad${i})`}
                    strokeWidth="1.1"
                    style={
                      {
                        "--len": len,
                        animationDelay: `${lineDelay}s`,
                      } as React.CSSProperties
                    }
                  />
                  <circle
                    className="arc-dot"
                    cx={d.x}
                    cy={d.y}
                    r="3.4"
                    fill="#fff"
                    style={{ animationDelay: `${markDelay}s` }}
                  />
                  <circle
                    className="arc-ring"
                    cx={d.x}
                    cy={d.y}
                    r="7"
                    fill="none"
                    stroke="#fff"
                    strokeOpacity="0.35"
                    style={{ animationDelay: `${markDelay + 0.3}s` }}
                  />
                  <text
                    className="arc-text"
                    x={d.x + 16}
                    y={d.y + 4}
                    fill="#fff"
                    fontSize="32"
                    letterSpacing="-1"
                    style={{ animationDelay: `${markDelay + 0.15}s` }}
                  >
                    {a.value}
                    <tspan fontSize="19" dy="-10">
                      {a.suffix}
                    </tspan>
                  </text>
                  <text
                    className="arc-text"
                    x={d.x + 18}
                    y={d.y + 22}
                    fill="#fff"
                    fontSize="8.5"
                    fontWeight="600"
                    letterSpacing="2"
                    opacity="0.8"
                    style={{ animationDelay: `${markDelay + 0.3}s` }}
                  >
                    {a.label.toUpperCase()}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* hero text */}
        <div className="absolute z-50 bottom-12 sm:bottom-16 md:bottom-24 left-5 sm:left-8 md:left-12 max-w-[300px] sm:max-w-md">
          <p
            className="hero-rise text-[11px] sm:text-xs font-semibold tracking-[0.12em] text-white/90"
            style={{ animationDelay: "0.15s" }}
          >
            Gateway to your <span className="italic">augmented self</span>
          </p>
          <h1
            className="hero-rise mt-3 text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[-0.08em] text-white"
            style={{ animationDelay: "0.3s" }}
          >
            A window
            <br />
            of coming
            <br />
            enhancements
          </h1>
          <p
            className="hero-rise mt-4 text-sm sm:text-base text-white/90 leading-relaxed"
            style={{ animationDelay: "0.5s" }}
          >
            A future where carbon fiber, titanium, and human instinct align. Not machine. Not
            human. Something wonderfully poised between.
          </p>
          <button
            className="hero-rise group relative overflow-hidden mt-7 bg-white text-gray-900 text-sm font-semibold px-7 sm:px-8 py-3 sm:py-3.5 rounded-full shadow-lg shadow-black/20 transition-transform duration-300 hover:scale-[1.04] active:scale-95"
            style={{ animationDelay: "0.7s" }}
          >
            <span className="relative z-10">Reserve Now</span>
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </button>
        </div>
      </section>
    </div>
  );
}
