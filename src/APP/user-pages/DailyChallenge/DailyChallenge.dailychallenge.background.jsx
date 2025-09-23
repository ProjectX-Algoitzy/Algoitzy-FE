// DailyChallenge.dailychallenge.background.js
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as Styled from "./Styled/DailyChallenge.dailychallenge.background.styles";

/* ===== 모바일/저전력 감지 훅 ===== */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(`(max-width: ${breakpoint}px)`).matches : false
  );
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, [breakpoint]);
  return isMobile;
}
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);
  return reduced;
}

/* ===== 좌표 유틸 ===== */
const SYMBOLS1 = ["<","*",";",":","/","%","=","{","}","[","!","/","<","$",":","+"];
const SYMBOLS2 = ["<","&","#","{}","[","/","]","{","()","*","//","<","!",">","#",";"];
const toPct = (v) => (v / 1000) * 100;

function hLineDots1(y, x1, x2, gap, color = "pink", idPrefix = "h") {
  const out = []; let id = 0;
  for (let x = x1; x <= x2; x += gap) {
    out.push({ id: `${idPrefix}-${id++}`, x, y, color, char: SYMBOLS1[id % SYMBOLS1.length] });
  }
  return out;
}
function hLineDots2(y, x1, x2, gap, color = "pink", idPrefix = "h") {
  const out = []; let id = 0;
  for (let x = x1; x <= x2; x += gap) {
    out.push({ id: `${idPrefix}-${id++}`, x, y, color, char: SYMBOLS2[id % SYMBOLS2.length] });
  }
  return out;
}
function vLineDots1(x, y1, y2, gap, color = "pink", idPrefix = "v") {
  const out = []; let id = 0;
  for (let y = y1; y <= y2; y += gap) {
    out.push({ id: `${idPrefix}-${id++}`, x, y, color, char: SYMBOLS1[id % SYMBOLS1.length] });
  }
  return out;
}
function vLineDots2(x, y1, y2, gap, color = "pink", idPrefix = "v") {
  const out = []; let id = 0;
  for (let y = y1; y <= y2; y += gap) {
    out.push({ id: `${idPrefix}-${id++}`, x, y, color, char: SYMBOLS2[id % SYMBOLS2.length] });
  }
  return out;
}

/* ----- 길 정의 (+|      |+) — Dots & Path 일치 ----- */
/* 분홍 */
function buildPinkDots() {
  const leftH  = hLineDots1(156, 28, 174, 24, "pink", "ph");
  const midV   = vLineDots2(100, 60, 410, 24, "pink", "pm");
  const rightV = vLineDots1(898, 60, 410, 24, "pink", "pr");
  return [...leftH, ...midV, ...rightV];
}
function buildPinkPathD() {
  return [
    "M  28 156 L 200 156",
    "M 100  60 L 100 420",
    "M 898  60 L 898 420",
  ].join(" ");
}

/* 하늘 */
function buildBlueDots() {
  const leftV  = vLineDots1(200, 60, 410, 24, "blue", "bvL");
  const rightV = vLineDots2(800, 60, 410, 24, "blue", "bvR");
  const rightH1 = hLineDots1(252, 800, 890, 24, "blue", "bh1");
  const rightH2 = hLineDots2(252, 928, 978, 24, "blue", "bh2");
  return [...leftV, ...rightV, ...rightH1, ...rightH2];
}
function buildBluePathD() {
  return [
    "M 200  60 L 200 410",
    "M 800  60 L 800 410",
    "M 800 252 L 978 252",
  ].join(" ");
}

/* 스냅용 */
function closestLengthOnPath(pathEl, x, y, samples = 350) {
  const total = pathEl.getTotalLength();
  let best = 0, bestD = Infinity;
  for (let i = 0; i <= samples; i++) {
    const l = (i / samples) * total;
    const p = pathEl.getPointAtLength(l);
    const d2 = (p.x - x) ** 2 + (p.y - y) ** 2;
    if (d2 < bestD) { bestD = d2; best = l; }
  }
  return best;
}

