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
  border-radius: 0.83rem;
  padding: 6.58rem 15rem;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between; 
  align-items: flex-end;
  width: 50rem;
  border-bottom: 0.04rem solid ${tokens.colors.Grey_4};
  padding-bottom: 0.5rem;
`;

export const ApplicationText = styled.div`
  ${tokens.typography.T3_B_24};
`;

export const BtnMakeApp = styled.button`
  width: 7.92rem;
  height: 1.96rem;
  background: #00A5FF; 
  color: white;
  border-radius: 0.21rem; 
  border: none; 
  cursor: pointer; 
`;

export const Group = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start; 
  background-color: ${tokens.colors.White};
  width: 50.83rem;
  padding-top: 1.83rem;
`;