import React, { useEffect, useState } from "react";
import * as itemS from "./Styled/Widget.DailyChallengeWidget.main.styles";
import { useNavigate } from "react-router-dom";
import request from "../../../Api/request";

const getTodayEndTime = () => {
  const now = new Date();
  const end = new Date(now);
  end.setHours(24, 0, 0, 0);
  return end;
};

const calculateRemainingTime = () => {
  const now = new Date();
  const diff = getTodayEndTime() - now;

  if (diff <= 0) return "00:00:00";

  const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, "0");
  const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(
    2,
    "0"
  );
  const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

export default function DailyChallengeWidget() {
  const navigate = useNavigate();
  const [remainingTime, setRemainingTime] = useState("00:00:00");
  const [isSolved, setIsSolved] = useState(false); //false
  const [status, setStatus] = useState(1); // 상태 번호 1~3
  const [currentDate, setCurrentDate] = useState(() => {
    return new Date().toISOString().split("T")[0]; // "2025-08-06"
  });

  const fetchChallengeStatus = async () => {
    try {
      const response = await request.get("/challenge/check-join");
      if (response.isSuccess) {
        setIsSolved(response.result);
      } else {
        console.error("데일리 챌린지 상태 조회 실패:", response);
      }
    } catch (error) {
      console.error("데일리 챌린지 상태 조회 오류", error);
    }
  };

  // 상태 계산 함수
  const determineStatus = (isSolved, remaining) => {
    const [hh, mm, ss] = remaining.split(":").map(Number);
    const totalSeconds = hh * 3600 + mm * 60 + ss;

    if (isSolved && totalSeconds < 3600) return 3; // 상태 3
    if (isSolved) return 2; // 상태 2
    return 1; // 상태 1
  };

  useEffect(() => {
    const dateWatcher = setInterval(() => {
      const today = new Date().toISOString().split("T")[0];
      if (today !== currentDate) {
        setCurrentDate(today);
        setIsSolved(false); // 초기화
      }
    }, 1000);

    return () => clearInterval(dateWatcher);
  }, [currentDate]);

  useEffect(() => {
    fetchChallengeStatus();

    const updateTimer = () => {
      const remaining = calculateRemainingTime();
      setRemainingTime(remaining);
      setStatus(determineStatus(isSolved, remaining));
    };

    updateTimer(); // 초기 1회 실행

    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [isSolved]);

  const handleClick = () => {
    navigate("/dailychallenge");
  };

  // 상태에 따른 텍스트 렌더링
  const getCenterText = () => {
    if (status === 2) return "오늘의 챌린지 완료!";
    if (status === 3) {
      const [, mm, ss] = remainingTime.split(":");
      return `순위 공개까지 ${mm}:${ss}`;
    }
    return remainingTime; // 상태 1
  };

  const getButtonText = () => {
    if (status === 1) return "문제 풀기";
    if (status === 2) return "순위 확인";
    if (status === 3) return "실시간 순위 확인";
  };

  return (
    <itemS.DailyChallengeWidget>
      <itemS.Relative>
        <itemS.Icon src="/img/sticker-shadow.svg" alt="daily" />
        <itemS.TextWrapper>
          <itemS.TextImg src="/img/Daily-Challenge.svg" alt="daily" />
          <itemS.RemainingTimeWrapper>
            {status === 3 ? (
              <>
                <itemS.RemainingLabel status={status}>
                  순위 공개까지
                </itemS.RemainingLabel>
                <itemS.RemainingValue>
                  {remainingTime.split(":").slice(1).join(":")}
                </itemS.RemainingValue>
              </>
            ) : (
              <itemS.RemainingLabel status={status}>
                {getCenterText()}
              </itemS.RemainingLabel>
            )}
          </itemS.RemainingTimeWrapper>
          <itemS.ActionButton onClick={handleClick} status={status}>
            {getButtonText()}
          </itemS.ActionButton>
        </itemS.TextWrapper>
      </itemS.Relative>
    </itemS.DailyChallengeWidget>
  );
}
