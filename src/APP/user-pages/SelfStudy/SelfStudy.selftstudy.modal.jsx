import React, { useContext } from 'react';
import * as itemS from "./Styled/SelfStudy.selftstudy.modal.styles";
import request from '../../Api/request';
import { AlertContext } from '../../Common/Alert/AlertContext';
import { useNavigate, useParams } from 'react-router-dom';

export default function SelfStudyModal({ modalType, onClose, memberId }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { alert } = useContext(AlertContext);

  const handleConfirm = async () => {
    if (modalType === 'participation') {
      try {
        const response = await request.post(`/study/${id}/apply`);
        console.log('스터디 참여 신청 성공:', response);
        if (response.isSuccess) {
          // alert('스터디 지원을 완료했습니다.');
          window.location.reload();
        } 
      } catch (error) {
        console.error('스터디 참여 API 요청 오류:', error);
      }
    }
    if (modalType === 'endStudy') {
      try {
        const response = await request.patch(`/study/${id}/end`);
        console.log("자율스터디 삭제 api응답: ", response);
        if (response.isSuccess) {
          alert("자율 스터디가 삭제되었습니다.");
          navigate(`/study`);
        }
      }catch(error) {
        console.error('자율스터디 삭제 중 오류:', error);
      }
    }
    if (modalType === 'TEMP_APPLY') {
      try {
        const response = await request.post(`study/${memberId}/pass`);
        console.log("자율 스터디원 수락 api응답: ", response);
        if (response.isSuccess) {
          window.location.reload();
        }
      } catch (error) {
        console.error('자율 스터디원 수락 중 오류:', error);
      }
    }
    onClose(); // 모달 닫기
  };

  const getMessage = () => {
    switch(modalType) {
        case 'participation':
            return '스터디 참여 시, 스터디장에게 휴대폰 번호가 전달됩니다.<br>스터디에 참여하시겠습니까?';
        case 'endStudy':
            return '스터디 종료 시, 스터디 수정과 스터디원 모집이 불가능합니다.<br>스터디를 정말로 종료하시겠습니까?';
        case 'TEMP_APPLY':
            return '수락 시, 지원자의 이메일로 수락 안내 메일이 발송됩니다.<br>스터디원을 수락하시겠습니까?';
        default:
            return '';
    }
  };
  return (
    <itemS.ModalBackground>
        <itemS.ModalContent>
            <itemS.ModalHeader>
                <img src="/img/close.png" onClick={onClose} style={{ marginTop: "0.667rem", marginRight: "1rem", cursor: "pointer" }} alt="x" />
            </itemS.ModalHeader>
            <itemS.ModalSentence dangerouslySetInnerHTML={{ __html: getMessage() }} />
            <itemS.BtnContainer>
                <itemS.CancelBtn onClick={onClose}>취소</itemS.CancelBtn>
                <itemS.ConfirmBtn onClick={handleConfirm}>확인</itemS.ConfirmBtn>
            </itemS.BtnContainer>
        </itemS.ModalContent>
    </itemS.ModalBackground>
  )
}
