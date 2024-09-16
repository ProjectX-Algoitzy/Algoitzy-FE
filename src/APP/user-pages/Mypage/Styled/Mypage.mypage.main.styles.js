import styled from 'styled-components';
import * as tokens from "../../../../tokens"


export const Container = styled.div`
  display: flex;
  justify-content: center;
  background: linear-gradient(to bottom, #EFF1FD, #E8F7FF);
  @media (max-width: 600px) {
    padding-left: 4rem;
  }
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  border-radius: 0.83rem;
  padding: 6.58rem 15rem;
  @media (max-width: 600px) {
    padding-right: 1rem;
  }
`;

export const MyInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  
`;

export const StudyListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
`;

export const HeadBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between; 
  align-items: flex-end;
  width: 100%;
  border-bottom: 0.04rem solid ${tokens.colors.B_Grey_3};
  padding-bottom: 0.5rem;
`;

export const StudyHeadBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between; 
  align-items: flex-end;
  width: 100%;
  border-bottom: 0.04rem solid ${tokens.colors.B_Grey_2};
  padding-bottom: 0.5rem;
  margin-top: 4rem;
`;

export const Head = styled.div`
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
  width: 50.83rem;
  margin-top: 1.83rem;
`;