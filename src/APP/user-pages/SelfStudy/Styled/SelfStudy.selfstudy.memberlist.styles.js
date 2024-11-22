import styled from "styled-components";
import * as tokens from "../../../../tokens";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1.333rem;
  height: 100%;
  /* width: 33.042rem; */
  width: 39.042rem;
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4.167rem;
  margin-bottom: 1.5rem;
  width: 100%;
  ${tokens.typography.T1_SB_32};
  color: ${tokens.colors.Grey_8};
  padding-bottom: 0.667rem;
  border-bottom: 1px solid ${tokens.colors.B_Grey_2};
`;

export const StyledTable = styled.table`
  border-collapse: collapse;
`;

export const StyledTd = styled.td`
  color: ${tokens.colors.Grey_7};
  ${tokens.typography.T5_SB_16};
  padding: 0.33rem;
  text-align: center;
  background-color: ${({ rowIndex, colIndex }) => {
    if (rowIndex === 0) return 'rgba(0, 165, 255, 0.03)'; // 첫번째 행에만 적용
    return 'white';
  }};
  border-top: ${({ rowIndex }) => (rowIndex === 0 ? 'none' : '0.042rem solid #B9C4D2')};
  width: ${({ colIndex }) => {
    if (colIndex === 0) return '5%';
    if (colIndex === 1) return '10%';
    if (colIndex === 3) return '20%';
    return 'auto';
  }};
  height: ${({ rowIndex }) => (rowIndex === 0 ? '2.5rem' : '2.88rem')};
`;

export const ParticipatingBlock = styled.button`
  width: 131px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid ${tokens.colors.B_Grey_4};
  color: ${tokens.colors.B_Grey_8};
  ${tokens.typography.T5_SB_16}
  background-color: ${tokens.colors.B_Grey_3};
`;

export const AcceptanceBtn = styled.button`
  width: 131px;
  height: 40px;
  border-radius: 4px;
  border: 1px solid ${tokens.colors.B_Grey_4};
  cursor: pointer;
  color: ${tokens.colors.B_Grey_8};
  ${tokens.typography.T5_SB_16}
  background-color: ${tokens.colors.B_Grey_1};
`;