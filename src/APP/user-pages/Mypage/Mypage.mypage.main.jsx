import React, { useEffect, useState } from 'react';
import MyPageIndividual from './Mypage.mypage.indivisual';
import MyInfo from './Mypage.mypage.myinfo';
import * as itemS from "./Styled/Mypage.mypage.main.styles";
import request from '../../Api/request';
import { mystudydata, applystudydata, myinfodata } from './dummy';

export default function MyPage() {
  const [myInfoData, setMyInfoData] = useState([]);
  const [myStudyList, setMyStudyList] = useState([]);
  const [applyStudyList, setApplyStudyList] = useState([]);

  useEffect(() => {
    setMyStudyList(mystudydata);
    setApplyStudyList(applystudydata);
    setMyInfoData(myinfodata);
  }, []);

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

  // const fetchStudyList = async () => { // 나의 스터디 가져오기
  //   try {
  //     const response = await request.get(`/study/my`);

  //     if (response.isSuccess) {
  //       console.log("나의 스터디 목록 조회 성공",response);
  //       setStudyList(response.result.studyList);

  //     } else {
  //       console.error("나의 스터디 목록 조회 실패:", response);
  //     }
  //   } catch (error) {
  //     console.error('나의 스터디 목록 조회 오류', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchStudyList();
  // }, []);

  return (
    <itemS.Container>
      <itemS.InnerContainer>
        <itemS.MyInfoContainer>
          <itemS.HeadBox>
            <itemS.Head>
              마이페이지
            </itemS.Head>
          </itemS.HeadBox>
          <MyInfo 
            item={myInfoData} 
          />
          
        </itemS.MyInfoContainer>

        <itemS.StudyListContainer>
          <itemS.StudyHeadBox>
            <itemS.Head>
              참여중인 스터디
            </itemS.Head>
          </itemS.StudyHeadBox>
          <itemS.Group>
            {myStudyList.map((item) => (
              <MyPageIndividual 
                key={item.studyId} 
                studyList={item} 
              />
            ))}
          </itemS.Group>
        </itemS.StudyListContainer>

        <itemS.StudyListContainer>
          <itemS.StudyHeadBox>
            <itemS.Head>
              지원한 스터디
            </itemS.Head>
          </itemS.StudyHeadBox>
          <itemS.Group>
            {applyStudyList.map((item) => (
              <MyPageIndividual 
                key={item.studyId} 
                studyList={item} 
              />
            ))}
          </itemS.Group>
        </itemS.StudyListContainer>
      </itemS.InnerContainer>
    </itemS.Container>
  );
}
