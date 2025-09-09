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
  const accessToken = localStorage.getItem("accessToken");


  const [timeLeft, setTimeLeft] = useState('00:00:00');
  const [timeLeftMs, setTimeLeftMs] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [showTags, setShowTags] = useState(false);
  const [showLevel, setShowLevel] = useState(false);
  const [tierSrc, setTierSrc] = useState('https://static.solved.ac/tier_small/0.svg');
  const [challengeData, setChallengeData] = useState(null);
  const [hasLoadedChallengeData, setHasLoadedChallengeData] = useState(false);

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

  // 레벨 태그가 표시될 때 레벨 이미지도 함께 표시
  useEffect(() => {
    if (showLevel && challengeData && challengeData.levelImageUrl) {
      setTierSrc(challengeData.levelImageUrl);
    } else if (!showLevel) {
      setTierSrc('https://static.solved.ac/tier_small/0.svg');
    }
  }, [showLevel, challengeData]);

  const isOneHourLeft = timeLeftMs <= 3600 * 1000;

  // 레벨 텍스트 포맷팅 함수 (BRONZE5 -> Bronze 5)
  const formatLevel = (level) => {
    if (!level) return '';
    
    // 숫자와 문자 분리
    const match = level.match(/^([A-Z]+)(\d+)$/);
    if (!match) return level;
    
    const [, tier, number] = match;
    // 첫 글자만 대문자, 나머지는 소문자로 변환
    const formattedTier = tier.charAt(0).toUpperCase() + tier.slice(1).toLowerCase();
    
    return `${formattedTier} ${number}`;
  };

  // 챌린지 데이터 로드 (한 번만 호출)
  const loadChallengeData = async () => {
    if (hasLoadedChallengeData || !accessToken) {
      return;
    }
    
    try {
      setIsLoading(true);
      const response = await request.get('/challenge/problem/today');
      console.log('금일 챌린지 문제:', response.result);
      
      if (response.isSuccess) {
        const { problemNumber, level, levelImageUrl, algorithmList } = response.result;
        
        // 챌린지 데이터 저장
        setChallengeData({
          problemNumber,
          level,
          levelImageUrl,
          algorithmList
        });
        setHasLoadedChallengeData(true);
      } else {
        alert('문제 정보를 불러올 수 없습니다.');
      }
      
    } catch (error) {
      console.error('금일 챌린지 문제 조회 실패:', error);
      alert('문제를 불러오는데 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  // 문제풀기 버튼 클릭
  const handleProblemSolve = async () => {
    // 로그인 상태 확인
    if (!accessToken) {
      navigate('/login');
      return;
    }

    // 챌린지 데이터가 없으면 로드
    if (!hasLoadedChallengeData) {
      await loadChallengeData();
    }

    // 데이터가 있으면 백준 링크 열기
    if (challengeData && challengeData.problemNumber) {
      const bojLink = `https://www.acmicpc.net/problem/${challengeData.problemNumber}`;
      window.open(bojLink, '_blank');
    }
    
    // 알고리즘 태그만 표시 (레벨은 숨김)
    setShowTags(true);
    setShowLevel(false);
  };

  const handleTagToggle = async () => {
    // 로그인 상태 확인
    if (!accessToken) {
      navigate('/login');
      return;
    }
    
    // 챌린지 데이터가 없으면 로드
    if (!hasLoadedChallengeData) {
      await loadChallengeData();
    }
    
    setShowTags((v) => !v);
    setShowLevel(false); // 다른 펼쳐진 요소 접기
  };
  
  const handleTierToggle = async () => {
    // 로그인 상태 확인
    if (!accessToken) {
      navigate('/login');
      return;
    }
    
    // 챌린지 데이터가 없으면 로드
    if (!hasLoadedChallengeData) {
      await loadChallengeData();
    }
    
    setShowLevel((v) => !v);
    setShowTags(false); // 다른 펼쳐진 요소 접기
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

          <Styled.TagContainer $show={showTags || showLevel} key={`container-${showTags ? 'tags' : 'level'}`}>
            {showTags && challengeData && challengeData.algorithmList ? (
              challengeData.algorithmList.map((algorithm, index) => (
                <Styled.AlgorithmTag key={`algo-${algorithm}-${index}`} $index={index}>
                  <Styled.AlgorithmTagKorText>#{algorithm}</Styled.AlgorithmTagKorText>
                </Styled.AlgorithmTag>
              ))
            ) : showTags ? (
              dummyTags.map((tag, index) => (
                <Styled.AlgorithmTag key={`dummy-${tag.kor}-${index}`} $index={index}>
                  <Styled.AlgorithmTagKorText>{tag.kor}</Styled.AlgorithmTagKorText>
                  <Styled.AlgorithmTagEngText>{tag.eng}</Styled.AlgorithmTagEngText>
                </Styled.AlgorithmTag>
              ))
            ) : null}
            
            {showLevel && challengeData && challengeData.level && (
              <Styled.LevelTag key={`level-${challengeData.level}`}>
                <Styled.LevelTagText>{formatLevel(challengeData.level)}</Styled.LevelTagText>
              </Styled.LevelTag>
            )}
          </Styled.TagContainer>
        </Styled.ProblemInfoContainer>
      </Styled.TitleContainer>
      <Ranking
        disable={true}
      />
    </Styled.Container>
  );
}
