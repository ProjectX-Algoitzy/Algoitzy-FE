// import React, { useEffect, useState, useRef } from 'react';
// import * as itemS from "./Styled/MakingSelfStudy.makingselfstudy.styles";

// const MakingSelfStudy = () => {
//   const fileInputRef = useRef(null);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       console.log('Selected file:', file);
//     }
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const file = event.dataTransfer.files[0];
//     if (file) {
//       console.log('Dropped file:', file);
//     }
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   const handleClick = () => {
//     fileInputRef.current.click();
//   };


//   return (
    
//       <itemS.Container>
//         <itemS.InnerContainer>
//           <itemS.StudyNameContainer>
//             <itemS.Title>새로운 스터디</itemS.Title>
//           </itemS.StudyNameContainer>
//           <itemS.InnerInnerContainer>
//             <itemS.LIContainer>
//               <itemS.Label>스터디 대표 이미지</itemS.Label>
//               <itemS.InputDragBox
//                 onDrop={handleDrop}
//                 onDragOver={handleDragOver}
//               >
//                 <itemS.DragDropText>이미지 드래그 혹은</itemS.DragDropText>
//                 <itemS.UploadText onClick={handleClick}>
//                   파일 업로드
//                 </itemS.UploadText>
//               </itemS.InputDragBox>
//               <itemS.HiddenFileInput
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//               />
//             </itemS.LIContainer>
//             <itemS.LIContainer>
//               <itemS.Label>이름</itemS.Label>
//               <itemS.InputBox
//                 type="text"
//                 placeholder="이름을 입력해주세요."
//               />
//             </itemS.LIContainer>
//             <itemS.LIContainer>
//               <itemS.Label>모집 인원</itemS.Label>
//               <itemS.InputBox
//                 type="text"
//                 placeholder="총 인원수를 입력해주세요."
//               />
//             </itemS.LIContainer>
//             <itemS.LIContainer>
//               <itemS.Label>대상</itemS.Label>
//               <itemS.InputAreaBox
//                 placeholder="대상을 입력해주세요."
//               />
//             </itemS.LIContainer>
//             <itemS.LIContainer>
//               <itemS.Label>주제</itemS.Label>
//               <itemS.InputAreaBox
//                 placeholder="주제를 입력해주세요."
//               />
//             </itemS.LIContainer>
//             <itemS.LIContainer>
//               <itemS.Label>진행 방식</itemS.Label>
//               <itemS.InputAreaBox
//                 placeholder="진행방식을 입력해주세요."
//               />
//             </itemS.LIContainer>
//           </itemS.InnerInnerContainer>
//           <itemS.BtnContainer>
//             <itemS.DecisionBtn>확인</itemS.DecisionBtn>
//           </itemS.BtnContainer>
//         </itemS.InnerContainer>

//       </itemS.Container>
    
//   );
// };

// export default MakingSelfStudy;


import React, { useCallback, useContext, useState } from 'react'
import * as itemS from "./Styled/MakingSelfStudy.makingselfstudy.styles";
import request from '../../Api/request';
import QuilEditor from '../../components/Editor/Editor.quileditor';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';

export default function MakingSelfStudy() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState(null);

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append('multipartFileList', file);

      const response = await request.post('/s3', formData);
      if (response.isSuccess) {
          console.log("업로드된 이미지 URL:", response.result[0]); // 콘솔에 URL 출력
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
    console.log("아직 api 없음 ㅋ");
    // const requestData = {
    //   profileUrl: imageUrl,
    //   name: name,
    //   content: content
    // };

    // try {
    //   const response = await request.post('/study', requestData)
    //   console.log(response);

    //   if (response["isSuccess"]) {
    //       navigate("/regularstudylist");
    //   } 
    // } catch (error) {
    //   console.error('정규스터디 저장과정에서 에러', error);
    // }
  };


  return (
    <itemS.BackGroundContainer>
        <itemS.Container>
            <itemS.StyledPageName>새로운 스터디</itemS.StyledPageName>
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
                    <QuilEditor setContent={setContent} />
                </itemS.LittleContainer>

                <itemS.LittleContainer style={{alignItems:"center"}}>
                    <itemS.Btn onClick={handleSave}>확인</itemS.Btn>
                </itemS.LittleContainer>
            </itemS.ContentContainer>
        </itemS.Container>
    </itemS.BackGroundContainer>
  )
}
