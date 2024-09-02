import styled from 'styled-components';
import * as tokens from "../../../../tokens";

export const HomeWrap = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column; 
  background-image: url('/img/landing-background.png');
`;

export const NormalWrap = styled.div` 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 20%;
  margin-bottom: 20%;
`;//이동버튼이 있을 경우, 이미지가 아닌 직접 css를 수정해서 코딩했기에 해당 부분들을 감까주는 Wrap입니다

export const ImgWrap = styled.div` 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;//이미지들을 감싸주기 위한 Wrap입니다

export const FirstSentence = styled.div` 
  display: block;
  color: ${tokens.colors.Grey_8};
  ${tokens.typography.H1_B_60};
`;//NormalWrap에 들어가는 문장1

export const SecondSentence = styled.div` 
  display: block;
  color: ${tokens.colors.B_Grey_6};
  ${tokens.typography.T3_B_24};
`;//NormalWrap에 들어가는 문장2

export const BtnStudyApply = styled.div` 
    width: 13.333rem;
		height: 3rem;
		background: ${tokens.colors.B_Grey_8};
		color: ${tokens.colors.White};
		border-radius: 0.167rem;
		border: none;
		cursor: pointer;
    ${tokens.typography.T3_B_24};
    margin-top: 1.042rem;
    text-align: center; 

    display: flex; 
    justify-content: center; 
    align-items: center;
    height: 2.5rem;
`; //이동버튼

export const SecondWrapStyledImage = styled.img` 
  width: 100%;
  height: auto;
`;//이미지 스타일링