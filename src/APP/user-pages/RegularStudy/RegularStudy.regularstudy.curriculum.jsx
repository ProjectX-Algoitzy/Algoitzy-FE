import React, { useCallback, useEffect, useState } from 'react';
import * as itemS from "./Styled/RegularStudy.regularstudy.curriculum.styles";
import request from '../../Api/request';
import { useNavigate, useParams } from 'react-router-dom';

export default function RegularStudyCurriculum() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [curriculumList, setCurriculumList] = useState([]); // 커리큘럼 리스트 상태 추가
  const [currentWeek, setCurrentWeek] = useState(null); // 현재 주차 상태 추가
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCurriculumList = useCallback(async () => {
    try {
      const responseCurriculum = await request.get(`/study/${id}/curriculum`);
      console.log("정규스터디 커리큘럼 목록 조회: ", responseCurriculum);
      if (responseCurriculum["isSuccess"]) {
        console.log("정규 스터디 조회 성공");
        setCurriculumList(responseCurriculum.result.curriculumList);
      }
    } catch (error) {
      console.error("정규스터디 커리큘럼 목록 조회 실패:", error);
      if (error?.response?.data?.code === "NOTICE") {
        setError(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  }, [id]); // 'id'가 바뀔 때만 함수가 재생성됨

  const fetchCurrentWeek = useCallback(async () => {
    try {
      const responseCurrentWeek = await request.get('/week/current');
      console.log("현재 주차 정보 조회: ", responseCurrentWeek);
      if (responseCurrentWeek.isSuccess) {
        setCurrentWeek(responseCurrentWeek.result.week); // 현재 주차 상태 업데이트
      }
    } catch (error) {
      console.error('현재 주차 정보 조회 오류: ', error);
    }
  }, []);

  useEffect(() => {
    fetchCurriculumList();
    fetchCurrentWeek();
  }, [fetchCurriculumList, fetchCurrentWeek]);

  const handleCurriculumClick = (curriculumId) => {
    navigate(`/curriculumcheck/${curriculumId}`);
    console.log("내가선택한 커리큘럼 아이디", curriculumId);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return (
    <itemS.Container>
      <itemS.Title>커리큘럼</itemS.Title>
      <itemS.CanNotEnterContainer>{error}</itemS.CanNotEnterContainer>
    </itemS.Container>
  );

  return (
    <itemS.Container>
      <itemS.Title>커리큘럼</itemS.Title>
      {curriculumList.map(curriculum => (
        <itemS.CurriculumContainer
          key={curriculum.curriculumId}
          isCurrentWeek={curriculum.week >= currentWeek} // 현재 주차인지 확인하여 props로 전달
        >
          <itemS.TextContainer>
            <itemS.CurriculumText onClick={() => handleCurriculumClick(curriculum.curriculumId)}>
              {curriculum.title}
            </itemS.CurriculumText>
            {curriculum.week === currentWeek && ( // 현재 주차일 경우에만 이미지를 표시 
              <itemS.HighlightBox>진행 중</itemS.HighlightBox>
            )}
          </itemS.TextContainer>
          <itemS.MiddleCurriculumContainer>
            <itemS.SmallCurriculumContainer style={{marginRight:"64px"}}>
              <itemS.Gray6Text>주차</itemS.Gray6Text>
              <itemS.Gray7Text>{curriculum.week}주차</itemS.Gray7Text>
            </itemS.SmallCurriculumContainer>
          </itemS.MiddleCurriculumContainer>
        </itemS.CurriculumContainer>
        ))}
    </itemS.Container>
  );
}