import React, { useEffect, useRef, useState } from 'react';
import { EditorState, EditorSelection } from '@codemirror/state';
import { EditorView, keymap, placeholder } from '@codemirror/view';
import { markdown } from '@codemirror/lang-markdown';
import { history, historyKeymap, defaultKeymap } from '@codemirror/commands';
import * as Styled from './Styled/WritePost.writepost.editor.styles';
import request from '../../Api/request';


export default function MarkdownEditor({
  initialContent,
  setMarkdownContent,
  handleFileUpload,
  fileInputRef,
  imageInputRef,
}) {

  const editorRef = useRef(null);
  const [editorView, setEditorView] = useState(null);

  const modalRef = useRef(null);

  const [linkURL, setLinkURL] = useState('');

  const [selectedFiles, setSelectedFiles] = useState([]); // 선택된 파일들 상태
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!editorRef.current || initialContent === undefined) return;

    const startState = EditorState.create({
      doc: initialContent || '',
      extensions: [
        keymap.of([...defaultKeymap, ...historyKeymap]),
        history(),
        markdown(),
        placeholder('내용22을 적어보세요'),
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
      const { top, left } = editorView.coordsAtPos(editorView.state.selection.main.head);
      setModalPosition({ top, left });
      setIsModalOpen(true);
      return;
    } else if (syntax === 'image') {
      openImageFileExplorer(); // 이미지 파일 선택창 열기
      return;
    } else if (syntax === 'file') {
      openFileExplorer(); // 일반 파일 선택창 열기
      return;
    } else if (syntax === 'code') {
      // 코드 블록 추가
      editorView.dispatch(
        editorView.state.changeByRange((range) => {
          const codeBlock = `\`\`\`\n${editorView.state.sliceDoc(range.from, range.to)}\n\`\`\``;
          return {
            changes: { from: range.from, to: range.to, insert: codeBlock },
            range: EditorSelection.cursor(range.from + codeBlock.length),
          };
        })
      );
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
      italic: /^_(.*?)_$/,  
      strikethrough: /^~~(.*)~~$/,
    };

    const wraps = {
      bold: '**',
      italic: '_',
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
    setLinkURL('');
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isModalOpen]);

  const openImageFileExplorer = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click(); // 이미지 파일 탐색기 열기
    }
  };
  
  const openFileExplorer = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 일반 파일 탐색기 열기
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // 선택된 파일 배열로 변환
    setSelectedFiles(files); // 상태에 파일 목록 저장
    handleFileUpload(event);
  };
   // S3 이미지 업로드 함수
   const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append('multipartFileList', file); // 파일 추가
  
      // 요청 경로를 /s3/v2로 변경
      const response = await request.post('/s3/v2', formData);
  
      if (response.isSuccess) {
        // 반환된 파일 URL 추출
        const uploadedFile = response.result.s3FileList?.[0];
        if (uploadedFile) {
          return uploadedFile.fileUrl; // 파일 URL 반환
        } else {
          throw new Error('파일 정보가 응답에 없습니다.');
        }
      } else {
        throw new Error(`이미지 업로드 실패: ${response.message}`);
      }
    } catch (error) {
      console.error('이미지 업로드 오류:', error);
      throw error;
    }
  };
  
    // 이미지 업로드 핸들러
    const handleImageUpload = async (event) => {
      const file = event.target.files[0];
      if (!file) return;
  
      try {
        const imageURL = await uploadImage(file); // S3 업로드 후 URL 반환
        setUploadedImageUrls((prevUrls) => [...prevUrls, imageURL]); // 업로드된 URL 저장
  
        const markdownImage = `<img src="${imageURL}" alt="" style="max-width: 100%; height: auto;" />`;
        editorView.dispatch(
          editorView.state.changeByRange((range) => ({
            changes: { from: range.from, to: range.to, insert: markdownImage },
            range: EditorSelection.cursor(range.from + markdownImage.length),
          }))
        );
      } catch (error) {
      }
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

  return (
    <>
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
        <button onClick={() => fileInputRef.current?.click()}><img src='/img/toolbar_attach.svg' alt="Attach" /></button>
          <input
            type="file"
            ref={fileInputRef} // 첨부파일 업로드용 ref
            style={{ display: 'none' }}
            multiple
            onChange={handleFileChange} // 모든 형식 허용
          />
        <button onClick={() => applyMarkdownSyntax('link')}><img src='/img/toolbar_link.svg' alt="Link"/></button>
        <button onClick={() => imageInputRef.current?.click()}><img src='/img/toolbar_image.svg' alt="Image" /></button>
          <input
            type="file"
            ref={imageInputRef} // 이미지 업로드용 ref
            style={{ display: 'none' }}
            onChange={handleImageUpload}
            accept="image/*"
          />
        <button onClick={() => applyMarkdownSyntax('code')}><img src='/img/toolbar_code.svg' alt="Code"/></button>
      </Styled.Toolbar>

      <Styled.EditorContainer ref={editorRef} />

      {isModalOpen && (
        <Styled.ModalContent ref={modalRef} style={{ position: 'absolute', top: modalPosition.top, left: modalPosition.left }}>
          <p>링크 등록</p>
          <Styled.UrlContainer>
          <input
            type="text"
            placeholder="URL을 입력하세요"
            value={linkURL}
            onChange={(e) => setLinkURL(e.target.value)}
          />
          <button onClick={handleLinkInsert}>확인</button>
          </Styled.UrlContainer>
        </Styled.ModalContent>
      )}
    </>
  );
}