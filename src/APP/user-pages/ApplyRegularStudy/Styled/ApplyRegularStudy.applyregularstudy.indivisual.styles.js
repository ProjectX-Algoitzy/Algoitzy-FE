import styled from 'styled-components';
import * as tokens from "../../../../tokens"


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;  

  width: 16.04rem;
  height: 22.25rem;
  background-color: ${tokens.colors.White};
  border-radius: 0.33rem;
  margin: 0 0.42rem 0.83rem 0.42rem;
  box-shadow: rgba(58, 107, 135, 0.08) 0 0.17rem 0.42rem 0.17rem;
	
`;

export const TopImg = styled.img`
  width: 14.17rem;
  height: 10.83rem;
  border-radius: 0.33rem;
  margin: 1.42rem 0 0.5rem 0;
`;


// 스터디 이름 글자
export const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  ${tokens.typography.T1_SB_32};
  width: 14.17rem;
  margin-bottom: 1.33rem;
  color: ${tokens.colors.Grey_8};
`;

// 스터디 상세 보기 버튼
export const Detail = styled.button`
  ${tokens.typography.T4_SB_20};
  width: 14.13rem;
  height: 2.33rem;
  background-color: ${tokens.colors.White};
  color: ${tokens.colors.B_Grey_8};
  border: 0.04rem solid ${tokens.colors.B_Grey_8};
  border-radius: 0.33rem;
  margin-bottom: 0.33rem;
  cursor: pointer;
`;
// 지원하기 버튼
export const Apply = styled.button`
  ${tokens.typography.T4_SB_20};
  width: 14.13rem;
  height: 2.33rem;
  background-color: ${tokens.colors.B_Grey_8};
  color: ${tokens.colors.White};
  border: 0.04rem solid ${tokens.colors.B_Grey_8};
  border-radius: 0.33rem;
  margin-bottom: 1.33rem;
  cursor: pointer;
`;
