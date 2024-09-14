import React, { useEffect, useState } from 'react';
import MyPageIndividual from './Mypage.mypage.indivisual';
import MyInfo from './Mypage.mypage.myinfo';
import * as itemS from "./Styled/Mypage.mypage.main.styles";
import request from '../../Api/request';

export default function MyPage() {
  const [myInfoData, setMyInfoData] = useState({});
  const [passStudyList, setPassStudyList] = useState([]);
  const [applyStudyList, setApplyStudyList] = useState([]);

  const [memberID, setMemberID] = useState(20);

  const fetchMyInfo = async () => {
    try {
      const response = await request.get(`/member/${memberID}/info`);

      if (response.isSuccess) {
        console.log("나의 정보 조회 성공",response);
        setMyInfoData(response.result);

      } else {
        console.error("나의 정보 조회 실패:", response);
      }
    } catch (error) {
      console.error('나의 정보 조회 오류', error);
    }
      
  };
  // "result": {
  //   "memberId": 0,
  //   "profileUrl": "string",
  //   "name": "string",
  //   "email": "string",
  //   "grade": 0,
  //   "major": "string",
  //   "handle": "string",
  //   "phoneNumber": "string",
  //   "role": "ROLE_USER"
  // },

  const fetchMyStudy = async () => {
    try {
      const response = await request.get(`/member/${memberID}/study`);

      if (response.isSuccess) {
        console.log("나의 스터디 조회 성공",response); 
        setPassStudyList(response.result.passStudyList);
        setApplyStudyList(response.result.applyStudyList);

      } else {
        console.error("나의 스터디 조회 실패:", response);
      }
    } catch (error) {
      console.error('나의 스터디 조회 오류', error);
    }
      
  };

  useEffect(() => {
    fetchMyInfo();
    fetchMyStudy()
  }, []);

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
            {passStudyList.map((item) => (
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
