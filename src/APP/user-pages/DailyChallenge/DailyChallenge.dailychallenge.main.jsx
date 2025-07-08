import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import * as Styled from './Styled/DailyChallenge.dailychallenge.main';
import request from '../../Api/request';

const dummyTags = [
  { kor: '#구현', eng: 'implementation' },
  { kor: '#그래프', eng: 'graph' },
  { kor: '#문자열', eng: 'string' }
];

export default function WritePost() {
  const location = useLocation();

  return (
    <Styled.Container>
      <Styled.TitleContainer>
        <Styled.Title />
        <Styled.Timer>00:00:00</Styled.Timer>
        <Styled.Btn>문제 풀기</Styled.Btn>
        <Styled.ChallengeDescription>
          매일 챌린지에 참여해서 보상을 얻으세요!
          <br/>
          1등을 3회 달성하면, 챌린지 보상으로 출석부 면제권을 획득할 수 있습니다.
        </Styled.ChallengeDescription>

        <Styled.ProblemInfoContainer>
          <Styled.IconContainer> 
            <Styled.AlgorithmTagIcon />
            <Styled.TierIcon />
          </Styled.IconContainer>

          <Styled.AlgorithmTagContainer>
            {dummyTags.map((tag, index) => (
              <Styled.AlgorithmTag key={index}>
                <Styled.AlgorithmTagKorText>{tag.kor}</Styled.AlgorithmTagKorText>
                <Styled.AlgorithmTagEngText>{tag.eng}</Styled.AlgorithmTagEngText>
              </Styled.AlgorithmTag>
            ))}
          </Styled.AlgorithmTagContainer>

        </Styled.ProblemInfoContainer>
      </Styled.TitleContainer>
    </Styled.Container>
  );
}
