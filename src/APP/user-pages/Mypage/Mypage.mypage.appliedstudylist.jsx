// AppliedStudyList.js
import React from 'react';
import StudyList from './Mypage.mypage.studylist';
import * as itemS from "./Styled/Mypage.mypage.main.styles";

export default function AppliedStudyList({
  currentApplyItems,
  totalPagesApplyStudy,
  currentPageApplyStudy,
  handlePrevPageApplyStudy,
  handleNextPageApplyStudy,
}) {
  return (
    <itemS.StudyListContainer>
      <itemS.StudyHeadBox>
        <itemS.Head>지원한 스터디</itemS.Head>
      </itemS.StudyHeadBox>
      <itemS.Group>
        {currentApplyItems.map((item) => (
          <StudyList key={item.studyId} studyList={item} />
        ))}
      </itemS.Group>
      {totalPagesApplyStudy > 1 && (
        <itemS.Pagination>
          {currentPageApplyStudy > 1 && (
            <itemS.LeftPageButton src='/img/arrow-l.svg' alt='왼쪽' onClick={handlePrevPageApplyStudy} />
          )}
          {currentPageApplyStudy < totalPagesApplyStudy && (
            <itemS.RightPageButton src='/img/arrow-r.svg' alt='오른쪽' onClick={handleNextPageApplyStudy} />
          )}
        </itemS.Pagination>
      )}
    </itemS.StudyListContainer>
  );
}
