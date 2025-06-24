import React from "react";
import * as ItemS from "./Styled/Mypage.mypage.challenge.rewardprogress.styles";

export default function RewardProgress() {
  return (
    <ItemS.Container>
      <ItemS.TriangleL />
      <ItemS.Badge>
        <ItemS.IconS src="/img/koala-gold.png" alt="교환권 아이콘" />
        <ItemS.BadgeText>누적 교환권 : 1</ItemS.BadgeText>
      </ItemS.Badge>
      <ItemS.TriangleR />

      <ItemS.ProgressBarWrapper>
        <ItemS.ProgressBackground />
        <ItemS.ProgressFill />

        <ItemS.Icon
          src="/img/koala-gold.png"
          alt="1단계"
          $position="33%"
          $size="M"
        />
        <ItemS.Icon
          src="/img/koala-gold.png"
          alt="2단계"
          $position="66%"
          $size="M"
        />
        <ItemS.Icon
          src="/img/koala-gold.png"
          alt="3단계"
          $position="100%"
          $size="L"
        />
      </ItemS.ProgressBarWrapper>

      <ItemS.Button>보상 사용하기</ItemS.Button>
    </ItemS.Container>
  );
}
