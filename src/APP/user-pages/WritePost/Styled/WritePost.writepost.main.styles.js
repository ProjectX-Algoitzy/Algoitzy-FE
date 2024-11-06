import styled from 'styled-components';
import * as tokens from "../../../../tokens";

export const Container = styled.div`

`;

export const MarkdownEditorContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
`;

export const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between; 
  width: 50%;
  height: 4rem;
  padding: 1.2rem;

  position: fixed;
  bottom: 0; /* 아래쪽으로 고정 */
  left: 0; /* 왼쪽으로 고정 */
  background-color: rgba(246, 252, 255, 100); 
  z-index: 1000; 
`;

export const ExitButton = styled.button`
  background: none;
  border: none;
  ${tokens.typography.T5_SB_16}
  color: ${tokens.colors.B_Grey_7};
  cursor: pointer;
`;

export const BtnContainer2 = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.2rem;
`;

export const ArbitaryBtn = styled.button` /* 임시 저장하기 버튼*/
  width: 6.67rem;
  height: 2rem;
  border-radius: 0.167rem;
  border: none;
  cursor: pointer;
  color: ${tokens.colors.White};
  ${tokens.typography.T5_SB_16}
  background-color: ${tokens.colors.B_Grey_7};
`;

export const Btn = styled.button` /*저장하기 버튼*/
  width: 6.67rem;
  height: 2rem;
  border-radius: 0.167rem;
  border: none;
  cursor: pointer;
  color: ${tokens.colors.White};
  ${tokens.typography.T5_SB_16};
  background-color: ${tokens.colors.Blue_0_Main};
`;