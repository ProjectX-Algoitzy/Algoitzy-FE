import styled from 'styled-components';
import * as tokens from '../../../../tokens';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1.333rem;
  height: 100%;
  width: 100%;
  max-width: 34rem;

  @media (max-width: 600px) {
    width: 33.04rem;
    padding-right: 1.33rem;
  }
`;

export const Title = styled.div`
  display: flex;
  margin-top: 4.17rem;
  margin-bottom: 0.25rem;
  width: 100%;
  ${tokens.typography.T1_SB_32};
  color: ${tokens.colors.Grey_8};
  padding-bottom: 0.67rem;
  border-bottom: 0.042rem solid ${tokens.colors.B_Grey_2};
`;

export const BlueComment = styled.div`
  display: flex;
  align-items: center;
  ${tokens.typography.B3_M_14};
  line-height: 0.875rem;
  letter-spacing: 0;
  text-align: left;
  vertical-align: middle;
  color: ${tokens.colors.Blue_0_Main};
`;

export const GrayBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6.667rem;
  height: 1.75rem;
  border-radius: 0.167rem;
  background-color: #dfe8f1;
  color: ${tokens.colors.B_Grey_7};
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 700;
  font-size: 0.583rem;
  line-height: 0.875rem;
  letter-spacing: 0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 2px;
  }
`;

// 누적 교환권 관련 스타일 추가
export const TicketContainer = styled.div`
  display: flex;
  margin-right: 0.417rem;
  position: relative;
`;

export const TicketBox = styled.div`
  display: flex;
  align-items: center;
  background-color: ${tokens.colors.Grey_3};
  width: 2.792rem;
  height: 0.792rem;
  border-radius: 0.396rem;
  cursor: pointer;
  position: relative;

  &:hover .tooltip {
    visibility: visible;
    opacity: 1;
  }
`;

export const TicketIcon = styled.img`
  margin-left: -0.308rem;
  margin-right: -0.108rem;
  width: 2.2rem;
`;

export const TicketCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 0.583rem;
  line-height: 0.875rem;
  color: ${tokens.colors.Grey_6};
`;

// 툴팁 스타일 추가
export const Tooltip = styled.div`
  position: absolute;
  left: 26%;
  bottom: 1.433rem;
  transform: translateX(-50%);
  background-color: ${tokens.colors.Grey_8};
  color: white;
  width: 5rem;
  height: 1.5rem;
  border-radius: 0.375rem;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 500;
  font-size: 0.71rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1000;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 0.275rem solid transparent;
    border-right: 0.275rem solid transparent;
    border-top: 0.375rem solid ${tokens.colors.Grey_8};
  }
`;

export const CanNotEnterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 15rem;
  background-color: ${tokens.colors.B_Grey_1};
  border-radius: 0.42rem;
  color: ${tokens.colors.B_Grey_5};
  ${tokens.typography.T3_B_24};
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const StyledTd = styled.td`
  color: ${tokens.colors.Grey_7};
  ${tokens.typography.T5_SB_16};
  border: 0.042rem solid #b9c4d2;
  padding: 0.583rem;
  text-align: center;

  cursor: ${({ rowIndex, colIndex }) =>
    rowIndex !== 0 && colIndex === 0 ? 'pointer' : 'default'};
  transition: ${({ rowIndex, colIndex }) =>
    rowIndex !== 0 && colIndex === 0
      ? 'background-color 0.2s ease-in-out, color 0.2s ease-in-out'
      : 'none'};

  background-color: ${({ rowIndex, colIndex }) => {
    if (rowIndex === 0 && colIndex === 0) return 'rgba(0, 165, 255, 0.05)';
    if (rowIndex === 0) return 'rgba(0, 165, 255, 0.05)';
    if (colIndex === 0) return 'rgba(216, 216, 216, 0.05)';
    return 'white';
  }};
  border-top: ${({ rowIndex }) =>
    rowIndex === 0 ? 'none' : '0.042rem solid #B9C4D2'};
  border-left: ${({ colIndex }) =>
    colIndex === 0 ? 'none' : '0.042rem solid #B9C4D2'};
  border-right: ${({ colIndex }) =>
    colIndex === 8 ? 'none' : '0.042rem solid #B9C4D2'};
  width: ${({ colIndex }) => (colIndex === 0 ? '7.333rem' : '3.208rem')};
  height: ${({ rowIndex }) => (rowIndex === 0 ? '2.292rem' : '3.042rem')};

  ${({ rowIndex, colIndex }) =>
    rowIndex !== 0 &&
    colIndex === 0 &&
    `
      &:hover {
        background-color: ${tokens.colors.Blue_0_Main};
        color: ${tokens.colors.B_Grey_1};
      }
    `}
`;

export const ImgIcon = styled.img`
  width: 1.96rem;
  height: 1.96rem;
`;

export const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 1.5rem;
`;

export const PreviousBtn = styled.button`
  margin-right: 0.708rem;
  width: 6.667rem;
  height: 2rem;
  border-radius: 0.167rem;
  border: none;
  cursor: pointer;
  color: ${tokens.colors.B_Grey_7};
  ${tokens.typography.T5_SB_16}
  background-color: #DFE8F1;
`;

export const ApiTriggerBtn = styled.button`
  width: 6.667rem;
  height: 2rem;
  border-radius: 0.167rem;
  border: none;
  cursor: pointer;
  color: ${tokens.colors.White};
  ${tokens.typography.T5_SB_16}
  background-color: ${tokens.colors.B_Grey_7};
`;
