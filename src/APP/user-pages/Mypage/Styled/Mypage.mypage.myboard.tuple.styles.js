import styled from 'styled-components';
import * as tokens from "../../../../tokens"


export const Container = styled.div`
  
`;


// 튜플 파트 시작
export const TupleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 50rem;
  border-bottom: 0.04rem solid ${tokens.colors.B_Grey_3};
  background-color: ${({ fixyn }) => (fixyn ? tokens.colors.B_Grey_1 : 'transparent')};
  &:hover {
    background-color: ${tokens.colors.B_Grey_2};
  }
`;

export const CheckBox = styled.input`
  width: 0.875rem;
  height: 0.875rem;
  display: flex;
  justify-content: center;
  align-items: center;
  appearance: none;
  border: 0.08rem solid #ccc;
  border-radius: 0.16rem;
  background-color: #fff;
  cursor: pointer;

  &:checked {
    background-color: #007bff;
    border-color: #007bff;
  }

  &:checked::before {
    content: '✔'; 
    color: #fff;
    font-size: 0.583rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const TupleId = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${tokens.typography.B2_M_16};
  color: ${tokens.colors.Black};
  width: 5rem;
  min-height: 2.333rem;
  cursor: pointer;
`;

export const TupleTitleBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 29rem;
  min-height: 2.333rem;
  margin-left: 3.417rem;
  cursor: pointer;
`;

export const TupleTitle = styled.span`
  ${tokens.typography.B2_M_16};
  color: ${tokens.colors.Black};
`;

export const HighlightedText = styled.span`
  ${tokens.typography.B2_M_16};
  color: ${tokens.colors.Blue_0_Main};
`;

export const NewIcon = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   ${tokens.typography.B2_M_16};
   background-color: rgba(251, 170, 132, 0.2);
   color: ${tokens.colors.Sub_3};
   width: 2.17rem;
   height: 0.88rem;
   border: none;
   border-radius: 0.17rem;
   margin-left: 0.17rem;
`;

export const TupleWriter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${tokens.typography.B2_M_16};
  color: ${tokens.colors.Black};
  width: 4.667rem;
  min-height: 2.333rem;
  cursor: pointer;
`;

export const TupleDate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${tokens.typography.B2_M_16};
  color: ${tokens.colors.Black};
  width: 5.75rem;
  min-height: 2.333rem;
  cursor: pointer;
`;

export const TupleView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${tokens.typography.B2_M_16};
  color: ${tokens.colors.Black};
  width: 3.833rem;
  min-height: 2.333rem;
  // margin-right: 1.667rem;
  cursor: pointer;
`;
// 튜플 파트 끝
