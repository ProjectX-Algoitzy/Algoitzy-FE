import styled from 'styled-components';
import * as tokens from "../../../../tokens"


export const Container = styled.div`
  
`;

export const Tuple = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 2.292rem; 
`;

export const TupleNumber = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  ${tokens.typography.T5_SB_16};
  color: ${tokens.colors.Black};
  text-align: center;
  width: 8.75rem;
  margin-left: 0.958rem;
`;

export const TupleTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  ${tokens.typography.T5_SB_16};
  color: ${tokens.colors.Black};
  text-align: center;
  width: 17.5rem;
`;

export const TupleLevel = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 4.083rem;
`;

export const Level = styled.img`
  width: 0.833rem;
  height: 1.042rem;
`;

export const DeleteButton = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 0.583rem;
  height: 0.583rem;
  margin-right: 1.167rem;
`;