import React, { useEffect, useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MyBoardTuple from './Mypage.mypage.myboard.tuple';
import * as itemS from "./Styled/Mypage.mypage.myboard.table.styles";
import request from '../../Api/request';
import { AlertContext } from '../../Common/Alert/AlertContext';

export default function MyBoardTable({ items, boardCount, tempCount, isMemberMatch, fetchBoard={fetchBoard} }) {
  const navigate = useNavigate();
  const { alert } = useContext(AlertContext);

  const [checkedItems, setCheckedItems] = useState({
    board: {}, // 게시한 글의 체크 상태
    temp: {},  // 임시저장 글의 체크 상태
  });
  const [isAllChecked, setIsAllChecked] = useState({
    board: false, // 게시한 글의 전체 선택 상태
    temp: false,  // 임시저장 글의 전체 선택 상태
  });
  
  // const [checkedItems, setCheckedItems] = useState({});
  // const [isAllChecked, setIsAllChecked] = useState(false);
  const [count, setCount] = useState(boardCount); //TODO -  - 임시로 10 넣음

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
    setCount(tab === 'board' ? boardCount : tempCount); 
    setThumbTop(0);
  };

  // const handleCheckChange = (boardId) => {
  //   setCheckedItems((prev) => ({
  //     ...prev,
  //     [boardId]: !prev[boardId]
  //   }));
  // };

  const handleCheckChange = (boardId) => {
    setCheckedItems((prev) => ({
      ...prev,
      [selectedTab]: {
        ...prev[selectedTab],
        [boardId]: !prev[selectedTab][boardId],
      },
    }));
  };
  

  // const handleAllCheckChange = () => {
  //   const newIsAllChecked = !isAllChecked;
  //   setIsAllChecked(newIsAllChecked);
  //   const newCheckedItems = {};
  //   items.forEach((item) => {
  //     newCheckedItems[item.boardId] = newIsAllChecked;
  //   });
  //   setCheckedItems(newCheckedItems);
  // };

  const handleAllCheckChange = () => {
    const newIsAllChecked = !isAllChecked[selectedTab];
    setIsAllChecked((prev) => ({
      ...prev,
      [selectedTab]: newIsAllChecked,
    }));
  
    const newCheckedItems = {};
    items
      .filter((item) => (selectedTab === "board" ? item.saveYn : !item.saveYn))
      .forEach((item) => {
        newCheckedItems[item.boardId] = newIsAllChecked;
      });
  
    setCheckedItems((prev) => ({
      ...prev,
      [selectedTab]: newCheckedItems,
    }));
  };
  

  // // 게시글 삭제
	// const handleDelete = async (items) => {
  //   try {
  //     // items 객체에서 value가 true인 key값들로 배열 생성
  //     const idsToDelete = Object.keys(items).filter((id) => items[id] === true);
  //     console.log('idsToDelete', idsToDelete);
  //     // 삭제할 항목이 없는 경우 경고 메시지 출력 후 종료
  //     if (idsToDelete.length === 0) {
  //       alert('삭제할 게시글을 선택해주세요.');
  //       return;
  //     }
  
  //     // 삭제 요청 수행
  //     for (let id of idsToDelete) {
  //       console.log('boardId', id); 
  
  //       try {
  //         const response = await request.delete(`/board/${id}`);
  //         if (response.isSuccess) {
  //           console.log(`게시글 ${id} 삭제 성공:`, response);
  //         } else {
  //           console.error(`게시글 ${id} 삭제 실패:`, response);
  //         }
  //       } catch (error) {
  //         console.error(`게시글 ${id} 삭제 중 오류 발생:`, error);
  //       }
  //     }
  
  //     // 삭제 후 추가 동작 수행
  //     fetchBoard();
  //     if (isAllChecked) handleAllCheckChange();
  //   } catch (error) {
  //     console.error('삭제 처리 중 오류 발생:', error);
  //   }
  // };

  const handleDelete = async (items) => {
    const idsToDelete = Object.keys(items[selectedTab]).filter(
      (id) => items[selectedTab][id] === true
    );
  
    if (idsToDelete.length === 0) {
      alert("삭제할 게시글을 선택해주세요.");
      return;
    }
  
    try {
      for (let id of idsToDelete) {
        const response = await request.delete(`/board/${id}`);
        if (response.isSuccess) {
          console.log(`게시글 ${id} 삭제 성공:`, response);
        } else {
          console.error(`게시글 ${id} 삭제 실패:`, response);
        }
      }
  
      fetchBoard();
      setCheckedItems((prev) => ({
        ...prev,
        [selectedTab]: {},
      }));
      setIsAllChecked((prev) => ({
        ...prev,
        [selectedTab]: false,
      }));
    } catch (error) {
      console.error("삭제 처리 중 오류 발생:", error);
    }
  };
  


  const handleWriteClick = () => {
		navigate('/writepost'); 
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
            {isMemberMatch && (
              <itemS.Tab 
                onClick={() => handleTabClick("temp")} 
                active={selectedTab === "temp"}
              >
                임시저장한 글
              </itemS.Tab>
            )}
            
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
                {items.filter((item) => item.saveYn).length === 0 ? (
                  <itemS.NoItemsContainer>
                    아직 작성된 글이 없습니다.
                  </itemS.NoItemsContainer>
                ) : (
                  items
                    .filter((item) => item.saveYn) // 조건에 따라 배열을 필터링
                    .map((item) => (
                      <MyBoardTuple
                        key={item.boardId}
                        selectedTab={selectedTab}
                        item={item}
                        // isChecked={checkedItems[item.boardId] || false}
                        isChecked={checkedItems[selectedTab][item.boardId] || false}
                        onCheckChange={() => handleCheckChange(item.boardId)}
                        isMemberMatch={isMemberMatch}
                      />
                    ))
                )}
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
              <itemS.TupleContainer
                ref={contentRef}
                onScroll={handleScrollSync}
              >
                {items.filter((item) => !item.saveYn).length === 0 ? (
                  <itemS.NoItemsContainer>
                    아직 작성된 글이 없습니다.
                  </itemS.NoItemsContainer>
                ) : (
                  items
                    .filter((item) => !item.saveYn) // 조건에 따라 배열을 필터링
                    .map((item) => (
                      <MyBoardTuple
                        key={item.boardId}
                        selectedTab={selectedTab}
                        item={item}
                        // isChecked={checkedItems[item.boardId] || false}
                        isChecked={checkedItems[selectedTab][item.boardId] || false}
                        onCheckChange={() => handleCheckChange(item.boardId)}
                        isMemberMatch={isMemberMatch}
                      />
                    ))
                )}
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
        {isMemberMatch && 
          <itemS.AllCheckBox>
            <itemS.AllCheck
              type="checkbox"
              // checked={isAllChecked}
              checked={isAllChecked[selectedTab]}
              onChange={handleAllCheckChange}
            />
            <itemS.AllCheckText>전체 선택</itemS.AllCheckText>
          </itemS.AllCheckBox>}
        {isMemberMatch && (
          selectedTab === 'board' ? (
            <itemS.ButtonBox>
              <itemS.DeleteButton onClick={() => handleDelete(checkedItems)}>삭제</itemS.DeleteButton>
              <itemS.WriteButton onClick={handleWriteClick}>글쓰기</itemS.WriteButton>
            </itemS.ButtonBox>
          ) : (
            <itemS.DeleteButton onClick={() => handleDelete(checkedItems)}>삭제</itemS.DeleteButton>
          )
        )}
        
      </itemS.ButtonContainer>
      
    </itemS.Container>
  );
}
