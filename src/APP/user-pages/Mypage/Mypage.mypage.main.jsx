import React, { useEffect, useState } from 'react';
import MyInfo from './Mypage.mypage.myinfo';
import ParticipatedStudyList from './Mypage.mypage.participatedstudylist';
import AppliedStudyList from './Mypage.mypage.appliedstudylist';
import MyBoardTable from './Mypage.mypage.myboard.table';
import * as itemS from "./Styled/Mypage.mypage.main.styles";
import request from '../../Api/request';
import { dummyData } from './dummy';

export default function MyPage() {
  const [myInfoData, setMyInfoData] = useState({});
  const [passStudyList, setPassStudyList] = useState([]);
  const [applyStudyList, setApplyStudyList] = useState([]);
  const [boards, setBoards] = useState([]); // 내가 쓴 글
  const [memberId, setMemberId] = useState(localStorage.getItem('memberId'));

  // 내 스터디, 내가 쓴 글 탭 변경
  const [selectedTab, setSelectedTab] = useState("study");

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

  // const fetchBoard = async () => {
	// 	try {
	// 		const response = await request.get(`/board?searchKeyword=${searchKeyword}&category=${selectedTab}&sort=${sortType}&page=${currentPage + 1}&size=${itemsPerPage}`);
	// 		console.log("response", response);

	// 		if (response.isSuccess) {
	// 			console.log("게시글 목록 조회 성공");
	// 			setPosts(response.result.boardList);
	// 		} else {
	// 			console.error("게시글 목록 조회 실패:", response);
	// 		}
	// 	} catch (error) {
	// 		console.error('게시글 목록 조회 오류', error);
	// 	}
	// };

  useEffect(() => {
    fetchMyInfo();
    fetchMyStudy();
  }, []);

  // useEffect(() => {
	// 	fetchBoard();
	// },[ selectedTab, sortType, currentPage, searchKeyword]);

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
          <MyInfo item={myInfoData} onSelectTab={setSelectedTab} />
        </itemS.MyInfoContainer>

        {selectedTab === "study" ? (
          <>
            <ParticipatedStudyList
              currentPassItems={currentPassItems}
              totalPagesPassStudy={totalPagesPassStudy}
              currentPagePassStudy={currentPagePassStudy}
              handlePrevPagePassStudy={handlePrevPagePassStudy}
              handleNextPagePassStudy={handleNextPagePassStudy}
            />
            <AppliedStudyList
              currentApplyItems={currentApplyItems}
              totalPagesApplyStudy={totalPagesApplyStudy}
              currentPageApplyStudy={currentPageApplyStudy}
              handlePrevPageApplyStudy={handlePrevPageApplyStudy}
              handleNextPageApplyStudy={handleNextPageApplyStudy}
            />
          </>
        ) : (
          <MyBoardTable 
            items={dummyData}
          />
        )}

      </itemS.InnerContainer>
    </itemS.Container>
  );
}
