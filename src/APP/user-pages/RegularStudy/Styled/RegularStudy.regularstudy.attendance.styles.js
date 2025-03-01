import styled from "styled-components";
import * as tokens from "../../../../tokens";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1.33rem;
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
  margin-bottom: 1.5rem;
  width: 100%;
  ${tokens.typography.T1_SB_32};
  color: ${tokens.colors.Grey_8};
  padding-bottom: 0.67rem;
  border-bottom: 0.042rem solid ${tokens.colors.B_Grey_2};
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
  border: 0.042rem solid #B9C4D2;
  padding: 0.33rem;
  text-align: center;
  background-color: ${({ rowIndex, colIndex }) => {
    if (rowIndex === 0 && colIndex === 0) return 'rgba(0, 165, 255, 0.05)';
    if (rowIndex === 0) return 'rgba(0, 165, 255, 0.05)';
    if (colIndex === 0) return 'rgba(216, 216, 216, 0.05)';
    return 'white';
  }};
  border-top: ${({ rowIndex }) => (rowIndex === 0 ? 'none' : '0.042rem solid #B9C4D2')};
  border-left: ${({ colIndex }) => (colIndex === 0 ? 'none' : '0.042rem solid #B9C4D2')};
  border-right: ${({ colIndex }) => (colIndex === 8 ? 'none' : '0.042rem solid #B9C4D2')};
  width: ${({ colIndex }) => (colIndex === 0 ? '7.33rem' : 'auto')};
  height: ${({ rowIndex }) => (rowIndex === 0 ? '1.88rem' : '2.5rem')};
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

export const CertificationBtn = styled.button`
  width: 7.33rem;
  height: 2rem;
  border-radius: 0.167rem;
  border: none;
  cursor: pointer;
  color: ${tokens.colors.White};
  ${tokens.typography.T5_SB_16}
  background-color: ${tokens.colors.B_Grey_7};
`;