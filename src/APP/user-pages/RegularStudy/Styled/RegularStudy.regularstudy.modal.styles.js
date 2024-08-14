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
  /* padding: 0.83rem; */
  border-radius: 0.33rem;
  width: 41.13rem;
  height: 39.83rem;
  box-shadow: 0 0.083rem 0.42rem rgba(0, 0, 0, 0.1);
  overflow-y: auto; /* 추가된 부분 */
`;

export const FirstSentence = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.042rem solid ${tokens.colors.B_Grey_3};
`;

export const BigTitle = styled.div`
  ${tokens.typography.T3_B_24};
  color: ${tokens.colors.Grey_8};
  margin-left: 2.17rem;
  margin-top: 0.58rem;
  margin-bottom: 0.78rem;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 4.88rem;
  padding-top: 2.67rem;
`;

export const LittleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.33rem;
`;

export const SmallTitle = styled.div`
  ${tokens.typography.T4_SB_20};
  color: ${tokens.colors.Grey_8};
`;

export const StyledInputContainer = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-radius: 0.167rem;
  border: none;
  border: 0.042rem solid ${tokens.colors.Grey_4};
  width: 31.38rem;
  height: 2.33rem;
  background-color: ${tokens.colors.Grey_1};
`;

export const LinkImg = styled.img`
  width: 1rem;
  height: 1rem;
  margin-left: 0.67rem;
  margin-right: 0.67rem;
`;

export const StyledInput = styled.input`
  border: none;
  border-left: 0.13rem solid ${tokens.colors.B_Grey_5};
  width: 28.38rem;
  height: 0.88rem;
  color: ${tokens.colors.B_Grey_7};
  background-color: ${tokens.colors.Grey_1};
  ${tokens.typography.B3_M_14};
  padding-left: 0.67rem;

  &::placeholder {
    color: ${tokens.colors.Grey_4};
  }

  &:focus {
    outline: none;
  }
`;

export const BtnContainer = styled.div`
  display: flex;
  width: 31.38rem;
  justify-content: center;
`;

export const Btn = styled.button` /*개설하기 버튼*/
  margin-bottom: 3.25rem;
  width: 14.33rem;
  height: 2rem;
  border-radius: 0.167rem;
  border: none;
  cursor: pointer;
  color: ${tokens.colors.White};
  ${tokens.typography.T5_SB_16}
  background-color: ${tokens.colors.Blue_0_Main};
`;