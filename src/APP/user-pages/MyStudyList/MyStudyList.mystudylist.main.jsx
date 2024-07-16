import React, { useEffect, useState } from 'react';
import MyStudyListIndividual from './MyStudyList.mystudylist.indivisual';
import * as itemS from "../../user-pages/MyStudyList/Styled/MyStudyList.mystudylist.main.styles";
import request from '../../Api/request';

export default function MyStudyList() {
  const [studyList, setStudyList] = useState([]);

  // Fetch both regular and temporary study lists
  // const fetchStudyLists = async () => {
  //   try {
  //     const [regularResponse, tempResponse] = await Promise.all([
  //       request.get(`/study/regular`),
  //       request.get(`/study/temp`)
  //     ]);

  //     if (regularResponse.isSuccess && tempResponse.isSuccess) {
  //       console.log("정규 스터디 조회 성공");
  //       console.log("자율 스터디 조회 성공");
  //       // Combine the study lists
  //       const combinedStudyList = [
  //         ...regularResponse.result.studyList,
  //         ...tempResponse.result.studyList
  //       ];
  //       setStudyList(combinedStudyList);
  //     } else {
  //       if (!regularResponse.isSuccess) {
  //         console.error("정규 스터디 조회 실패:", regularResponse);
  //       }
  //       if (!tempResponse.isSuccess) {
  //         console.error("자율 스터디 조회 실패:", tempResponse);
  //       }
  //     }
  //   } catch (error) {
  //     console.error('스터디 조회 오류', error);
  //   }
  // };

  const fetchStudyLists = async () => { // 최신 4기수 가져오기
    try {
      const response = await request.get(`/study/my`);

      if (response.isSuccess) {
        console.log("나의 스터디 목록 조회 성공",response);
        setStudyList(response.result.studyList);

      } else {
        console.error("나의 스터디 목록 조회 실패:", response);
      }
    } catch (error) {
      console.error('나의 스터디 목록 조회 오류', error);
    }
  };

  useEffect(() => {
    fetchStudyLists();
  }, []);

  return (
    <itemS.Container>
      <itemS.InnerContainer>
        <itemS.TitleContainer>
          <itemS.ApplicationText>
            나의 스터디
          </itemS.ApplicationText>
        </itemS.TitleContainer>
        <itemS.Group>
          {studyList.map((item) => (
            <MyStudyListIndividual 
              key={item.studyId} 
              studyList={item} 
            />
          ))}
        </itemS.Group>
      </itemS.InnerContainer>
    </itemS.Container>
  );
}
