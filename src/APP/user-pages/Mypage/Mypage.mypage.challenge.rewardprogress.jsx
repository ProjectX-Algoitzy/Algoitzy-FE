import React from "react";
import * as ItemS from "./Styled/Mypage.mypage.challenge.rewardprogress.styles";

export default function RewardProgress({ challengeCount, rewardCount }) {
  return (
    <ItemS.Container>
      <ItemS.TriangleL />
      <ItemS.Badge>
        <ItemS.IconS src="/img/koala-gold-s.png" alt="교환권 아이콘" />
        <ItemS.BadgeText>누적 교환권 : {rewardCount}</ItemS.BadgeText>
      </ItemS.Badge>
      <ItemS.TriangleR />

      <ItemS.ProgressBarWrapper>
        <ItemS.ProgressBackground />
        <ItemS.ProgressFill $challengeCount={2} />

        <ItemS.TargetIcon
          src="/img/test-star.png"
          alt="목표 도달"
          $challengeCount={2}
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

      <ItemS.Button>보상 사용하기</ItemS.Button>
    </ItemS.Container>
  );
}
