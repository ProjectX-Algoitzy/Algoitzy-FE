import React from 'react'
import styled from 'styled-components'
import * as tokens from '../../tokens'
import { Link } from 'react-router-dom';

const HomeWrap = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column; 
  background-color: #0E0D12;
`;

const NormalWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 20%;
  margin-bottom: 20%;
`;

const ImgWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const FirstWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 20%;
  margin-bottom: 20%;
`;

const FirstWrapFirstSentence = styled.div`
  display: block;
  color: ${tokens.colors.B_Grey_1};
  ${tokens.typography.H1_B_60};
`;

const FirstWrapSecondSentence = styled.div`
  display: block;
  color: ${tokens.colors.B_Grey_3};
  ${tokens.typography.T3_B_24};
`;

  const BtnStudyApply = styled.div`
    ${tokens.Btns.Btn_fill_normal};
    ${tokens.typography.T3_B_24};
    margin-top: 25px;
    text-align: center; /* 텍스트를 가운데 정렬 */

    display: flex; /* 컨텐츠를 수직 가운데 정렬하기 위해 */
    justify-content: center; /* 수직 가운데 정렬 */
    align-items: center; /* 수직 가운데 정렬 */
    height: 60px; /* 버튼의 높이 조절 */
  `;

const SecondWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const SecondWrapSentence = styled.div`
  display: block;
  color: ${tokens.colors.B_Grey_1};
  ${tokens.typography.H2_SB_48};
`;

const SecondWrapStyledImage = styled.img`
  width: 100%;
  height: auto;
`;

const ThirdWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
`;

const ThirdWrapSentence = styled.div`
  display: block;
  color: ${tokens.colors.B_Grey_1};
  ${tokens.typography.H2_SB_48};
  margin: 0;
`;

const ThridWrapStyledImage = styled.img`
  width: 70%;
  height: auto;
  margin: 0;
`;

const FourthWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  /* background-color: white; */
`;

const FourthWrapSentence = styled.div`
  display: block;
  color: ${tokens.colors.B_Grey_1};
  ${tokens.typography.H1_B_60};
`;

export default function Home() {
  return (
    <HomeWrap>
      <NormalWrap>
        <FirstWrapFirstSentence>코딩테스트 준비,</FirstWrapFirstSentence>
        <FirstWrapFirstSentence>KOALA와 함께 하세요</FirstWrapFirstSentence>
        <FirstWrapSecondSentence>n개의 스터디가 당신을 기다리고 있어요!</FirstWrapSecondSentence>
        <Link style={{textDecoration:"none"}} to={{pathname: '/studylist'}}><BtnStudyApply>1기 스터디 지원하기</BtnStudyApply></Link>
      </NormalWrap>
      <ImgWrap>
        {/* <SecondWrapSentence>코딩테스트,</SecondWrapSentence>
        <SecondWrapSentence>어떻게 준비해야하지?</SecondWrapSentence>
        <SecondWrapStyledImage src='/img/b80a59b3fe063f11db82bfb8e62ed633 1.png' /> */}
        <SecondWrapStyledImage src='/img/Frame 4487153.png' />
      </ImgWrap>
      <ImgWrap>
        {/* <ThirdWrapSentence>점점 높아지는 코딩테스트 난이도</ThirdWrapSentence>
        <ThridWrapStyledImage src='/img/Group 19827.png' /> */}
        <SecondWrapStyledImage src='/img/Frame 4487154.png' />
      </ImgWrap>
      <ImgWrap>
        <SecondWrapStyledImage src='/img/Frame 4487155.png' />
        {/* <img src="/img/{{.png" alt="{{마크" style={{width:"59px", height:"79px", marginLeft:"20%"}} />
        <FourthWrapSentence>KOALA가 길을 알려줄게요.</FourthWrapSentence>
        <img src="/img/{{ (1).png" alt="{{마크" style={{width:"90px", height:"96px", marginTop:"10%"}} /> */}
      </ImgWrap>
      <ImgWrap>
        <SecondWrapStyledImage src='/img/Frame 4487156.png' />
      </ImgWrap>
      <ImgWrap>
        <SecondWrapStyledImage src='/img/Frame 4487134.png' />
      </ImgWrap>
      <ImgWrap>
        <SecondWrapStyledImage src='/img/DD.png' />
      </ImgWrap>
      <ImgWrap>
        <SecondWrapStyledImage src='/img/Frame 4487157.png' />
      </ImgWrap>
      <NormalWrap>
        <FirstWrapFirstSentence>지금 KOALA에 참여하세요!</FirstWrapFirstSentence>
        <Link style={{textDecoration:"none"}} to={{pathname: '/studylist'}}><BtnStudyApply>1기 스터디 지원하기</BtnStudyApply></Link>
      </NormalWrap>
    </HomeWrap>
  )
}
