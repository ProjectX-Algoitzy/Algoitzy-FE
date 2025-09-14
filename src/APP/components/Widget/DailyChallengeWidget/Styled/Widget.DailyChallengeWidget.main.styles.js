import styled, { css } from "styled-components";
import * as tokens from "../../../../../tokens";

export const DailyChallengeWidget = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 11.54rem;
  height: 7rem;
  background-color: white;
  box-shadow: 0 0.166rem 0.563rem 0.25rem rgba(80, 115, 135, 0.15);
  border-radius: 0.542rem;

  z-index: 999;
`;

export const Relative = styled.div`
  position: relative;
  display: flex;
  /* flex-direction: column;
  justify-content: center;
  align-items: center; */
  width: 11.54rem;
  height: 7rem;
  padding: 0.916rem 0.875rem 0.7rem 0.875rem;
`;

export const Icon = styled.img`
  position: absolute;
  top: -7%;
  left: -8%;
  width: 2.8rem;
  height: 2.8rem;
`;

export const TextImg = styled.img`
  width: 6.8rem;
  height: 1rem;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const Title = styled.div`
  font-family: "Schablona";
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.125rem;
  color: ${tokens.colors.Grey_8};
  /* margin-bottom: 0.3rem; */
`;

export const RemainingTimeWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.333rem;
  /* margin-bottom: 0.416rem; */
`;

export const RemainingLabel = styled.span`
  ${({ status }) => {
    switch (status) {
      case 1:
        return css`
          font-size: 1.666rem;
          font-weight: 700;
          color: #0099ed;
        `;
      case 2:
        return css`
          ${tokens.typography.T3_B_24};
          color: #0099ed;
        `;
      case 3:
        return css`
          ${tokens.typography.T3_B_24};
          color: ${tokens.colors.B_Grey_6};
        `;
      default:
        return css`
          font-size: 1.666rem;
          font-weight: 700;
          color: #0099ed;
        `;
    }
  }}
`;

export const RemainingValue = styled.span`
  ${tokens.typography.T3_B_24};
  color: #0099ed;
`;

export const RemainingTime = styled.div`
  font-family: "Pretendard";
  font-size: 1.666rem;
  font-weight: 700;
  line-height: 1.833rem;
  color: #0099ed;
`;

export const ActionButton = styled.button`
  width: 9.8rem;
  height: 2rem;
  ${tokens.typography.T3_B_24};
  background-color: ${({ status }) => (status === 1 ? "#0099ED" : "#3E495A")};
  color: white;
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
`;
