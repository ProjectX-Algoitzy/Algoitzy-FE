import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as itemS from "./Styled/Mypage.mypage.myboard.tuple.styles";

export default function MyInquiryTuple({
  item,
  isChecked,
  onCheckChange,
  isMemberMatch,
}) {
  const navigate = useNavigate();

  const formatDate = (createdTime) => {
    const date = new Date(createdTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const truncateTitle = (name) => {
    if (name.length > 64) {
      return name.slice(0, 63) + "...";
    }
    return name;
  };

  const moveToDetail = (id) => {
    navigate(`/inquiryboard/${id}`);
  };

  return (
    <itemS.TupleContainer data-delete-yn={undefined}>
      {isMemberMatch ? (
        <itemS.CheckBox
          type="checkbox"
          checked={isChecked}
          onChange={(e) => {
            e.stopPropagation();
            onCheckChange();
          }}
        />
      ) : (
        <itemS.Blank></itemS.Blank>
      )}
      <>
        <itemS.TupleId>{item.categoryName}</itemS.TupleId>
        <itemS.TupleTitleBox onClick={() => moveToDetail(item.inquiryId)}>
          <itemS.TupleTitle data-delete-yn={undefined}>
            {truncateTitle(item.title)}
          </itemS.TupleTitle>
        </itemS.TupleTitleBox>
        <itemS.TupleDate>{formatDate(item.createdTime)}</itemS.TupleDate>
        <itemS.TupleView>{item.viewCount} 회</itemS.TupleView>
        <itemS.TupleProcess>
          <itemS.ProcessingYNBox solvedYn={item.solvedYn}>
            {item.solvedYn ? "답변 완료" : "답변 대기"}
          </itemS.ProcessingYNBox>
        </itemS.TupleProcess>
      </>
    </itemS.TupleContainer>
  );
}
