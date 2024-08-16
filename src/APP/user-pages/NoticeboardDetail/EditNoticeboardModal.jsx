import React, { useContext, useEffect, useState } from 'react';
import Select, { components } from 'react-select';
import * as itemS from "./Styled/EditInstitutionModal.styles";
import request from '../../Api/request';
import { AlertContext } from '../../Common/Alert/AlertContext';

export default function EditNoticeboardModal({ isModalOpen, onClose, originName, originType, originContent, institutionId, fetchWorkbook, fetchWorkbookExplain }) {
  const [name, setName] = useState('');
  const [selectType, setSelectType] = useState('');
  const [type, setType] = useState('');
  const [content, setContent] = useState('');
  const { alert } = useContext(AlertContext);

  useEffect(() => {
    if (isModalOpen) {
      setName(originName);
      setSelectType(originType);

      setContent(originContent);
      
    }
  }, [isModalOpen, originName, originType, originContent]);

  const onChangeName = (e) => {
    setName(e.target.value);
  }

  const handleEdit = async () => {
    // const requestData = {
    //   name: name,
    //   type: type,
    //   content: content,
    // };

    // try {
    //   const response = await request.patch(`/institution/${institutionId}`, requestData);
    //   console.log(response);

    //   if (response.isSuccess) {
    //     alert("기업/부트캠프 수정이 완료되었습니다!")
    //       .then(() => {
    //         onClose();
    //         fetchWorkbook();
    //         fetchWorkbookExplain();
    //       });
    //   }
    // } catch (error) {
    //   console.error('기업/부트캠프 수정에서 에러', error);
    // }
  };

  if (!isModalOpen) return null;

  return (
    <itemS.Backdrop>
      <itemS.ModalContainer>
        <itemS.TopBox>
          <itemS.Title>게시글 수정</itemS.Title>
          <itemS.Close onClick={onClose}></itemS.Close>
        </itemS.TopBox>
        <itemS.InnerContainer>

          <itemS.LittleContainer>
            <itemS.StyledTitle>제목</itemS.StyledTitle>
            <itemS.StyledInput type='text' value={name} onChange={onChangeName} />
          </itemS.LittleContainer>

          <itemS.LittleContainer>
            <itemS.StyledTitle>파일 업로드</itemS.StyledTitle>
            {/* <TypeSelect value={selectType} onChange={handleTypeChange} /> */}
          </itemS.LittleContainer>

          <itemS.LittleContainer>
            <itemS.StyledTitle>분석 내용</itemS.StyledTitle>
            {/* <QuillPractice setContent={setContent} content={content} /> */}
          </itemS.LittleContainer>

          <itemS.Btn onClick={handleEdit}>수정하기</itemS.Btn>

        </itemS.InnerContainer>

      </itemS.ModalContainer>
    </itemS.Backdrop>
  );
}
