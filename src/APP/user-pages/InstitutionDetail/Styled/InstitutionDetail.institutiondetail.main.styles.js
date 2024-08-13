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
  border-radius: 0.83rem;
  padding: 6.58rem 15rem 0 15rem;
  margin-bottom: 4.08rem;
`;

export const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50rem;
  border-bottom: 0.042rem solid ${tokens.colors.B_Grey_2};
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
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
  width: 6.67rem;
  height: 2rem;
  border-radius: 0.17rem;
  cursor: pointer;
`;

export const PartBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 0.67rem;
`;

// 첫번째 파트 
export const Part = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  ${tokens.typography.T4_SB_20};
  color: ${tokens.colors.Blue_0_Main};
  background-color: rgba(0, 165, 255, 0.1);
  width: 49.08rem;
  height: 1.67rem;
  border: none;
  border-radius: 0.17rem;
  padding-left: 0.92rem;
`;