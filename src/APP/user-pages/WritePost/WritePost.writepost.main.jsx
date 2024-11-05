import React, { useState } from 'react';
import Editor from './WritePost.writepost.editor';
import Preview from './WritePost.writepost.preview';
import * as Styled from './Styled/WritePost.writepost.styles';

export default function WritePost() {
  const [markdownContent, setMarkdownContent] = useState('');
  const [title, setTitle] = useState('');

  return (
    <Styled.MarkdownEditorContainer>
      <Editor
        title={title}
        setTitle={setTitle}
        setMarkdownContent={setMarkdownContent}
      />
      <Preview title={title} markdownContent={markdownContent} />
    </Styled.MarkdownEditorContainer>
  );
}
