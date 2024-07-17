import React, { useEffect, useState } from 'react';
import ApplyRegularStudyIndividual from './ApplyRegularStudy.applyregularstudy.indivisual';
import * as itemS from "../../user-pages/ApplyRegularStudy/Styled/ApplyRegularStudy.applyregularstudy.main.styles";
import request from '../../Api/request';

export default function ApplyRegularStudy() {
  const [studyList, setStudyList] = useState([]);

  const fetchStudyList = async () => { // 정규 스터디 가져오기
    try {
      const response = await request.get(`/study/regular`);

      if (response.isSuccess) {
        console.log("정규 스터디 목록 조회 성공",response);
        setStudyList(response.result.studyList);

      } else {
        console.error("정규 스터디 목록 조회 실패:", response);
      }
    } catch (error) {
      console.error('정규 스터디 목록 조회 오류', error);
    }
  };

  useEffect(() => {
    fetchStudyList();
  }, []);

  return (
    <itemS.Container>
      <itemS.InnerContainer>
        
        <itemS.Group>
          {studyList.map((item) => (
            <ApplyRegularStudyIndividual 
              key={item.studyId} 
              studyList={item} 
            />
          ))}
        </itemS.Group>
      </itemS.InnerContainer>
    </itemS.Container>
  );
}
