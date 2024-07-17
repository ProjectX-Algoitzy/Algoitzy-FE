import React, { useEffect, useState } from 'react'
import * as itemS from "./Styled/Langing.landing"
import request from '../../Api/request';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Langding() {
  const [detailRecentGeneration, setDetailRecentGeneration] = useState(null);
  const [detailStudyCount, setDetailStudyCount] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getRecentGeneration = async() => {
      try {
        // const response = await request.get(`/generation/max`);
        const response = await axios.get('https://user-dev.kau-koala.com/generation/max');
        console.log("스터디 최신 기수 api", response);
        setDetailRecentGeneration(response.data.result);
        if (response.data["isSuccess"]) {
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
        // const response = await request.get(`study/count`);
        const response = await axios.get('https://user-dev.kau-koala.com/study/count');
        console.log("최신 기수 스터디 개수 api", response);
        setDetailStudyCount(response.data.result);
        if (response.data["isSuccess"]) {
          console.log("api 연동 성공");
        } else {
            console.error("api 연동 실패:", response);
        }
      } catch (error) {
        console.error('최신 기수 스터디 개수 조회오류', error);
      }
    };
    const checkLoginStatus = async () => {
      try {
        const response = await request.get('/member/info');
        console.log("로그인 멤버 정보 조회", response);
        if(response["isSuccess"]) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("로그인 멤버 정보 조회 실패", error);
      }
    };
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      checkLoginStatus();
    }
    getRecentGeneration();
    getStudyCount();
  }, []);

  return (
    <itemS.HomeWrap>
      <itemS.NormalWrap>
        <itemS.FirstSentence>코딩테스트 준비,</itemS.FirstSentence>
        <itemS.FirstSentence>KOALA와 함께 하세요</itemS.FirstSentence>
        <itemS.SecondSentence>{detailStudyCount}개의 스터디가 당신을 기다리고 있어요!</itemS.SecondSentence>
        <Link style={{textDecoration:"none"}} to={isLoggedIn ? "/apply" : "/login"}><itemS.BtnStudyApply>{detailRecentGeneration}기 스터디 지원하기</itemS.BtnStudyApply></Link>
      </itemS.NormalWrap>
      <itemS.ImgWrap>
        <itemS.SecondWrapStyledImage src='/img/Frame1.png' />
      </itemS.ImgWrap>
      <itemS.ImgWrap>
        <itemS.SecondWrapStyledImage src='/img/Frame2.png' />
      </itemS.ImgWrap>
      <itemS.ImgWrap>
        <itemS.SecondWrapStyledImage src='/img/Frame3.png' />
      </itemS.ImgWrap>
      <itemS.ImgWrap>
        <itemS.SecondWrapStyledImage src='/img/Frame4.png' />
      </itemS.ImgWrap>
      <itemS.ImgWrap>
        <itemS.SecondWrapStyledImage src='/img/Frame5.png' />
      </itemS.ImgWrap>
      <itemS.ImgWrap>
        <itemS.SecondWrapStyledImage src='/img/Frame6.png' />
      </itemS.ImgWrap>
      <itemS.ImgWrap>
        <itemS.SecondWrapStyledImage src='/img/Frame7.png' />
      </itemS.ImgWrap>
      <itemS.NormalWrap>
        <itemS.FirstSentence>지금 KOALA에 참여하세요!</itemS.FirstSentence>
        <Link style={{textDecoration:"none"}} to={isLoggedIn ? "/apply" : "/login"}><itemS.BtnStudyApply>{detailRecentGeneration}기 스터디 지원하기</itemS.BtnStudyApply></Link>
      </itemS.NormalWrap>
    </itemS.HomeWrap>
  )
}
