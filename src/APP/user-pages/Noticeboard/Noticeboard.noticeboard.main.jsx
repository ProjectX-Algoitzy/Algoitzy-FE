import React, { useState, useEffect } from 'react';
import request from '../../Api/request';
import * as itemS from "./Styled/Noticeboard.noticeboard.main.styles";
import NoticeboardTable from './Noticeboard.noticeboard.table';
import MakingNoticeboardModal from './Noticeboard.makingnoticeboardmodal';

export default function Noticeboard() {

  const [boardList, setBoardList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // api 요청 파라미터
  const [searchKeyword, setSearchKeyword] = useState('');

  // 페이지
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0); //TODO - 임시 ) 전체 페이지 수 -> response 값으로 전체 개수 받아와야함
	const [currentPageGroup, setCurrentPageGroup] = useState(0);
  const itemsPerPage = 10; // 페이지당 항목 수

  const pageNumbers = Array.from(
		{ length: Math.min(5, totalPages - currentPageGroup * 5) },
		(_, i) => currentPageGroup * 5 + i
	);

  const fetchBoardList = async () => { // 기관 목록 조회
		try {
			const response = await request.get(`/institution?searchKeyword=${searchKeyword}&page=${currentPage + 1}&size=${itemsPerPage}`);
			if (response.isSuccess) {
				console.log("기관 목록 조회 성공",response);
				setBoardList(response.result.boardList);
        setTotalPages(Math.ceil(response.result.totalCount / itemsPerPage));
			} else {
				console.error("기관 목록 조회 실패:", response);
			}
		} catch (error) {
			console.error('기관 목록 조회 오류', error);
		}
	};

  useEffect(() => {
    fetchBoardList();
  },[currentPage, searchKeyword])

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
		setCurrentPage(0);
		setCurrentPageGroup(0);
  };

	const handlePageChange = (newPage) => {
		if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
      setCurrentPageGroup(Math.floor(newPage / 5)); // 페이지 그룹을 업데이트
		}
	};

	const handlePageGroupChange = (direction) => {
    if (direction === 'next' && (currentPageGroup + 1) * 5 < totalPages) {
      setCurrentPageGroup(currentPageGroup + 1);
      setCurrentPage((currentPageGroup + 1) * 5); // 새로운 그룹의 첫 번째 페이지로 이동
    } else if (direction === 'prev' && currentPageGroup > 0) {
      setCurrentPageGroup(currentPageGroup - 1);
      setCurrentPage((currentPageGroup - 1) * 5); // 새로운 그룹의 첫 번째 페이지로 이동
    }
	};

  const closeModal = () => {
    setIsModalOpen(false);
    console.log('isModalOpen',isModalOpen);
  };

  const openModal = () => { 
    setIsModalOpen(true);
  };

  return (
    <itemS.OuterContainer>
      <itemS.Container>
        <itemS.InnerContainer>
          <itemS.TopContainer>
            <itemS.HeadContainer>
              <itemS.Head>익명 게시판</itemS.Head>
              <itemS.AddBtn onClick={openModal}>+ 생성하기</itemS.AddBtn>
              {/* {isModalOpen && ( */}
              <MakingNoticeboardModal
                isModalOpen={isModalOpen}
                onClose={closeModal}
                fetchBoardList={fetchBoardList}
              />
              {/* )} */}
              {/* <itemS.AddBtn>추가</itemS.AddBtn>
              <itemS.DeleteBtn>삭제</itemS.DeleteBtn> */}
            </itemS.HeadContainer>
            <itemS.SearchContainer>
							<itemS.Search 
                type="text"
                value={searchKeyword}
                onChange={handleSearchChange}
              />
							<itemS.SearchIcon onClick={() => fetchBoardList()} src='/img/search.svg' alt='돋보기' />
						</itemS.SearchContainer>
          </itemS.TopContainer>
          <NoticeboardTable boardList={boardList} />
          <itemS.Pagination>
						<itemS.PaginationArrow
							left
							onClick={() => handlePageGroupChange('prev')}
							disabled={currentPageGroup === 0}
						/>
						{pageNumbers.map((pageNumber) => (
							<itemS.PaginationNumber
								key={pageNumber}
								onClick={() => handlePageChange(pageNumber)}
								active={pageNumber === currentPage}
							>
								{pageNumber + 1}
							</itemS.PaginationNumber>
						))}
						<itemS.PaginationArrow
							onClick={() => handlePageGroupChange('next')}
							disabled={(currentPageGroup + 1) * 5 >= totalPages}
						/>
					</itemS.Pagination>
        </itemS.InnerContainer>
      </itemS.Container>
    </itemS.OuterContainer>
  );
}
