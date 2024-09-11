import styled from 'styled-components';
import * as tokens from "../../../../tokens"


export const Container = styled.div`
  @media (max-width: 600px) {
    width: 32rem;
  }
`;

export const Table = styled.div`
  display: flex;
  flex-direction: column;
  
`;

// 카테고리 파트 시작
export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 165, 255, 0.05);
  width: 50rem;
  height: 2.29rem; 
  border-bottom: 0.04rem solid ${tokens.colors.B_Grey_4};
  margin-bottom: 0.83rem; 
  
  @media (max-width: 600px) {
    width: 100%;
  }
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

export const CategoryName = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${tokens.typography.T5_SB_16};
  color: ${tokens.colors.Black};
  text-align: center;
  width: 44rem;
`;

export const CategoryView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  ${tokens.typography.T5_SB_16};
  color: ${tokens.colors.Black};
  text-align: center;
  width: 3rem;
`;

// 카테고리 파트 끝

// 튜플 파트 
export const TupleContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 25.46rem;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0px;
  }
  scrollbar-width: none;
`;