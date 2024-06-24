import axios from 'axios';
import * as items from './Styled/WritingApplication.writingapplication.styles'
import React, { useEffect, useState } from 'react'
import request from '../../Api/request'
import { useParams } from 'react-router';

export default function WritingApplication() {
  const { id } = useParams(); //파라미터로 각 학생별로 부여된 id를 받아옵니다
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [textAnswers, setTextAnswers] = useState({}); // 주관식 응답 상태
  const [selectedOptions, setSelectedOptions] = useState({}); // 선택된 옵션을 관리하는 상태

  useEffect(() => {
    const fetchMakedApplicationDetail = async () => {
      try {
        // const response = await request.get(`application/${id}`); 본래는 id를 불러와야 함... 일단 임시로 이미 배포된 321번을 넣었음
        const response = await request.get(`application/321`);
        console.log("response", response);
        setDetail(response.result);
        setLoading(false);
        if (response["isSuccess"]) {
            console.log("제작된 지원서 조회 성공");
        } else {
            console.error("제작된 지원서 조회 실패:", response);
        }
      } catch (error) {
        console.error('제작된 지원서 조회 오류', error);
        setError(error);
        setLoading(false);
      }
    };
    fetchMakedApplicationDetail();
    console.log("selectedOptions", selectedOptions);
  }, [selectedOptions]); //}, [id]); 본래는 이렇게 끝내야 함

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleOptionClick = (selectQuestionId, fieldId, multiSelect) => {
    setSelectedOptions(prevSelected => {
      const selectedForQuestion = prevSelected[selectQuestionId] || [];
      
      let updatedSelection;
      
      if (multiSelect) {
        if (selectedForQuestion.includes(fieldId)) {
          updatedSelection = selectedForQuestion.filter(id => id !== fieldId);
        } else {
          updatedSelection = [...selectedForQuestion, fieldId];
        }
      } else {
        updatedSelection = selectedForQuestion.includes(fieldId) ? [] : [fieldId];
      }
      
      return {
        ...prevSelected,
        [selectQuestionId]: updatedSelection,
      };
    });
  };
  
  
  
  

  const handleTextChange = (questionId, text) => {
    setTextAnswers(prevTextAnswers => ({
      ...prevTextAnswers,
      [questionId]: text,
    }));
  };

  const handleSave = async () => {
    // textAnswers를 변환하여 createTextAnswerRequestList 생성
    const createTextAnswerRequestList = Object.keys(textAnswers).map(clientQuestionId => {
      // 서버에서 사용하는 textQuestionId로 매핑
      const serverTextQuestionId = allQuestions.find(question => question.sequence === parseInt(clientQuestionId)).textQuestionId;
      return {
        textQuestionId: serverTextQuestionId,
        text: textAnswers[clientQuestionId]
      };
    });
  
    // selectedOptions를 변환하여 createSelectAnswerRequestList 생성
    const createSelectAnswerRequestList = Object.keys(selectedOptions).map(clientQuestionId => {
      // 서버에서 사용하는 selectQuestionId로 매핑
      const serverSelectQuestionId = allQuestions.find(question => question.sequence === parseInt(clientQuestionId)).selectQuestionId;
      return {
        selectQuestionId: serverSelectQuestionId,
        fieldIdList: selectedOptions[clientQuestionId]
      };
    });
  
    // requestData 생성
    const requestData = {
      createTextAnswerRequestList,
      createSelectAnswerRequestList
    };
  
    console.log("requestData", requestData);
  
    try {
      // id를 사용하는 경우
      // const response = await request.post(`/answer/${id}`, payload);
      
      // 임시로 고정된 id를 사용하는 경우
      const response = await request.post(`/answer/321`, requestData);
      
      if (response["isSuccess"]) {
        console.log('저장 성공');
      } else {
        console.error('저장 실패:', response.data);
      }
    } catch (error) {
      console.error('저장 중 오류 발생:', error);
    }
  };
  
  

  const allQuestions = [...detail.selectQuestionList, ...detail.textQuestionList]; // selectQuestionList와 textQuestionList를 합침
  allQuestions.sort((a, b) => a.sequence - b.sequence); // sequence로 재정렬
    return (
      <items.Container>
        <items.InnerContainer>
          <items.ContentContainer>
            <items.ApplicationName>{detail.title}</items.ApplicationName>
            <items.StudySelectContainer>{detail.studyName}</items.StudySelectContainer>
          </items.ContentContainer>
        </items.InnerContainer>

        {allQuestions.map(question => (
        <items.SecondInnerContainer key={question.sequence}>
          <items.ContentContainer>
            <items.QuestionAndMultiSelectCheckContainer>
              <items.QuestionContainer>
                {question.question}
                {question.required === true ? (
                  <items.NecessaryImg src='/img/necessarystar.png' alt='필수' />
                ) : null}
              </items.QuestionContainer>
              {question.multiSelect === true ? (
                <items.MultiselectImg src='/img/textmultiselect.png' alt='복수응답' />
              ) : null}
            </items.QuestionAndMultiSelectCheckContainer>

            <items.SelectAndAnswerContainer>
              {question.fieldList ? (
                <items.SelectContainer>
                  {question.fieldList.map(field => (
                    <items.OptionsContainer
                      key={field.fieldId}
                      onClick={() => handleOptionClick(question.sequence, field.fieldId, question.multiSelect)}
                    >
                      {selectedOptions[question.sequence] && selectedOptions[question.sequence].includes(field.fieldId) ? (
                        question.multiSelect === true ? (
                          <img src="/img/checkedsquare.png" alt="복수응답" style={{width:"20px", height:"20px"}} />
                        ) : (
                          <img src="/img/checkedcircleicon.png" alt="단일응답" style={{width:"20px", height:"20px"}} />
                        )
                      ) : (
                        question.multiSelect === true ? (
                          <img src="/img/iconsquare.png" alt="복수응답" style={{width:"20px", height:"20px"}} />
                        ) : (
                          <img src="/img/iconcircle.png" alt="단일응답" style={{width:"20px", height:"20px"}} />
                        )
                      )}
                      <items.ChoiceForSelectQuestionContainer>{field.context}</items.ChoiceForSelectQuestionContainer>
                    </items.OptionsContainer>
                  ))}
                </items.SelectContainer>
              ) : (
                <items.AnswerInputContainer
                  type='text'
                  placeholder='답변을 적어주세요'
                  onChange={e => handleTextChange(question.sequence, e.target.value)}
                />
              )}
            </items.SelectAndAnswerContainer>
          </items.ContentContainer>
        </items.SecondInnerContainer>
      ))}
      <items.BtnContainer>
          <items.BtnContainer2>
              <items.ArbitaryBtn>임시저장</items.ArbitaryBtn>
              <items.Btn onClick={handleSave}>저장하기</items.Btn>
          </items.BtnContainer2>
      </items.BtnContainer>
      </items.Container>
  )
}
