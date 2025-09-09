import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Styled from './Styled/DailyChallenge.dailychallenge.main.styles';
import Ranking from './DailyChallenge.dailychallenge.ranking';
import Background from './DailyChallenge.dailychallenge.background';
import request from '../../Api/request';

const dummyTags = [
  { kor: '#구현', eng: 'implementation' },
  { kor: '#그래프', eng: 'graph' },
  { kor: '#문자열', eng: 'string' },
  { kor: '#문자열', eng: 'string' }
];

export default function DailyChallenge() {
  const location = useLocation();
  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState('00:00:00');
  const [timeLeftMs, setTimeLeftMs] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [showTags, setShowTags] = useState(false);
  const [tierSrc, setTierSrc] = useState('/img/tier_icon.png');
  const externalTierImg = 'https://cdn-icons-png.flaticon.com/512/1828/1828884.png';

  const msToHHMMSS = (ms) => {
    let total = Math.max(0, Math.floor(ms / 1000));
    const h = String(Math.floor(total / 3600)).padStart(2, '0');
    total %= 3600;
    const m = String(Math.floor(total / 60)).padStart(2, '0');
    const s = String(total % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const getMsToEndOfDay = () => {
    const now = new Date();
    const end = new Date(now);
    end.setHours(23, 59, 59, 999);
    return end - now;
  };
 
  useEffect(() => {
    const tick = () => {
      const ms = getMsToEndOfDay();
      setTimeLeft(msToHHMMSS(ms));
      setTimeLeftMs(ms);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const isOneHourLeft = timeLeftMs <= 3600 * 1000;

  // 금일 챌린지 문제 상세 조회 API
  const getTodayChallengeProblem = async () => {
    try {
      setIsLoading(true);
      const response = await request.get('/challenge/problem/today');
      console.log('금일 챌린지 문제:', response.data);
      
      // 백준 링크가 있는지 확인하고 새 탭에서 열기
      if (response.data) {
        window.open("response.data", '_blank');
      } else {
        alert('문제 링크를 찾을 수 없습니다.');
      }
      
    } catch (error) {
      console.error('금일 챌린지 문제 조회 실패:', error);
      alert('문제를 불러오는데 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTagToggle = () => setShowTags((v) => !v);
  const handleTierToggle = () => {
    setTierSrc((prev) => (prev === '/img/tier_icon.png' ? externalTierImg : '/img/tier_icon.png'));
  };

  const handleProblemSolve = () => {
    getTodayChallengeProblem();
  };

  return (
    <Styled.Container>
      <Background />
      <Styled.TitleContainer>
        <Styled.Title />
        <Styled.Timer $danger={isOneHourLeft}>
          {timeLeft}
        </Styled.Timer>
        <Styled.Btn onClick={handleProblemSolve} disabled={isLoading}>
          {isLoading ? '로딩 중...' : '문제 풀기'}
        </Styled.Btn>
        <Styled.ParticipantsDescription>
          오늘은{" "}
          <Styled.ParticiPantsHighlight>8</Styled.ParticiPantsHighlight>
          명이 참여하고 있어요!
        </Styled.ParticipantsDescription>
        <Styled.ChallengeDescription>
          매일 챌린지에 참여해서 보상을 얻으세요!
          <br/>
          1등을 3회 달성하면, 챌린지 보상으로 출석부 면제권을 획득할 수 있습니다.
        </Styled.ChallengeDescription>

        <Styled.ProblemInfoContainer>
          <Styled.IconContainer> 
            {/* 태그 아이콘 */}
            <Styled.IconWithTooltip>
              <Styled.AlgorithmTagIcon onClick={handleTagToggle}/>
              <Styled.Tooltip>태그 보기</Styled.Tooltip>
            </Styled.IconWithTooltip>

            {/* 티어 아이콘 */}
            <Styled.IconWithTooltip>
              <Styled.TierIcon onClick={handleTierToggle} $src={tierSrc}/>
              <Styled.Tooltip>레벨 보기</Styled.Tooltip>
            </Styled.IconWithTooltip>
          </Styled.IconContainer>

          <Styled.AlgorithmTagContainer $show={showTags}>
            {dummyTags.map((tag, index) => (
              <Styled.AlgorithmTag key={index}>
                <Styled.AlgorithmTagKorText>{tag.kor}</Styled.AlgorithmTagKorText>
                <Styled.AlgorithmTagEngText>{tag.eng}</Styled.AlgorithmTagEngText>
              </Styled.AlgorithmTag>
            ))}
          </Styled.AlgorithmTagContainer>
        </Styled.ProblemInfoContainer>
      </Styled.TitleContainer>
      <Ranking
        disable={true}
      />
    </Styled.Container>
  );
}
