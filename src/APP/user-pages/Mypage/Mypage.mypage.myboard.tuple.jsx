import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as itemS from "./Styled/Mypage.mypage.myboard.tuple.styles";

export default function MyBoardTuple({ item, isChecked, onCheckChange }) {
  const navigate = useNavigate();

  const formatDate = (createdTime) => {
    const date = new Date(createdTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const truncateTitle = (name) => {
		if (name.length > 64) {
			return name.slice(0, 63) + '...';
		}
		return name;
	}

  const moveToDetail = (id) => {
    navigate(`/board/${id}`);
  };

  return (
    <itemS.TupleContainer>
      <itemS.CheckBox
				type="checkbox"
				checked={isChecked}
				onChange={(e) => {
          e.stopPropagation();
          onCheckChange();
        }}
			/>
      <itemS.TupleId>{item.boardId}</itemS.TupleId>
      <itemS.TupleTitleBox onClick={() => moveToDetail(item.boardId)}>
      <itemS.TupleTitle>{truncateTitle(item.title)}</itemS.TupleTitle>
        {item.newBoardYn && <itemS.NewIcon>NEW</itemS.NewIcon>}
      </itemS.TupleTitleBox>
      <itemS.TupleDate>{formatDate(item.createdTime)}</itemS.TupleDate>
      <itemS.TupleView>{item.viewCount}</itemS.TupleView>
    </itemS.TupleContainer>
  );
}
