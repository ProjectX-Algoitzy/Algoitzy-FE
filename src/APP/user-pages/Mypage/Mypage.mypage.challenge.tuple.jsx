import React from "react";
import * as itemS from "./Styled/Mypage.mypage.challenge.tuple.styles";

export default function ChallengeTuple({ item }) {
  const formatDate = (createdTime) => {
    const date = new Date(createdTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  // content가 너무 길 경우를 대비한 함수 (선택적으로 사용)
  const truncateTitle = (name) => {
    if (name && name.length > 30) {
      return name.slice(0, 29) + "...";
    }
    return name;
  };

  const moveToDetail = (num) => {
    window.open(`https://www.acmicpc.net/problem/${num}`, "_blank");
  };

  return (
    <itemS.TupleContainer data-delete-yn={undefined}>
      <itemS.TupleStatus>{item.logType}</itemS.TupleStatus>
      <itemS.TupleTitleBox>
        {/* ✅ 수정된 부분: logType에 따라 조건부 렌더링 */}
        {item.logType === "사용" ? (
          // '사용'일 경우 content를 표시
          <itemS.TupleTitle>{truncateTitle(item.content)}</itemS.TupleTitle>
        ) : (
          // '획득'일 경우 기존 problemList를 표시
          <itemS.TupleTitle>
            {item.problemList?.map((num, idx) => (
              <itemS.ProblemBlock key={idx}>
                <itemS.ProblemNumber
                  $index={idx}
                  onClick={() => moveToDetail(num)}
                >
                  {num} 번
                </itemS.ProblemNumber>
                {idx !== item.problemList.length - 1 && (
                  <itemS.Divider>|</itemS.Divider>
                )}
              </itemS.ProblemBlock>
            ))}
          </itemS.TupleTitle>
        )}
      </itemS.TupleTitleBox>
      <itemS.TupleDate>{formatDate(item.logDate)}</itemS.TupleDate>
      <itemS.TupleView>{item.rewardCount}회</itemS.TupleView>
    </itemS.TupleContainer>
  );
}
