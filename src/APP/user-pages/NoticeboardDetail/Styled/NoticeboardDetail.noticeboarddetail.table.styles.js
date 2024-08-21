import styled from 'styled-components';
import * as tokens from "../../../../tokens"

export const Container = styled.div`
`;

export const Table = styled.div`
  display: flex;
  flex-direction: column;
`;

// 카테고리 파트 시작
export const CommentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  // background-color: rgba(0, 165, 255, 0.05);
  width: 50rem;
  height: 2.292rem;
  // border-bottom: 0.042rem solid ${tokens.colors.B_Grey_4};
  margin-bottom: 0.833rem;
`;

export const CommentInput = styled.input`
  box-sizing: border-box;
  border-radius: 0.167rem;
  border: 0.042rem solid ${tokens.colors.Grey_4};
  width: 44.583rem;
  height: 2.333rem;
  color: ${tokens.colors.Grey_7};
  ${tokens.typography.B3_M_14};
  padding-left: 0.667rem;

  &::placeholder {
    color: ${tokens.colors.Grey_4};
  }
  &:focus {
    outline: none;
  }
  // margin-left: 1.708rem;

`;

export const CommentButton = styled.button`
  ${tokens.typography.T5_SB_16};
  color: ${tokens.colors.Black};
  width: 4rem;
  height: 1.3rem;

  // border: 1px solid ${tokens.colors.Black};
  border: none;
  // margin-right: 1.708rem;
  cursor: pointer;
`;

// 카테고리 파트 끝

// 튜플 파트 
export const TupleContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 12rem;
  // overflow: auto;

  // &::-webkit-scrollbar {
  //   width: 0px; /* Chrome, Safari, Opera용 */
  // }
  // scrollbar-width: none; /* Firefox용 */
`;