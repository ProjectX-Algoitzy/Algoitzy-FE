import styled from "styled-components";
import * as tokens from "../../../../tokens";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 5;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명한 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: white;
  width: 987px;
  height: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

export const FirstSentence = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${tokens.colors.B_Grey_3};
`;

export const BigTitle = styled.div`
  ${tokens.typography.T3_B_24};
  color: ${tokens.colors.Grey_8};
  margin-left: 52px;
`;

export const CloseButton = styled.div`
  color: #A6B0BE;
  width: 32px;
  height: 32px;
  margin-top: 10px;
  cursor: pointer;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 117px;
  padding-top: 64px;
`;

export const LittleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
`;

export const SmallTitle = styled.div`
  ${tokens.typography.T4_SB_20};
  color: ${tokens.colors.Grey_8};
`;

export const StyledInput = styled.input`
  box-sizing: border-box;
  border-radius: 4px;
  border: none;
  border: 1px solid ${tokens.colors.Grey_4};
  width: 753px;
  height: 56px;
  color: ${tokens.colors.Grey_7};
  ${tokens.typography.B3_M_14};
  padding-left: 16px;

  &::placeholder {
    color: ${tokens.colors.Grey_4};
  }

  &:focus {
    outline: none;
  }
`;

export const BtnContainer = styled.div`
  display: flex;
  width: 753px;
  justify-content: center;
`;

export const Btn = styled.button` /*개설하기 버튼*/
  margin-bottom: 78px;
  width: 344px;
  height: 48px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  color: ${tokens.colors.White};
  ${tokens.typography.T5_SB_16}
  background-color: ${tokens.colors.Blue_0_Main};
`;