import styled from 'styled-components';
import * as tokens from "../../../../tokens"


// 튜플 파트 시작
export const TupleContainer = styled.div`
  display: flex;
  // position: relative;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 1200px;
  // height: 55px;
  
  border-bottom: 1px solid ${tokens.colors.B_Grey_3};
  &:hover {
    background-color: ${tokens.colors.B_Grey_1};
  }
  cursor: pointer;
`;

export const TupleNumber = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${tokens.typography.T5_SB_16};
  color: ${tokens.colors.Black};
  width: 72px;
  height: 56px;
`;

export const TupleName = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${tokens.typography.T5_SB_16};
  color: ${tokens.colors.Black};
  width: 1056px;
  height: 56px;
`;

export const TupleView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${tokens.typography.T5_SB_16};
  color: ${tokens.colors.Black};
  width: 72px;
  height: 56px;
`;


