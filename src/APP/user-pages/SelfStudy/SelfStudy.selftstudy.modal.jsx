import React, { useContext } from 'react';
import * as itemS from "./Styled/SelfStudy.selftstudy.modal.styles";
import request from '../../Api/request';
import { AlertContext } from '../../Common/Alert/AlertContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

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
          onClose(); // 모달 닫기
          await alert('스터디 지원을 완료했습니다.');
          window.location.reload();
        } 
      } catch (error) {
        onClose(); // 모달 닫기
        console.error('스터디 참여 API 요청 오류:', error);
      }
    }
    if (modalType === 'endStudy') {
      try {
        const response = await request.patch(`/study/${id}/end`);
        console.log("자율스터디 삭제 api응답: ", response);
        if (response.isSuccess) {
          onClose(); // 모달 닫기
          await alert("자율 스터디가 종료되었습니다.");
          navigate(`/study`);
        }
      } catch(error) {
        console.error('자율스터디 삭제 중 오류:', error);
      }
    }
    if (modalType === 'TEMP_APPLY') {
      // try {
      //   const response = await request.post(`study/${memberId}/pass`);
      //   console.log("자율 스터디원 수락 api응답: ", response);
      //   if (response.isSuccess) {
      //     window.location.reload();
      //   }
      // } catch (error) {
      //   onClose(); // 모달 닫기
      //   console.error('자율 스터디원 수락 중 오류:', error);
      // }
      try {
        // 직접 axios 요청을 보낼 때, request.js의 설정을 고려하여 인증 헤더와 baseURL을 설정
        const token = window.localStorage.getItem('accessToken'); // request.js와 동일한 토큰 가져오기
        const response = await axios.post(
          `https://user-api.kau-koala.com/study/${memberId}/pass`,
          {}, 
          {
            headers: {
              withCredentials: true,
              transformRequest: true,
              Authorization: `Bearer ${token}`, // 인증 토큰 설정
            },
          }
        );
    
        console.log("자율 스터디원 수락 api응답: ", response);
        if (response.data.isSuccess) {
          window.location.reload(); // 성공 시 페이지 리로드
        }
      } catch (error) {
        onClose(); // 모달 닫기
        console.error('자율 스터디원 수락 중 오류:', error);
    
        // request.js의 인터셉터와 유사한 에러 처리 로직 추가
        if (error.response && error.response.data) {
          const { data, status } = error.response;
          const code = data.code;
          const message = data.message;
    
          switch (code) {
            case 'NOTICE':
              await alert(message);
              break;
            case 'TOKEN_EXPIRED':
              window.localStorage.clear();
              window.location.href = '/login';
              break;
            default:
              console.error(`Unexpected error: ${message}`, error);
              if (message === '만료된 토큰입니다.') {
                window.localStorage.clear();
                window.location.href = '/login';
              }
              break;
          }
        }
      }
    }
    onClose(); // 모달 닫기
  };

  const getMessage = () => {
    switch(modalType) {
        case 'participation':
            return '스터디 지원 시, 스터디장에게 휴대폰 번호가 전달됩니다.<br>스터디에 지원하시겠습니까?';
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
