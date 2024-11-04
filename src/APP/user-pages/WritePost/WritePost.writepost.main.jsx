import React, { useState } from 'react';
import EditorSection from './WritePost.writepost.EditorSection';
import PreviewSection from './WritePost.writepost.PreviewSection';
import * as Styled from './Styled/WritePost.writepost.styles';

export default function WritePost() {
  const [markdownContent, setMarkdownContent] = useState('');
  const [title, setTitle] = useState('');

  return (
    <Styled.MarkdownEditorContainer>
      <EditorSection
        title={title}
        setTitle={setTitle}
        setMarkdownContent={setMarkdownContent}
      />
      <PreviewSection title={title} markdownContent={markdownContent} />
    </Styled.MarkdownEditorContainer>
  );
}
