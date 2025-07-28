// import React, { useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import * as itemS from "./Styled/Mypage.mypage.challenge.tuple.styles";

export default function ChallengeTuple({ item }) {
  // const navigate = useNavigate();

  const formatDate = (createdTime) => {
    const date = new Date(createdTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const truncateTitle = (name) => {
    if (name.length > 30) {
      return name.slice(0, 29) + "...";
    }
    return name;
  };

  const moveToDetail = (num) => {
    window.open(`https://www.acmicpc.net/problem/${num}`, "_blank");
  };

  return (
    <itemS.TupleContainer data-delete-yn={undefined}>
      {/* <itemS.Blank></itemS.Blank> */}
      <itemS.TupleStatus>{item.logType}</itemS.TupleStatus>
      <itemS.TupleTitleBox>
        <itemS.TupleTitle>
          {item.problemList?.map((num, idx) => (
            <itemS.ProblemBlock key={idx}>
              <itemS.ProblemNumber
                $index={idx}
                onClick={() => moveToDetail(num)}
              >
                문제 {num}번
              </itemS.ProblemNumber>
              {idx !== item.problemList.length - 1 && (
                <itemS.Divider>|</itemS.Divider>
              )}
            </itemS.ProblemBlock>
          ))}
        </itemS.TupleTitle>
      </itemS.TupleTitleBox>
      <itemS.TupleDate>{formatDate(item.logDate)}</itemS.TupleDate>
      <itemS.TupleView>{item.rewardCount}회</itemS.TupleView>
    </itemS.TupleContainer>
  );
}
