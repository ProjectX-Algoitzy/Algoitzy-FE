import axios from 'axios';
import * as items from './Styled/WritingApplication.writingapplication.styles';
import React, { useContext, useEffect, useState } from 'react';
import request from '../../Api/request';
import { useNavigate, useParams } from 'react-router';
import { AlertContext } from '../../Common/Alert/AlertContext';
import { ConfirmContext } from '../../Common/Confirm/ConfirmContext';

export default function WritingApplication() {
  const { type, id } = useParams();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [textAnswers, setTextAnswers] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const [appId, setAppId] = useState(null);
  const [isConfirm, setIsConfirm] = useState(false);  // 해당 지원서가 이미 최종 송출되었는지 확인하고자 하는 변수입니다
  const [studyId, setStudyId] = useState(null);

  const navigate = useNavigate();
  const { alert } = useContext(AlertContext);
  const { confirm } = useContext(ConfirmContext);

  const fetchMakedApplicationDetail = async () => {
    try {
      const response = await request.get(`application/${id}`);
      console.log("get으로 날라온 response", response);
      setDetail(response.result);
      setAppId(id);
      setStudyId(detail.studyId)
      setLoading(false);
      if (response.isSuccess) {
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
  
      if (response.isSuccess) {
        const { selectAnswerList, textAnswerList, title, studyName } = response.result;
        setStudyId(response.result.studyId);
        setAppId(response.result.applicationId);
        setIsConfirm(response.result.confirmYN);
        console.log("selectAnswerList: ", selectAnswerList);
        // 임시 저장된 선택형 응답 상태를 설정
        const loadedSelectedOptions = {};
        selectAnswerList?.forEach(question => {
          loadedSelectedOptions[question.sequence] = question.selectAnswerFieldList
            ?.filter(field => field.selected)
            .map(field => field.fieldId);
        });
        console.log("loadedSelectedOptions: ", loadedSelectedOptions);
  
        // 임시 저장된 주관식 응답 상태를 설정
        const loadedTextAnswers = {};
        textAnswerList?.forEach(question => {
          loadedTextAnswers[question.sequence] = question.text;
        });
  
        setSelectedOptions(loadedSelectedOptions);
        setTextAnswers(loadedTextAnswers);
  
        // 지원서 제목과 스터디 이름 설정
        setDetail({
          title,
          studyName,
          selectQuestionList: selectAnswerList.map(question => ({
            selectQuestionId: question.selectQuestionId,
            question: question.question,
            required: question.required,
            multiSelect: question.multiSelect,
            sequence: question.sequence,
            fieldList: question.selectAnswerFieldList
          })),
          textQuestionList: textAnswerList.map(question => ({
            textQuestionId: question.textQuestionId,
            question: question.question,
            required: question.required,
            sequence: question.sequence,
            text: question.text
          }))
        });
  
        console.log("textAnswers: ", loadedTextAnswers);
        console.log("selectedOptions", loadedSelectedOptions);
        setLoading(false);
      } else {
        console.error("임시 저장된 답변 조회 실패:", response);
        setError(new Error("임시 저장된 답변 조회 실패"));
        setLoading(false);
      }
    } catch (error) {
      console.error('임시 저장된 답변 조회 오류', error);
      setError(error);
      setLoading(false);
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(type === 'answer'){
          await fetchArbitarySavedAnswers();
        } else if (type === 'application') {
          await fetchMakedApplicationDetail();
        }
      } catch (error) {
        console.error('데이터 불러오기 오류:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id, type]);

  const handleOptionClick = (selectQuestionId, fieldId, multiSelect) => {
    if(isConfirm) {
      alert("이미 지원한 스터디입니다.");
      return;
    } 
    setSelectedOptions(prevSelected => {
      // 이전 상태를 복사하여 새로운 상태를 생성
      const newSelectedOptions = { ...prevSelected };
  
      // 해당 질문에 대한 선택된 옵션 배열 가져오기
      let selectedForQuestion = newSelectedOptions[selectQuestionId] || [];
  
      if (multiSelect) {
        // 다중 선택일 경우
        if (selectedForQuestion.includes(fieldId)) {
          // 이미 선택된 상태이면 제거
          selectedForQuestion = selectedForQuestion.filter(id => id !== fieldId);
        } else {
          // 선택되지 않은 상태이면 추가
          selectedForQuestion = [...selectedForQuestion, fieldId];
        }
      } else {
        // 단일 선택일 경우, 새로운 선택으로 설정
        selectedForQuestion = [fieldId];
      }
  
      // 새로운 상태 업데이트
      newSelectedOptions[selectQuestionId] = selectedForQuestion;
      console.log("Updated selected options:", newSelectedOptions);
      return newSelectedOptions;
    });
  };  
  
  const handleTextChange = (questionId, text) => {
    if(isConfirm) {
      alert("이미 지원한 스터디입니다.");
      return;
    } 
    setTextAnswers(prevTextAnswers => ({
      ...prevTextAnswers,
      [questionId]: text,
    }));
  };
  
  const WriteApplicationForm = async (distribution) => {
    const createTextAnswerRequestList = Object.keys(textAnswers).map(clientQuestionId => {
      const serverTextQuestionId = detail.textQuestionList.find(question => question.sequence === parseInt(clientQuestionId)).textQuestionId;
      return {
        textQuestionId: serverTextQuestionId,
        text: textAnswers[clientQuestionId]
      };
    });

    const createSelectAnswerRequestList = Object.keys(selectedOptions).map(clientQuestionId => {
      console.log(`Finding question with sequence: ${Number(clientQuestionId)}`); // 로그 추가
      const question = detail.selectQuestionList.find(question => question.sequence === parseInt(clientQuestionId));
      if (!question) {
        console.error(`Question with sequence ${clientQuestionId} not found in selectQuestionList.`);
        return null;
      }
      const serverSelectQuestionId = question.selectQuestionId;
      return {
        selectQuestionId: serverSelectQuestionId,
        fieldIdList: selectedOptions[clientQuestionId]
      };
    }).filter(item => item !== null); // 필터링하여 null 항목 제거

    const requestData = {
      confirmYN: distribution,
      createTextAnswerRequestList,
      createSelectAnswerRequestList
    };

    console.log("requestData", requestData);

    try {
      const response = await request.post(`/answer/${appId}`, requestData);
      console.log("post로 날릴 response", response);

      if (response.isSuccess) {
        console.log("지원서 " + (distribution ? "저장" : "임시저장") + " 성공");
        navigate(`/regularstudy/${studyId}`);
        // navigate(`/apply`);
      } else {
        console.error("지원서 " + (distribution ? "저장" : "임시저장") + " 실패:", response);
        alert("지원서 " + (distribution ? "저장" : "임시저장") + " 실패하였습니다");
      }
    } catch (error) {
      console.error("지원서 " + (distribution ? "저장" : "임시저장") + " 오류", error);
      // alert("지원서 " + (distribution ? "저장" : "임시저장") + " 실패하였습니다");

      if(error.response.data.code === "COMMON4000") {
        // setErrorMessage(error.response.data.message);
        alert(error.response.data.message);
        return;
      }
    }
  };

  const handleSaveBtnClick = async () => {
    if(isConfirm) {
      alert("이미 지원한 스터디입니다.");
      return;
    } 
    // 필수항목이 비었는지 확인
    const hasEmptyRequiredField = detail.textQuestionList.some(question => question.required && !textAnswers[question.sequence]?.trim())
    || detail.selectQuestionList.some(question => question.required && (!selectedOptions[question.sequence] || selectedOptions[question.sequence].length === 0));

    if (hasEmptyRequiredField) {
      alert("필수항목을 모두 작성해주세요");
      return;
    }
    const confirmation = await confirm("지원서를 저장하시겠습니까?"); 
    if (confirmation) {
      await WriteApplicationForm(true);
    }
  };

  const handleTempSaveBtnClick = async () => {
    if(isConfirm) {
      alert("이미 지원한 스터디입니다.");
      return;
    } 
    const confirmation = await alert('지원서를 임시 저장하시겠습니까?');
    if (confirmation) {
      await WriteApplicationForm(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!detail) return null;

  const allQuestions = [...detail.selectQuestionList, ...detail.textQuestionList];
  allQuestions.sort((a, b) => a.sequence - b.sequence);

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
                {question.required ? (
                  <items.NecessaryImg src='/img/necessarystar.png' alt='필수' />
                ) : null}
              </items.QuestionContainer>
              {question.multiSelect ? (
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
                        question.multiSelect ? (
                          <img src="/img/checkedsquare.png" alt="복수응답" style={{ width: "20px", height: "20px" }} />
                        ) : (
                          <img src="/img/checkedcircleicon.png" alt="단일응답" style={{ width: "20px", height: "20px" }} />
                        )
                      ) : (
                        question.multiSelect ? (
                          <img src="/img/iconsquare.png" alt="복수응답" style={{ width: "20px", height: "20px" }} />
                        ) : (
                          <img src="/img/iconcircle.png" alt="단일응답" style={{ width: "20px", height: "20px" }} />
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
  );
}