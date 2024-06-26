import React, { useEffect, useState } from 'react'
import * as itemS from "../RegularStudy/Styled/RegularStudy.regularstudy.curriculum.styles"
import request from '../../Api/request'
import { useLocation } from 'react-router-dom';

export default function RegularStudyCurriculum() {
  const location = useLocation();
  // const { curriculumId } = location.state;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeWeeks, setActiveWeeks] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const response = await request.get(`/study/${curriculumId}`);
        const response = await request.get(`/study/1/curriculum`);
        console.log("response커리큘럼", response);
        if (response["isSuccess"]) {
          setData(response.result.curriculumList);
        } else {
          setError('Failed to fetch data');
        }
      } catch (error) {
        setError('An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleTriangleClick = (week) => {
    setActiveWeeks((prev) => ({
      ...prev,
      [week]: !prev[week]
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <itemS.Container>
      {data.map(({ week, title, content }) => (
        <itemS.LittleContainer key={week}>
          <itemS.Title>
            <itemS.TriangleImg 
              src='/img/iconcurriculumtriangle.png' 
              onClick={() => handleTriangleClick(week)} 
            /> {week}주차
          </itemS.Title>
          {activeWeeks[week] && (
            <>
              <itemS.BlueContainer>{title}</itemS.BlueContainer>
              <itemS.ContentsContainer dangerouslySetInnerHTML={{ __html: content }} />
            </>
          )}
        </itemS.LittleContainer>
      ))}
    </itemS.Container>
  );
}