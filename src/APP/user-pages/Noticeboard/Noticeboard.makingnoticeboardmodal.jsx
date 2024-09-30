import React, { useContext, useEffect, useState } from 'react'
import * as itemS from "./Styled/Noticeboard.makingnoticeboardmodal.styles"
import request from '../../Api/request';
import axios from 'axios';
import { AlertContext } from '../../Common/Alert/AlertContext';
// 
export default function MakingNoticeboardModal({ onClose, isModalOpen, fetchBoardList }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { alert } = useContext(AlertContext);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleRemoveFile = (indexToRemove) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileUpload = async () => {
    if (selectedFiles.length === 0) {
      alert('업로드할 파일이 없습니다.');
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('multipartFileList', file);
    });

    try {
      const response = await axios.post('https://user-api.kau-koala.com/s3', formData);
      if (response.data.isSuccess) {
        const newProfileUrls = response.data.result;
        console.log('파일 업로드 성공:', newProfileUrls);
        alert("업로드에 성공했습니다");
        setUploadedFiles((prev) => [...prev, ...newProfileUrls]);
        setSelectedFiles([]); // 업로드 후 선택된 파일 초기화
      } else {
        console.error('파일 업로드 실패:', response.data);
        alert("업로드에 실패했습니다");
      }
    } catch (error) {
      console.error('파일 업로드 에러:', error);
      alert("업로드에 실패했습니다");
    }
  };

  const handleFileDelete = async (fileUrl) => {
    try {
      const url = `https://user-api.kau-koala.com/s3?fileUrl=${encodeURIComponent(fileUrl)}`;
      const response = await axios.delete(url);

      if (response.data.isSuccess) {
        console.log('파일 삭제 성공:', fileUrl);
        alert("삭제에 성공했습니다");
        setUploadedFiles((prevFiles) => prevFiles.filter((url) => url !== fileUrl));
      } else {
        console.error('파일 삭제 실패:', response.data);
        alert("삭제에 실패했습니다");
      }
    } catch (error) {
      console.error('파일 삭제 에러:', error);
      alert("삭제에 실패했습니다");
    }
  };

  const onChangetitle = (e) => {
    setTitle(e.target.value);
  }

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };


  const handleAdd = async () => {
    console.log('uploadedFiles',uploadedFiles);
    const requestData = {
      title: title,  
      content: content,
      fileUrlList: uploadedFiles,
    };

    try {
      const response = await request.post('/board', requestData);
      console.log(response);

      if (response.isSuccess) {
        alert("게시글 생성이 완료되었습니다!")
        .then(() => {
          onClose();
          fetchBoardList();
          setContent('');
          setUploadedFiles([]);
        });
      } 
    } catch (error) {
      console.error('게시글 생성에서 에러', error);
      alert("제목/내용 입력칸을 채워주세요.");
    }
  };

  if (!isModalOpen) return null;

  return (
    <itemS.Backdrop>
      <itemS.ModalContainer>
        <itemS.TopBox>
          <itemS.Title>게시글 작성</itemS.Title>
          <itemS.Close onClick={onClose}></itemS.Close>
        </itemS.TopBox>
        <itemS.InnerContainer>

          <itemS.LittleContainer>
            <itemS.StyledTitle>제목</itemS.StyledTitle>
            <itemS.StyledInput placeholder='제목을 입력해주세요' type='text' value={title} onChange={onChangetitle} />
          </itemS.LittleContainer>

          <itemS.LittleContainer>
            <itemS.StyledTitle>파일 업로드</itemS.StyledTitle>
            <itemS.Container>
              <itemS.DropZone
                onDrop={handleFileDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById('fileInput').click()}
              > 
                {selectedFiles.length == 0 && (
                    "파일을 드래그 앤 드롭 하거나 클릭하여 선택하세요"
                )}
                <input
                  id="fileInput"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <itemS.FileList>
                  {selectedFiles.map((file, index) => (
                    <itemS.FileItem key={index}>
                      <span>{file.name}</span>
                      <itemS.RemoveButton onClick={() => handleRemoveFile(index)}>제거</itemS.RemoveButton>
                    </itemS.FileItem>
                  ))}
                </itemS.FileList>
              </itemS.DropZone>
              {selectedFiles.length > 0 && (
                <itemS.UploadButton onClick={handleFileUpload}>파일 업로드</itemS.UploadButton>
              )}
              
            </itemS.Container>
          </itemS.LittleContainer>
          <itemS.LittleContainer>
            <itemS.StyledTitle>업로드된 파일</itemS.StyledTitle>
            <itemS.UploadFile>
              <itemS.FileList>
                {uploadedFiles.map((url, index) => (
                  <itemS.FileItem key={index}>
                    <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                    {/* <itemS.RemoveButton onClick={() => handleFileDelete(url)}>삭제</itemS.RemoveButton> */}
                  </itemS.FileItem>
                ))}
              </itemS.FileList>
            </itemS.UploadFile>
          </itemS.LittleContainer>

          <itemS.LittleContainer>
            <itemS.StyledTitle>내용</itemS.StyledTitle>
            <itemS.TextArea
              placeholder='내용을 입력해주세요'
              value={content}
              onChange={onChangeContent}
            />
          </itemS.LittleContainer>
        
          <itemS.Btn onClick={handleAdd}>작성하기</itemS.Btn>
          
        </itemS.InnerContainer>

      </itemS.ModalContainer>
    </itemS.Backdrop>
  );
}
