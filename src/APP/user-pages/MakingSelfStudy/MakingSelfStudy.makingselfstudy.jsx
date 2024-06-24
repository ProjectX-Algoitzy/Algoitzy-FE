import React, { useEffect, useState, useRef } from 'react';
import * as itemS from "./Styled/MakingSelfStudy.makingselfstudy.styles";

const MakingSelfStudy = () => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      console.log('Dropped file:', file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };


  return (
    
      <itemS.Container>
        <itemS.InnerContainer>
          <itemS.StudyNameContainer>
            <itemS.Title>새로운 스터디</itemS.Title>
          </itemS.StudyNameContainer>
          <itemS.InnerInnerContainer>
            <itemS.LIContainer>
              <itemS.Label>스터디 대표 이미지</itemS.Label>
              <itemS.InputDragBox
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <itemS.DragDropText>이미지 드래그 혹은</itemS.DragDropText>
                <itemS.UploadText onClick={handleClick}>
                  파일 업로드
                </itemS.UploadText>
              </itemS.InputDragBox>
              <itemS.HiddenFileInput
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </itemS.LIContainer>
            <itemS.LIContainer>
              <itemS.Label>이름</itemS.Label>
              <itemS.InputBox
                type="text"
                placeholder="이름을 입력해주세요."
              />
            </itemS.LIContainer>
            <itemS.LIContainer>
              <itemS.Label>모집 인원</itemS.Label>
              <itemS.InputBox
                type="text"
                placeholder="총 인원수를 입력해주세요."
              />
            </itemS.LIContainer>
            <itemS.LIContainer>
              <itemS.Label>대상</itemS.Label>
              <itemS.InputAreaBox
                placeholder="대상을 입력해주세요."
              />
            </itemS.LIContainer>
            <itemS.LIContainer>
              <itemS.Label>주제</itemS.Label>
              <itemS.InputAreaBox
                placeholder="주제를 입력해주세요."
              />
            </itemS.LIContainer>
            <itemS.LIContainer>
              <itemS.Label>진행 방식</itemS.Label>
              <itemS.InputAreaBox
                placeholder="진행방식을 입력해주세요."
              />
            </itemS.LIContainer>
          </itemS.InnerInnerContainer>
          <itemS.BtnContainer>
            <itemS.DecisionBtn>확인</itemS.DecisionBtn>
          </itemS.BtnContainer>
        </itemS.InnerContainer>

      </itemS.Container>
    
  );
};

export default MakingSelfStudy;
