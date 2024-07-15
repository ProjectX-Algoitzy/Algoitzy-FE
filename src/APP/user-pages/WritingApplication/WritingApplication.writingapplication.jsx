import axios from 'axios';
import * as items from './Styled/WritingApplication.writingapplication.styles'
import React, { useContext, useEffect, useState } from 'react'
import request from '../../Api/request'
import { useNavigate, useParams } from 'react-router';
import { AlertContext } from '../../Common/Alert/AlertContext';
import { ConfirmContext } from '../../Common/Confirm/ConfirmContext';

export default function WritingApplication() {
  const { id } = useParams(); //파라미터로 applicationId 혹은 answerId를 받아온다
  const [detail, setDetail] = useState(null); // 받아온 지원서를 담기위해서
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [textAnswers, setTextAnswers] = useState({}); // 주관식 응답 상태
  const [selectedOptions, setSelectedOptions] = useState({}); // 선택된 옵션을 관리하는 상태
  const [answerId, setAnswerId] = useState(null); // 임시저장된 답변 ID 상태

  const navigate = useNavigate();
  const { alert } = useContext(AlertContext);
  const { confirm } = useContext(ConfirmContext);
  
  useEffect(() => {
    const fetchMakedApplicationDetail = async () => {  // 완전 처음 지원서를 작성할 때, API호출을 담당하는 함수이다.
      try {
        const response = await request.get(`application/${id}`); // 본래는 id를 불러와야 함... 일단 임시로 이미 배포된 321번을 넣었음
        // const response = await request.get(`application/4`);
        console.log("get으로 날라온 response", response);
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

    const fetchArbitarySavedAnswers = async () => {
      try {
        const response = await request.get(`answer/${id}`);
        console.log("임시 저장된 답변 불러오기", response);
        // setDetail(response.result);
        if (response["isSuccess"]) {
          const { selectAnswerList, textAnswerList } = response.result;

          // 임시 저장된 선택형 응답 상태를 설정
          const loadedSelectedOptions = {};
          selectAnswerList.forEach(question => {
            loadedSelectedOptions[question.sequence] = question.selectAnswerFieldList
              .filter(field => field.selected)
              .map(field => field.context);
          });

          // 임시 저장된 주관식 응답 상태를 설정
          const loadedTextAnswers = {};
          textAnswerList.forEach(question => {
            loadedTextAnswers[question.sequence] = question.text;
          });

          setSelectedOptions(loadedSelectedOptions);
          setTextAnswers(loadedTextAnswers);
          setAnswerId(response.result.answerId);

          console.log("textAnswers: ", textAnswers);
          console.log("selectedOptions", selectedOptions);
        } else {
          console.error("임시 저장된 답변 조회 실패:", response);
        }
      } catch (error) {
        console.error('임시 저장된 답변 조회 오류', error);
        setError(error);
      }
    }

    fetchMakedApplicationDetail();
    // fetchArbitarySavedAnswers();
  }, [id]); // 이 배열만 있어야 합니다.

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

  const WriteApplicationForm = async (distribution) => {
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
      confirmYN: distribution,
      createTextAnswerRequestList,
      createSelectAnswerRequestList
    };
  
    console.log("requestData", requestData);
  
    try {
      // id를 사용하는 경우
      const response = await request.post(`/answer/${id}`, requestData);
      console.log("post로 날릴 response", response);
      // 임시로 고정된 id를 사용하는 경우
      // const response = await request.post(`/answer/321`, requestData);
      
      if (response["isSuccess"]) {
        console.log("지원서 " + (distribution ? "저장" : "임시저장") + " 성공"); // 저장 또는 임시저장 메시지 출력
        navigate("/regularstudy");
      } else {
        console.error("지원서 " + (distribution ? "저장" : "임시저장") + " 실패:", response); // 저장 또는 임시저장 실패 메시지 출력
        alert("지원서 " + (distribution ? "저장" : "임시저장") + " 실패하였습니다");
      }
    } catch (error) {
      console.error("지원서 " + (distribution ? "저장" : "임시저장") + " 오류", error); // 저장 또는 임시저장 오류 메시지 출력
      alert("지원서 " + (distribution ? "저장" : "임시저장") + " 실패하였습니다");
    }
  };

  const handleSaveBtnClick = async () => { // 저장하기 버튼 클릭 시 사용하는 함수
    const confirmation = await confirm("지원서를 저장하시겠습니까?"); 
    if(confirmation){
      await WriteApplicationForm(true);
    }
  }
  
  const handleTempSaveBtnClick = async () => { // 임시저장 버튼 클릭 시
    const message = await alert('지원서 임시저장이 완료되었습니다.');
    if(message) {
      await WriteApplicationForm(false);
    }
  }
  

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
                  value={textAnswers[question.sequence] || ''}
                  onChange={e => handleTextChange(question.sequence, e.target.value)}
                />
              )}
            </items.SelectAndAnswerContainer>
          </items.ContentContainer>
        </items.SecondInnerContainer>
      ))}
      <items.BtnContainer>
          <items.BtnContainer2>
              <items.ArbitaryBtn onClick={handleTempSaveBtnClick}>임시저장</items.ArbitaryBtn>
              <items.Btn onClick={handleSaveBtnClick}>저장하기</items.Btn>
          </items.BtnContainer2>
      </items.BtnContainer>
      </items.Container>
  )
}
