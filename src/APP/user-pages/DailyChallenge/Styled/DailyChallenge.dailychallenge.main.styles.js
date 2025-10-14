import styled from 'styled-components';
import * as tokens from "../../../../tokens";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
  background-color: #121212;
  background-image: url('/img/dailychallenge_background.png');
  background-size: 100%;
  background-repeat: no-repeat;
`;

export const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8.333rem;
`

export const Title = styled.div`
  display: flex;
  width: 37.54rem;
  height: 9.167rem;
  background-image: url('/img/dailychallenge_title.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: none;
  margin-bottom: 1.542rem;
`;

export const Timer = styled.div`
  display: flex;
  font-size: 2.667rem;
  line-height: 2.25rem;
  color: ${({ $danger }) => ($danger ? '#CE2C17' : tokens.colors.Blue_0_Main)};
  font-weight: 600;
  font-family: "Pretendard";
  margin-bottom: 1.292rem;
`

export const Btn = styled.button`
  width: 9.458rem;
  height: 2.792rem;
  border-radius: 0.167rem;
  border: none;
  cursor: pointer;
  color: ${tokens.colors.White};
  font-weight: 600;
  font-family: "Pretendard";
  font-size: 1.417rem;
  background-color: ${tokens.colors.Blue_0_Main};
  margin-bottom: 2.167rem;
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${tokens.colors.Blue_1};
  }

  &:disabled {
    background-color: ${tokens.colors.B_Grey_6};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const ParticipantsDescription = styled.div`
  font-size: 1rem;
  line-height: 1.333rem;
  text-align: center;
  color: ${tokens.colors.B_Grey_1};
  font-weight: 500;
  font-family: "Pretendard";
  margin-bottom: 1.292rem;
`

export const ParticiPantsHighlight = styled.span`
  color: ${tokens.colors.Blue_0_Main};
`;

export const ChallengeDescription = styled.div`
  display: flex;
  font-size: 0.833rem;
  line-height: 1.167rem;
  text-align: center;
  color: ${tokens.colors.B_Grey_6};
  font-weight: 500;
  font-family: "Pretendard";
  margin-bottom: 1.292rem;
`

export const ProblemInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const IconContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 1.542rem;
  margin-bottom: 0.583rem;
`

export const AlgorithmTagIcon = styled.div`
  display: flex;
  width: 3.188rem;
  height: 3.188rem;
  background-image: url('/img/algorithm_tag_icon.svg');
  background-size: 3.188rem 3.188rem;
  background-position: center;
  background-repeat: no-repeat;
  border: none;
  border-radius: 0.33rem;
  cursor: pointer;
  &:hover {
    background-color: #383838;
  }
`

export const TierIcon = styled.div`
  display: flex;
  width: 3.188rem;
  height: 3.188rem;
  background-image: url(${props => props.$src || 'https://static.solved.ac/tier_small/0.svg'});
  background-size: 1.938rem 2.5rem;
  background-position: center;
  background-repeat: no-repeat;
  background-origin: content-box;
  background-clip: content-box;
  border: none;
  border-radius: 0.33rem;
  cursor: pointer;
  &:hover {
    background-color: #383838;
    background-clip: padding-box;
  }
`

export const Tooltip = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, -90%);
  opacity: 0;
  pointer-events: none;
  transition: opacity .15s ease, transform .15s ease;
  white-space: nowrap;
  z-index: 10;

  background: rgba(0,0,0,0.85);
  color: #fff;
  font-size: 0.667rem;
  line-height: 1;
  padding: 0.417rem 0.667rem;
  border-radius: 0.333rem;
  border: 1px solid ${tokens.colors.B_Grey_6};

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border: 0.333rem solid transparent;
  }

  &::before {
    bottom: -0.666rem;
    border-top-color: ${tokens.colors.White};
  }

  &::after {
    bottom: -0.625rem;
    border-top-color: rgba(0,0,0,0.85);
  }
`;

export const IconWithTooltip = styled.div`
  width: 3.8rem;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover ${Tooltip},
  &:focus-within ${Tooltip} {
    opacity: 1;
    transform: translate(-50%, calc(-100% - 0.6rem));
    pointer-events: auto;
  }
`;

export const TagContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 6.15rem;
  gap: 0.333rem;
  position: relative;

  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transform: translateY(${({ $show }) => ($show ? '0' : '-0.25rem')});
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: ${({ $show }) => ($show ? 'auto' : 'none')};
`;

export const AlgorithmTagContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 6.15rem;
  gap: 0.333rem;

  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transform: translateY(${({ $show }) => ($show ? '0' : '-0.25rem')});
  transition: opacity 0.3s ease, transform 0.2s ease;
  pointer-events: ${({ $show }) => ($show ? 'auto' : 'none')};
`;
export const AlgorithmTag = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.208rem;
  width: auto;
  height: 1.583rem;
  border-radius: 1.208rem;
  background-color: #2d2d2d;
  border: 1px solid ${tokens.colors.B_Grey_6};
  padding: 0.396rem 0.667rem;
  
  opacity: 0;
  transform: scale(0.8) translateY(-0.4rem);
  animation: tagFadeIn 0.4s ease forwards;
  
  @keyframes tagFadeIn {
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
  
  ${props => props.$index && `
    animation-delay: ${props.$index * 0.1}s;
  `}
`;

export const AlgorithmTagKorText = styled.div`
  font-size: 0.667rem;
  font-weight: 500;
  color: ${tokens.colors.White};
`;

export const AlgorithmTagEngText = styled.div`
  font-size: 0.583rem;
  font-weight: 400;
  color: ${tokens.colors.B_Grey_6};
`;

export const LevelTagContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 6.15rem;
  gap: 0.333rem;

  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transform: translateY(${({ $show }) => ($show ? '0' : '-0.25rem')});
  transition: opacity 0.3s ease, transform 0.2s ease;
  pointer-events: ${({ $show }) => ($show ? 'auto' : 'none')};
`;

export const LevelTag = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.208rem;
  width: auto;
  height: 1.583rem;
  border-radius: 1.208rem;
  background-color: #2d2d2d;
  border: 1px solid ${tokens.colors.B_Grey_6};
  padding: 0.396rem 0.667rem;
  
  opacity: 0;
  transform: scale(0.8) translateY(-0.4rem);
  animation: tagFadeIn 0.4s ease forwards;
  
  @keyframes tagFadeIn {
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`;

export const LevelTagText = styled.div`
  font-size: 0.667rem;
  font-weight: 500;
  color: ${tokens.colors.White};
`;

export const TierWithLevel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;