import styled from 'styled-components';
import * as tokens from "../../../../tokens"


export const Container = styled.div`
`;

export const Content = styled.div`
  display: flex;
  background-color: ${tokens.colors.B_Grey_1};
  width: 49.167rem;
  height: 13.75rem;
  border-bottom: 0.042rem solid ${tokens.colors.B_Grey_2};
  margin-bottom: 0.833rem;
  padding: 0.417rem 0.417rem;
  overflow: auto;
`;
export const StyledTitle = styled.div`
  color: ${tokens.colors.Grey_8};
  ${tokens.typography.T4_SB_20};
  margin-bottom: 0.417rem;
`;

export const FileList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${tokens.colors.B_Grey_1};
  width: 49.167rem;
  height: 10.75rem;

  margin-bottom: 0.833rem;
  padding: 0.417rem 0.417rem;
  overflow: auto;
`;


export const FileItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${tokens.colors.B_Grey_1};
  width: 49.167rem;
  height: 1.75rem;
  border-bottom: 0.042rem solid ${tokens.colors.B_Grey_2};
  margin-bottom: 0.833rem;
  padding: 0.417rem 0.417rem;
  
`;