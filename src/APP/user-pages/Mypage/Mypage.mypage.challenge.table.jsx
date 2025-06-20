import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ChallengeTuple from "./Mypage.mypage.challenge.tuple";
import Compensation from "./Mypage.mypage.challenge.compensation";
import * as itemS from "./Styled/Mypage.mypage.challenge.table.styles";
import request from "../../Api/request";
import { AlertContext } from "../../Common/Alert/AlertContext";

export default function ChallengeTable({
  items,
  inquiryCount,
  isMemberMatch,
  fetchinquiry = { fetchinquiry },
}) {
  const navigate = useNavigate();
  const { alert } = useContext(AlertContext);

  const [checkedItems, setCheckedItems] = useState({
    inquiry: {}, // 게시한 글의 체크 상태
  });
  const [isAllChecked, setIsAllChecked] = useState({
    inquiry: false, // 게시한 글의 전체 선택 상태
  });

  const [count, setCount] = useState(inquiryCount); //TODO -  - 임시로 10 넣음

  // 게시글, 임시저장글 탭 변경
  const [selectedTab, setSelectedTab] = useState("inquiry");

  // 스크롤 동기화를 위한 참조
  const contentRef = useRef(null);
  const scrollRef = useRef(null);
  const [thumbTop, setThumbTop] = useState(0);

  // 스크롤 동기화 함수
  const handleScrollSync = (e) => {
    const scrollable = e.target;
    const syncScroll =
      scrollable === contentRef.current
        ? scrollRef.current
        : contentRef.current;

    if (syncScroll) {
      const scrollRatio =
        scrollable.scrollTop /
        (scrollable.scrollHeight - scrollable.clientHeight);

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
    contentRef.current.scrollTop =
      (newTop / thumbHeight) * (scrollableHeight - containerHeight);
  };

  const handleCheckChange = (inquiryId) => {
    setCheckedItems((prev) => ({
      ...prev,
      [selectedTab]: {
        ...prev[selectedTab],
        [inquiryId]: !prev[selectedTab][inquiryId],
      },
    }));
  };

  const handleAllCheckChange = () => {
    const newIsAllChecked = !isAllChecked[selectedTab];
    setIsAllChecked((prev) => ({
      ...prev,
      [selectedTab]: newIsAllChecked,
    }));

    const newCheckedItems = {};
    items.forEach((item) => {
      newCheckedItems[item.inquiryId] = newIsAllChecked;
    });

    setCheckedItems((prev) => ({
      ...prev,
      [selectedTab]: newCheckedItems,
    }));
  };

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
        const response = await request.delete(`/inquiry/${id}`);
        if (response.isSuccess) {
          console.log(`게시글 ${id} 삭제 성공:`, response);
        } else {
          console.error(`게시글 ${id} 삭제 실패:`, response);
        }
      }

      fetchinquiry();
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
    navigate("/writeinquiry");
  };

  return (
    <itemS.Container>
      <itemS.Table>
        <itemS.TabBtnContainer>
          <itemS.TabBox>
            <itemS.TabHead>챌린지 보상 현황</itemS.TabHead>
            <itemS.TabBody>
              참여 중인 정규스터디 출석부에서 획득한 챌린지 보상을 사용할 수
              있습니다.
            </itemS.TabBody>
            <Compensation />
          </itemS.TabBox>
        </itemS.TabBtnContainer>
        <itemS.TableContainerWrapper>
          <itemS.TableContainer>
            <itemS.CategoryContainer>
              <itemS.CategoryStatus>획득/사용</itemS.CategoryStatus>
              <itemS.CategoryTitle>제목</itemS.CategoryTitle>
              <itemS.CategoryDate>획득/사용일</itemS.CategoryDate>
              <itemS.CategoryView>총합</itemS.CategoryView>
            </itemS.CategoryContainer>
            <itemS.TupleContainerWrapper>
              <itemS.TupleContainer
                ref={contentRef}
                onScroll={handleScrollSync}
              >
                {items.length === 0 ? (
                  <itemS.NoItemsContainer>
                    등록한 문의가 없습니다.
                  </itemS.NoItemsContainer>
                ) : (
                  items.map((item) => (
                    <ChallengeTuple
                      key={item.inquiryId}
                      item={item}
                      // isChecked={
                      //   checkedItems[selectedTab][item.inquiryId] || false
                      // }
                      // onCheckChange={() => handleCheckChange(item.inquiryId)}
                      // isMemberMatch={isMemberMatch}
                    />
                  ))
                )}
              </itemS.TupleContainer>
            </itemS.TupleContainerWrapper>
          </itemS.TableContainer>

          {count > 8 && (
            <itemS.ScrollbarContainer>
              <itemS.ScrollTopArrow
                src="/img/scroll-top-arrow.svg"
                alt="화살표"
              />
              <itemS.ScrollbarWrapper
                ref={scrollRef}
                // onScroll={handleScrollSync}
              >
                <itemS.ScrollbarThumb
                  style={{ top: `${thumbTop}px` }}
                  onMouseDown={handleThumbDrag}
                />
              </itemS.ScrollbarWrapper>
              <itemS.ScrollBottomArrow
                src="/img/scroll-bottom-arrow.svg"
                alt="화살표"
              />
            </itemS.ScrollbarContainer>
          )}
        </itemS.TableContainerWrapper>
      </itemS.Table>
      <itemS.ButtonContainer>
        {isMemberMatch && (
          <itemS.AllCheckBox>
            <itemS.AllCheck
              type="checkbox"
              // checked={isAllChecked}
              checked={isAllChecked[selectedTab]}
              onChange={handleAllCheckChange}
            />
            <itemS.AllCheckText>전체 선택</itemS.AllCheckText>
          </itemS.AllCheckBox>
        )}
        {isMemberMatch && (
          <itemS.ButtonBox>
            <itemS.DeleteButton onClick={() => handleDelete(checkedItems)}>
              삭제
            </itemS.DeleteButton>
            <itemS.WriteButton onClick={handleWriteClick}>
              글쓰기
            </itemS.WriteButton>
          </itemS.ButtonBox>
        )}
      </itemS.ButtonContainer>
    </itemS.Container>
  );
}
