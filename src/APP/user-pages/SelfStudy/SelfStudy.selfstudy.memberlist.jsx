import React, { useEffect, useState } from 'react';
import * as itemS from "./Styled/SelfStudy.selfstudy.memberlist.styles";
import SelfStudyModal from './SelfStudy.selftstudy.modal';
import request from '../../Api/request';
import { useParams } from 'react-router-dom';

export default function SelfStudyMemberList() {
  const { id } = useParams();
  const [memberData, setMemberData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedMemberId, setSelectedMemberId] = useState(null); // 선택된 멤버 ID 상태 추가

  useEffect(() => {
    const fetchStudyMember = async () => {
      try {
        const response = await request.get(`study/${id}/study-member`);
        console.log("자율 스터디원 목록 조회: ", response);
        if (response["isSuccess"]) {
          setMemberData(response.result.studyMemberList || []); // 데이터가 없을 경우 빈 배열 반환
        }
      } catch (error) {
        console.error("자율 스터디원 목록 조회 오류", error);
      }
    };
    fetchStudyMember();
  }, [id]);

  // 멤버 수락 모달 열기
  const openModalForAcceptance = (studyMemberId) => {
    setModalType('TEMP_APPLY'); // 모달 타입 설정
    setSelectedMemberId(studyMemberId); // 선택된 멤버 ID 저장
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 전화번호 형식 변환 함수
  const formatPhoneNumber = (phoneNumber) => {
    return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  };

  // 상태에 따라 버튼을 렌더링하는 함수
  const renderStatusButton = (status, studyMemberId) => {
    if (status === 'PASS') {
      return <itemS.ParticipatingBlock>참여 중</itemS.ParticipatingBlock>;
    }

    if (status === 'TEMP_APPLY') {
      return <itemS.AcceptanceBtn onClick={() => openModalForAcceptance(studyMemberId)}>수락</itemS.AcceptanceBtn>;
    }
  };

  return (
    <itemS.Container>
      <itemS.Title>스터디원</itemS.Title>
      <itemS.StyledTable>
        <thead>
          <tr>
            <itemS.StyledTd rowIndex={0} colIndex={0}></itemS.StyledTd>
            <itemS.StyledTd rowIndex={0} colIndex={1}>이름</itemS.StyledTd>
            <itemS.StyledTd rowIndex={0} colIndex={2}>휴대폰 번호</itemS.StyledTd>
            <itemS.StyledTd rowIndex={0} colIndex={3}>상태</itemS.StyledTd>
          </tr>
        </thead>
        <tbody>
          {memberData.map((member, index) => (
            <tr key={index}>
              <itemS.StyledTd rowIndex={index + 1} colIndex={0}>
                {member.memberRole === "LEADER" && (
                  <img 
                    src="/img/crown.svg" 
                    alt="crown" 
                    style={{ width: '20px', height: '20px', marginRight: '8px', marginTop: '5px' }}
                  />
                )}
              </itemS.StyledTd>
              <itemS.StyledTd rowIndex={index + 1} colIndex={1}>{member.name}</itemS.StyledTd>
              <itemS.StyledTd rowIndex={index + 1} colIndex={2}>{formatPhoneNumber(member.phoneNumber)}</itemS.StyledTd>
              <itemS.StyledTd rowIndex={index + 1} colIndex={3}>
                {renderStatusButton(member.status, member.studyMemberId)}
              </itemS.StyledTd>
            </tr>
          ))}
        </tbody>
      </itemS.StyledTable>
      {isModalOpen && <SelfStudyModal modalType={modalType} onClose={closeModal} memberId={selectedMemberId} />}
    </itemS.Container>
  )
}
