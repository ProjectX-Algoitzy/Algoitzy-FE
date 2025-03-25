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

  // &:hover {
  //   background-color: ${tokens.colors.B_Grey_2};
  //   cursor: ${(props) => (props['data-delete-yn'] ? 'not-allowed' : 'pointer')};
  // }
  &:hover {
    background-color: ${(props) => (props.temp === 'true' ? 'inherit' : tokens.colors.B_Grey_2)};
    cursor: ${(props) => (props.temp === 'true' ? 'default' : props['data-delete-yn'] ? 'not-allowed' : 'pointer')};
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
  margin-left: 1rem;
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


export const Blank = styled.div`
  width: 0.875rem;
`;

export const TupleId = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${tokens.typography.B2_M_16};
  color: ${tokens.colors.Black};
  width: 5rem;
  min-height: 2.333rem;
  // cursor: pointer;
`;

export const TupleTitleBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 2.333rem;
  width: 21rem;
  margin-left: 3.3rem;
  margin-right: 8.117rem;
  // width: 29rem;
  // margin-left: 3.417rem;
  // cursor: pointer;
`;


export const DeletedIcon = styled.img`
  width: 0.833rem;
  height: 0.833rem;
  margin-right: 0.16rem;
`;


export const TupleTitle = styled.span`
  ${tokens.typography.B2_M_16};
  color: ${(props) => (props['data-delete-yn']? tokens.colors.Sub_3 : tokens.colors.Black)};
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
  // cursor: pointer;
`;

export const TupleDate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${tokens.typography.B2_M_16};
  color: ${tokens.colors.Black};
  width: 5.25rem;
  min-height: 2.333rem;
`;

export const TupleView = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  ${tokens.typography.B2_M_16};
  color: ${tokens.colors.Black};
  width: 3rem;
  margin-left: 0.833rem;
  margin-right: 2.43rem;
  min-height: 2.333rem;
`;

export const TupleTempDate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${tokens.typography.B2_M_16};
  color: ${tokens.colors.Black};
  width: 9.6rem;
  min-height: 2.333rem;
  margin-left: 2rem;
  // cursor: pointer;
`;

export const TupleProcess = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${tokens.typography.T5_SB_16};
  color: ${tokens.colors.Black};
  width: 3.833rem;
  min-height: 2.333rem;
  margin-right: 1.667rem;
  cursor: pointer;
`;

export const ProcessingYNBox = styled.div`
  background-color: ${({ solvedYn }) => (solvedYn ? tokens.colors.Blue_0_Main : tokens.colors.Grey_4)};
  color: ${tokens.colors.White};
  width: 3.167rem;
  height: 0.875rem;
  border: none;
  border-radius: 0.16rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 튜플 파트 끝

