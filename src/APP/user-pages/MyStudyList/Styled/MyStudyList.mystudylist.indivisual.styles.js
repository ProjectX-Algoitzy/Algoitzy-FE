import styled from 'styled-components';
import * as tokens from "../../../../tokens"


export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;  
  width: 11.88rem;
  height: 15rem;
  background-color: ${tokens.colors.White};
  // border: 1px solid ${tokens.colors.Grey_4};
  border-radius: 0.33rem;
  margin: 0 0.42rem 0.83rem 0.42rem;
	box-shadow: rgba(58, 107, 135, 0.08) 0 0.17rem 0.42rem 0.17rem;
`;

export const TopContainer = styled.div`
  display: flex;
	width: 11.88rem;
  height: 8.75rem;
	border-radius: 0.33rem 0.33rem 0 0;
`;

export const TopImg = styled.img`
	width: 10.54rem;
	height: 7.58rem;
	border-radius: 0.33rem;
	margin: 0.67rem 0.67rem 0.42rem 0.67rem;
`;

export const TopInner = styled.div`
`;

export const ProfileIcon = styled.div`
  background-image: url('/img/test.png');
	width: 0.75rem;
	height: 0.75rem;
	margin-right: 0.33rem;
	border-radius: 0.75rem;
`;

export const PeopleIcon = styled.img`
	width: 1rem;
	height: 1rem;
	margin-right: 0.33rem;
`;

export const BottomContainer = styled.div`
	display: flex;
	flex-direction: column; 
	width: 11.88rem;
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

export const Title = styled.div`
	${tokens.typography.T3_B_24};
	font-size: 0.875rem;
	margin-top: 0.42rem;
	margin-bottom: 0.33rem;
	color: black;
	cursor: pointer;
`;

export const HeadCount = styled.div`
	font-family: "Pretendard";
	font-weight: 600;
	font-size: 0.67rem;
	line-height: 0.875rem;
	color: ${tokens.colors.Grey_6};
`;

export const Total = styled.div`
	font-family: "Pretendard";
	font-weight: 600;
	font-size: 0.67rem;
	line-height: 0.875rem;
	color: ${tokens.colors.Grey_4};
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