import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as Styled from './Styled/WritePost.writepost.actionbar.styles';
import request from '../../Api/request';
import DraftModal from './WritePost.writepost.draft';
import { ConfirmContext } from '../../Common/Confirm/ConfirmContext';
import { AlertContext } from '../../Common/Alert/AlertContext';

export default function ActionBar({
  boardId,
  setBoardId,

  fetchBoardData,

  title,
  setTitle,

  initialCategoryCode,
  initialCategory,

  categoryCode,
  setCategoryCode,

  category,
  setCategory,

  boardFileList,
  setBoardFileList,
  
  uploadedImageUrls=[],
  setUploadedImageUrls,

  initialContent,
  markdownContent,
  setMarkdownContent,

  saveYn,
  setSaveYn,
}) {
  
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const [uploadedFiles, setUploadedFiles] = useState(state?.initialUploadedFiles || []);

  const [draftCount, setDraftCount] = useState(0); // 임시저장 게시글 수
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false); // 모달 상태
  const [drafts, setDrafts] = useState([]); // 임시저장 게시글 목록

  const { confirm } = useContext(ConfirmContext); // ConfirmContext 사용
  const { alert } = useContext(AlertContext);
  

  // S3 이미지 삭제
  const deleteImageFromS3 = async (fileUrl) => {
    try {
      const response = await request.delete('/s3', { params: { fileUrl } });
      if (!response.isSuccess) {
        console.error('이미지 삭제 실패:', response.message);
      }
    } catch (error) {
      console.error('이미지 삭제 중 오류:', error);
    }
  };


  // 이미지 삭제 호출
  const deleteAllUploadedImages = async () => {
    const promises = uploadedImageUrls.map((url) => deleteImageFromS3(url));
    await Promise.all(promises);
  };

  
  // 페이지를 떠날 때 처리
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (uploadedImageUrls.length > 0) {
        deleteAllUploadedImages();
        event.preventDefault();
        event.returnValue = ''; // 브라우저 기본 메시지 표시
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [uploadedImageUrls]);


  // 컴포넌트 언마운트 시 이미지 삭제
  useEffect(() => {
    return () => {
      deleteAllUploadedImages();
    };
  }, []);
  

  // 나가기
  const handleExit = async () => {
    try {
      const confirmed = await confirm(
        '저장하지 않은 내용은 사라집니다. 계속하시겠습니까?'
      );
      if (confirmed) {
        await deleteAllUploadedImages(); // 이미지 삭제 로직 실행
        navigate(-1); // 이전 페이지로 이동
      } else {
        console.log('사용자가 취소했습니다.');
      }
    } catch (error) {
      console.error('나가기 처리 중 오류 발생:', error);
    }
  };


  // 임시저장 게시글 목록 조회
  const fetchDrafts = async () => {
    try {
      const response = await request.get('board/draft');
      if (response.isSuccess) {
        setDrafts(response.result.boardList);
        setDraftCount(response.result.boardList.length);
      } else {
        console.error('임시저장 목록 조회 실패:', response.message);
      }
    } catch (error) {
      console.error('임시저장 목록 조회 중 오류:', error);
    }
  };


  // 컴포넌트 마운트 시 임시저장 목록 가져오기
  useEffect(() => {
    fetchDrafts();
  }, []);


  // 임시저장 게시글 목록 모달 열기/닫기
  const toggleDraftModal = () => {
    setIsDraftModalOpen((prev) => !prev);
  };

  
  // 임시저장
  const handleSaveDraft = async () => {
    const fileUrlList = boardFileList.map(file => file.fileUrl);
    setSaveYn(false);

    const requestData = {
      title: title,
      content: markdownContent,
      category: categoryCode,
      fileUrlList: fileUrlList,
      saveYn: saveYn,
    };
  
    try {
      let response;
      if (boardId) {
        // boardId가 존재하면 PATCH 요청
        response = await request.patch(`/board/${boardId}`, requestData);
      } else {
        // boardId가 없으면 POST 요청
        response = await request.post('/board', requestData);
        setBoardId(response.result);
      }    
      if (response.isSuccess) {
        console.log(response);
        alert('글이 임시저장되었습니다.');
        setUploadedFiles((prevFiles) =>
          prevFiles.map((file) => ({
            ...file,
            onlyS3: false, // 모든 파일의 onlyS3 값을 true로 설정
          }))
        );
        console.log(uploadedFiles);
        fetchDrafts(); // 임시저장 목록 갱신
      } else {
        alert('게시글을 임시저장하는 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('임시저장 중 오류 발생:', error);
      // alert('게시글을 임시저장하는 중 오류가 발생했습니다.');
    }
  };
  

  // 임시저장 게시글 선택
  const handleSelectDraft = async (draft) => {
    try {
      const confirmed = await confirm(
        '저장하지 않은 내용은 사라집니다. 계속하시겠습니까?'
      );

      if (confirmed) {
        setBoardId(draft.boardId);
        setSaveYn(false);
        fetchBoardData();
      }
    } catch {
      console.log('사용자가 취소했습니다.');
    }
  };

  // 등록하기
  const handlePostSubmit = async () => {
    const fileUrlList = boardFileList.map(file => file.fileUrl);

    const requestData = {
      title: title,
      content: markdownContent,
      category: categoryCode,
      fileUrlList: fileUrlList,
      saveYn: true,
    };

    try {
      let response;
        if (boardId) {
          // 게시글 수정(임시저장 글 포함)
          response = await request.patch(`/board/${boardId}`, requestData);
        } else {
          // 새 게시글 작성
          response = await request.post('/board', requestData);
        }
        if (response.isSuccess) {
          if (response.result) setBoardId(response.result);
          alert(saveYn==true ? '게시글이 수정되었습니다.' : '게시글이 등록되었습니다.');
          navigate(-1); // 커뮤니티 게시글 목록으로 이동
        } else {
          alert('게시글을 저장하는 중 오류가 발생했습니다.');
        }
      } catch (error) {
        // alert('게시글을 저장하는 중 오류가 발생했습니다.');
      }
  };

  return (
    <Styled.ActionBarContainer>
      <Styled.BtnContainer>
        <Styled.ExitButton onClick={handleExit}>← 나가기</Styled.ExitButton>
        <Styled.BtnContainer2>
          {!saveYn && ( // boardId가 없을 때만 표시
          <Styled.DraftButton>
            {/* 임시저장 클릭 영역 */}
            <Styled.DraftSaveArea onClick={handleSaveDraft}>
              임시저장
            </Styled.DraftSaveArea>
            {/* 임시저장 카운트 클릭 영역 */}
            <Styled.DraftCountArea onClick={toggleDraftModal}>
              | {draftCount}
            </Styled.DraftCountArea>
          </Styled.DraftButton>
        )}
          <Styled.Btn onClick={handlePostSubmit}>
            {boardId && saveYn ? '수정하기' : '등록하기'}
          </Styled.Btn>
        </Styled.BtnContainer2>
      </Styled.BtnContainer>

      <DraftModal
        isDraftModalOpen={isDraftModalOpen}
        toggleDraftModal={toggleDraftModal}
        drafts={drafts}
        onSelectDraft={handleSelectDraft}
      />

    </Styled.ActionBarContainer>
  );
}