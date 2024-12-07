import styled from 'styled-components';
import * as tokens from "../../../../tokens"


export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;  
  width: 11.65rem;
  height: 15rem;
  background-color: ${tokens.colors.White};
  border-radius: 0.33rem;
  margin: 0 0.42rem 0.83rem 0.42rem;
	box-shadow: rgba(58, 107, 135, 0.08) 0 0.17rem 0.42rem 0.17rem;
`;

export const TopContainer = styled.div`
  display: flex;
	width: 11.85rem;
  height: 8.75rem;
	border-radius: 0.33rem 0.33rem 0 0;
`;

export const TopImg = styled.img`
	width: 10.54rem;
	height: 7.58rem;
	border-radius: 0.33rem;
	margin: 0.67rem 0.67rem 0.42rem 0.67rem;
`;

export const PeopleIcon = styled.img`
	width: 1rem;
	height: 1rem;
	margin-right: 0.25rem;
`;

export const ProfileIcon = styled.img`
	width: 0.75rem;
	height: 0.75rem;
	border-radius: 0.5rem;
	margin-right: 0.33rem;
`;

export const BottomContainer = styled.div`
	display: flex;
	flex-direction: column; 
	width: 11.85rem;
	height: 6.25rem;
	border-radius: 0 0 0.33rem 0.33rem;
`;

export const Bottom = styled.div`
	display: flex;
  flex-direction: column;
	width: 10.54rem;
	margin: 0 0.67rem;
`;

export const BottomHeadCount = styled.div`
	display: flex;
  flex-direction: row;
	margin-bottom: 1.96rem;
`;

export const BottomInner = styled.div`
	display: flex;
  flex-direction: row;
`;

export const CreatedNameContainer = styled.div`
	display: flex;
	flex-direction: row; 
`;

export const BottomBottom = styled.div`
	display: flex;
  flex-direction: row;
	justify-content: space-between;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
	align-items: center;  
`;

export const Title = styled.div`
	${tokens.typography.T3_B_24};
	font-size: 0.875rem;
	margin-top: 0.42rem;
	margin-bottom: 0.33rem;
	color: black;
	cursor: pointer;
`;

export const Type = styled.div`
	display: flex;
  justify-content: center;
	align-items: center;  
	${tokens.typography.B3_M_14};
	background-color: ${tokens.colors.B_Grey_2};
	color: ${tokens.colors.B_Grey_7};
	width: 2.17rem;
	height: 1.34rem;
	border: none;
	border-radius: 0.33rem;
`;

export const HeadCount = styled.div`
	font-family: "Pretendard";
	font-weight: 600;
	font-size: 0.67rem;
	line-height: 0.875rem;
	color: ${tokens.colors.B_Grey_6};
`;

export const Total = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;  
	font-family: "Pretendard";
	font-weight: 600;
	font-size: 0.67rem;
	line-height: 0.875rem;
	color: ${tokens.colors.B_Grey_6};
	margin-left: 0.17rem;
`;

export const LocationText = styled.div`
	font-family: "Pretendard";
	font-weight: 600;
	font-size: 0.67rem;
	line-height: 0.875rem;
	color: ${tokens.colors.Grey_6};
`;

export const CreatedName = styled.div`
	font-family: "Pretendard";
	font-weight: 600;
	font-size: 0.58rem;
	line-height: 0.75rem;
	color: ${tokens.colors.Grey_7};
`;

export const CreatedDate = styled.div`
	font-family: "Pretendard";
	font-weight: 600;
	font-size: 0.58rem;
	line-height: 0.75rem;
	color: ${tokens.colors.Grey_6};
`;

export const Blank = styled.div`
	
`;