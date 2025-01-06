import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { EditorState, EditorSelection } from '@codemirror/state';
import { EditorView, keymap, placeholder } from '@codemirror/view';
import { markdown } from '@codemirror/lang-markdown';
import { history, historyKeymap, defaultKeymap } from '@codemirror/commands';
import * as Styled from './Styled/WritePost.writepost.editor.styles';
import request from '../../Api/request';
import MarkdownEditor from './WritePost.writepost.markdowneditor';
import DraftModal from './WritePost.writepost.draft';
import FileTable from './WritePost.writepost.filetable';
import { ConfirmContext } from '../../Common/Confirm/ConfirmContext';
import { AlertContext } from '../../Common/Alert/AlertContext';

const categoryPlaceholderText = '카테고리 선택';

export default function Editor({
  initialBoardId,
  title,
  setTitle,
  initialContent,
  setMarkdownContent,
  initialCategoryCode,
  initialCategory,
  initialUploadedFiles,
  initialSaveYn,
  markdownContent,
}) {

  const navigate = useNavigate();
  const location = useLocation(); // useLocation으로 전달된 state 접근
  const { state } = location;

  const editorRef = useRef(null);
  const imageInputRef = useRef(null); // 이미지 파일 입력창을 제어할 useRef
  const fileInputRef = useRef(null); // 일반 파일 입력창을 제어할 useRef
  const modalRef = useRef(null);
  const [editorView, setEditorView] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false); // 스크롤 상태 관리
  
  const [boardId, setBoardId] = useState(initialBoardId); // boardId를 상태로 관리

  const [selectedCategory, setSelectedCategory] = useState(initialCategory); // 선택된 카테고리 상태
  const [isCategorySelected, setIsCategorySelected] = useState(false); // 카테고리 선택 여부 상태

  const [categoryCode, setCategoryCode] = useState(state?.initialCategoryCode || null);
  const [categoryOptions, setCategoryOptions] = useState([]); // 동적 카테고리 옵션
  const [category, setCategory] = useState(state?.initialCategory || categoryOptions[0]);

  const [linkURL, setLinkURL] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState(state?.initialUploadedFiles || []);

  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);

  const [saveYn, setSaveYn] = useState(state?.initialSaveYn || false); // 임시 저장 여부 (default: true)

  const [draftCount, setDraftCount] = useState(0); // 임시저장 게시글 수
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false); // 모달 상태
  const [drafts, setDrafts] = useState([]); // 임시저장 게시글 목록
  const loadCount = useRef(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const { confirm } = useContext(ConfirmContext); // ConfirmContext 사용
  const { alert } = useContext(AlertContext);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // 기본 브라우저 확인창 표시
      event.preventDefault();
      event.returnValue = ''; // 대부분의 브라우저에서 이 설정으로 기본 메시지가 표시됨
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      // 컴포넌트 언마운트 시 이벤트 제거
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true); // 스크롤 상태 활성화
      // 일정 시간 후 스크롤 상태 비활성화
      setTimeout(() => setIsScrolling(false), 1000);
    };

    const editorElement = editorRef.current;
    if (editorElement) {
      editorElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (editorElement) {
        editorElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    // 카테고리 옵션을 API에서 가져오기
    const fetchCategoryOptions = async () => {
      try {
        const response = await request.get('/board/category');
        if (response.isSuccess) {
          const options = response.result.categoryList.map((category) => ({
            value: category.code,
            label: category.name,
          }));

          const filteredOptions = options.filter(
            (option) => option.label !== '공지'
          );

          setCategoryOptions(filteredOptions);
          //setSelectedCategory(filteredOptions[0] || null); // 첫 번째 옵션 선택
        } else {
          console.error('카테고리 목록 조회 실패:', response.message);
        }
      } catch (error) {
        console.error('카테고리 목록 조회 중 오류:', error);
      }
    };

    fetchCategoryOptions();
  }, []);

  // 카테고리 변환 함수
