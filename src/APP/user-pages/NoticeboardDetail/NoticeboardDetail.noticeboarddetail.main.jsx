import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import request from '../../Api/request';
import * as itemS from "./Styled/NoticeboardDetail.noticeboarddetail.main.styles";
import NoticeboardDetailTable from './NoticeboardDetail.noticeboarddetail.table';
import NoticeboardDetailContent from './NoticeboardDetail.noticeboarddetail.content'
import EditNoticeboardModal from './EditNoticeboardModal';
import { ConfirmContext } from '../../Common/Confirm/ConfirmContext';

export default function NoticeboardDetail() {
  const { boardId } = useParams();
  const { confirm } = useContext(ConfirmContext);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState(''); 
  const [content, setContent] = useState(''); 
  const [fileUrlList, setFileUrlList] = useState([]); 
  const [createdName, setCreatedName] = useState(''); 
  const [updatedTime, setUpdatedTime] = useState(''); 
  
  const [commentList, setCommentList] = useState([]); 

   // 페이지
   const [currentPage, setCurrentPage] = useState(0);
   const [totalPages, setTotalPages] = useState(0); //TODO - 임시 ) 전체 페이지 수 -> response 값으로 전체 개수 받아와야함
   const [currentPageGroup, setCurrentPageGroup] = useState(0);
   const itemsPerPage = 5; // 페이지당 항목 수
 
   const pageNumbers = Array.from(
     { length: Math.min(5, totalPages - currentPageGroup * 5) },
     (_, i) => currentPageGroup * 5 + i
   );

  const fetchBoardDetail = async () => {
    console.log('boardId',boardId);
    try {
      const response = await request.get(`/board/${boardId}`);

      if (response.isSuccess) {
        console.log("게시판 상세 조회 성공", response);
        setTitle(response.result.title);
        setContent(response.result.content);
        setFileUrlList(response.result.fileUrlList);
        setCreatedName(response.result.createdName);
        setUpdatedTime(response.result.updatedTime);
      } else {
        console.error("게시판 상세 조회 실패:", response);
      }
    } catch (error) {
      console.error('게시판 상세 조회 오류', error);
    }
  };

  const fetchCommentList = async () => {
    try {
      const response = await request.get(`/board/${boardId}/comment?page=${currentPage + 1}&size=${itemsPerPage}`);

      if (response.isSuccess) {
        console.log("댓글 목록 조회 성공", response);
        setCommentList(response.result.commentList);
        setTotalPages(Math.ceil(response.result.totalCount / itemsPerPage));
      } else {
        console.error("댓글 목록 조회 실패:", response);
      }
    } catch (error) {
      console.error('댓글 목록 조회 오류', error);
    }
  };
  useEffect(() => {
    fetchBoardDetail();
    fetchCommentList();
  }, [boardId, currentPage]);

  const handleDeleteClick = async () => {
    const confirmed = await confirm('댓글과 함께 삭제되며, 삭제된 정보는 복구할 수 없습니다.\n정말로 삭제하시겠습니까?');
    if (confirmed) {
      try {
        const response = await request.delete(`/board/${boardId}`);
        if (response.isSuccess) {
          console.log("기관 삭제 성공 response:", response);
          navigate('/enterbootlist');
        } else {
          console.error("기관 삭제 실패:", response);
        }
      } catch (error) {
        console.error("기관 삭제 에러:", error);
      }
    }
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => { 
    setIsModalOpen(true);
    // setSelectedWorkbookId(workbookId);
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

  return (
    <itemS.OuterContainer>
      <itemS.Container>
        <itemS.InnerContainer>
          <itemS.TitleBox>
            <itemS.Title>{title}</itemS.Title>
            <itemS.DeleteButton onClick={handleDeleteClick}>삭제</itemS.DeleteButton>
          </itemS.TitleBox>
          <itemS.PartBox>
            <itemS.FirstPart>작성자 : {createdName}, 작성일 : {updatedTime}</itemS.FirstPart>
            {/* <itemS.EditButtonBox onClick={openModal}>
              <itemS.EditIcon src='/img/edit.svg' alt='수정' />
              <itemS.EditText>수정하기</itemS.EditText>
            </itemS.EditButtonBox> */}
            <EditNoticeboardModal
              isModalOpen={isModalOpen}
              onClose={closeModal}
              origintitle={title}
              origincontent={content}
              originfileUrlList={fileUrlList}
              boardId={boardId}
              fetchCommentList={fetchCommentList}
              fetchBoardDetail={fetchBoardDetail}
            />
          </itemS.PartBox>
          <NoticeboardDetailContent
            boardId={boardId}
            content={content}
            fileUrlList={fileUrlList}
          />
          {/* <itemS.PartBox>
            <itemS.SecondPart>추천 문제집</itemS.SecondPart>
            <itemS.AddButtonBox>
              <itemS.AddIcon src='/img/add.svg' alt='추가' onClick={handleAddWokbook}/>
            </itemS.AddButtonBox>
          </itemS.PartBox> */}
          <NoticeboardDetailTable 
            boardId={boardId}
            commentList={commentList} 
            fetchCommentList={fetchCommentList}
          />
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
