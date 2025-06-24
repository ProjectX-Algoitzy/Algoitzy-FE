import styled, { css } from "styled-components";
import * as tokens from "../../../../tokens";

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
  right: 13.74rem;
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
  width: 4.833rem;
  height: 0.167rem;
  background: linear-gradient(90deg, #00a5ff 74.04%, rgba(0, 165, 255, 0) 100%);
  border-radius: 0.083rem;
`;

export const Icon = styled.img`
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  ${({ $position }) => $position && `left: ${$position};`}

  ${({ $size }) =>
    $size === "S" &&
    css`
      width: 1rem;
      height: 1rem;
    `}

  ${({ $size }) =>
    $size === "M" &&
    css`
      top: 0.5rem;
      width: 2rem;
      height: 2rem;
    `}

  ${({ $size }) =>
    $size === "L" &&
    css`
      width: 3rem;
      height: 3rem;
    `}
`;

export const IconS = styled.img`
  width: 1rem;
  height: 1rem;
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