const categoryConverter = (categoryOptions) => {
  const nameToCode = (name) => {
    const found = categoryOptions.find((option) => option.label === name);
    return found ? found.value : null; // name에 해당하는 code 반환
  };

  const codeToName = (code) => {
    const found = categoryOptions.find((option) => option.value === code);
    return found ? found.label : null; // code에 해당하는 name 반환
  };

  return { nameToCode, codeToName };
};

  const handleCategoryChange = (selectedOption) => {
    setCategoryCode(selectedOption.value); // 선택된 카테고리 코드 설정
    setSelectedCategory(selectedOption); // 선택된 카테고리 설정
    setIsCategorySelected(true); // 선택 여부 설정
  };

  const resizeTextarea = (e) => {
    e.target.style.height = 'auto'; // 높이 초기화
    e.target.style.height = `${e.target.scrollHeight}px`; // 내용에 맞게 높이 조정
  };
  
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
  
    const deleteAllUploadedImages = async () => {
      const promises = uploadedImageUrls.map((url) => deleteImageFromS3(url));
      await Promise.all(promises); // 모든 삭제 요청 실행
    };
  
    useEffect(() => {
      // 페이지를 떠날 때 처리
      const handleBeforeUnload = (event) => {
        if (uploadedImageUrls.length > 0) {
          deleteAllUploadedImages();
          event.preventDefault();
          event.returnValue = ''; // 브라우저 기본 메시지 표시
        }
      };
  
      window.addEventListener('beforeunload', handleBeforeUnload);
  
      // Cleanup: 이벤트 리스너 제거
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }, [uploadedImageUrls]);
  
    useEffect(() => {
      // 컴포넌트 언마운트 시 이미지 삭제
      return () => {
        deleteAllUploadedImages();
      };
    }, []);
  
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
        const draftList = response.result.boardList.map((draft) => {
          const matchedCategory = categoryOptions.find(
            (option) => option.value === draft.categoryCode
          );
          return {
            ...draft,
            name: matchedCategory ? matchedCategory.label : '알 수 없음',
          };
        });

        setDrafts(draftList);
        setDraftCount(draftList.length); // 게시글 수 업데이트
      } else {
        console.error('임시저장 목록 조회 실패:', response.message);
      }
    } catch (error) {
      console.error('임시저장 목록 조회 중 오류:', error);
    }
  };

    // 모달 열기/닫기
    const toggleDraftModal = () => {
      setIsDraftModalOpen((prev) => !prev);
    };

    const handleSaveDraft = async () => {
      const content = markdownContent;
      const fileUrls = uploadedFiles.map(file => file.fileUrl);

      const requestData = {
        title: title.trim() || '',
        content: content || '',
        category: categoryCode,
        fileUrlList: fileUrls,
        saveYn: false, // 임시저장
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

    // 임시저장 글 상세 데이터를 가져오는 함수
const fetchDraftDetails = async (boardId) => {
  try {
    const response = await request.get(`board/draft/${boardId}`);
    if (response.isSuccess) {
      const draft = response.result;

      // 제목과 내용을 업데이트
      setTitle(draft.title);
      setMarkdownContent(draft.content);

      // 에디터 내용 업데이트
      editorView.dispatch({
        changes: {
          from: 0,
          to: editorView.state.doc.length, // 기존 내용 삭제
          insert: draft.content, // 새로운 내용 삽입
        },
      });

      // 파일 리스트 업데이트
      const uploadedFilesFromDraft = draft.boardFileList.map((file) => ({
        originalName: file.originalName,
        fileUrl: file.fileUrl,
        size: file.fileSize,
      }));
      setUploadedFiles(uploadedFilesFromDraft);

      // 카테고리 업데이트
      const { nameToCode, codeToName } = categoryConverter(categoryOptions);
      setSelectedCategory({ value: draft.categoryCode, label: draft.category });
      setCategoryCode(draft.categoryCode);
      setCategory(draft.category);

      console.log('임시저장 글 불러오기 성공:', draft);
    } else {
      console.error('임시저장 글 불러오기 실패:', response.message);
    }
  } catch (error) {
    console.error('임시저장 글 불러오기 오류:', error);
  }
};
  
    // 임시저장 글 선택
    const handleSelectDraft = async (draft) => {
      try {
        const confirmed = await confirm(
          '저장하지 않은 내용은 사라집니다. 계속하시겠습니까?'
        );
  
        if (confirmed) {
          setBoardId(draft.boardId);
          fetchDraftDetails(draft.boardId); // 선택된 글 불러오기
        }
      } catch {
        console.log('사용자가 취소했습니다.');
      }
    };
  
    // 컴포넌트 마운트 시 임시저장 목록 가져오기
    useEffect(() => {
      fetchDrafts();
    }, []);


 // 게시글 등록 API 호출 함수
 const handlePostSubmit = async () => {
  const content = markdownContent;
  const fileUrls = uploadedFiles.map(file => file.fileUrl);

  const requestData = {
    title: title.trim(),
    content: content,
    category: categoryCode,
    fileUrlList: fileUrls,
    saveYn: true,
  };

  try {
    let response;

      if (boardId) {
        // 수정 요청
        response = await request.patch(`/board/${boardId}`, requestData);
      } else {
        // 새 게시글 작성 요청
        response = await request.post('/board', requestData);
      }

      if (response.isSuccess) {
        setSaveYn(true);
        setBoardId(response.result);
        setCategory(selectedCategory);

        alert(boardId ? '게시글이 수정되었습니다.' : '게시글이 등록되었습니다.');
        navigate(-1); // 이전 페이지로 이동
      } else {
        alert('게시글을 저장하는 중 오류가 발생했습니다.');
      }
    } catch (error) {
      // alert('게시글을 저장하는 중 오류가 발생했습니다.');
    }
  };

  return (
    <Styled.LeftContainer>
      <Styled.InnerEditorContainer ref={editorRef} isScrolling={isScrolling}>
      <Styled.EditorHeader>
      <Styled.TitleInput
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          resizeTextarea(e);
        }}
        hasText={title.length > 0}
      />

        <Styled.Divider/>

        <Styled.LIContainer>
        <Styled.BlankLabel>게시판 선택</Styled.BlankLabel>
        <Styled.CategorySelect
          options={categoryOptions}
          placeholder={categoryPlaceholderText}
          value={selectedCategory}
          // isDisabled={true} // 선택 비활성화
          // defaultValue={categoryOptions[0]}
          components={{ DropdownIndicator: null, IndicatorSeparator: null }}
          isSearchable={false}
          onChange={handleCategoryChange}
          isCategorySelected={isCategorySelected}

        />
        </Styled.LIContainer>
      
    </Styled.EditorHeader>

      <MarkdownEditor
        initialContent={initialContent}
        setMarkdownContent={setMarkdownContent}
        fileInputRef={fileInputRef}
        imageInputRef={imageInputRef}
        uploadedFiles={uploadedFiles}
        setUploadedFiles={setUploadedFiles}
      />

    </Styled.InnerEditorContainer> 
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
    </Styled.LeftContainer>
  );
}