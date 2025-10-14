// DailyChallenge.dailychallenge.background.styles.js
import styled, { css } from "styled-components";

/* 한 캔버스 전체 래퍼 */
export const Wrap = styled.div`
  position: absolute;
  height: 120vw;
  inset: 0;
  overflow: hidden;
  pointer-events: none; /* 배경은 기본 비활성, 코알라만 이벤트 */
  z-index: 0;
`;

/* SVG 캔버스 */
export const Svg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

/* 코알라 아이콘 */
export const Koala = styled.img`
  position: absolute;
  width: 2.5rem;
  height: auto;
  pointer-events: auto;  /* 코알라만 잡을 수 있게 */
  user-select: none;
  -webkit-user-drag: none;
  left: var(--x, 0%);
  top: var(--y, 0%);
  transform: translate(-50%, -50%) rotate(var(--rot, 0rad));
`;

/* 네온 효과 */
export const neon = css`
  color: ${(p) => (p.$color === "pink" ? "#ffb3c9" : "#9ee7ff")};
  text-shadow: ${(p) =>
    p.$color === "pink"
      ? "0 0 6px rgba(255,165,196,.7), 0 0 30px rgba(255,165,196,.5)"
      : "0 0 6px rgba(118,224,255,.7), 0 0 30px rgba(118,224,255,.5)"};
`;

/* 기호(코드 심볼) — 폰트 크기 rem로 변경 */
export const Sym = styled.span`
  position: absolute;
  left: ${(p) => `${p.$xPct}%`};
  top: ${(p) => `${p.$yPct}%`};
  transform: translate(-50%, -50%);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
    "Courier New", monospace;
  font-size: 1rem;     /* <- px에서 rem으로 변경 */
  line-height: 1;
  pointer-events: none;
  transition: opacity .2s ease;
  opacity: ${(p) => (p.$hidden ? 0 : 1)};
  ${neon}
`;