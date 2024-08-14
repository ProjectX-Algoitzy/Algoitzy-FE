import styled, { css } from 'styled-components';
import * as tokens from "../../../../tokens"

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 41.13rem;
  background-color: white;
  border-radius: 0.167rem;
`;

// 모달 외부  #121721 49%
export const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: rgba(18, 23, 33, 0.49); 
  padding: 5.292rem 0 14.875rem 0px;
  z-index: 1001; 
`;

// 제목 박스
export const TopBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 37.96rem;
  padding: 0.625rem 1rem 0.875rem 2.167rem; 
  border-bottom: 0.042rem solid ${tokens.colors.B_Grey_3};
  margin-bottom: 2.083rem;
`;

// 지원서 보기
export const Title = styled.div`
  ${tokens.typography.T3_B_24};
  color: ${tokens.colors.Grey_8};
`;

// 닫기 버튼
export const Close = styled.div`
  background-image: url('/img/close.png');
  background-size: cover;
  width: 1.333rem; 
  height: 1.333rem; 
  cursor: pointer;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center; 
  min-height: 29.167rem; 
  margin-bottom: 2.083rem; 
`;