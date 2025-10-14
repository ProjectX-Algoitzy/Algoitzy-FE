import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Styled from './Styled/DailyChallenge.dailychallenge.main.styles';
import Ranking from './DailyChallenge.dailychallenge.ranking';
import Background from './DailyChallenge.dailychallenge.background';
import request from '../../Api/request';
import axios from 'axios';

export default function DailyChallenge() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const [timeLeft, setTimeLeft] = useState('00:00:00');
  const [timeLeftMs, setTimeLeftMs] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [showTags, setShowTags] = useState(false);
  const [showLevel, setShowLevel] = useState(false);
  const [tierSrc, setTierSrc] = useState('https://static.solved.ac/tier_small/0.svg');
  const [challengeData, setChallengeData] = useState(null);
  const [participantsCount, setParticipantsCount] = useState(0);
  const [challengeHistory, setChallengeHistory] = useState([]);

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

  // 챌린지 이력 조회
  const loadChallengeHistory = async () => {
    try {
      let response;
      if (!accessToken){
        response = (await axios.get(
          `${process.env.REACT_APP_API_URL}/challenge-join-log`,
        )).data;
      }
      else {
        response = await request.get('/challenge-join-log');
      }
      
      const result = response.result;
      const joinLogList = result.joinLogList;
      const totalCount = result.totalCount;

      console.log("챌린지 이력 조회 성공:", result);

      setParticipantsCount(totalCount);
      setChallengeHistory(joinLogList);

    } catch (error) {
      console.error("챌린지 이력 조회 실패:", error);
    }
  };

  // 자정까지 남은 시간 계산
  const getMsToMidnight = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow - now;
  };

  // 자정에 페이지 새로고침
  useEffect(() => {
    const msToMidnight = getMsToMidnight();
    
    const midnightTimer = setTimeout(() => {
      window.location.reload();
    }, msToMidnight);

    return () => {
      clearTimeout(midnightTimer);
    };
  }, []);

  // 컴포넌트 마운트 시 참여 여부 확인
  useEffect(() => {
    loadChallengeData();
    loadChallengeHistory();
  }, []);

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
    if (!accessToken) return null;
    if (challengeData) {
      return challengeData;
    }

    try {
      setIsLoading(true);
      const response = await request.get('/challenge/problem/today');
      if (response.isSuccess) {
        const data = {
          problemNumber: response.result.problemNumber,
          level: response.result.level,
          levelImageUrl: response.result.levelImageUrl,
          algorithmList: response.result.algorithmList || [],
        }
        setChallengeData(data);
        return data;
      }
    } catch (error) {
      console.error('금일 챌린지 문제 조회 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 문제풀기 버튼 클릭
  const handleProblemSolve = async () => {
    if (!accessToken) {
      navigate('/login');
      return;
    }

    const data = await loadChallengeData();

    if (data) {
      const bojLink = `https://www.acmicpc.net/problem/${data.problemNumber}`;
      window.open(bojLink, '_blank');
    }
  };

  const handleTagToggle = async () => {
    if (!accessToken) {
      navigate('/login');
      return;
    }
    
    await loadChallengeData();
    
    setShowTags((v) => !v);
    setShowLevel(false); 
  };
  
  const handleTierToggle = async () => {
    if (!accessToken) {
      navigate('/login');
      return;
    }
    
    await loadChallengeData();
    
    setShowLevel((v) => !v);
    setShowTags(false);
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
          문제 풀기
        </Styled.Btn>
        <Styled.ParticipantsDescription>
          오늘은{" "}
          <Styled.ParticiPantsHighlight>{participantsCount}</Styled.ParticiPantsHighlight>
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
    {/* 티어 아이콘 + 레벨 태그 */}
    <Styled.TierWithLevel>
      <Styled.IconWithTooltip>
        <Styled.TierIcon onClick={handleTierToggle} $src={tierSrc}/>
        <Styled.Tooltip>레벨 보기</Styled.Tooltip>
      </Styled.IconWithTooltip>

      {showLevel && challengeData && challengeData.level && (
        <Styled.LevelTag>
          <Styled.LevelTagText>{formatLevel(challengeData.level)}</Styled.LevelTagText>
        </Styled.LevelTag>
      )}
    </Styled.TierWithLevel>
  </Styled.IconContainer>

          <Styled.TagContainer $show={showTags || showLevel}>
            {showTags && challengeData && challengeData.algorithmList ? (
              challengeData.algorithmList.map((algorithm, index) => (
                <Styled.AlgorithmTag key={index}>
                  <Styled.AlgorithmTagKorText>#{algorithm}</Styled.AlgorithmTagKorText>
                </Styled.AlgorithmTag>
              ))
            ) : null}
          </Styled.TagContainer>
        </Styled.ProblemInfoContainer>
      </Styled.TitleContainer>
      <Ranking
        challengeHistory={challengeHistory}
      />
    </Styled.Container>
  );
}
