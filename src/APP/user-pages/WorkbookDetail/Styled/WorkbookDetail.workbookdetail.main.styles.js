import styled, { css } from 'styled-components';
import * as tokens from "../../../../tokens"

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 987px;
  // height: 1074px;
  background-color: white;
  border-radius: 4px;
  
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
  padding: 127px 0 357px 0px;
  z-index: 1001; 
  
`;

// 제목 박스
export const TopBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 911px;
  // height: 62px;
  padding: 15px 24px 21px 52px;
  border-bottom: 1px solid ${tokens.colors.B_Grey_3};
  margin-bottom: 50px;
`;


// 지원서 보기
export const Title = styled.div`
  ${tokens.typography.T3_B_24};
  color: ${tokens.colors.Grey_8};
`;

// 닫기 버튼
export const Close = styled.div`
  background-image: url('/img/close.png');
  width: 32px;
  height: 32px;
  cursor: pointer;
`;


export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center; 
  min-height: 700px;
  margin-bottom: 50px;
`;
