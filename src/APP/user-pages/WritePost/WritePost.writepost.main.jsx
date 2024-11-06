import React, { useState, useEffect } from 'react';
import Editor from './WritePost.writepost.editor';
import Preview from './WritePost.writepost.preview';
import * as Styled from './Styled/WritePost.writepost.main.styles';

export default function WritePost() {
  const [markdownContent, setMarkdownContent] = useState('');
  const [title, setTitle] = useState('');

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
          title={title}
          setTitle={setTitle}
          setMarkdownContent={setMarkdownContent}
        />

        <Preview title={title} markdownContent={markdownContent} />

      </Styled.MarkdownEditorContainer>

      <Styled.BtnContainer>
      <Styled.ExitButton>← 나가기</Styled.ExitButton>
        <Styled.BtnContainer2>
          <Styled.ArbitaryBtn>임시저장</Styled.ArbitaryBtn>
          <Styled.Btn>제출하기</Styled.Btn> 
        </Styled.BtnContainer2>
      </Styled.BtnContainer>

    </Styled.Container>
  );
}
