import React, { useContext, useEffect, useState } from 'react';
import * as itemS from "./Styled/RegularStudy.regularstudy.curriculum.styles";
import request from '../../Api/request';
import { useNavigate, useParams } from 'react-router-dom';

export default function RegularStudyCurriculum() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [curriculumList, setCurriculumList] = useState([]); // 커리큘럼 리스트 상태 추가
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCurriculumList();
  }, [id]);

  const fetchCurriculumList = async () => {
    try {
      const responseCurriculum = await request.get(`/study/${id}/curriculum`);
      console.log("정규스터디 커리큘럼 목록 조회: ", responseCurriculum);
      if (responseCurriculum["isSuccess"]) {
        console.log("정규 스터디 조회 성공");
        setCurriculumList(responseCurriculum.result.curriculumList);
      }
    } catch (error) {
      console.error("정규스터디 커리큘럼 목록 조회 실패:", error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

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
        <itemS.CurriculumContainer>
            <itemS.CurriculumText key={curriculum.curriculumId} onClick={() => handleCurriculumClick(curriculum.curriculumId)}>{curriculum.title}</itemS.CurriculumText>
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