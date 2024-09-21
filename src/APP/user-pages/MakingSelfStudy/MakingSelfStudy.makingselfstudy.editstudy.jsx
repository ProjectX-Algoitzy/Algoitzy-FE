import React, { useCallback, useEffect, useState } from 'react';
import * as itemS from "./Styled/MakingSelfStudy.makingselfstudy.editstudy.styles";
import QuilEditor from '../../components/Editor/Editor.quileditor';
import request from '../../Api/request';
import { useDropzone } from 'react-dropzone';
import { useNavigate, useParams } from 'react-router-dom';
import { AlertContext } from '../../Common/Alert/AlertContext';
import { useContext } from 'react';

export default function MakingSelfStudyEditStudy() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const { alert } = useContext(AlertContext);

  const fetchData = async () => {
    try {
      const response = await request.get(`study/${id}`);
      setName(response.result.studyName);
      setImageUrl(response.result.profileUrl);
      setContent(response.result.content);
    } catch (error) {
      console.error('데이터 불러오기 오류:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append('multipartFileList', file);

      const response = await request.post('/s3', formData);
      if (response.isSuccess) {
          // console.log("업로드된 이미지 URL:", response.result[0]); // 콘솔에 URL 출력
          return response.result[0]; // 반환된 이미지 URL
      } else {
          throw new Error('이미지 업로드 실패');
      }
    } catch (error) {
      console.error('이미지 업로드 오류:', error);
      throw error;
    }
  };

  const FileUpload = ({ onFileUpload }) => {
    const onDrop = useCallback(async (acceptedFiles) => {
        const uploadedFile = acceptedFiles[0];
        try {
            const url = await uploadImage(uploadedFile);
            setImageUrl(url); // 이미지 URL을 상태에 저장
            onFileUpload(url); // 부모 컴포넌트에 URL 전달
        } catch (error) {
            console.error("파일 업로드 중 오류가 발생했습니다.", error);
        }
    }, [onFileUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <itemS.FileUploadContainer {...getRootProps()} className={isDragActive ? 'dragActive' : ''} >
            <input {...getInputProps()} />
            {!imageUrl && <p>이미지 드래그 혹은 <itemS.HighlightText>파일 업로드</itemS.HighlightText></p>}
            {imageUrl && (
                <itemS.ImagePreview>
                    <img src={imageUrl} alt="Preview" />
                </itemS.ImagePreview>
            )}
        </itemS.FileUploadContainer>
    );
  };

  const handleSave = async () => {
    const requestData = {
        profileUrl: imageUrl,
        name: name,
        content: content
    };
    try {
        const response = await request.patch(`/study/${id}`, requestData);
        if (response.isSuccess) {
          navigate(`/study/${id}`);
        }
    } catch (error) {
        console.error('자율스터디 수정 중 오류:', error);
    }
  };

  return (
    <itemS.BackGroundContainer>
      <itemS.Container>
        <itemS.StyledPageName>스터디 수정</itemS.StyledPageName>
          <itemS.ContentContainer>
            <itemS.LittleContainer>
              <itemS.StyledTitle>스터디 대표 이미지</itemS.StyledTitle>
              <FileUpload onFileUpload={(url) => setImageUrl(url)}/>
            </itemS.LittleContainer>

            <itemS.LittleContainer>
              <itemS.StyledTitle>이름</itemS.StyledTitle>
              <itemS.StyledInput placeholder='이름을 입력해주세요' type='text' value={name} onChange={onChangeName} />
            </itemS.LittleContainer>

            <itemS.LittleContainer>
              <itemS.StyledTitle>내용</itemS.StyledTitle>
              <QuilEditor setContent={setContent} content={content} />
            </itemS.LittleContainer>

            <itemS.LittleContainer style={{alignItems:"center"}}>
              <itemS.Btn onClick={handleSave}>수정 완료</itemS.Btn>
            </itemS.LittleContainer>
          </itemS.ContentContainer>
      </itemS.Container>
    </itemS.BackGroundContainer>
  )
}
