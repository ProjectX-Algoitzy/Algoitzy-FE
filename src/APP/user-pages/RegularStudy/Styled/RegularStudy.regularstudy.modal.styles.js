import styled from "styled-components";
import * as tokens from "../../../../tokens";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  /* padding: 20px; */
  border-radius: 8px;
  width: 987px;
  height: 956px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto; /* 추가된 부분 */
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
  margin-top: 13.96px;
  margin-bottom: 18.62px;
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

export const StyledInputContainer = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-radius: 4px;
  border: none;
  border: 1px solid ${tokens.colors.Grey_4};
  width: 753px;
  height: 56px; 
  background-color: ${tokens.colors.Grey_1};
`;

export const LinkImg = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 16px;
  margin-right: 16px;
`;

export const StyledInput = styled.input`
  border: none;
  border-left: 3px solid ${tokens.colors.B_Grey_5};
  width: 681px;
  height: 21px;
  color: ${tokens.colors.B_Grey_7};
  background-color: ${tokens.colors.Grey_1};
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