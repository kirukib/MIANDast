"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/components/motion";
import { cn } from "@/lib/utils";

const W = 1000;
const H = 400;
const LABEL = { fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "0.08em" } as const;

/** Right-angle trace with 4px rounded corners through the given points. */
function trace(pts: [number, number][]) {
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [px, py] = pts[i - 1];
    const [x, y] = pts[i];
    const [nx, ny] = pts[i + 1];
    const ix = Math.sign(x - px) * 4;
    const iy = Math.sign(y - py) * 4;
    const ox = Math.sign(nx - x) * 4;
    const oy = Math.sign(ny - y) * 4;
    d += ` L${x - ix} ${y - iy} Q${x} ${y} ${x + ox} ${y + oy}`;
  }
  const [lx, ly] = pts[pts.length - 1];
  return `${d} L${lx} ${ly}`;
}

function Rack({ x, y, w = 52 }: { x: number; y: number; w?: number }) {
  const units = Math.floor((H - y - 12) / 14);
  return (
    <g>
      <rect x={x} y={y} width={w} height={H - y} />
      <rect x={x + 4} y={y + 4} width={w - 8} height={6} className="text-border" stroke="currentColor" />
      {Array.from({ length: units }, (_, i) => {
        const uy = y + 14 + i * 14;
        return (
          <g key={i}>
            <line x1={x + 4} y1={uy} x2={x + w - 4} y2={uy} className="text-border" stroke="currentColor" />
            <rect
              x={x + w - 12}
              y={uy + 4}
              width="4"
              height="4"
              fill={i % 3 === 0 ? "currentColor" : "none"}
              className={i % 3 === 0 ? "ft-led" : undefined}
              style={i % 3 === 0 ? ({ "--ft-i": i } as React.CSSProperties) : undefined}
            />
            <line
              x1={x + 8}
              y1={uy + 7}
              x2={x + w - 20}
              y2={uy + 7}
              className="text-border"
              stroke="currentColor"
              strokeDasharray="1 2"
            />
          </g>
        );
      })}
    </g>
  );
}

function PadArray({
  x,
  y,
  cols,
  rows,
  s = 5,
  gap = 4,
}: {
  x: number;
  y: number;
  cols: number;
  rows: number;
  s?: number;
  gap?: number;
}) {
  return (
    <g className="ft-pads">
      {Array.from({ length: cols * rows }, (_, i) => (
        <rect
          key={i}
          x={x + (i % cols) * (s + gap)}
          y={y + Math.floor(i / cols) * (s + gap)}
          width={s}
          height={s}
          style={{ "--ft-i": i } as React.CSSProperties}
        />
      ))}
    </g>
  );
}

/**
 * Footer scan-topology schematic (spec §5.16): draw-on when scrolled in,
 * idle probe activity, intensifies on hover. Static under reduced motion.
 */
