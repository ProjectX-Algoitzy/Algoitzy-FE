import React, { useContext, useEffect, useState } from 'react';
import * as itemS from "./Styled/RegularStudy.regularstudy.curriculumcheck.styles"
import request from '../../Api/request'
import { useParams } from 'react-router-dom';

export default function RegularStudyCurriculumCheck() {
    const { curriculumId } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [title, setTitle] = useState('');
    const [week, setWeek] = useState(0);
    const [content, setContent] = useState('');
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await request.get(`/curriculum/${curriculumId}`);
          console.log("커리큘럼 내용: ", response);
          if (response["isSuccess"]) {
            setData(response.result);
            setTitle(response.result.title);
            setWeek(response.result.week);
            setContent(response.result.content);
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
    }, [curriculumId]);
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
  
    return (
      <itemS.Container>
        <itemS.Title>{title}</itemS.Title>
        <itemS.SecondContainer>
          <itemS.WhiteBox>{data.studyName}</itemS.WhiteBox>
          <itemS.WhiteBox>{week}주차</itemS.WhiteBox>
        </itemS.SecondContainer>
        <itemS.ContentsContainer>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </itemS.ContentsContainer>
      </itemS.Container>
    );
}
