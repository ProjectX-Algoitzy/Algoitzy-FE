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
  /* padding: 6.58rem 15rem; */
  padding: 6.58rem 0rem;

  @media (max-width: 600px) {
    width: 100%;
    /* padding-right: 1.33rem; */
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between; 
  align-items: flex-end;
  width: 50rem;
  border-bottom: 0.04rem solid ${tokens.colors.Grey_4};
  padding-bottom: 0.5rem;

  @media (max-width: 600px) {
    width: 90%;
  }
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
  ${tokens.typography.T6_SB_14};
`;

export const Group = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start; 
  background-color: ${tokens.colors.White};
  width: 50.88rem;
  padding-top: 1.83rem;

  @media (max-width: 600px) {
    width: 33.8rem;
  }
`;