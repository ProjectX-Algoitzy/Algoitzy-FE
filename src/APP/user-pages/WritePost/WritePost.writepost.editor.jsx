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
import ActionBar from './WritePost.writepost.actionbar';

import { ConfirmContext } from '../../Common/Confirm/ConfirmContext';
import { AlertContext } from '../../Common/Alert/AlertContext';


export default function Editor({
  boardId,
  setBoardId,

  fetchBoardData,

  title,
  setTitle,

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

  const editorRef = useRef(null);
  const [editorView, setEditorView] = useState(null);

  const [isScrolling, setIsScrolling] = useState(false); // 스크롤 상태 관리
  
  const [selectedCategory, setSelectedCategory] = useState({ value: categoryCode, label: category }); // 선택된 카테고리 상태
  const [categoryOptions, setCategoryOptions] = useState([]); // 동적 카테고리 옵션

  const [uploadedFiles, setUploadedFiles] = useState(state?.initialUploadedFiles || []);

  const { confirm } = useContext(ConfirmContext);
  const { alert } = useContext(AlertContext);
  
  const categoryPlaceholderText = '카테고리 선택';
  
  useEffect(() => { // 에디터 스크롤
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
          setSelectedCategory({ value: categoryCode, label: category });
          //setSelectedCategory(filteredOptions[0] || null); // 첫 번째 옵션 선택
        } else {
          console.error('카테고리 목록 조회 실패:', response.message);
        }
      } catch (error) {
        console.error('카테고리 목록 조회 중 오류:', error);
      }
    };

    fetchCategoryOptions();
  }, [categoryCode]);

  const handleCategoryChange = (selectedOption) => {
    setCategoryCode(selectedOption.value); // 선택된 카테고리 코드 설정
    setCategory(selectedOption.label);
    setSelectedCategory(selectedOption); // 선택된 카테고리 설정
  };
  
  return (
    <Styled.LeftContainer>
      <Styled.InnerEditorContainer ref={editorRef} isScrolling={isScrolling}>
      <Styled.EditorHeader>

      <Styled.PageLabel>새로운 글쓰기</Styled.PageLabel>
        <Styled.Divider/>

        <Styled.LIContainer>
          <Styled.OptionLabel>제목</Styled.OptionLabel>
          <Styled.TextInput 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="제목을 입력하세요"
          />
          <Styled.OptionLabel>게시판 선택</Styled.OptionLabel>
          <Styled.CategorySelect
            options={categoryOptions}
            placeholder={categoryPlaceholderText}
            value={selectedCategory}
            // isDisabled={true} // 선택 비활성화
            // defaultValue={categoryOptions[0]}
            components={{ DropdownIndicator: null, IndicatorSeparator: null }}
            isSearchable={false}
            onChange={handleCategoryChange}
          />
        </Styled.LIContainer>
      
    </Styled.EditorHeader>

      <MarkdownEditor
        initialContent={initialContent}
        setMarkdownContent={setMarkdownContent}
        uploadedFiles={uploadedFiles}
        setUploadedFiles={setUploadedFiles}
        uploadedImageUrls={uploadedImageUrls}
        setUploadedImageUrls={setUploadedImageUrls}
      />

    </Styled.InnerEditorContainer>

      <ActionBar
          boardId={boardId}
          setBoardId={setBoardId}

          fetchBoardData={fetchBoardData}

          title={title}
          setTitle={setTitle}

          categoryCode={categoryCode}
          setCategoryCode={setCategoryCode}

          category={category}
          setCategory={setCategory}

          boardFileList={boardFileList}
          setBoardFileList={setBoardFileList}

          uploadedImageUrls={uploadedImageUrls}
          setUploadedImageUrls={setUploadedImageUrls}

          initialContent={initialContent}
          markdownContent={markdownContent}
          setMarkdownContent={setMarkdownContent}

          saveYn={saveYn}
          setSaveYn={setSaveYn}
      />
    </Styled.LeftContainer>
  );
}