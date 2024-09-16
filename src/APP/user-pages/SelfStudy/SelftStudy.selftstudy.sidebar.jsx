import React, { useState } from 'react';
import * as itemS from "./Styled/SelftStudy.selftstudy.sidebar.styles";
import request from '../../Api/request';
import { useNavigate, useParams } from 'react-router-dom';
import SelfStudyModal from './SelfStudy.selftstudy.modal';

export default function SelftStudySidebar({setActiveComponent, activeComponent, setIsEditing}) {
  const { id } = useParams(); // 파라미터로 받는 해당 정규스터디의 studyId
  const navigate = useNavigate();
  const [selfStudyInfo, setSelfStudyInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // 모달 타입 상태 추가

//   useEffect(() => {
//     const fetchRegularStudyInfo = async () => {
//       try {
//         const response = await request.get(`study/${id}/info`);
//         console.log("정규 스터디 사이드 바 조회 정보: ", response);
//         setSelfStudyInfo(response.result);
//         if (response["isSuccess"]) {
//           console.log("정규 스터디 조회 성공");
//         } else {
//           console.error("정규 스터디 조회 실패:", response);
//         }
//       } catch (err) {
//         console.error("정규스터디 정보 조회 오류", err);
//       }
//     };
//     fetchRegularStudyInfo();
//   }, [id]);

  const openModalForParticipation = () => {
    setModalType('participation'); // 모달 타입 설정
    setIsModalOpen(true);
  };

  const openModalForEndStudy = () => {
    setModalType('endStudy'); // 모달 타입 설정
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    // <itemS.Container>
    //   <itemS.InnerContainer>
    //     {selfStudyInfo ? (
    //       <>
    //         <itemS.StudyImgContainer>
    //           <img src={selfStudyInfo.profileUrl} alt="스터디 이미지" style={{ width: "100%", height: "100%" }} />
    //         </itemS.StudyImgContainer>
    //         <itemS.TitleContainer>
    //           {selfStudyInfo.studyName} <img src="/img/iconregularstudy.png" alt="정규스터디 아이콘" style={{ marginLeft: "0.333rem", width: "1.833rem", height: "0.875rem" }} />
    //         </itemS.TitleContainer>
    //         <itemS.CountAndOnlineContainer>
    //           <itemS.CountContainer>
    //             <img src="/img/iconpeople.png" alt="사람아이콘" style={{ width: "1rem", height: "1rem", marginRight: "0.333rem" }} />
    //             {selfStudyInfo.memberCount}명
    //           </itemS.CountContainer>
    //           {/* <itemS.OnlineContainer>
    //             <img src="/img/icononline.png" alt="사람아이콘" style={{width:"24px", height:"24px", marginRight:"8px"}} />
    //             온라인
    //           </itemS.OnlineContainer> */}
    //         </itemS.CountAndOnlineContainer>
    //         {/* <itemS.ManagerNameContainer>
    //           <img src={selfStudyInfo.leaderProfileUrl} alt="회색동그라미" style={{width:"18px", height:"18px", marginRight:"8px"}} />
    //           {selfStudyInfo.leaderName}
    //           <img src="/img/iconstudymanager.png" alt="스터디장" style={{width:"58px", height:"19px", marginLeft:"8px"}} />
    //         </itemS.ManagerNameContainer> */}
    //         <itemS.LinkContainer>
    //           <itemS.styledLink
    //             onClick={() => setActiveComponent('home')}
    //             isActive={activeComponent === 'home'}
    //           >
    //             홈 <itemS.ArrowImg src="/img/grayarrow.png" alt="화살표" />
    //           </itemS.styledLink>
    //           <itemS.styledLink
    //             onClick={() => setActiveComponent('curriculum')}
    //             isActive={activeComponent === 'curriculum'}
    //           >
    //             커리큘럼 <itemS.ArrowImg src="/img/grayarrow.png" alt="화살표" />
    //           </itemS.styledLink>
    //           <itemS.styledLink
    //             onClick={() => setActiveComponent('mocktest')}
    //             isActive={activeComponent === 'mocktest'}
    //           >
    //             모의테스트 <itemS.ArrowImg src="/img/grayarrow.png" alt="화살표" />
    //           </itemS.styledLink>
    //           <itemS.ThirdstyledLink
    //             onClick={() => setActiveComponent('attendance')}
    //             isActive={activeComponent === 'attendance'}
    //           >
    //             출석부 <itemS.ArrowImg src="/img/grayarrow.png" alt="화살표" />
    //           </itemS.ThirdstyledLink>
    //           {selfStudyInfo.applicationId === null ? (
    //             <itemS.AnnouncementBlock>지원 기간이 아닙니다.</itemS.AnnouncementBlock>
    //           ) : (
    //             <itemS.Btn onClick={handleApplicationClick}>지원하기</itemS.Btn>
    //           )}
    //         </itemS.LinkContainer>
    //       </>
    //     ) : (
    //       <div>Loading...</div>
    //     )}
    //   </itemS.InnerContainer>
    // </itemS.Container>
    <itemS.Container>
      <itemS.InnerContainer>
            <itemS.StudyImgContainer>
              {/* <img src="img/GrayRectangle.png" alt="스터디 이미지" style={{ width: "100%", height: "100%" }} /> */}
            </itemS.StudyImgContainer>
            <itemS.TitleContainer>
               눈 뜨고 잠들기 스터디
            </itemS.TitleContainer>
            <itemS.CountAndOnlineContainer>
              <itemS.CountContainer>
                <img src="/img/iconpeople.png" alt="사람아이콘" style={{ width: "1rem", height: "1rem", marginRight: "0.333rem" }} />
                1명
              </itemS.CountContainer>
              <itemS.OnlineContainer>
                <img src="/img/icononline.png" alt="사람아이콘" style={{width:"24px", height:"24px", marginRight:"8px"}} />
                온라인
              </itemS.OnlineContainer>
            </itemS.CountAndOnlineContainer>
            <itemS.ManagerNameContainer>
                <itemS.ManagerNameContainerBoxLeft>
                    <img src="/img/graycircle.png" alt="회색동그라미" style={{width:"18px", height:"18px", marginRight:"8px"}} />
                    김두현
                    <img src="/img/iconstudymanager.png" alt="스터디장" style={{width:"58px", height:"19px", marginLeft:"8px"}} />
                </itemS.ManagerNameContainerBoxLeft>
                <itemS.ManagerNameContainerBoxRight>2023.04.28 개설</itemS.ManagerNameContainerBoxRight>
            </itemS.ManagerNameContainer>
            <itemS.LinkContainer>
              <itemS.styledLink
                onClick={() => setActiveComponent('home')}
                isActive={activeComponent === 'home'}
              >
                스터디 홈 <itemS.ArrowImg src="/img/grayarrow.png" alt="화살표" />
              </itemS.styledLink>
              <itemS.styledLink
                onClick={() => setActiveComponent('memberlist')}
                isActive={activeComponent === 'memberlist'}
              >
                스터디원 <itemS.ArrowImg src="/img/grayarrow.png" alt="화살표" />
              </itemS.styledLink>

              <itemS.BlueBtn onClick={openModalForParticipation}>지원하기</itemS.BlueBtn>
              <itemS.Gray3Block>참여 중</itemS.Gray3Block>
              <itemS.Gray4Block>수락 대기 중</itemS.Gray4Block>
              <itemS.Gray7Btn onClick={() => setIsEditing(true)}>수정하기</itemS.Gray7Btn>
              <itemS.RedBtn onClick={openModalForEndStudy}>스터디 종료</itemS.RedBtn>
              <itemS.BlueBtn onClick={() => setIsEditing(false)}>수정완료</itemS.BlueBtn>
            </itemS.LinkContainer>
      </itemS.InnerContainer>
      {isModalOpen && <SelfStudyModal modalType={modalType} onClose={closeModal} />}
    </itemS.Container>
  )
}
