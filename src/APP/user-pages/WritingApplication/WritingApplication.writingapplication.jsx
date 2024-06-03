import axios from 'axios';
import * as items from './Styled/WritingApplication.writingapplication.styles'
import React, { useState } from 'react'
import request from '../../Api/request'

export default function WritingApplication() {
    const [textQuestionID, setTextQuestionID] = useState(null);
    const [textAnswer, setTextAnswer] = useState('');
    const [selectQuestionID, setSelectQuestionID] = useState(null); 
    const [selectAnswer, setSelectAnswer] = useState('');

    const onChangeTextAnswer = (e) => {
      setTextAnswer(e.target.value);
    }

    const onChangeSelectAnswer = (e) => {
      setSelectAnswer(e.target.value);
    }
    
    const submitApplication = async () => {
      const textAnswerRequestList = textAnswer ? [{ textQuestionId: 17, text: textAnswer }] : [];

      const selectAnswerRequestList = selectAnswer ? [{
          selectQuestionId: 17,
          fieldIdList: [19]
      }] : [];

      const requestData = {
          createTextAnswerRequestList: textAnswerRequestList,
          createSelectAnswerRequestList: selectAnswerRequestList
      };

      try {
          const response = await request.post('/answer/17', requestData);
          console.log("response", response);
          if (response.status === 200) {
              console.log("지원서 제출 성공");
              alert("지원서 작성이 완료되었습니다");
          } else {
              console.error("지원서 제출 실패:", response.data);
          }
      } catch (error) {
          console.error("지원서 제출 오류", error);
      }
    };

    return (
    <items.Container>
      {/* <items.InnerContainer>
            <items.ContentForTitleContainer>
                <items.ApplicationName>KOALA 1기 스터디 지원서</items.ApplicationName>
                <items.StudySelectContainer>{detail.title}</items.StudySelectContainer>
            </items.ContentForTitleContainer>
            
            <items.SecondInnerContainer> 앞에 {allQuestions.map(question => ( 추가해야 함
              <items.ContentContainer>
                <items.QuestionAndMultiSelectCheckContainer>
                  <items.QuestionContainer>
                      {question.question}
                      {question.required === true ? (
                          <items.NecessaryImg src='/img/necessarystar.png' alt='필수'/>
                      ): (null)} 
                  </items.QuestionContainer>
                  {question.multiSelect === true ? (
                      <items.MultiselectImg src='/img/textmultiselect.png' alt='복수응답'/>
                  ): (null)}
                </items.QuestionAndMultiSelectCheckContainer>

                <items.SelectAndAnswerContainer>
                  {question.fieldList ? (
                      <items.SelectContainer>
                          {question.fieldList.map(field => (
                              <items.OptionsContainer key={field.fieldId}>
                                  {question.multiSelect === true ? (
                                      <img src="/img/iconsquare.png" alt="복수응답" style={{width:"20px", height:"20px"}} />
                                      // <items.SquareCheckBox type='checkbox' />
                                  ): (
                                      <img src="/img/iconcircle.png" alt="단일응답" style={{width:"20px", height:"20px"}} />
                                      // <items.CircleCheckBox type='checkbox'/>
                                  )}
                                  <items.ChoiceForSelectQuestionContainer>{field.context}</items.ChoiceForSelectQuestionContainer>
                              </items.OptionsContainer>
                          ))}
                      </items.SelectContainer>
                  ): (
                      <items.AnswerInputContainer type='text' placeholder='답변을 적어주세요' />
                  )}  
                </items.SelectAndAnswerContainer>

              </items.ContentContainer>
            </items.SecondInnerContainer>
      </items.InnerContainer> */}

      <div>지원서 작성을 위한 페이지</div>
      <div><input type='text' placeholder='주관식 답변' value={textAnswer} onChange={onChangeTextAnswer} /></div>
      <div><input type='text' placeholder='객관식 답변' value={selectAnswer} onChange={onChangeSelectAnswer} /></div> 
      <button onClick={submitApplication}>제출하기</button>
    </items.Container>
  )
}
