import styled from 'styled-components';
import * as tokens from "../../../../tokens"


export const Container = styled.div`
  display: flex;
  justify-content: center; 
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  border-radius: 20px;
  padding: 158px 360px;
`;


export const Group = styled.div`
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
  align-items: flex-start; 
  background-color: ${tokens.colors.White};
  width: 1220px;
  
  padding-top: 44px;
  
`;
