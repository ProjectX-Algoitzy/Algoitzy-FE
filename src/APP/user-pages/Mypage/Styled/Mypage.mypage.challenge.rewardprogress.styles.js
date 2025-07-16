import * as tokens from "../../../../tokens";
import styled, { css, keyframes } from "styled-components";

const Anima = keyframes`
  0% {
    transform: translate(-100%, -100%) rotateZ(-45deg);
  }
  70% {
    transform: translate(100%, 100%) rotateZ(-45deg);
  }
  100% {
    transform: translate(100%, 100%) rotateZ(-45deg);
  }
`;

const fillAnimation = (target) => keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: ${target}%;
  }
`;

// 150% 커졌다가 100% 크기 유지
// const targetPop = keyframes`
//   0% {
//     transform: scale(1);
//     opacity: 0;
//   }
//   30% {
//     transform: scale(1.5);
//     opacity: 1;
//   }
//   100% {
//     transform: scale(1);
//     opacity: 1;
//   }
// `;

// 0 -> 150 -> 100
const growIn = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  70% {
    transform: scale(1.5);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

export const Effect = styled.div`
  ${({ $isSelected }) =>
    !$isSelected &&
    css`
      position: absolute;
      top: 0;
      left: 0;
      width: 200%;
      height: 200%;
      opacity: 0.9;
      background: linear-gradient(
        to bottom,
        transparent 0%,
        white 50%,
        transparent 100%
      );
      animation: ${Anima} 2s ease-in-out infinite;
      pointer-events: none;
    `}
`;

export const Container = styled.div`
  position: relative;
  width: 20.54rem; /* 493px */
  height: 3.79rem; /* 91px */
  background: #dfe8f1;
  border-radius: 0 0.42rem 0.42rem 0.42rem; /* 10px */
  display: flex;
  align-items: center;
  padding: 0 0.5rem; /* 12px */
  box-sizing: border-box;
`;

export const Badge = styled.div`
  position: absolute;
  top: -1rem; /* -24px */
  left: 0.33rem; /* 8px */
  height: 1.17rem; /* 28px */
  padding: 0 0.5rem; /* 12px */
  background: #dfe8f1;
  display: flex;
  align-items: center;
  gap: 0.25rem; /* 6px */
  border-radius: 0.42rem 0.42rem 0 0; /* 10px */
`;

export const TriangleL = styled.div`
  position: absolute;
  top: -0.75rem; /* -18px */
  left: 0;
  width: 0.38rem; /* 9.2px */
  height: 0.76rem; /* 18.2px */
  background: #dfe8f1;
  clip-path: polygon(99% 0, 100% 0, 100% 100%, 0% 100%);
`;

export const TriangleR = styled.div`
  position: absolute;
  top: -0.75rem; /* -18px */
  /* right: 14.36rem;  */
  right: 14.04rem;
  /* right: 13.74rem; */
  width: 0.42rem; /* 10px */
  height: 0.93rem; /* 22.2px */
  background: #dfe8f1;
  clip-path: polygon(0 0, 1% 0, 100% 100%, 0% 100%);
`;

export const BadgeText = styled.span`
  ${tokens.typography.B2_M_16};
  color: ${tokens.colors.B_Grey_7};
`;

export const ProgressBarWrapper = styled.div`
  position: relative;
  top: 0.08rem; /* 2px */
  left: 0.58rem; /* 14px */
  width: 10.5rem; /* 252px */
  height: 3rem;
`;

export const ProgressBackground = styled.div`
  position: absolute;
  top: 1.417rem;
  left: 0;
  width: 100%;
  height: 0.167rem;
  background: #d2d9e5;
  border-radius: 0.083rem;
`;

export const ProgressFill = styled.div`
  position: absolute;
  top: 1.417rem;
  left: 0;

  height: 0.167rem;
  background: linear-gradient(
    90deg,
    rgba(0, 165, 255, 1) 74%,
    rgba(0, 165, 255, 0) 100%
  );
  border-radius: 0.083rem;
  /* 
  ${({ $challengeWinCount }) =>
    $challengeWinCount === 0 &&
    css`
      width: 7%;
    `}

  ${({ $challengeWinCount }) =>
    $challengeWinCount === 1 &&
    css`
      width: 42%;
    `}

  ${({ $challengeWinCount }) =>
    $challengeWinCount === 2 &&
    css`
      width: 75%;
    `} */
  ${({ $challengeWinCount }) => {
    const widths = {
      0: 7,
      1: 42,
      2: 75,
    };
    const targetWidth = widths[$challengeWinCount] ?? 0;
    return css`
      animation: ${fillAnimation(targetWidth)} 1.8s ease-in-out forwards;
    `;
  }}
`;

export const TargetIcon = styled.img`
  position: absolute;
  top: 1rem;
  transform: translateX(-50%);
  animation: ${growIn} 1s ease-in-out 1.8s forwards;
  ${({ $challengeWinCount }) => {
    if ($challengeWinCount === 0) return "left: 3%;";
    if ($challengeWinCount === 1) return "left: 38%;";
    if ($challengeWinCount === 2) return "left: 71%;";
    return "";
  }}
  width: 1rem;
  height: 1rem;
  opacity: 0;
  z-index: 3;
  pointer-events: none;
`;

export const Icon = styled.div`
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  ${({ $position }) => $position && `left: ${$position};`}

  display: flex; // 반짝임 효과
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: absolute;
  border-radius: 0.21rem;
  box-shadow: 0 0.167rem 0.625rem 0 rgba(45, 54, 59, 0.25);

  ${({ $size }) =>
    $size === "S" &&
    css`
      width: 1rem;
      height: 1rem;
    `}

  ${({ $size }) =>
    $size === "M" &&
    css`
      top: 0.733rem;
      width: 1.334rem; // 2rem
      height: 1.334rem;
    `}

  ${({ $size }) =>
    $size === "L" &&
    css`
      top: 0.4rem;
      width: 2rem; // 3rem
      height: 2rem;
    `}
`;

export const IconImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* 또는 contain */
`;

export const IconS = styled.img`
  width: 0.583rem;
  height: 0.583rem;
`;

export const Button = styled.button`
  background-color: ${tokens.colors.B_Grey_7};
  color: ${tokens.colors.White};
  ${tokens.typography.B2_M_16};
  width: 6.667rem;
  height: 2rem;
  border: none;
  border-radius: 0.167rem;
  margin-left: auto;
  cursor: pointer;
`;
