import styled from 'styled-components';
import * as tokens from "../../../../tokens";

export const Container = styled.div`
`;

export const WriteBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  background-color: ${tokens.colors.White};
  width: 42.33rem;
  padding: 0.833rem 0.833rem 0.833rem 0.667rem; 
  border: 1px solid ${tokens.colors.B_Grey_2}; 
`;

export const InputBox = styled.input`
  width: 33.33rem;
  height: 1.17rem;
  ${tokens.typography.B2_M_16};
  color: ${tokens.colors.Black};
  margin-right: 0.4rem;
  border: none;

  &::placeholder {
    color: ${tokens.colors.Grey_3};
  }

  &:focus {
    outline: none;
    border: none;

  &:not(:placeholder-shown) + button {
    background-color: ${tokens.colors.B_Grey_7};
  }
`;

export const TextCount = styled.div`
  ${tokens.typography.B2_M_16};
  color: ${tokens.colors.B_Grey_5};
  margin-right: 0.8rem;
  margin-left: 0.2rem;
`;

export const SubmitBtn = styled.button`
  ${tokens.typography.B2_M_16};
  background-color: ${tokens.colors.B_Grey_3};
  color: ${tokens.colors.White};
  width: 3.33rem;
  height: 1.25rem;
  border: none;
  border-radius: 0.17rem;
  cursor: pointer;
`;


