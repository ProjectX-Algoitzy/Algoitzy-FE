import React, { useState } from 'react';
import * as itemS from "./Styled/SelfStudy.selfstudy.memberlist.styles";
import SelfStudyModal from './SelfStudy.selftstudy.modal';

export default function SelfStudyMemberList() {
  // 하드코딩된 더미 데이터
  const memberData = [
    { name: '김두현', phone: '010-1234-1234', status: 'participating', hasCrown: true },
    { name: '민중원', phone: '010-1234-1234', status: 'participating', hasCrown: false},
    { name: '박창현', phone: '010-1234-1234', status: 'acceptance', hasCrown: false },
    { name: '추세빈', phone: '010-1234-1234', status: 'acceptance', hasCrown: false },
    { name: '이유경', phone: '010-1234-1234', status: 'acceptance', hasCrown: false },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // 모달 타입 상태 추가

  const openModalForAcceptance = () => {
    setModalType('acceptance'); // 모달 타입 설정
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 상태에 따라 버튼을 렌더링하는 함수
  const renderStatusButton = (status) => {
    if (status === 'participating') {
      return <itemS.ParticipatingBlock>참여 중</itemS.ParticipatingBlock>;
    } else if (status === 'acceptance') {
      return <itemS.AcceptanceBtn onClick={openModalForAcceptance}>수락</itemS.AcceptanceBtn>;
    }
  };

  return (
    <itemS.Container>
      <itemS.Title>스터디원</itemS.Title>
      <itemS.StyledTable>
        <thead>
          <tr>
            <itemS.StyledTd rowIndex={0} colIndex={0}>이름</itemS.StyledTd>
            <itemS.StyledTd rowIndex={0} colIndex={1}>휴대폰 번호</itemS.StyledTd>
            <itemS.StyledTd rowIndex={0} colIndex={2}>상태</itemS.StyledTd>
          </tr>
        </thead>
        <tbody>
          {memberData.map((member, index) => (
            <tr key={index}>
              <itemS.StyledTd rowIndex={index + 1} colIndex={0}>
                {member.hasCrown && (
                  <img 
                    src="/img/crown.svg" 
                    alt="crown" 
                    style={{ width: '20px', height: '20px', marginRight: '8px' }}
                  />
                )}
                {member.name}
              </itemS.StyledTd>
              <itemS.StyledTd rowIndex={index + 1} colIndex={1}>{member.phone}</itemS.StyledTd>
              <itemS.StyledTd rowIndex={index + 1} colIndex={2}>
                {renderStatusButton(member.status)}
              </itemS.StyledTd>
            </tr>
          ))}
        </tbody>
      </itemS.StyledTable>
      {isModalOpen && <SelfStudyModal modalType={modalType} onClose={closeModal} />}
    </itemS.Container>
  )
}
