import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyBoardTuple from './Mypage.mypage.myboard.tuple';
import * as itemS from "./Styled/Mypage.mypage.myboard.table.styles";

export default function MyBoardTable({ items }) {

  const [checkedItems, setCheckedItems] = useState({});
  const [isAllChecked, setIsAllChecked] = useState(false);

  const handleCheckChange = (boardId) => {
    setCheckedItems((prev) => ({
      ...prev,
      [boardId]: !prev[boardId]
    }));
  };

  const handleAllCheckChange = () => {
    const newIsAllChecked = !isAllChecked;
    setIsAllChecked(newIsAllChecked);
    const newCheckedItems = {};
    items.forEach((item) => {
      newCheckedItems[item.boardId] = newIsAllChecked;
    });
    setCheckedItems(newCheckedItems);
  };

  return (
    <itemS.Container>
      <itemS.Table>
        <itemS.Head>내가 쓴 글</itemS.Head>
        <itemS.CategoryContainer>
          <itemS.BlankBox></itemS.BlankBox>
          <itemS.CategoryTitle>제목</itemS.CategoryTitle>
          <itemS.CategoryDate>작성일</itemS.CategoryDate>
          <itemS.CategoryView>조회수</itemS.CategoryView>
        </itemS.CategoryContainer>
        <itemS.TupleContainer>
          {items.map(item => (
            <MyBoardTuple
              key={item.boardId}
              item={item}
              isChecked={checkedItems[item.boardId] || false}
              onCheckChange={() => handleCheckChange(item.boardId)}
            />
          ))}
        </itemS.TupleContainer>
      </itemS.Table>
      <itemS.ButtonContainer>
        <itemS.AllCheckBox>
          <itemS.AllCheck
            type="checkbox"
            checked={isAllChecked}
            onChange={handleAllCheckChange}
          />
          <itemS.AllCheckText>전체 선택</itemS.AllCheckText>
        </itemS.AllCheckBox>
        <itemS.ButtonBox>
          <itemS.DeleteButton>삭제</itemS.DeleteButton>
          <itemS.WriteButton>글쓰기</itemS.WriteButton>
        </itemS.ButtonBox>
      </itemS.ButtonContainer>
      
    </itemS.Container>
  );
}
