import React, { useEffect, useState } from 'react';
import * as itemS from "../RegularStudy/Styled/RegularStudy.regularstudy.sidebar.styles";
import request from '../../Api/request';
import { useNavigate, useParams } from 'react-router-dom';

export default function RegularStudySideBar({ setActiveComponent, activeComponent }) {
  const { id } = useParams(); // 파라미터로 받는 해당 정규스터디의 studyId
  const navigate = useNavigate();
  const [regularStudyInfo, setRegularStudyInfo] = useState(null);

  useEffect(() => {
    const fetchRegularStudyInfo = async () => {
      try {
        const response = await request.get(`study/${id}/info`);
        console.log("정규 스터디 사이드 바 조회 정보: ", response);
        setRegularStudyInfo(response.result);
        if (response["isSuccess"]) {
          console.log("정규 스터디 조회 성공");
        } else {
          console.error("정규 스터디 조회 실패:", response);
        }
      } catch (err) {
        console.error("정규스터디 정보 조회 오류", err);
      }
    };
    fetchRegularStudyInfo();
  }, [id]);

  const handleApplicationClick = () => {
    if (regularStudyInfo.answerYN) {
      navigate(`/writingapplication/answer/${regularStudyInfo.answerId}`);
    } else {
      navigate(`/writingapplication/application/${regularStudyInfo.applicationId}`);
    }
  };

  return (
    <itemS.Container>
      <itemS.InnerContainer>
        {regularStudyInfo ? (
          <>
            <itemS.StudyImgContainer>
              <img src={regularStudyInfo.profileUrl} alt="스터디 이미지" style={{ width: "100%", height: "100%" }} />
            </itemS.StudyImgContainer>
            <itemS.TitleContainer>
              {regularStudyInfo.studyName} <img src="/img/iconregularstudy.png" alt="정규스터디 아이콘" style={{ marginLeft: "0.333rem", width: "1.833rem", height: "0.875rem" }} />
            </itemS.TitleContainer>
            <itemS.CountAndOnlineContainer>
              <itemS.CountContainer>
                <img src="/img/iconpeople.png" alt="사람아이콘" style={{ width: "1rem", height: "1rem", marginRight: "0.333rem" }} />
                {regularStudyInfo.memberCount}명
              </itemS.CountContainer>
              {/* <itemS.OnlineContainer>
                <img src="/img/icononline.png" alt="사람아이콘" style={{width:"24px", height:"24px", marginRight:"8px"}} />
                온라인
              </itemS.OnlineContainer> */}
            </itemS.CountAndOnlineContainer>
            {/* <itemS.ManagerNameContainer>
              <img src={regularStudyInfo.leaderProfileUrl} alt="회색동그라미" style={{width:"18px", height:"18px", marginRight:"8px"}} />
              {regularStudyInfo.leaderName}
              <img src="/img/iconstudymanager.png" alt="스터디장" style={{width:"58px", height:"19px", marginLeft:"8px"}} />
            </itemS.ManagerNameContainer> */}
            <itemS.LinkContainer>
              <itemS.styledLink
                onClick={() => setActiveComponent('home')}
                isActive={activeComponent === 'home'}
              >
                홈 <itemS.ArrowImg src="/img/grayarrow.png" alt="화살표" />
              </itemS.styledLink>
              <itemS.styledLink
                onClick={() => setActiveComponent('curriculum')}
                isActive={activeComponent === 'curriculum'}
              >
                커리큘럼 <itemS.ArrowImg src="/img/grayarrow.png" alt="화살표" />
              </itemS.styledLink>
              <itemS.styledLink
                onClick={() => setActiveComponent('mocktest')}
                isActive={activeComponent === 'mocktest'}
              >
                모의테스트 <itemS.ArrowImg src="/img/grayarrow.png" alt="화살표" />
              </itemS.styledLink>
              <itemS.ThirdstyledLink
                onClick={() => setActiveComponent('attendance')}
                isActive={activeComponent === 'attendance'}
              >
                출석부 <itemS.ArrowImg src="/img/grayarrow.png" alt="화살표" />
              </itemS.ThirdstyledLink>
              {regularStudyInfo.applicationId === null ? (
                <itemS.AnnouncementBlock>지원 기간이 아닙니다.</itemS.AnnouncementBlock>
              ) : (
                <itemS.Btn onClick={handleApplicationClick}>지원하기</itemS.Btn>
              )}
            </itemS.LinkContainer>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </itemS.InnerContainer>
    </itemS.Container>
  );
}
