import styled from 'styled-components'
import * as tokens from "../../../../tokens";

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: end;
`;

export const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 770px;
  height: 348px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  z-index: 10000; /* 모달이 다른 요소들 위에 나타나게 */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 콘텐츠를 위와 아래로 배치 */
`;

// 모달 외부 클릭을 차단하는 투명한 배경
export const DisableBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  z-index: 9998;
  pointer-events: none;
`;

export const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto; /* 상단 공간을 밀어내어 바닥에 붙이기 */
`;

export const ConfirmBtn = styled.button`
  margin: 10px;
  padding: 14px 66px;
  border: none;
  background: ${tokens.colors.Blue_0_Main};
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
`;

export const CancelBtn = styled.button`
  margin: 10px;
  padding: 14px 66px;
  border: none;
  background: ${tokens.colors.B_Grey_6};
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
`;