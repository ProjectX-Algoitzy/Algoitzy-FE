import styled from 'styled-components';
import * as tokens from "../../../../tokens"


export const Container = styled.div`
  
`;

export const Table = styled.div`
  display: flex;
  flex-direction: column;
`;

// 카테고리 파트 시작
export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: rgba(0, 165, 255, 0.05);
  width: 50rem;
  height: 2.29rem;
  border-bottom: 0.042rem solid ${tokens.colors.B_Grey_4};
`;

export const CategoryNumber = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${tokens.typography.T5_SB_16};
  color: ${tokens.colors.Black};
  text-align: center;
  width: 3rem;
`;

export const CategoryTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  ${tokens.typography.T5_SB_16};
  color: ${tokens.colors.Black};
  text-align: center;
  width: 8.33rem;
  margin-left: 6.71rem;
`;

// 카테고리 파트 끝

// 튜플 파트 
export const TupleContainer = styled.div`
  display: flex;
  flex-direction: column;
  // overflow: auto;

  // &::-webkit-scrollbar {
  //   width: 0px; /* Chrome, Safari, Opera용 */
  // }
  // scrollbar-width: none; /* Firefox용 */
`;