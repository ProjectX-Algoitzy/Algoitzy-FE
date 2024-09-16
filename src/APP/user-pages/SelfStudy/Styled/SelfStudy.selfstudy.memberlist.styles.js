import styled from "styled-components";
import * as tokens from "../../../../tokens";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1.33rem;
  height: 100%;
`;

export const Title = styled.div`
  display: flex;
  margin-top: 4.17rem;
  margin-bottom: 1.5rem;
  width: 33.04rem;
  ${tokens.typography.T1_SB_32};
  color: ${tokens.colors.Grey_8};
  padding-bottom: 0.67rem;
  border-bottom: 0.042rem solid ${tokens.colors.B_Grey_2};
`;

export const StyledTable = styled.table`
  width: 33.04rem;
  /* height: 11.54rem; */
  border-collapse: collapse;
`;

export const StyledTd = styled.td`
  color: ${tokens.colors.Grey_7};
  ${tokens.typography.T5_SB_16};
  /* border: 0.042rem solid #B9C4D2; */
  padding: 0.33rem;
  text-align: center;
  background-color: ${({ rowIndex, colIndex }) => {
    if (rowIndex === 0 && colIndex === 0) return 'rgba(0, 165, 255, 0.05)';
    if (rowIndex === 0) return 'rgba(0, 165, 255, 0.05)';
    if (colIndex === 0) return 'rgba(216, 216, 216, 0.05)';
    return 'white';
  }};
  border-top: ${({ rowIndex }) => (rowIndex === 0 ? 'none' : '0.042rem solid #B9C4D2')};
  /* height: ${({ rowIndex }) => (rowIndex === 0 ? '1.88rem' : '2.29rem')};
  width: ${({ colIndex }) => (colIndex === 0 ? '7.33rem' : '2.29rem')}; */
  width: ${({ colIndex }) => (colIndex === 0 ? '7.33rem' : 'auto')};
  height: ${({ rowIndex }) => (rowIndex === 0 ? '1.88rem' : '2.5rem')};
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