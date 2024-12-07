import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as itemS from "./Styled/Mypage.mypage.myboard.tuple.styles";

export default function MyBoardTuple({ selectedTab, item, isChecked, onCheckChange, isMemberMatch }) {
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
    <itemS.TupleContainer data-delete-yn={item.deleteYn ? true : undefined}  temp={(selectedTab !== 'board').toString()} >
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
      
      {selectedTab === "board" ? (
        <>
          <itemS.TupleId>{item.category}</itemS.TupleId>
          {item.deleteYn ? (
            <itemS.TupleTitleBox>
              <itemS.DeletedIcon src='/img/deleted_icon.svg' alt='삭제된 글' />
              <itemS.TupleTitle data-delete-yn={item.deleteYn ? true : undefined}>
                {truncateTitle(item.title)}
              </itemS.TupleTitle>
            </itemS.TupleTitleBox>
          ) : (
            <itemS.TupleTitleBox onClick={() => moveToDetail(item.boardId)}>
              <itemS.TupleTitle data-delete-yn={item.deleteYn ? true : undefined}>
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
          {item.deleteYn ? (
            <itemS.TupleTitleBox>
              <itemS.DeletedIcon src='/img/deleted_icon.svg' alt='삭제된 글' />
              <itemS.TupleTitle data-delete-yn={item.deleteYn ? true : undefined}>
                {truncateTitle(item.title)}
              </itemS.TupleTitle>
            </itemS.TupleTitleBox>
          ) : (
            // <itemS.TupleTitleBox onClick={() => moveToDetail(item.boardId)}> //TODO -  에디터 이동 넣을 곳
            <itemS.TupleTitleBox>
              <itemS.TupleTitle data-delete-yn={item.deleteYn ? true : undefined}>
                {truncateTitle(item.title)}
              </itemS.TupleTitle>
            </itemS.TupleTitleBox>
          )}
          <itemS.TupleTempDate>{formatDate(item.createdTime)}</itemS.TupleTempDate>
        </>
      )}
      
    </itemS.TupleContainer>
  );
}
