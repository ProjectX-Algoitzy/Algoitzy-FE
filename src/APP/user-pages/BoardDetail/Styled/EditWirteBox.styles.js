import styled from 'styled-components';
import * as tokens from "../../../../tokens";

export const Container = styled.div`
`;

export const WriteBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  background-color: ${tokens.colors.White};
  width: 42.33rem;
  padding: 0.833rem 0 0.833rem 0; 
  border: 1px solid ${tokens.colors.B_Grey_2}; 
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  width: 42.33rem;
  margin-bottom: 0.833rem;
`;

export const InputBox = styled.input`
  width: 33.33rem;
  height: 1.17rem;
  ${tokens.typography.B2_M_16};
  color: ${tokens.colors.Black};
  margin-right: 4.5rem;
  margin-left: 0.833rem;
  border: none;

  &::placeholder {
    color: ${tokens.colors.Grey_3};
  }

  &:not(:placeholder-shown) + button {
    background-color: ${tokens.colors.B_Grey_7};
  }

  &:focus {
    outline: none;
    border: none;
`;

export const TextCount = styled.div`
  ${tokens.typography.B2_M_16};
  color: ${tokens.colors.B_Grey_5};
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  width: 40.6rem;
`;

export const CancelBtn = styled.button`
  ${tokens.typography.B2_M_16};
  background-color: ${tokens.colors.White};
  color: ${tokens.colors.B_Grey_6};
  width: 3.33rem;
  height: 1.25rem;
  border: none;
  border: 0.5px solid ${tokens.colors.B_Grey_6};
  border-radius: 0.17rem;
  cursor: pointer;
`;

export const SubmitBtn = styled.button`
  ${tokens.typography.B2_M_16};
  background-color: ${({ isActive }) => isActive ? tokens.colors.B_Grey_7 : tokens.colors.B_Grey_3};
  color: ${tokens.colors.White};
  width: 3.33rem;
  height: 1.25rem;
  border: none;
  border-radius: 0.17rem;
  margin-left: 0.5rem;
  cursor: pointer;
`;