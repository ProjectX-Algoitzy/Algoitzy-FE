import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MyBoardTuple from './Mypage.mypage.myboard.tuple';
import * as itemS from "./Styled/Mypage.mypage.myboard.table.styles";

export default function MyBoardTable({ items, boardCount, tempCount }) {
  const [checkedItems, setCheckedItems] = useState({});
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [count, setCount] = useState(10); //TODO -  - 임시로 10 넣음

  // 게시글, 임시저장글 탭 변경
  const [selectedTab, setSelectedTab] = useState("board");

  // 스크롤 동기화를 위한 참조
  const contentRef = useRef(null);
  const scrollRef = useRef(null);
  const [thumbTop, setThumbTop] = useState(0);

  // 스크롤 동기화 함수
  const handleScrollSync = (e) => {
    const scrollable = e.target;
    const syncScroll =
      scrollable === contentRef.current ? scrollRef.current : contentRef.current;

    if (syncScroll) {
      const scrollRatio =
        scrollable.scrollTop / (scrollable.scrollHeight - scrollable.clientHeight);

      if (scrollable === contentRef.current) {
        setThumbTop(scrollRatio * (scrollRef.current.clientHeight - 96)); // Thumb 위치 업데이트
      }
      syncScroll.scrollTop = scrollable.scrollTop;
    }
  };

  // Thumb 위치 클릭으로 콘텐츠 스크롤 제어
  const handleThumbDrag = (e) => {
    const containerHeight = contentRef.current.clientHeight;
    const scrollableHeight = contentRef.current.scrollHeight;
    const thumbHeight = scrollRef.current.clientHeight - 96;

    const newTop = Math.min(
      Math.max(0, e.clientY - scrollRef.current.getBoundingClientRect().top),
      thumbHeight
    );

    setThumbTop(newTop);
    contentRef.current.scrollTop = (newTop / thumbHeight) * (scrollableHeight - containerHeight);
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);  
    setCount(tab === 'board' ? 10 : tempCount); //TODO - 임시로 10 넣음
    setThumbTop(0);
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
        <itemS.TableContainerWrapper>
          {selectedTab === "board" ? ( // 게시한 글
            <itemS.TableContainer>
              <itemS.CategoryContainer>
                <itemS.BlankBox></itemS.BlankBox>
                <itemS.CategoryTitle>제목</itemS.CategoryTitle>
                <itemS.CategoryDate>작성일</itemS.CategoryDate>
                <itemS.CategoryView>조회수</itemS.CategoryView>
              </itemS.CategoryContainer>
              <itemS.TupleContainerWrapper>
                <itemS.TupleContainer
                  ref={contentRef}
                  onScroll={handleScrollSync}
                >
                  {items
                    .filter((item) => !item.saveYn) // 조건에 따라 배열을 필터링
                    .map((item) => (
                      <MyBoardTuple
                        key={item.boardId}
                        selectedTab={selectedTab}
                        item={item}
                        isChecked={checkedItems[item.boardId] || false}
                        onCheckChange={() => handleCheckChange(item.boardId)}
                      />
                    ))}
                </itemS.TupleContainer>
                {/* <itemS.ScrollbarContainer
                  ref={scrollRef}
                  // onScroll={handleScrollSync}
                >
                  <itemS.ScrollbarThumb
                    style={{ top: `${thumbTop}px` }}
                    onMouseDown={handleThumbDrag}
                  />
                </itemS.ScrollbarContainer> */}
              </itemS.TupleContainerWrapper>
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
          {count > 8 &&
            <itemS.ScrollbarContainer>
              <itemS.ScrollTopArrow src='/img/scroll-top-arrow.svg' alt='화살표' />
              <itemS.ScrollbarWrapper
                ref={scrollRef}
                // onScroll={handleScrollSync}
              >
                <itemS.ScrollbarThumb
                  style={{ top: `${thumbTop}px` }}
                  onMouseDown={handleThumbDrag}
                />
              </itemS.ScrollbarWrapper>
              <itemS.ScrollBottomArrow src='/img/scroll-bottom-arrow.svg' alt='화살표' />
            </itemS.ScrollbarContainer>
          }
        </itemS.TableContainerWrapper>
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
