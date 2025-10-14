import React from "react";
import { useNavigate } from "react-router-dom";
import * as ItemS from "./Styled/Mypage.mypage.challenge.rewardprogress.styles";

export default function RewardProgress({
  challengeRewardCount,
  challengeWinCount,
  regularStudyId,
}) {
  const navigate = useNavigate();

  const handleUseReward = () => {
    // id 값이 없는 경우를 대비한 방어 코드
    if (!regularStudyId) {
      console.error("스터디 ID가 전달되지 않았습니다.");
      return;
    }

    // 로컬 스토리지 키 생성
    const storageKey = `activeComponent_${regularStudyId}`;

    // 'attendance' 컴포넌트가 보이도록 로컬 스토리지에 값 설정
    localStorage.setItem(storageKey, "attendance");

    // 페이지 이동
    navigate(`/regularstudy/${regularStudyId}`);
  };

  return (
    <ItemS.Container>
      <ItemS.TriangleL />
      <ItemS.Badge>
        <ItemS.IconS src="/img/koala-gold-s.png" alt="교환권 아이콘" />
        <ItemS.BadgeText>누적 교환권 : {challengeRewardCount}</ItemS.BadgeText>
      </ItemS.Badge>
      <ItemS.TriangleR />

      <ItemS.ProgressBarWrapper>
        <ItemS.ProgressBackground />
        <ItemS.ProgressFill $challengeWinCount={challengeWinCount} />

        <ItemS.TargetIcon
          src="/img/bling.svg"
          alt="목표 도달"
          $challengeWinCount={challengeWinCount}
        />

        <ItemS.Icon $position="30%" $size="M">
          <ItemS.IconImage src="/img/koala-silver-m.png" alt="2단계" />
          <ItemS.Effect $isSelected={false} />
        </ItemS.Icon>
        <ItemS.Icon $position="63%" $size="M">
          <ItemS.IconImage src="/img/koala-silver-m.png" alt="2단계" />
          <ItemS.Effect $isSelected={false} />
        </ItemS.Icon>
        <ItemS.Icon $position="97%" $size="L">
          <ItemS.IconImage src="/img/koala-gold-l.png" alt="2단계" />
          <ItemS.Effect $isSelected={false} />
        </ItemS.Icon>

        {/* <ItemS.Icon
          src="/img/koala-gold.png"
          alt="1단계"
          $position="30%"
          $size="M"
        />
        <ItemS.Icon
          src="/img/koala-gold.png"
          alt="2단계"
          $position="63%"
          $size="M"
        />
        <ItemS.Icon
          src="/img/koala-gold.png"
          alt="3단계"
          $position="97%"
          $size="L"
        /> */}
      </ItemS.ProgressBarWrapper>

      <ItemS.Button onClick={handleUseReward}>보상 사용하기</ItemS.Button>
    </ItemS.Container>
  );
}
