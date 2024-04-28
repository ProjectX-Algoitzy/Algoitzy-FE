import axios from 'axios';
import React, { useState } from 'react'

export default function WritingApplication() {
    const accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndGo1NTdAbmF2ZXIuY29tIiwiYXV0aCI6IlJPTEVfVVNFUiIsImVtYWlsIjoiZ3RqNTU3QG5hdmVyLmNvbSIsImV4cCI6MTcxNDI5MTY1M30.xskhXD-76FRjbPlsTHL35ggIt8E_404x8gshLfnDvXbHIVIK3w1NiUF7Y8GsmqN1a-DQ1tjvpW70Af5aA-CtTg"
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

      const header = {
          headers: {
              'Authorization': `Bearer ${accessToken}`,
              'accept': '*/*',
          }
      };

      try {
          const response = await axios.post('http://3.35.47.250:8281/answer/17', requestData, header);
          console.log("response", response);
          if (response.status === 200) {
              console.log("지원서 제출 성공");
          } else {
              console.error("지원서 제출 실패:", response.data);
          }
      } catch (error) {
          console.error("지원서 제출 오류", error);
      }
  };
    return (
    <div>
      <div>지원서 작성을 위한 페이지</div>
      <div><input type='text' placeholder='주관식 답변' value={textAnswer} onChange={onChangeTextAnswer} /></div>
      {/* 아직 사용하면 안됨 <div><input type='text' placeholder='객관식 답변' value={selectAnswer} onChange={onChangeSelectAnswer} /></div> */}
      <button onClick={submitApplication}>제출하기</button>

    </div>
  )
}
