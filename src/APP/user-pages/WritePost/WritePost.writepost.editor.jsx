import React, { useState, useEffect, useRef } from 'react';
import { EditorState, EditorSelection } from '@codemirror/state';
import { EditorView, keymap, placeholder } from '@codemirror/view';
import { markdown } from '@codemirror/lang-markdown';
import { defaultKeymap } from '@codemirror/commands';
import * as Styled from './Styled/WritePost.writepost.editor.styles';

export default function Editor({
  title,
  setTitle,
  setMarkdownContent,
}) {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null); // 파일 입력창을 제어할 useRef
  const [editorView, setEditorView] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [linkURL, setLinkURL] = useState('');
  const [isImageUploadOpen, setIsImageUploadOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]); // 선택된 파일들 상태

  useEffect(() => {
    if (!editorRef.current) return;

    const startState = EditorState.create({
      doc: '',
      extensions: [
        keymap.of(defaultKeymap),
        markdown(),
        placeholder("내용을 적어보세요"),
        EditorView.lineWrapping,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            const content = update.state.doc.toString();
            setMarkdownContent(content);
          }
        }),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: editorRef.current,
    });

    setEditorView(view);

    return () => {
      view.destroy();
    };
  }, []);

  const applyMarkdownSyntax = (syntax) => {
    if (!editorView) return;

    if (syntax === 'link') {
      setIsModalOpen(true);
      return;
    } else if (syntax === 'image') {
      setIsImageUploadOpen(true);
      return;
    }

    editorView.dispatch(
      editorView.state.changeByRange((range) => {
        const line = editorView.state.doc.lineAt(range.from);
        const currentLineText = line.text;
        const selectedText = editorView.state.sliceDoc(range.from, range.to);

        let newText;

        if (syntax.startsWith('heading')) {
          const level = parseInt(syntax.slice(-1));
          newText = setHeadingLevel(currentLineText, level);
          return {
            changes: { from: line.from, to: line.to, insert: newText },
            range: EditorSelection.cursor(line.from + newText.length),
          };
        } else if (syntax === 'blockquote') {
          newText = currentLineText.startsWith('> ')
            ? currentLineText.slice(2)
            : `> ${currentLineText}`;
  
          return {
            changes: { from: line.from, to: line.to, insert: newText },
            range: EditorSelection.cursor(line.from + newText.length),
          };
        } else {
          newText = toggleInlineStyle(selectedText, syntax);
          return {
            changes: { from: range.from, to: range.to, insert: newText },
            range: EditorSelection.range(range.from, range.from + newText.length),
          };
        }
      })
    );
  };

  const toggleInlineStyle = (text, style) => {
    const styles = {
      bold: /^\*\*(.*)\*\*$/,
      italic: /^\*(.*)\*$/,
      strikethrough: /^~~(.*)~~$/,
    };

    const wraps = {
      bold: '**',
      italic: '*',
      strikethrough: '~~',
    };

    const regex = styles[style];
    const wrap = wraps[style];

    return regex.test(text) ? text.replace(regex, '$1') : `${wrap}${text || '텍스트'}${wrap}`;
  };

  const setHeadingLevel = (currentLineText, level) => {
    const headingLevels = ['# ', '## ', '### '];
    const strippedText = currentLineText.replace(/^#+\s*/, '');
    return headingLevels[level - 1] + strippedText;
  };

  const handleLinkInsert = () => {
    if (!editorView) return;
  
    const linkText = "링크 텍스트";
    const markdownLink = `[${linkText}](${linkURL})`;
    const linkTextStart = 1;
    const linkTextEnd = linkTextStart + linkText.length;
  
    editorView.dispatch(
      editorView.state.changeByRange((range) => ({
        changes: { from: range.from, to: range.to, insert: markdownLink },
        range: EditorSelection.range(range.from + linkTextStart, range.from + linkTextEnd),
      }))
    );
  
    setIsModalOpen(false);
    setLinkURL('');
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageURL = reader.result;
      const markdownImage = `![이미지 설명](${imageURL})`;

      editorView.dispatch(
        editorView.state.changeByRange((range) => ({
          changes: { from: range.from, to: range.to, insert: markdownImage },
          range: EditorSelection.cursor(range.from + markdownImage.length),
        }))
      );
    };
    reader.readAsDataURL(file);

    setIsImageUploadOpen(false);
  };

  const openFileExplorer = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // 선택된 파일 배열로 변환
    setSelectedFiles(files); // 상태에 파일 목록 저장
  };

  return (
    <Styled.LeftContainer>
      <Styled.EditorHeader>
        <Styled.TitleInput
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          hasText={title.length > 0}
        />

        <Styled.Divider/>

        <Styled.CategorySelect>카테고리 선택 ▼</Styled.CategorySelect>

        {/* 선택된 파일 목록 표시 */}
        {selectedFiles.length > 0 && (
        <Styled.FileContainer>
          <Styled.FileLabel>첨부파일 :</Styled.FileLabel>
          <Styled.FileList>
            {selectedFiles.map((file, index) => (
              <Styled.FileItem key={index}>{file.name}</Styled.FileItem>
            ))}
          </Styled.FileList>
        </Styled.FileContainer>
      )}
    </Styled.EditorHeader>

      <Styled.Toolbar>
        <button onClick={() => applyMarkdownSyntax('heading1')}><img src='/img/toolbar_H1.svg' alt="Heading 1"/></button>
        <button onClick={() => applyMarkdownSyntax('heading2')}><img src='/img/toolbar_H2.svg' alt="Heading 2"/></button>
        <button onClick={() => applyMarkdownSyntax('heading3')}><img src='/img/toolbar_H3.svg' alt="Heading 3"/></button>
        <span>|</span>
        <button onClick={() => applyMarkdownSyntax('bold')}><img src='/img/toolbar_bold.svg' alt="Bold"/></button>
        <button onClick={() => applyMarkdownSyntax('italic')}><img src='/img/toolbar_italic.svg' alt="Italic"/></button>
        <button onClick={() => applyMarkdownSyntax('strikethrough')}><img src='/img/toolbar_strikethrough.svg' alt="Strikethrough"/></button>
        <span>|</span>
        <button onClick={() => applyMarkdownSyntax('blockquote')}><img src='/img/toolbar_blockquote.svg' alt="Blockquote"/></button>
        <button onClick={openFileExplorer}><img src='/img/toolbar_attach.svg' alt="Attach"/></button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          multiple
          onChange={handleFileChange}
        />
        <button onClick={() => applyMarkdownSyntax('link')}><img src='/img/toolbar_link.svg' alt="Link"/></button>
        <button onClick={() => applyMarkdownSyntax('image')}><img src='/img/toolbar_image.svg' alt="Image"/></button>
        <button onClick={() => applyMarkdownSyntax('code')}><img src='/img/toolbar_code.svg' alt="Code"/></button>
      </Styled.Toolbar>

      <Styled.EditorContainer ref={editorRef} />

      {isModalOpen && (
        <Styled.ModalOverlay>
          <Styled.ModalContent>
            <h3>링크 추가</h3>
            <input
              type="text"
              placeholder="URL을 입력하세요"
              value={linkURL}
              onChange={(e) => setLinkURL(e.target.value)}
            />
            <button onClick={handleLinkInsert}>확인</button>
            <button onClick={() => setIsModalOpen(false)}>취소</button>
          </Styled.ModalContent>
        </Styled.ModalOverlay>
      )}

      {isImageUploadOpen && (
        <Styled.ModalOverlay>
          <Styled.ModalContent>
            <h3>이미지 업로드</h3>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <button onClick={() => setIsImageUploadOpen(false)}>취소</button>
          </Styled.ModalContent>
        </Styled.ModalOverlay>
      )}

    </Styled.LeftContainer>
  );
}
