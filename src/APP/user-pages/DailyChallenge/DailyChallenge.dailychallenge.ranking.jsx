import { useState } from 'react';
import RankingTable from './DailyChallenge.dailychallenge.table';
import * as itemS from './Styled/DailyChallenge.dailychallenge.ranking.styles';

function Ranking({
  disable = false,
  challengeHistory = [],
}) {

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const formatDisplay = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const weekdayNames = ["일", "월", "화", "수", "목", "금", "토"];
    const weekday = weekdayNames[d.getDay()];
    return `${year}년 ${month}월 ${day}일 (${weekday})`;
  };

  // dummyRanking의 date와 동일한 포맷 ("YYYY-MM-DD")
  const formatKey = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [selectedLanguage, setSelectedLanguage] = useState("C++");
  const [currentDate, setCurrentDate] = useState(today);

  const minDate = new Date(today);
  minDate.setDate(minDate.getDate() - 6); // 최근 7일
  const prevDisabled = currentDate.getTime() <= minDate.getTime();
  const nextDisabled = currentDate.getTime() >= today.getTime();

  const goPrev = () => {
    if (prevDisabled) return;
    const d = new Date(currentDate);
    d.setDate(d.getDate() - 1);
    setCurrentDate(d);
  };
  const goNext = () => {
    if (nextDisabled) return;
    const d = new Date(currentDate);
    d.setDate(d.getDate() + 1);
    setCurrentDate(d);
  };

  return (
    <itemS.Container>
      <itemS.TitleContainer>
        <itemS.Title>데일리 챌린지 순위</itemS.Title>
        <itemS.Notice>*순위는 정각마다 갱신되며, 익일 00:00 기준으로 보상이 지급됩니다.</itemS.Notice>
      </itemS.TitleContainer>
      <itemS.Divider />
      <itemS.DateRow>
        <itemS.NavButton onClick={goPrev} disabled={prevDisabled} $dir="left" />
        <itemS.DateText>{formatDisplay(currentDate)}</itemS.DateText>
        <itemS.NavButton onClick={goNext} disabled={nextDisabled} $dir="right" />
      </itemS.DateRow>
      <itemS.LanguageContainer>
        {["Python", "C++", "Java"].map((lang) => (
          <itemS.Language
            onClick={() => setSelectedLanguage(lang)}
            $active={selectedLanguage === lang}
          >
            {lang}
          </itemS.Language>
        ))}
      </itemS.LanguageContainer>
      <RankingTable
        disable={disable}
        language={selectedLanguage}
        date={formatKey(currentDate)}
        challengeHistory={challengeHistory}
      />
    </itemS.Container>
  );
}

export default Ranking;