import React, { useEffect, useState } from 'react'
import * as itemS from "./Styled/RegularStudy.regularstudy.main.styles";
import RegularStudySideBar from "./RegularStudy.regularstudy.sidebar";
import RegularStudyHome from "./RegularStudy.regularstudy.home"
import RegularStudyAttendance from "./RegularStudy.regularstudy.attendance"
import RegularStudyCurriculum from "./RegularStudy.regularstudy.curriculum"
import RegularStudyMocktest from './RegularStudy.regularstudy.mocktest';
import { useParams } from 'react-router-dom';

export default function RegularStudyMain() {
  // const [activeComponent, setActiveComponent] = useState('home');
  // const [activeComponent, setActiveComponent] = useState(
  //   () => localStorage.getItem('activeComponent') || 'home'
  // );

  // useEffect(() => {
  //   localStorage.setItem('activeComponent', activeComponent);
  // }, [activeComponent]);

  const { id } = useParams();  // 정규스터디 ID 가져오기

  const getInitialComponent = () => {
    const savedComponent = localStorage.getItem(`activeComponent_${id}`);
    return savedComponent || 'home';
  };

  const [activeComponent, setActiveComponent] = useState(getInitialComponent);

  useEffect(() => {
    localStorage.setItem(`activeComponent_${id}`, activeComponent);
  }, [activeComponent, id]);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'home': 
        return <RegularStudyHome />;
      case 'attendance':
        return <RegularStudyAttendance />;
      case 'curriculum':
        return <RegularStudyCurriculum />;
      case 'mocktest':
        return <RegularStudyMocktest />;
      default:
        return <RegularStudyHome />;
    }
  }
  return (
    <itemS.OutsideContainer>
      <itemS.Container>
        <RegularStudySideBar setActiveComponent={setActiveComponent} activeComponent={activeComponent} />
        <itemS.Content>{renderComponent()}</itemS.Content>
      </itemS.Container>
    </itemS.OutsideContainer>
  )
}