/* ===== 공통 훅(한 코알라) ===== */
function useKoalaMover({ svgRef, pathSelector, dots, speed = 120, hitRadius = 22, disabled = false }) {
  const koalaRef = useRef(null);
  const pathRef = useRef(null);

  const [hiddenSet, setHiddenSet] = useState(new Set());
  const timersRef = useRef(new Map());
  const hoveredRef = useRef(false);
  const draggingRef = useRef(false);
  const progressRef = useRef(0);
  const totalLenRef = useRef(1);

  /* init */
  useEffect(() => {
    if (disabled) return;
    const svg = svgRef.current;
    if (!svg) return;
    svg.setAttribute("viewBox", "0 0 1000 1000");
    const path = svg.querySelector(pathSelector);
    if (!path) return;

    pathRef.current = path;
    totalLenRef.current = path.getTotalLength();
    progressRef.current = totalLenRef.current * 0.05;

    const p = path.getPointAtLength(progressRef.current);
    setKoalaPosPercent(p.x, p.y, 0);
  }, [svgRef, pathSelector, disabled]);

  /* loop */
  useEffect(() => {
    if (disabled) return;
    let raf = 0, last = performance.now();
    const step = (now) => {
      const dt = (now - last) / 1000; last = now;
      const path = pathRef.current;
      if (path && !hoveredRef.current && !draggingRef.current) {
        const total = totalLenRef.current;
        let prog = progressRef.current + speed * dt;
        if (prog > total) prog %= total;
        progressRef.current = prog;

        const p0 = path.getPointAtLength(prog);
        const p1 = path.getPointAtLength(Math.min(prog + 1, total));
        const rot = Math.atan2(p1.y - p0.y, p1.x - p0.x);
        setKoalaPosPercent(p0.x, p0.y, rot);
        eatNearby(p0.x, p0.y);
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [speed, hitRadius, disabled]);

  /* hover pause */
  useEffect(() => {
    if (disabled) return;
    const k = koalaRef.current; if (!k) return;
    const onEnter = () => (hoveredRef.current = true);
    const onLeave = () => (hoveredRef.current = false);
    k.addEventListener("pointerenter", onEnter);
    k.addEventListener("pointerleave", onLeave);
    return () => {
      k.removeEventListener("pointerenter", onEnter);
      k.removeEventListener("pointerleave", onLeave);
    };
  }, [disabled]);

  /* drag */
  useEffect(() => {
    if (disabled) return;
    const k = koalaRef.current; if (!k) return;
    const onDown = (e) => { draggingRef.current = true; k.setPointerCapture(e.pointerId); };
    const onMove = (e) => {
      if (!draggingRef.current) return;
      const svg = svgRef.current; if (!svg) return;
      const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
      const inv = svg.getScreenCTM()?.inverse(); if (!inv) return;
      const p = pt.matrixTransform(inv);
      setKoalaPosPercent(p.x, p.y);
    };
    const onUp = (e) => {
      if (!draggingRef.current) return; draggingRef.current = false;
      const svg = svgRef.current; const path = pathRef.current; if (!svg || !path) return;
      const rect = svg.getBoundingClientRect();
      const x = (e.clientX - rect.left) * (1000 / rect.width);
      const y = (e.clientY - rect.top) * (1000 / rect.height);
      const len = closestLengthOnPath(path, x, y, 500);
      progressRef.current = len; totalLenRef.current = path.getTotalLength();
      const p = path.getPointAtLength(len);
      setKoalaPosPercent(p.x, p.y);
    };
    k.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp);
    return () => {
      k.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [svgRef, disabled]);

  /* helpers */
  function setKoalaPosPercent(x, y, rad) {
    const el = koalaRef.current; if (!el) return;
    el.style.setProperty("--x", `${toPct(x)}%`);
    el.style.setProperty("--y", `${toPct(y)}%`);
    if (typeof rad === "number") el.style.setProperty("--rot", `${rad}rad`);
  }
  function eatNearby(x, y) {
    const r2 = hitRadius * hitRadius;
    setHiddenSet((prev) => {
      const next = new Set(prev);
      for (const d of dots) {
        if (next.has(d.id)) continue;
        const dx = d.x - x, dy = d.y - y;
        if (dx * dx + dy * dy <= r2) {
          next.add(d.id);
          const t = setTimeout(() => {
            setHiddenSet((p) => { const n = new Set(p); n.delete(d.id); return n; });
            timersRef.current.delete(d.id);
          }, 3000);
          timersRef.current.set(d.id, t);
        }
      }
      return next;
    });
  }

  return { koalaRef, hiddenSet };
}

/* ===== Main (한 캔버스) ===== */
export default function Background() {
  const svgRef = useRef(null);

  // 환경 감지
  const isMobile = useIsMobile(768);
  const prefersReduced = usePrefersReducedMotion();
  const disableAnim = isMobile || prefersReduced; // 모바일/저전력 → 애니메이션/심볼 OFF

  // 길/기호
  const pinkDots = useMemo(() => buildPinkDots(), []);
  const blueDots = useMemo(() => buildBlueDots(), []);
  const pinkPathD = useMemo(() => buildPinkPathD(), []);
  const bluePathD = useMemo(() => buildBluePathD(), []);

  // 애니메이션이 켜져 있을 때만 훅 사용
  const pink = useKoalaMover({
    svgRef, pathSelector: "path.pink", dots: pinkDots, disabled: disableAnim
  });
  const blue = useKoalaMover({
    svgRef, pathSelector: "path.blue", dots: blueDots, disabled: disableAnim
  });

  return (
    <Styled.Wrap>
      {/* 단일 SVG 캔버스: 두 색 길 모두 여기에 */}
      <Styled.Svg ref={svgRef} preserveAspectRatio="none">
        <path className="pink" d={pinkPathD} stroke="none" fill="none" />
        <path className="blue" d={bluePathD} stroke="none" fill="none" />
      </Styled.Svg>

      {/* 심볼: 모바일/저전력에서는 렌더링 자체를 생략 */}
      {!disableAnim && (
        <>
          {pinkDots.map((d) => (
            <Styled.Sym
              key={d.id}
              $xPct={toPct(d.x)}
              $yPct={toPct(d.y)}
              $color="pink"
              $hidden={pink.hiddenSet?.has(d.id)}
            >
              {d.char}
            </Styled.Sym>
          ))}
          {blueDots.map((d) => (
            <Styled.Sym
              key={d.id}
              $xPct={toPct(d.x)}
              $yPct={toPct(d.y)}
              $color="blue"
              $hidden={blue.hiddenSet?.has(d.id)}
            >
              {d.char}
            </Styled.Sym>
          ))}
        </>
      )}

      {/* 모바일/저전력에서는 코알라/애니메이션 표시 안 함 */}
      {!disableAnim && (
        <>
          <Styled.Koala
            ref={blue.koalaRef}
            src="/img/koala_blue_big.png"
            alt="blue-koala"
            style={{ pointerEvents: "auto", zIndex: 1 }}
            title="드래그로 이동 / 호버하면 정지"
          />
          <Styled.Koala
            ref={pink.koalaRef}
            src="/img/koala_pink_big.png"
            alt="pink-koala"
            style={{ pointerEvents: "auto", zIndex: 1 }}
            title="드래그로 이동 / 호버하면 정지"
          />
        </>
      )}
    </Styled.Wrap>
  );
}