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

/* ===== 좌표/문자 유틸 ===== */
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

/* ----- 길 정의 ----- */
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

/* 스냅용 (드래그 드롭) */
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

/* ===== Trail(잔상) 훅: 코알라와 독립적으로 선분 배열을 관리 ===== */
function useTrails({
  color = "#FFBEC6",
  source,           // {x, y, rot}
  enabled,          // true면 잔상 생성 / false면 생성 중지
  headGap = 10,     // 머리 바로 뒤 지점(선분이 머리쪽부터 이어짐)
  segLen = 80,      // 최대 선 길이(캡)
  width = 2,
  fadeMs = 2300,
  spawnEveryPx = 12,
  maxSegments = 450,
}) {
  const [segments, setSegments] = useState([]);
  const srcRef = useRef({ x: 0, y: 0, rot: 0 });
  const lastHeadRef = useRef(null);
  const lastSpawnAtRef = useRef({ x: 0, y: 0 });
  const nowRef = useRef(typeof performance !== "undefined" ? performance.now() : Date.now());
  const [, forceTick] = useState(0);

  // 축 정렬(0°, 90°, 180°)인지 판정 (허용 오차 포함)
  const ORIENT_EPS = 0.5;
  const isAxisAligned = (x1, y1, x2, y2) =>
    Math.abs(x1 - x2) <= ORIENT_EPS || Math.abs(y1 - y2) <= ORIENT_EPS;

  useEffect(() => {
    srcRef.current = { x: source.x, y: source.y, rot: source.rot || 0 };
  }, [source.x, source.y, source.rot]);

  useEffect(() => {
    let raf = 0;
    const step = (t) => {
      nowRef.current = t;

      // 1) 만료 제거
      setSegments((prev) => prev.filter((s) => (t - s.t) < fadeMs));

      // 2) 이동 누적 기준 이상이면 선분 추가
      const { x, y, rot } = srcRef.current;
      const dx = x - lastSpawnAtRef.current.x;
      const dy = y - lastSpawnAtRef.current.y;
      const moved2 = dx * dx + dy * dy;

      if (enabled) {
        const hx = x - Math.cos(rot) * headGap;
        const hy = y - Math.sin(rot) * headGap;

        if (moved2 >= spawnEveryPx * spawnEveryPx) {
          if (lastHeadRef.current) {
            let { x: px, y: py } = lastHeadRef.current;

            // 최대 길이 캡
            const vx = hx - px, vy = hy - py;
            const dist = Math.hypot(vx, vy);
            if (dist > segLen) {
              const s = segLen / dist;
              px = hx - vx * s;
              py = hy - vy * s;
            }

            // ⬇️ 축 정렬(가로/세로)인 경우에만 잔상 추가
            if (isAxisAligned(px, py, hx, hy)) {
              const id = `${color}-${t}-${hx.toFixed(1)}-${hy.toFixed(1)}`;
              setSegments((prev) => {
                const next = [...prev, { id, x1: px, y1: py, x2: hx, y2: hy, t }];
                return next.length > maxSegments ? next.slice(next.length - maxSegments) : next;
              });
            }
          }

          // 기준 지점 갱신(잔상 추가 여부와 무관하게 최신 위치로 동기화)
          lastHeadRef.current = { x: hx, y: hy };
          lastSpawnAtRef.current = { x, y };
        }
      } else {
        const hx = x - Math.cos(rot) * headGap;
        const hy = y - Math.sin(rot) * headGap;
        lastHeadRef.current = { x: hx, y: hy };
        lastSpawnAtRef.current = { x, y };
      }

      // 3) 투명도 업데이트용 틱
      forceTick(t);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [enabled, headGap, segLen, fadeMs, spawnEveryPx, color, maxSegments]);

  return {
    segments,
    width,
    color,
    opacityOf: (t0) => {
      const age = Math.max(0, (nowRef.current - t0) / fadeMs);
      const clamped = Math.min(1, age);
      return 1 - clamped; // 선형 페이드아웃
    },
  };
}

/* ===== 공통 훅(한 코알라) ===== */
function useKoalaMover({
  svgRef, pathSelector, dots, speed = 120, hitRadius = 22, disabled = false
}) {
  const koalaRef = useRef(null);
  const pathRef = useRef(null);

  const [hiddenSet, setHiddenSet] = useState(new Set());
  const timersRef = useRef(new Map());
  const hoveredRef = useRef(false);
  const draggingRef = useRef(false);
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const progressRef = useRef(0);
  const totalLenRef = useRef(1);
  const lastRotRef = useRef(0); // 마지막 각도(스냅 전후 기록용)

  // 코알라 현재 위치/방향 (SVG 좌표계 0..1000)
  const [pos, setPos] = useState({ x: 0, y: 0, rot: 0 });

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
    const rot = safeTangent(path, progressRef.current, totalLenRef.current, lastRotRef.current);
    lastRotRef.current = rot;
    setKoalaPosPercent(p.x, p.y, rot);
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
        const rot = safeTangent(path, prog, total, lastRotRef.current);
        lastRotRef.current = rot;

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
    const onEnter = () => { hoveredRef.current = true; setHovered(true); };
    const onLeave = () => { hoveredRef.current = false; setHovered(false); };
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
    const onDown = (e) => { draggingRef.current = true; setDragging(true); k.setPointerCapture(e.pointerId); };
    const onMove = (e) => {
      if (!draggingRef.current) return;
      const svg = svgRef.current; if (!svg) return;
      const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
      const inv = svg.getScreenCTM()?.inverse(); if (!inv) return;
      const p = pt.matrixTransform(inv);
      setKoalaPosPercent(p.x, p.y);
    };
    const onUp = (e) => {
      if (!draggingRef.current) return; draggingRef.current = false; setDragging(false);
      const svg = svgRef.current; const path = pathRef.current; if (!svg || !path) return;
      const rect = svg.getBoundingClientRect();
      const x = (e.clientX - rect.left) * (1000 / rect.width);
      const y = (e.clientY - rect.top) * (1000 / rect.height);
      const len = closestLengthOnPath(path, x, y, 500);
      progressRef.current = len; totalLenRef.current = path.getTotalLength();
      const p = path.getPointAtLength(len);
      const rot = safeTangent(path, len, totalLenRef.current, lastRotRef.current);
      lastRotRef.current = rot;
      setKoalaPosPercent(p.x, p.y, rot);
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

  /* === helpers === */

  // 0°, 90°, 180° 중 가장 가까운 각으로 스냅
  function snapRightAngle(rad) {
    const CAND = [0, Math.PI / 2, Math.PI];
    let best = CAND[0], bestDiff = Math.PI * 2;
    for (const c of CAND) {
      const diff = Math.abs(Math.atan2(Math.sin(rad - c), Math.cos(rad - c)));
      if (diff < bestDiff) { bestDiff = diff; best = c; }
    }
    return best;
  }

  // 방어 로직 제거: 앞쪽 한 점만 이용해 접선 추정 → 곧바로 직각 스냅
  function safeTangent(path, len, total /*, fallbackRot */) {
    const EPS = 0.8; // 미세 전진 샘플
    const l0 = Math.min(Math.max(len, 0), total);
    const l1 = Math.min(len + EPS, total);
    const p0 = path.getPointAtLength(l0);
    const p1 = path.getPointAtLength(l1);
    const ang = Math.atan2(p1.y - p0.y, p1.x - p0.x) || 0; // (0,0)일 때 0 처리
    return snapRightAngle(ang);
  }

  function setKoalaPosPercent(x, y, rad) {
    const el = koalaRef.current; if (!el) return;
    el.style.setProperty("--x", `${toPct(x)}%`);
    el.style.setProperty("--y", `${toPct(y)}%`);
    if (typeof rad === "number") el.style.setProperty("--rot", `${rad}rad`);
    setPos((prev) => ({ x, y, rot: typeof rad === "number" ? rad : (prev?.rot ?? 0) }));
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

  return { koalaRef, hiddenSet, pos, hovered, dragging };
}

/* ===== Main (한 캔버스) ===== */
export default function Background() {
  const svgRef = useRef(null);

  // 환경 감지
  const isMobile = useIsMobile(768);
  const prefersReduced = usePrefersReducedMotion();
  const disableAnim = isMobile || prefersReduced;

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

  // 잔상(코알라와 독립)
  const PINK_COLOR = "#FFBEC6";
  const BLUE_COLOR = "#8DDFFF";
  const HEAD_GAP = 10;
  const TRAIL_LEN = 80;
  const TRAIL_WIDTH = 2;
  const FADE_MS = 1000;
  const SPAWN_EVERY = 1;

  const pinkTrails = useTrails({
    color: PINK_COLOR,
    source: pink.pos,
    enabled: !disableAnim && !pink.hovered && !pink.dragging,
    headGap: HEAD_GAP,
    segLen: TRAIL_LEN,
    width: TRAIL_WIDTH,
    fadeMs: FADE_MS,
    spawnEveryPx: SPAWN_EVERY,
    maxSegments: 450,
  });
  const blueTrails = useTrails({
    color: BLUE_COLOR,
    source: blue.pos,
    enabled: !disableAnim && !blue.hovered && !blue.dragging,
    headGap: HEAD_GAP,
    segLen: TRAIL_LEN,
    width: TRAIL_WIDTH,
    fadeMs: FADE_MS,
    spawnEveryPx: SPAWN_EVERY,
    maxSegments: 450,
  });

  return (
    <Styled.Wrap>
      {/* 단일 SVG 캔버스 */}
      <Styled.Svg ref={svgRef} preserveAspectRatio="none">
        {/* 실제 이동 경로(보이지 않음) */}
        <path className="pink" d={pinkPathD} stroke="none" fill="none" />
        <path className="blue" d={bluePathD} stroke="none" fill="none" />

        {/* 잔상 */}
        <g aria-label="pink-trails">
          {pinkTrails.segments.map((s) => (
            <line
              key={s.id}
              x1={s.x1} y1={s.y1}
              x2={s.x2} y2={s.y2}
              stroke={pinkTrails.color}
              strokeWidth={pinkTrails.width}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              opacity={pinkTrails.opacityOf(s.t)}
            />
          ))}
        </g>
        <g aria-label="blue-trails">
          {blueTrails.segments.map((s) => (
            <line
              key={s.id}
              x1={s.x1} y1={s.y1}
              x2={s.x2} y2={s.y2}
              stroke={blueTrails.color}
              strokeWidth={blueTrails.width}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              opacity={blueTrails.opacityOf(s.t)}
            />
          ))}
        </g>
      </Styled.Svg>

      {/* 심볼 */}
      {!disableAnim && (
        <>
          {pinkDots.map((d) => (
            <Styled.Sym
              key={`${d.id}-${d.x}-${d.y}`}
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
              key={`${d.id}-${d.x}-${d.y}`}
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

      {/* 코알라 */}
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