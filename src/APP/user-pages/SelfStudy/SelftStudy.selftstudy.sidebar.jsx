import React, { useState } from 'react';
import * as itemS from "./Styled/SelftStudy.selftstudy.sidebar.styles";
import SelfStudyModal from './SelfStudy.selftstudy.modal';
import { useNavigate, useParams } from 'react-router-dom';

export default function SelftStudySidebar({selfStudyInfo, setActiveComponent, activeComponent}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // 모달 타입 상태 추가

  const handleEditStduyInfo = () => {
    navigate(`/editstudy/${id}`);
  };

  const handleEdit = () => {
    navigate(`/writeSelfStudy`, {
		state: {
			boardId: id,
		  },
    });
  };

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  let actionForMember;
  // selfStudyInfo가 존재할 때만 status를 체크하도록 수정
  if (selfStudyInfo && selfStudyInfo.status === "PASS") {
    actionForMember = (<itemS.Gray3Block>참여 중</itemS.Gray3Block>);
  } else if (selfStudyInfo && selfStudyInfo.status === "TEMP_APPLY") {
    actionForMember = (<itemS.Gray4Block>수락 대기 중</itemS.Gray4Block>);
  } else if (selfStudyInfo && selfStudyInfo.status === null) {
    actionForMember = (<itemS.BlueBtn onClick={openModalForParticipation}>지원하기</itemS.BlueBtn>);
  }
  
  return (
    <itemS.Container>
      <itemS.InnerContainer>
        {selfStudyInfo ? (
          <>
            <itemS.StudyImgContainer>
              <img src={selfStudyInfo.profileUrl} alt="스터디 이미지" style={{ width: "100%", height: "100%" }} />
            </itemS.StudyImgContainer>
            <itemS.TitleContainer>
              {selfStudyInfo.studyName}
            </itemS.TitleContainer>
            <itemS.CountAndOnlineContainer>
              <itemS.CountContainer>
                <img src="/img/iconpeople.png" alt="사람아이콘" style={{ width: "1rem", height: "1rem", marginRight: "0.333rem" }} />
                <itemS.CountDiv>{selfStudyInfo.memberCount}명</itemS.CountDiv>
              </itemS.CountContainer>
            </itemS.CountAndOnlineContainer>
            <itemS.ManagerNameContainer>
                <itemS.ManagerNameContainerBoxLeft>
                  <img src={selfStudyInfo.leaderProfileUrl} alt="회색동그라미" style={{width:"18px", height:"18px", marginRight:"8px"}} />
                  <itemS.ManagerNameDiv>{selfStudyInfo.leaderName}</itemS.ManagerNameDiv>
                  <img src="/img/iconstudymanager.png" alt="스터디장" style={{width:"58px", height:"19px", marginLeft:"8px"}} />
                </itemS.ManagerNameContainerBoxLeft>
                <itemS.ManagerNameContainerBoxRight>{formatDate(selfStudyInfo.createdTime)} 개설</itemS.ManagerNameContainerBoxRight>
            </itemS.ManagerNameContainer>
            <itemS.LinkContainer>
              <itemS.styledLink
                onClick={() => setActiveComponent('home')}
                isActive={activeComponent === 'home'}
              >
                스터디 홈 <itemS.ArrowImg src="/img/grayarrow.png" alt="화살표" />
              </itemS.styledLink>
              {selfStudyInfo.status === "PASS" && (
                <itemS.styledLink
                  onClick={() => setActiveComponent('memberlist')}
                  isActive={activeComponent === 'memberlist'}
                >
                  스터디원 <itemS.ArrowImg src="/img/grayarrow.png" alt="화살표" />
                </itemS.styledLink>
              )}

              {selfStudyInfo.memberRole === "LEADER" ? (
                <>
                  <itemS.Gray7Btn onClick={handleEdit}>수정하기</itemS.Gray7Btn>
                  <itemS.RedBtn onClick={openModalForEndStudy}>스터디 종료</itemS.RedBtn>
                </>
              ): (actionForMember)}
            </itemS.LinkContainer>
          </>
        ): (
          <div>Loading...</div>
        )}
      </itemS.InnerContainer>
      {isModalOpen && <SelfStudyModal modalType={modalType} onClose={closeModal} />}
    </itemS.Container>
  )
}