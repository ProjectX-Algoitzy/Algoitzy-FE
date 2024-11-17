import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyBoardTuple from './Mypage.mypage.myboard.tuple';
import * as itemS from "./Styled/Mypage.mypage.myboard.table.styles";

export default function MyBoardTable({ items }) {

  const [checkedItems, setCheckedItems] = useState({});
  const [isAllChecked, setIsAllChecked] = useState(false);

  // 게시글, 임시저장글 탭 변경
  const [selectedTab, setSelectedTab] = useState("board");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);  
  };

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
        <itemS.TabBtnContainer>
          <itemS.TabBox>
            <itemS.Tab 
              onClick={() => handleTabClick("board")} 
              active={selectedTab === "board"}
            >
              게시한 글
            </itemS.Tab>
            <itemS.Tab 
              onClick={() => handleTabClick("temp")} 
              active={selectedTab === "temp"}
            >
              임시저장한 글
            </itemS.Tab>
          </itemS.TabBox>
        </itemS.TabBtnContainer>
        
        {selectedTab === "board" ? ( // 게시한 글
            <itemS.TableContainer>
              <itemS.CategoryContainer>
                <itemS.BlankBox></itemS.BlankBox>
                <itemS.CategoryTitle>제목</itemS.CategoryTitle>
                <itemS.CategoryDate>작성일</itemS.CategoryDate>
                <itemS.CategoryView>조회수</itemS.CategoryView>
              </itemS.CategoryContainer>
              <itemS.TupleContainer>
                {items
                .filter(item => !item.saveYn) // 조건에 따라 배열을 필터링
                .map(item => (
                  <MyBoardTuple
                    key={item.boardId}
                    selectedTab={selectedTab}
                    item={item}
                    isChecked={checkedItems[item.boardId] || false}
                    onCheckChange={() => handleCheckChange(item.boardId)}
                  />
                ))}
              </itemS.TupleContainer>
            </itemS.TableContainer>
          ) : (  // 임시저장한 글
            <itemS.TableContainer>
              <itemS.CategoryContainer>
                <itemS.BlankBox></itemS.BlankBox>
                <itemS.CategoryTitle>제목</itemS.CategoryTitle>
                <itemS.CategoryTempDate>작성일</itemS.CategoryTempDate>
              </itemS.CategoryContainer>
              <itemS.TupleContainer>
                {items
                .filter(item => item.saveYn) // 조건에 따라 배열을 필터링
                .map(item => (
                  <MyBoardTuple
                    key={item.boardId}
                    selectedTab={selectedTab}
                    item={item}
                    isChecked={checkedItems[item.boardId] || false}
                    onCheckChange={() => handleCheckChange(item.boardId)}
                  />
                ))}
              </itemS.TupleContainer>
            </itemS.TableContainer>
          )}
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
