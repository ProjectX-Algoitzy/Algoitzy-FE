import React from 'react'
import * as itemS from "./Styled/Langing.landing"
import { Link } from 'react-router-dom';

export default function Langding() {
  return (
    <itemS.HomeWrap>
      <itemS.NormalWrap>
        <itemS.FirstSentence>코딩테스트 준비,</itemS.FirstSentence>
        <itemS.FirstSentence>KOALA와 함께 하세요</itemS.FirstSentence>
        <itemS.SecondSentence>n개의 스터디가 당신을 기다리고 있어요!</itemS.SecondSentence>
        <Link style={{textDecoration:"none"}} to={{pathname: '/studylist'}}><itemS.BtnStudyApply>1기 스터디 지원하기</itemS.BtnStudyApply></Link>
      </itemS.NormalWrap>
      <itemS.ImgWrap>
        <itemS.SecondWrapStyledImage src='/img/Frame 4487153.png' />
      </itemS.ImgWrap>
      <itemS.ImgWrap>
        <itemS.SecondWrapStyledImage src='/img/Frame 4487154.png' />
      </itemS.ImgWrap>
      <itemS.ImgWrap>
        <itemS.SecondWrapStyledImage src='/img/Frame 4487155.png' />
      </itemS.ImgWrap>
      <itemS.ImgWrap>
        <itemS.SecondWrapStyledImage src='/img/Frame 4487156.png' />
      </itemS.ImgWrap>
      <itemS.ImgWrap>
        <itemS.SecondWrapStyledImage src='/img/Frame 4487134.png' />
      </itemS.ImgWrap>
      <itemS.ImgWrap>
        <itemS.SecondWrapStyledImage src='/img/DD.png' />
      </itemS.ImgWrap>
      <itemS.ImgWrap>
        <itemS.SecondWrapStyledImage src='/img/Frame 4487157.png' />
      </itemS.ImgWrap>
      <itemS.NormalWrap>
        <itemS.FirstSentence>지금 KOALA에 참여하세요!</itemS.FirstSentence>
        <Link style={{textDecoration:"none"}} to={{pathname: '/studylist'}}><itemS.BtnStudyApply>1기 스터디 지원하기</itemS.BtnStudyApply></Link>
      </itemS.NormalWrap>
    </itemS.HomeWrap>
  )
}
