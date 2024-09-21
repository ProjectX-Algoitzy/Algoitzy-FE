import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MakedSelfStudyListIndividual from './MakedSelfStudyList.makedselfstudylist.indivisual';
import * as itemS from "../../user-pages/MakedSelfStudyList/Styled/MakedSelfStudyList.makedselfstudylist.main.styles";
import { dummyData } from './dummy';
import request from '../../Api/request';

export default function MakedSelfStudyList() {
  const navigate = useNavigate();
  const [studyList, setStudyList] = useState([]);

  const fetchStudyList = async () => {
    try {
      const response = await request.get(`/study/temp`);
      if (response.isSuccess) {
        console.log("자율 스터디 목록 조회 성공",response);
        setStudyList(response.result.studyList);
      } else {
        console.error("자율 스터디 목록 조회 실패:", response);
      }
    } catch (error) {
      console.error('자율 스터디 목록 조회 오류', error);
    }
  };

  useEffect(() => {
    fetchStudyList();
  }, []);

  const MakeSelfStudy = () => { // 보기 추가 함수
		navigate(`/newstudy`);
	}
    
  return (
    <itemS.Container>
      <itemS.InnerContainer>
        <itemS.TitleContainer>
          <itemS.ApplicationText>
            자율 스터디
          </itemS.ApplicationText>
          <itemS.BtnMakeApp onClick={MakeSelfStudy}>
            + 스터디 생성하기
          </itemS.BtnMakeApp>
          
        </itemS.TitleContainer>
        <itemS.Group>
          {studyList.map((item) => (
            <MakedSelfStudyListIndividual 
              key={item.studyId} 
              studyList={item} 
            />
          ))}
        </itemS.Group>
      </itemS.InnerContainer>
    </itemS.Container>
  )
}
