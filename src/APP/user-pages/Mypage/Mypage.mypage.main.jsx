import React, { useEffect, useState } from 'react';
import MyPageIndividual from './Mypage.mypage.indivisual';
import MyInfo from './Mypage.mypage.myinfo';
import * as itemS from "./Styled/Mypage.mypage.main.styles";
import request from '../../Api/request';

export default function MyPage() {
  const [myInfoData, setMyInfoData] = useState({});
  const [passStudyList, setPassStudyList] = useState([]);
  const [applyStudyList, setApplyStudyList] = useState([]);

  const [memberId, setMemberId] = useState(localStorage.getItem('memberId'));

  // 페이지 네비게이션 상태
  const [currentPagePassStudy, setCurrentPagePassStudy] = useState(1);
  const [currentPageApplyStudy, setCurrentPageApplyStudy] = useState(1);

  const itemsPerPage = 4; // 한 페이지에 보여줄 스터디 개수
  const totalPagesPassStudy = Math.ceil(passStudyList.length / itemsPerPage); // 참여 스터디 총 페이지 수
  const totalPagesApplyStudy = Math.ceil(applyStudyList.length / itemsPerPage); // 지원 스터디 총 페이지 수

  const fetchMyInfo = async () => {
    try {
      const response = await request.get(`/member/${memberId}/info`);

      if (response.isSuccess) {
        console.log("나의 정보 조회 성공",response);
        setMyInfoData(response.result);
      } else {
        console.error("나의 정보 조회 실패:", response);
      }
    } catch (error) {
      console.error('나의 정보 조회 오류', error);
    }
  };
  
  const fetchMyStudy = async () => {
    try {
      const response = await request.get(`/member/${memberId}/study`);

      if (response.isSuccess) {
        console.log("나의 스터디 조회 성공",response); 
        setPassStudyList(response.result.passStudyList);
        setApplyStudyList(response.result.applyStudyList);
      } else {
        console.error("나의 스터디 조회 실패:", response);
      }
    } catch (error) {
      console.error('나의 스터디 조회 오류', error);
    }
  };

  useEffect(() => {
    fetchMyInfo();
    fetchMyStudy();
  }, []);

  // 현재 페이지에 해당하는 참여 스터디 리스트 가져오기
  const indexOfLastPassItem = currentPagePassStudy * itemsPerPage;
  const indexOfFirstPassItem = indexOfLastPassItem - itemsPerPage;
  const currentPassItems = passStudyList.slice(indexOfFirstPassItem, indexOfLastPassItem);

  // 현재 페이지에 해당하는 지원 스터디 리스트 가져오기
  const indexOfLastApplyItem = currentPageApplyStudy * itemsPerPage;
  const indexOfFirstApplyItem = indexOfLastApplyItem - itemsPerPage;
  const currentApplyItems = applyStudyList.slice(indexOfFirstApplyItem, indexOfLastApplyItem);

  // 참여 스터디 페이지 넘김 함수
  const handleNextPagePassStudy = () => {
    if (currentPagePassStudy < totalPagesPassStudy) {
      setCurrentPagePassStudy(currentPagePassStudy + 1);
    }
  };

  const handlePrevPagePassStudy = () => {
    if (currentPagePassStudy > 1) {
      setCurrentPagePassStudy(currentPagePassStudy - 1);
    }
  };

  // 지원 스터디 페이지 넘김 함수
  const handleNextPageApplyStudy = () => {
    if (currentPageApplyStudy < totalPagesApplyStudy) {
      setCurrentPageApplyStudy(currentPageApplyStudy + 1);
    }
  };

  const handlePrevPageApplyStudy = () => {
    if (currentPageApplyStudy > 1) {
      setCurrentPageApplyStudy(currentPageApplyStudy - 1);
    }
  };

  return (
    <itemS.Container>
      <itemS.InnerContainer>
        <itemS.MyInfoContainer>
          <itemS.HeadBox>
            <itemS.Head>마이페이지</itemS.Head>
          </itemS.HeadBox>
          <MyInfo item={myInfoData} />
        </itemS.MyInfoContainer>

        {/* 참여중인 스터디 리스트 */}
        <itemS.StudyListContainer>
          <itemS.StudyHeadBox>
            <itemS.Head>참여한 스터디</itemS.Head>
          </itemS.StudyHeadBox>
          <itemS.Group>
            {currentPassItems.map((item) => (
              <MyPageIndividual key={item.studyId} studyList={item} />
            ))}
          </itemS.Group>

          {/* 참여 스터디 페이지 넘김 버튼 */}
          {totalPagesPassStudy > 1 && (
            <itemS.Pagination>
              {currentPagePassStudy > 1 && (
                <itemS.LeftPageButton src='/img/arrow-l.svg' alt='왼쪽' onClick={handlePrevPagePassStudy} />
              )}
              {currentPagePassStudy < totalPagesPassStudy && (
                <itemS.RightPageButton src='/img/arrow-r.svg' alt='오른쪽' onClick={handleNextPagePassStudy} />
              )}
            </itemS.Pagination>
          )}
        </itemS.StudyListContainer>

        {/* 지원한 스터디 리스트 */}
        <itemS.StudyListContainer>
          <itemS.StudyHeadBox>
            <itemS.Head>지원한 스터디</itemS.Head>
          </itemS.StudyHeadBox>
          <itemS.Group>
            {currentApplyItems.map((item) => (
              <MyPageIndividual key={item.studyId} studyList={item} />
            ))}
          </itemS.Group>

          {/* 지원 스터디 페이지 넘김 버튼 */}
          {totalPagesApplyStudy > 1 && (
            <itemS.Pagination>
              {currentPageApplyStudy > 1 && (
                <itemS.LeftPageButton src='/img/arrow-l.svg' alt='왼쪽' onClick={handlePrevPageApplyStudy} />
              )}
              {currentPageApplyStudy < totalPagesApplyStudy && (
                <itemS.RightPageButton src='/img/arrow-r.svg' alt='오른쪽' onClick={handleNextPageApplyStudy} />
              )}
            </itemS.Pagination>
          )}
        </itemS.StudyListContainer>
      </itemS.InnerContainer>
    </itemS.Container>
  );
}
