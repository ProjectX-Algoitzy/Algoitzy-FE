import styled from 'styled-components';
import * as tokens from "../../../../tokens"



export const OuterContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const Container = styled.div`
  display: flex;
  // flex-direction: row;
  justify-content: center; 
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  border-radius: 20px;
  padding: 158px 360px 0px 360px;
  margin-bottom: 98px;
`;

export const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1200px;
  border-bottom: 1px solid ${tokens.colors.B_Grey_2};
  padding-bottom: 24px;
  margin-bottom: 36px;
`;

export const Title = styled.div`
  ${tokens.typography.H3_SB_40};
  color: ${tokens.colors.Black};
`;

export const DeleteButton = styled.button`
  background-color: ${tokens.colors.Red};
  ${tokens.typography.T5_SB_16};
  color: ${tokens.colors.White};
  border: none;
  width: 160px;
  height: 48px;
  border-radius: 4px;
`;



export const PartBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  
  margin-bottom: 16px;
`;

export const Part = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  ${tokens.typography.T4_SB_20};
  color: ${tokens.colors.Blue_0_Main};
  background-color: rgba(0, 165, 255, 0.1);
  width: 1180px;
  height: 40px;
  border: none;
  border-radius: 4px;
  padding-left: 22px;
`;
