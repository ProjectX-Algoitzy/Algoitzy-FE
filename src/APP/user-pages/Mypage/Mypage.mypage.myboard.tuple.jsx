import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as itemS from "./Styled/Mypage.mypage.myboard.tuple.styles";

export default function MyBoardTuple({ selectedTab, item, isChecked, onCheckChange }) {
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
    <itemS.TupleContainer deleteYn={item.deleteYn}>
      <itemS.CheckBox
				type="checkbox"
				checked={isChecked}
				onChange={(e) => {
          e.stopPropagation();
          onCheckChange();
        }}
			/>
      {selectedTab === "board" ? (
        <>
          <itemS.TupleId>{item.category}</itemS.TupleId>
          {item.deleteYn ? (
            <itemS.TupleTitleBox>
              <itemS.DeletedIcon src='/img/deleted_icon.svg' alt='삭제된 글' />
              <itemS.TupleTitle deleteYn={item.deleteYn}>
                {truncateTitle(item.title)}
              </itemS.TupleTitle>
            </itemS.TupleTitleBox>
          ) : (
            <itemS.TupleTitleBox onClick={() => moveToDetail(item.boardId)}>
              <itemS.TupleTitle deleteYn={item.deleteYn}>
                {truncateTitle(item.title)}
              </itemS.TupleTitle>
            </itemS.TupleTitleBox>
          )}
          <itemS.TupleDate>{formatDate(item.createdTime)}</itemS.TupleDate>
          <itemS.TupleView>{item.viewCount}</itemS.TupleView>
        </>
      ) : (
        // 임시저장 글 탭
        <>
          <itemS.TupleId>{item.category}</itemS.TupleId>
          <itemS.TupleTitleBox onClick={() => moveToDetail(item.boardId)}>
            <itemS.TupleTitle deleteYn={item.deleteYn}>
              {truncateTitle(item.title)}
            </itemS.TupleTitle>
          </itemS.TupleTitleBox>
          <itemS.TupleTempDate>{formatDate(item.createdTime)}</itemS.TupleTempDate>
        </>
      )}
      
    </itemS.TupleContainer>
  );
}
