import styled from 'styled-components';
import * as tokens from "../../../../tokens"


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;  

  width: 385px;
  height: 534px;
  background-color: ${tokens.colors.White};
  border-radius: 8px;
  margin: 0px 10px 20px 10px;
	box-shadow: rgba(58, 107, 135, 0.08) 0px 4px 10px 4px;
	
`;

export const TopImg = styled.img`
	width: 340px;
	height: 260px;
	border-radius: 8px;
	margin: 34px 0 12px 0;
`;


// 스터디 이름 글자
export const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
	${tokens.typography.T1_SB_32};
  width: 340px;
	margin-bottom: 32px;
	color: ${tokens.colors.Grey_8};
	
`;
// 스터디 상세 보기 버튼
export const Detail = styled.button`
	${tokens.typography.T4_SB_20};
  width: 339px;
  height: 56px;
  background-color: ${tokens.colors.White};
	color: ${tokens.colors.B_Grey_8};
  border: 1px solid ${tokens.colors.B_Grey_8};
  border-radius: 8px;
	margin-bottom: 8px;
	cursor: pointer;
`;
// 지원하기 버튼
export const Apply = styled.button`
	${tokens.typography.T4_SB_20};
  width: 339px;
  height: 56px;
  background-color: ${tokens.colors.B_Grey_8};
	color: ${tokens.colors.White};
  border: 1px solid ${tokens.colors.B_Grey_8};
  border-radius: 8px;
	margin-bottom: 32px;
	cursor: pointer;
`;