export function FooterDrawing() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [inView, setInView] = useState(false);
  const [hover, setHover] = useState(false);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      setInView(true);
      setDrawn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  useEffect(() => {
    if (!inView || reduce) return;
    const t = window.setTimeout(() => setDrawn(true), 1650);
    return () => window.clearTimeout(t);
  }, [inView, reduce]);

  const bus: [number, number][][] = [
    [[0, 132], [212, 132], [212, 176]],
    [[0, 122], [272, 122], [272, 176]],
    [[0, 112], [332, 112], [332, 176]],
    [[0, 102], [560, 102], [560, 236]],
    [[0, 92], [700, 92], [700, 214]],
  ];

  const live = inView && !reduce;

  return (
    <div
      ref={ref}
      className={cn(
        "ft-drawing relative mx-auto w-full md:w-[86%] lg:w-[78%] cursor-default",
        inView && "is-in",
        live && "is-live",
        drawn && live && "is-drawn",
        hover && live && "is-hot",
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      tabIndex={0}
      role="img"
      aria-label="Animated scan topology schematic. Hover to intensify probe activity."
    >
      <span className="sr-only">
        Line drawing of a scan topology: server racks, a load balancer, an API gateway and a
        database inside a dashed scope fence, probe traces entering from outside, and third-party
        hosts outside the fence marked as blocked. Animation runs when visible; hover intensifies
        activity.
      </span>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block w-[166%] -ml-[33%] md:w-full md:ml-0 h-auto text-foreground/30 [&_.text-border]:text-foreground/15 mask-[linear-gradient(90deg,transparent,black_9%)] transition-[color] duration-200 ease-[var(--ease-out)]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        aria-hidden
      >
        <defs>
          <pattern id="ft-dots" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="currentColor" stroke="none" className="ft-dot" />
          </pattern>
        </defs>

        <rect x="150" y="60" width="600" height={H - 60} fill="url(#ft-dots)" stroke="none" className="text-border" />

        <g className="ft-draw ft-scope" style={{ "--ft-d": "0ms" } as React.CSSProperties}>
          <path d="M150 30 V44 M750 30 V44 M150 37 H410 M490 37 H750" pathLength={1} />
          <text x="450" y="40" textAnchor="middle" fill="currentColor" stroke="none" style={LABEL} className="ft-scope-label">
            SIGNED SCOPE
          </text>
        </g>

        <path
          className="ft-draw ft-fence"
          style={{ "--ft-d": "120ms" } as React.CSSProperties}
          d={`M150 ${H} V66 Q150 60 156 60 H744 Q750 60 750 66 V${H}`}
          strokeDasharray="6 4"
          strokeWidth="1.25"
          pathLength={1}
        />
        <text x="160" y="76" fill="currentColor" stroke="none" style={LABEL} className="ft-scope-label">
          SCOPE · SHA256:9F3A…C21E
        </text>

        {bus.map((b) => (
          <rect key={b[0][1]} x="146" y={b[0][1] - 3} width="8" height="6" fill="var(--background)" />
        ))}

        <g className="ft-draw" style={{ "--ft-d": "200ms" } as React.CSSProperties}>
          <rect x="28" y="276" width="92" height={H - 276} pathLength={1} />
          <text x="36" y="292" fill="currentColor" stroke="none" style={LABEL}>
            EDGE · PROBES
          </text>
          <PadArray x={38} y={304} cols={8} rows={5} s={4} gap={5} />
          <path className="ft-bus" d={trace([[74, 276], [74, 152], [0, 152]])} pathLength={1} />
          <path
            className="ft-bus text-border"
            d={trace([[84, 276], [84, 142], [0, 142]])}
            pathLength={1}
          />
        </g>

        {bus.map((b, i) => (
          <path
            key={i}
            className="ft-draw ft-bus"
            style={{ "--ft-d": `${280 + i * 80}ms` } as React.CSSProperties}
            d={trace(b)}
            strokeWidth={i === 3 ? 1.25 : 1}
            pathLength={1}
          />
        ))}
        {bus.map((b, i) => (
          <rect
            key={`v-${b[0][1]}`}
            className="ft-node"
            style={{ "--ft-i": i } as React.CSSProperties}
            x={b[b.length - 1][0] - 2}
            y={b[b.length - 1][1] - 2}
            width="4"
            height="4"
            fill="currentColor"
          />
        ))}

        <g className="ft-draw" style={{ "--ft-d": "520ms" } as React.CSSProperties}>
          <Rack x={186} y={176} />
          <Rack x={246} y={176} />
          <Rack x={306} y={176} />
          <text x="186" y="168" fill="currentColor" stroke="none" style={LABEL}>
            APP · 3×
          </text>
        </g>

        <g className="ft-draw" style={{ "--ft-d": "640ms" } as React.CSSProperties}>
          <rect x="380" y="300" width="92" height={H - 300} />
          <text x="388" y="316" fill="currentColor" stroke="none" style={LABEL}>
            LB
          </text>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle
              key={i}
              cx={392 + i * 13}
              cy="334"
              r="3"
              className="ft-led"
              style={{ "--ft-i": i } as React.CSSProperties}
            />
          ))}
          <line x1="386" y1="350" x2="466" y2="350" className="text-border" />
          <PadArray x={388} y={360} cols={9} rows={3} s={4} gap={5} />
          <path className="ft-bus" d={trace([[358, 340], [380, 340]])} pathLength={1} />
          <path
            className="ft-bus text-border"
            d={trace([[358, 356], [380, 356]])}
            pathLength={1}
          />
        </g>

        <g className="ft-draw" style={{ "--ft-d": "760ms" } as React.CSSProperties}>
          <rect x="500" y="236" width="120" height={H - 236} />
          <rect x="506" y="242" width="108" height="18" className="text-border" />
          <text x="512" y="254" fill="currentColor" stroke="none" style={LABEL}>
            API GATEWAY
          </text>
          <PadArray x={512} y={272} cols={10} rows={6} s={5} gap={4} />
          <rect x="512" y="334" width="40" height="40" />
          <PadArray x={518} y={340} cols={4} rows={4} s={4} gap={5} />
          <rect x="562" y="334" width="46" height="18" className="text-border" />
          <rect x="562" y="356" width="46" height="18" className="text-border" />
          <path className="ft-bus" d={trace([[472, 324], [500, 324]])} pathLength={1} />
          <path
            className="ft-bus text-border"
            d={trace([[472, 336], [488, 336], [488, 312], [500, 312]])}
            pathLength={1}
          />
        </g>

        <g className="ft-draw" style={{ "--ft-d": "880ms" } as React.CSSProperties}>
          <path d={`M664 214 V${H} M736 214 V${H}`} pathLength={1} />
          <ellipse cx="700" cy="214" rx="36" ry="10" />
          {[252, 290, 328, 366].map((y) => (
            <path key={y} d={`M664 ${y} Q700 ${y + 20} 736 ${y}`} className="text-border" pathLength={1} />
          ))}
          <text x="684" y="244" fill="currentColor" stroke="none" style={LABEL}>
            DB
          </text>
          <path className="ft-bus" d={trace([[620, 300], [664, 300]])} pathLength={1} />
          <path
            className="ft-bus text-border"
            d={trace([[620, 314], [640, 314], [640, 340], [664, 340]])}
            pathLength={1}
          />
        </g>

        {[
          { y: 110, label: "STRIPE.COM" },
          { y: 146, label: "SENDGRID.NET" },
          { y: 182, label: "CDN.*" },
        ].map((h, i) => (
          <g
            key={h.label}
            className="ft-draw ft-block"
            style={{ "--ft-d": `${1000 + i * 80}ms` } as React.CSSProperties}
          >
            <path
              className="ft-bus-deny"
              d={trace([[712 + i * 8, 206], [712 + i * 8, h.y + 14], [742, h.y + 14]])}
              pathLength={1}
            />
            <path className="ft-deny-gate" d={`M742 ${h.y + 8} V${h.y + 20}`} strokeWidth="1.5" />
            <path d={`M750 ${h.y + 14} H800`} strokeDasharray="2 3" className="text-border" />
            <rect x="800" y={h.y} width="112" height="28" className="ft-block-box" />
            <text x="810" y={h.y + 17} fill="currentColor" stroke="none" style={LABEL} className="ft-block-label">
              {h.label}
            </text>
            <path d={`M892 ${h.y + 9}l10 10M902 ${h.y + 9}l-10 10`} strokeWidth="1.25" className="ft-x" />
          </g>
        ))}

        <g className="ft-draw" style={{ "--ft-d": "1240ms" } as React.CSSProperties}>
          <path d={`M870 ${H} L900 292 L930 ${H} M900 292 V270`} pathLength={1} />
          {[320, 348, 376].map((y) => {
            const half = ((y - 292) / (H - 292)) * 30;
            return <path key={y} d={`M${900 - half} ${y} H${900 + half}`} className="text-border" />;
          })}
          <path d={`M879 ${H - 24} L915 ${H - 52} M921 ${H - 24} L885 ${H - 52}`} className="text-border" />
          <circle cx="900" cy="266" r="4" className="ft-node ft-node-out" />
          <path d="M888 254 Q900 242 912 254 M882 248 Q900 230 918 248" className="text-border" />
        </g>

        {Array.from({ length: 40 }, (_, i) => (
          <line
            key={i}
            x1={160 + i * 15}
            y1={H - 4}
            x2={166 + i * 15}
            y2={H}
            className="text-border"
          />
        ))}
      </svg>
    </div>
  );
}
