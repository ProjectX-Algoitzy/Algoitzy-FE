import styled from "styled-components";
import * as tokens from "../../../../tokens";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 1.333rem;
  border-right: 0.063rem solid ${tokens.colors.Grey_4};
  /* margin-left: 15rem; */

  @media (max-width: 600px) {
    margin-left: 1.33rem;
    margin-right: 1.33rem;
    padding: 0;
    border-right: 0;
  }
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4.17rem;
  margin-bottom: 4.17rem;
`;

export const StudyImgContainer = styled.div` /*해당 스터디의 이미지를 감싸주는 컨테이너*/
  display: flex;
  flex-direction: column;
  width: 14.29rem;
  height: 10.25rem;
  border-radius: 0.33rem;
  background-color: ${tokens.colors.Grey_4};
  @media (max-width: 600px) {
  
  }
`;

export const TitleContainer = styled.div` 
  display: flex;
  max-width: 14.29rem;
  color: ${tokens.colors.Black};
  ${tokens.typography.T3_B_24};
  margin-top: 0.67rem;
`;

export const CountAndOnlineContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 0.25rem;
`;

export const CountContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const CountDiv = styled.div`
  ${tokens.typography.T5_SB_16};
  color: ${tokens.colors.B_Grey_6};
`;

export const ManagerNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.88rem;
`;

export const ManagerNameContainerBoxLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ManagerNameDiv = styled.div`
  color: ${tokens.colors.Grey_7};
  ${tokens.typography.T5_SB_16};
`;

export const ManagerNameContainerBoxRight = styled.div`
  display: flex;
  flex-direction: row;
  color: ${tokens.colors.Grey_7};
  ${tokens.typography.B3_M_14};
`;

export const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.42rem;
`;

export const styledLink = styled.div`
  display: flex;
  flex-direction: row;
  color: ${(props) => (props.isActive ? tokens.colors.Blue_0_Main : tokens.colors.Grey_7)};
  ${tokens.typography.T5_SB_16};
  padding-top: 0.71rem;
  padding-bottom: 0.75rem;
  border-bottom: 0.042rem solid ${tokens.colors.B_Grey_2};
  justify-content: space-between;
  cursor: pointer;
`;

export const ArrowImg = styled.img`
  width: 1rem;
  height: 1rem;
`;

export const BlueBtn = styled.button` 
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14.33rem;
  height: 2rem;
  border-radius: 0.167rem;
  border: none;
  cursor: pointer;
  color: ${tokens.colors.White};
  ${tokens.typography.T5_SB_16}
  background-color: ${tokens.colors.Blue_0_Main};
  margin-top: 0.67rem;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const Gray3Block = styled.button` 
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14.33rem;
  height: 2rem;
  border-radius: 0.167rem;
  border: none;
  color: ${tokens.colors.White};
  ${tokens.typography.T5_SB_16}
  background-color: ${tokens.colors.B_Grey_3};
  margin-top: 0.67rem;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const Gray4Block = styled.button` 
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14.33rem;
  height: 2rem;
  border-radius: 0.167rem;
  border: none;
  color: ${tokens.colors.White};
  ${tokens.typography.T5_SB_16}
  background-color: ${tokens.colors.B_Grey_4};
  margin-top: 0.67rem;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const Gray7Btn = styled.button` 
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14.33rem;
  height: 2rem;
  border-radius: 0.167rem;
  border: none;
  cursor: pointer;
  color: ${tokens.colors.White};
  ${tokens.typography.T5_SB_16}
  background-color: ${tokens.colors.B_Grey_7};
  margin-top: 0.67rem;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const RedBtn = styled.button` 
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14.33rem;
  height: 2rem;
  border-radius: 0.167rem;
  border: none;
  cursor: pointer;
  color: ${tokens.colors.White};
  ${tokens.typography.T5_SB_16}
  background-color: #DC4A41;
  margin-top: 0.67rem;

  @media (max-width: 600px) {
    width: 100%;
  }
`;