import React from 'react';
import * as itemS from "./Styled/SelfStudy.selftstudy.modal.styles";

export default function SelfStudyModal({ modalType, onClose }) {
  const getMessage = () => {
    switch(modalType) {
        case 'participation':
            return '스터디 참여 시, 스터디장에게 휴대폰 번호가 전달됩니다.<br>스터디에 참여하시겠습니까?';
        case 'endStudy':
            return '스터디 종료 시, 스터디 수정과 스터디원 모집이 불가능합니다.<br>스터디를 정말로 종료하시겠습니까?';
        case 'acceptance':
            return '수락 시, 지원자의 휴대폰 번호로 수락 안내 문자가 발송됩니다.<br>스터디원을 수락하시겠습니까?';
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
            <p dangerouslySetInnerHTML={{ __html: getMessage() }} />
            <itemS.BtnContainer>
                <itemS.CancelBtn onClick={onClose}>취소</itemS.CancelBtn>
                <itemS.ConfirmBtn onClick={onClose}>확인</itemS.ConfirmBtn>
            </itemS.BtnContainer>
        </itemS.ModalContent>
    </itemS.ModalBackground>
  )
}
