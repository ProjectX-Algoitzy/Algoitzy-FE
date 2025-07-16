import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ChallengeTuple from "./Mypage.mypage.challenge.tuple";
import RewardProgress from "./Mypage.mypage.challenge.rewardprogress";
import * as itemS from "./Styled/Mypage.mypage.challenge.table.styles";
import request from "../../Api/request";
import { AlertContext } from "../../Common/Alert/AlertContext";

export default function ChallengeTable({
  items,
  logCount,
  rewardCount,
  winCount,
  isMemberMatch,
  fetchRewardLog,
  onChangeLogType,
}) {
  // const [count, setCount] = useState(inquiryCount); //TODO -  - 임시로 10 넣음
  const [challengeRewardCount, setChallengeRewardCount] = useState(rewardCount);
  const [challengeWinCount, setChallengeWinCount] = useState(winCount);

  const [sortType, setSortType] = useState("LATEST");
  const [sortText, setSortText] = useState("전체");
  const [isSortDropVisible, setIsSortDropVisible] = useState(false); // 정렬 드롭박스 열기/닫기

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

  const toggleSortDrop = () => {
    setIsSortDropVisible((prevState) => !prevState);
  };

  const onSortType = (type) => {
    setIsSortDropVisible(false);
    setSortType(type);
    if (type === "") {
      setSortText("전체");
      onChangeLogType(""); // 전체
    } else if (type === "ACQUIRED") {
      setSortText("획득");
      onChangeLogType("ACQUIRED");
    } else if (type === "USED") {
      setSortText("사용");
      onChangeLogType("USED");
    }
  };

  return (
    <itemS.Container>
      <itemS.Table>
        <itemS.TabBtnContainer>
          <itemS.TabBox>
            <itemS.TabHead>챌린지 보상 현황</itemS.TabHead>
            <itemS.TabBody>
              챌린지 보상은 참여 중인 정규 스터디의 출석부에서 사용하실 수
              있습니다.
            </itemS.TabBody>
            <RewardProgress
              challengeRewardCount={challengeRewardCount}
              challengeWinCount={challengeWinCount}
            />
          </itemS.TabBox>
        </itemS.TabBtnContainer>

        <itemS.SortTableContainer>
          <itemS.SortContainer logCount={logCount}>
            <itemS.CategoryDrop onClick={toggleSortDrop}>
              {sortText}
            </itemS.CategoryDrop>
            <itemS.SortIcon
              src="/img/sorticon.svg"
              alt="Sort Icon"
              onClick={toggleSortDrop}
            />
            {isSortDropVisible && (
              <itemS.SortDrop logCount={logCount}>
                <itemS.SortText onClick={() => onSortType("")}>
                  전체
                </itemS.SortText>
                <itemS.SortDivider />
                <itemS.SortText onClick={() => onSortType("ACQUIRED")}>
                  획득
                </itemS.SortText>
                <itemS.SortDivider />
                <itemS.SortText onClick={() => onSortType("USED")}>
                  사용
                </itemS.SortText>
              </itemS.SortDrop>
            )}
          </itemS.SortContainer>
          <itemS.TableContainerWrapper>
            <itemS.TableContainer>
              <itemS.CategoryContainer>
                <itemS.CategoryStatus>획득/사용</itemS.CategoryStatus>
                <itemS.CategoryTitle>내용</itemS.CategoryTitle>
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
                    items.map((item, index) => (
                      <ChallengeTuple
                        key={index}
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

            {logCount > 8 && (
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
        </itemS.SortTableContainer>
      </itemS.Table>
    </itemS.Container>
  );
}
