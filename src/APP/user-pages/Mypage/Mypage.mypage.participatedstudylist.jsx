// ParticipatedStudyList.js
import React from 'react';
import StudyList from './Mypage.mypage.studylist';
import * as itemS from "./Styled/Mypage.mypage.main.styles";

export default function ParticipatedStudyList({
  currentPassItems,
  totalPagesPassStudy,
  currentPagePassStudy,
  handlePrevPagePassStudy,
  handleNextPagePassStudy,
}) {
  return (
    <itemS.StudyListContainer>
      <itemS.StudyHeadBox>
        <itemS.Head>참여 중인 스터디</itemS.Head>
      </itemS.StudyHeadBox>
      <itemS.Group>
        {currentPassItems.map((item) => (
          <StudyList key={item.studyId} studyList={item} />
        ))}
      </itemS.Group>
      {totalPagesPassStudy > 1 && (
        <itemS.Pagination>
          {currentPagePassStudy > 1 && (
            <itemS.LeftPageButton src='/img/arrow-l.svg' alt='왼쪽' onClick={handlePrevPagePassStudy} />
          )}
          {currentPagePassStudy < totalPagesPassStudy && (
            <itemS.RightPageButton src='/img/arrow-r.svg' alt='오른쪽' onClick={handleNextPagePassStudy} />
          )}
        </itemS.Pagination>
      )}
    </itemS.StudyListContainer>
  );
}
