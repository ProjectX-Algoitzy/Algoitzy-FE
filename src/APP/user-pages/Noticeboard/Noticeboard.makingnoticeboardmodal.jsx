import React, { useContext, useEffect, useState } from 'react'
import * as itemS from "./Styled/Noticeboard.makingnoticeboardmodal.styles"
import request from '../../Api/request';
import { AlertContext } from '../../Common/Alert/AlertContext';

export default function MakingNoticeboardModal({ onClose, isModalOpen, fetchBoardList }) {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const { alert } = useContext(AlertContext);
  useEffect(() => {
    console.log('모달창',isModalOpen);
    
   
  }, [isModalOpen]);

  const onChangeName = (e) => {
    setName(e.target.value);
  }

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };


  const handleAdd = async () => {
    // const requestData = {
    //   name: name,  
    //   type: type,
    //   content: content,
    // };

    // try {
    //   const response = await request.post('/institution', requestData)
    //   console.log(response);

    //   if (response.isSuccess) {
    //     alert("기업/부트캠프 생성이 완료되었습니다!")
    //     .then(() => {
    //       onClose();
    //       fetchInstitutionList();
    //       setName('');
    //       setSelectType('');
    //       setType('');
    //     });
    //   } 
    // } catch (error) {
    //   console.error('기업/부트캠프 생성에서 에러', error);
    //   alert("이름/유형/분석내용 입력칸을 채워주세요.");
    // }
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
            <itemS.StyledInput placeholder='이름을 입력해주세요' type='text' value={name} onChange={onChangeName} />
          </itemS.LittleContainer>

          <itemS.LittleContainer>
            <itemS.StyledTitle>파일 업로드</itemS.StyledTitle>
            {/* <TypeSelect value={selecttype} onChange={handleTypeChange} /> */}
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
