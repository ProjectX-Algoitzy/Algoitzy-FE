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

  const moveToDetail = (id) => {
    // navigate(`/inquiryboard/${id}`);
  };

  return (
    <itemS.TupleContainer data-delete-yn={undefined}>
      {/* <itemS.Blank></itemS.Blank> */}
      <itemS.TupleStatus>{item.logType}</itemS.TupleStatus>
      <itemS.TupleTitleBox onClick={() => moveToDetail(item.inquiryId)}>
        <itemS.TupleTitle data-delete-yn={undefined}>
          {item.logType === "사용"
            ? truncateTitle(item.content ?? "내용 없음")
            : item.problemList?.map((num, index) => `문제 ${num}`).join(" | ")}
        </itemS.TupleTitle>
      </itemS.TupleTitleBox>
      <itemS.TupleDate>{formatDate(item.logDate)}</itemS.TupleDate>
      <itemS.TupleView>{item.viewCount}회</itemS.TupleView>
    </itemS.TupleContainer>
  );
}
