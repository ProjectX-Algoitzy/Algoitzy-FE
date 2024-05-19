import React, { useEffect, useState } from 'react'
import * as itemS from "./Styled/Langing.landing"
import request from '../../Api/request';
import { Link } from 'react-router-dom';

export default function Langding() {
  const [detailRecentGeneration, setDetailRecentGeneration] = useState(null);
  const [detailStudyCount, setDetailStudyCount] = useState(null);

  useEffect(() => {
    const getRecentGeneration = async() => {
      try {
        const response = await request.get(`study/max-generation`);
        console.log("스터디 최신 기수 api", response);
        setDetailRecentGeneration(response.result);
        if (response["isSuccess"]) {
          console.log("api 연동 성공");
        } else {
            console.error("api 연동 실패:", response);
        }
      } catch (error) {
        console.error('스터디 최근 기수 조회 오류', error);
      }
    };
    const getStudyCount = async() => {
      try {
        const response = await request.get(`study/count`);
        console.log("최신 기수 스터디 개수 api", response);
        setDetailStudyCount(response.result);
        if (response["isSuccess"]) {
          console.log("api 연동 성공");
        } else {
            console.error("api 연동 실패:", response);
        }
      } catch (error) {
        console.error('최신 기수 스터디 개수 조회오류', error);
      }
    };
    getRecentGeneration();
    getStudyCount();
  }, []);

  return (
    <itemS.HomeWrap>
      <itemS.NormalWrap>
        <itemS.FirstSentence>코딩테스트 준비,</itemS.FirstSentence>
        <itemS.FirstSentence>KOALA와 함께 하세요</itemS.FirstSentence>
        <itemS.SecondSentence>{detailStudyCount}개의 스터디가 당신을 기다리고 있어요!</itemS.SecondSentence>
        <Link style={{textDecoration:"none"}} to={{pathname: '/studylist'}}><itemS.BtnStudyApply>{detailRecentGeneration}기 스터디 지원하기</itemS.BtnStudyApply></Link>
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
        <Link style={{textDecoration:"none"}} to={{pathname: '/studylist'}}><itemS.BtnStudyApply>{detailRecentGeneration}기 스터디 지원하기</itemS.BtnStudyApply></Link>
      </itemS.NormalWrap>
    </itemS.HomeWrap>
  )
}
