import styled from 'styled-components';
import * as tokens from "../../../../tokens";

export const Container = styled.div`
  display: flex;
  width: 100%;
  background-color: #121212;
`;

export const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 200px;
  margin-bottom: 96px;
`

export const Title = styled.div`
  display: flex;
  width: 901px;
  height: 220px;
  background-image: url('/img/dailychallenge_title.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: none;
  margin-bottom: 37px;
`;

export const Timer = styled.div`
  display: flex;
  font-size: 64px;
  line-height: 54px;
  color: ${tokens.colors.Blue_0_Main};
  font-weight: 600;
  font-family: "Pretendard";
  margin-bottom: 31px;
`

export const Btn = styled.button`
  width: 227px;
  height: 67px;
  border-radius: 0.167rem;
  border: none;
  cursor: pointer;
  color: ${tokens.colors.White};
  font-weight: 600;
  font-family: "Pretendard";
  font-size: 34px;
  background-color: ${tokens.colors.Blue_0_Main};
  margin-bottom: 52px;
`;

export const ChallengeDescription = styled.div`
  display: flex;
  font-size: 20px;
  line-height: 28px;
  text-align: center;
  color: ${tokens.colors.B_Grey_6};
  font-weight: 500;
  font-family: "Pretendard";
  margin-bottom: 31px;
`

export const ProblemInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const IconContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 37px;
  margin-bottom: 14px;
`

export const AlgorithmTagIcon = styled.div`
  display: flex;
  width: 50.96px;
  height: 50.34px;
  background-image: url('/img/algorithm_tag_icon.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: none;
`

export const TierIcon = styled.div`
  display: flex;
  width: 50.96px;
  height: 50.34px;
  background-image: url('/img/tier_icon.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: none;
`

export const ToolTip = styled.div`


`

export const AlgorithmTagContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
`

export const AlgorithmTag = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: auto;
  height: 38px;
  border-radius: 29px;
  background-color: #2d2d2d;
  border: 1px solid ${tokens.colors.B_Grey_6};
  padding: 9.5px 16px;
`;

export const AlgorithmTagKorText = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${tokens.colors.White};
`;

export const AlgorithmTagEngText = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${tokens.colors.B_Grey_6};
`;