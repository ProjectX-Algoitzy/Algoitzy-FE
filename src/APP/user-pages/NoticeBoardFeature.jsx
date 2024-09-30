import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  padding: 2rem;
`;

const DropZone = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 200px;
  border: 2px dashed #cccccc;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #cccccc;
  font-size: 1.25rem;
  cursor: pointer;
  margin-bottom: 1rem;
  position: relative;
`;

const FileList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
  max-width: 580px;
  margin-top: 1rem;
  overflow-y: auto;
  max-height: 100px; /* 제한된 높이 */
`;

const FileItem = styled.li`
  padding: 0.5rem;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RemoveButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
`;

const UploadButton = styled.button`
  margin-top: 1rem;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
`;

export default function NoticeBoardFeature() {
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

  return (
    <Container>
      <DropZone
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
        <FileList>
          {selectedFiles.map((file, index) => (
            <FileItem key={index}>
              <span>{file.name}</span>
              <RemoveButton onClick={() => handleRemoveFile(index)}>제거</RemoveButton>
            </FileItem>
          ))}
        </FileList>
      </DropZone>
      {selectedFiles.length > 0 && (
        <UploadButton onClick={handleFileUpload}>파일 업로드</UploadButton>
      )}
      <FileList>
        {uploadedFiles.map((url, index) => (
          <FileItem key={index}>
            <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
            <RemoveButton onClick={() => handleFileDelete(url)}>삭제</RemoveButton>
          </FileItem>
        ))}
      </FileList>
    </Container>
  );
}
