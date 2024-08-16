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
  // const { state } = useLocation();
  const { confirm } = useContext(ConfirmContext);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState(''); 
  const [content, setContent] = useState(''); 
  const [fileList, setFileList] = useState([]); 
  
  const [itemList, setItemList] = useState([]); // 문제집

  const fetchWorkbookExplain = async () => {
    try {
      const response = await request.get(`/institution/${boardId}`);

      if (response.isSuccess) {
        console.log("기관 분석 조회 성공", response);
        setName(response.result.name);
        setType(response.result.type);
        setContent(response.result.content);
      } else {
        console.error("기관 분석 조회 실패:", response);
      }
    } catch (error) {
      console.error('기관 분석 조회 오류', error);
    }
  };

  const fetchWorkbook = async () => {
    try {
      const response = await request.get(`/institution/${boardId}/workbook`);

      if (response.isSuccess) {
        console.log("추천 문제집 목록 조회 성공", response);
        setItemList(response.result.workbookList);
      } else {
        console.error("추천 문제집 목록 조회 실패:", response);
      }
    } catch (error) {
      console.error('추천 문제집 목록 조회 오류', error);
    }
  };
  useEffect(() => {
    fetchWorkbookExplain();
    fetchWorkbook();
  }, [boardId]);

  const handleDeleteClick = async () => {
    const confirmed = await confirm('추천 문제집과 함께 삭제되며, 삭제된 정보는 복구할 수 없습니다.\n정말로 삭제하시겠습니까?');
    if (confirmed) {
      try {
        const response = await request.delete(`/institution/${boardId}`);
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
  
  const handleAddWokbook = async () => {
    try {
      const response = await request.post(`/institution/${boardId}/workbook`);
      if (response.isSuccess) {
        console.log("새 문제집 생성 성공 response:", response);
        fetchWorkbook();
      } else {
        console.error("새 문제집 생성 실패:", response);
      }
    } catch (error) {
      console.error("새 문제집 생성 에러:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => { 
    setIsModalOpen(true);
    // setSelectedWorkbookId(workbookId);
  };

  return (
    <itemS.OuterContainer>
      <itemS.Container>
        <itemS.InnerContainer>
          <itemS.TitleBox>
            <itemS.Title>{name}</itemS.Title>
            <itemS.DeleteButton onClick={handleDeleteClick}>삭제</itemS.DeleteButton>
          </itemS.TitleBox>
          <itemS.PartBox>
            <itemS.FirstPart>작성자</itemS.FirstPart>
            <itemS.EditButtonBox onClick={openModal}>
              <itemS.EditIcon src='/img/edit.svg' alt='수정' />
              <itemS.EditText>수정하기</itemS.EditText>
            </itemS.EditButtonBox>
            <EditNoticeboardModal
              isModalOpen={isModalOpen}
              onClose={closeModal}
              originName={name}
              originType={type}
              originContent={content}
              boardId={boardId}
              fetchWorkbook={fetchWorkbook}
              fetchWorkbookExplain={fetchWorkbookExplain}
            />
          </itemS.PartBox>
          <NoticeboardDetailContent
            content={content}
            fileList={fileList}
          />
          {/* <itemS.PartBox>
            <itemS.SecondPart>추천 문제집</itemS.SecondPart>
            <itemS.AddButtonBox>
              <itemS.AddIcon src='/img/add.svg' alt='추가' onClick={handleAddWokbook}/>
            </itemS.AddButtonBox>
          </itemS.PartBox> */}
          <NoticeboardDetailTable 
            itemList={itemList} 
            fetchWorkbook={fetchWorkbook}
          />
        </itemS.InnerContainer>
      </itemS.Container>
    </itemS.OuterContainer>
  );
}
