import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Editor from './WritePost.writepost.editor';
import Preview from './WritePost.writepost.preview';
import * as Styled from './Styled/WritePost.writepost.main.styles';
import request from '../../Api/request';

export default function WritePost() {
  const location = useLocation();
  const [boardId, setBoardId] = useState(location.state?.boardId || null);
  const [markdownContent, setMarkdownContent] = useState('');
  const [initialContent, setInitialContent] = useState('');
  const [title, setTitle] = useState('');
  const [categoryCode, setCategoryCode] = useState(null);
  const [category, setCategory] = useState(null);
  const [boardFileList, setBoardFileList] = useState([]);
  const [saveYn, setSaveYn] = useState(false);

  useEffect(() => {
    if (boardId !== null) {
      const fetchBoardData = async () => {
        try {
          const response = await request.get(`/board/${boardId}`);
          if (response.isSuccess) {
            const { title, content, category, boardFileList, saveYn } = response.result;
            setTitle(title);
            setMarkdownContent(content);
            setInitialContent(content);
            setCategoryCode(categoryCode);
            setCategory(category);
            setBoardFileList(boardFileList);
            setSaveYn(saveYn);
          } else {
            console.error('게시글 상세 조회 실패:', response.message);
          }
        } catch (error) {
          console.error('게시글 상세 조회 중 오류:', error);
        }
      };
      fetchBoardData();
    }
  }, [boardId]);

  useEffect(() => {
    // 마운트 시 스크롤 비활성화
    document.body.style.overflow = 'hidden';
    
    // 언마운트 시 스크롤 복원
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  return (
    <Styled.Container>
      <Styled.MarkdownEditorContainer>
        <Editor
          boardId={boardId}
          setBoardId={setBoardId}

          title={title}
          setTitle={setTitle}
          
          initialCategoryCode={categoryCode}
          initialCategory={category}

          boardFileList={boardFileList}
          setBoardFileList={setBoardFileList}

          initialContent={initialContent}
          markdownContent={markdownContent}
          setMarkdownContent={setMarkdownContent}

          saveYn={saveYn}
        />

        <Preview title={title} markdownContent={markdownContent} />

      </Styled.MarkdownEditorContainer>
    </Styled.Container>
  );
}
