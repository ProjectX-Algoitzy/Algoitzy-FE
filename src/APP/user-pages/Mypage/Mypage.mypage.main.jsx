import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MyInfo from './Mypage.mypage.myinfo';
import ParticipatedStudyList from './Mypage.mypage.participatedstudylist';
import AppliedStudyList from './Mypage.mypage.appliedstudylist';
import MyBoardTable from './Mypage.mypage.myboard.table';
import MyInquiryTable from './Mypage.mypage.myinquiry.table';
import * as itemS from "./Styled/Mypage.mypage.main.styles";
import request from '../../Api/request';

export default function MyPage() {
  const { handle } = useParams();
  const isMemberMatch = handle === localStorage.getItem('handle');

  const [myInfoData, setMyInfoData] = useState({});
  const [passStudyList, setPassStudyList] = useState([]);
  const [applyStudyList, setApplyStudyList] = useState([]);
  const [boards, setBoards] = useState([]); // 내 게시글
  const [boardCount, setBoardCount] = useState(0); // 내 게시글 수
  const [tempCount, setTempCount] = useState(0); // 임시저장 글 수
  const [totalCount, setTotalCount] = useState(0); // 전체 글 수
  const [inquiries, setInquiries] = useState([]); // 내 문의하기 글
  const [inquiryCount, setInquiryCount] = useState(0); // 내 문의하기 글 수
  
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
      const response = await request.get(`/member/${handle}/info`);

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
      const response = await request.get(`/member/${handle}/study`);

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

  const fetchBoard = async () => {
		try {
			const response = await request.get(`/member/${handle}/board`);
			console.log("내 게시글 목록 조회 성공", response);

			if (response.isSuccess) {
				setBoards(response.result.boardList);
        setBoardCount(response.result.saveCount);
        setTempCount(response.result.tempSaveCount);
        setTotalCount(response.result.totalCount)
			} else {
				console.error("내 게시글 목록 조회 실패:", response);
			}
		} catch (error) {
			console.error('내 게시글 목록 조회 오류', error);
		}
	};

  const fetchinquiry = async () => {
		try {
			const response = await request.get(`/member/${handle}/inquiry`);
			console.log("내 문의하기 목록 조회 성공", response);

			if (response.isSuccess) {
				setInquiries(response.result.inquiryList);
        setInquiryCount(response.result.totalCount);
			} else {
				console.error("내 문의하기 목록 조회 실패:", response);
			}
		} catch (error) {
			console.error('내 문의하기 목록 조회 오류', error);
		}
	};

  useEffect(() => {
    fetchMyInfo();
    fetchMyStudy();
    fetchBoard();
    fetchinquiry();
  }, [handle]);

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
          <MyInfo item={myInfoData} boardCount={totalCount} onSelectTab={setSelectedTab} isMemberMatch={isMemberMatch} />
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
            {isMemberMatch && (
              <AppliedStudyList
                currentApplyItems={currentApplyItems}
                totalPagesApplyStudy={totalPagesApplyStudy}
                currentPageApplyStudy={currentPageApplyStudy}
                handlePrevPageApplyStudy={handlePrevPageApplyStudy}
                handleNextPageApplyStudy={handleNextPageApplyStudy}
              />
            )}
          </>
        ) : selectedTab === "posts" ? (
          <MyBoardTable
            items={boards}
            boardCount={boardCount}
            tempCount={tempCount}
            isMemberMatch={isMemberMatch}
            fetchBoard={fetchBoard}
          />
        ) : selectedTab === "inquiry" ? (
          <MyInquiryTable
            items={inquiries}
            inquiryCount={inquiryCount}
            isMemberMatch={isMemberMatch}
            fetchinquiry={fetchinquiry}
          />
        ) : null}

      </itemS.InnerContainer>
    </itemS.Container>
  );
}
