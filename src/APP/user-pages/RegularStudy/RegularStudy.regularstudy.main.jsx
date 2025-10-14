import React, { useEffect, useState } from 'react';
import * as itemS from './Styled/RegularStudy.regularstudy.main.styles';
import RegularStudySideBar from './RegularStudy.regularstudy.sidebar';
import RegularStudyHome from './RegularStudy.regularstudy.home';
import RegularStudyAttendance from './RegularStudy.regularstudy.attendance';
import RegularStudyCurriculum from './RegularStudy.regularstudy.curriculum';
import RegularStudyMocktest from './RegularStudy.regularstudy.mocktest';
import { useParams } from 'react-router-dom';
import request from '../../Api/request';

export default function RegularStudyMain() {
  const { id } = useParams(); // 정규스터디 ID 가져오기
  const [regularStudyInfo, setRegularStudyInfo] = useState(null);

  const fetchRegularStudyInfo = async () => {
    try {
      const response = await request.get(`study/${id}/info`);
      // console.log('정규 스터디 조회 정보: ', response);
      if (response['isSuccess']) {
        setRegularStudyInfo(response.result);
      } else {
        console.error('정규 스터디 조회 실패:', response);
      }
    } catch (err) {
      console.error('정규스터디 정보 조회 오류', err);
    }
  };

  const getInitialComponent = () => {
    const savedComponent = localStorage.getItem(`activeComponent_${id}`);
    return savedComponent || 'home';
  };

  const [activeComponent, setActiveComponent] = useState(getInitialComponent);

  useEffect(() => {
    fetchRegularStudyInfo();
    localStorage.setItem(`activeComponent_${id}`, activeComponent);
  }, [activeComponent, id]);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'home':
        return <RegularStudyHome />;
      case 'attendance':
        return (
          <RegularStudyAttendance
            memberRole={regularStudyInfo.memberRole}
            endYn={regularStudyInfo.endYn}
          />
        );
      case 'curriculum':
        return <RegularStudyCurriculum />;
      case 'mocktest':
        return <RegularStudyMocktest />;
      default:
        return <RegularStudyHome />;
    }
  };

  if (!regularStudyInfo) {
    return <div>Loading regular study info...</div>;
  }

  return (
    <itemS.OutsideContainer>
      <itemS.Container>
        <RegularStudySideBar
          setActiveComponent={setActiveComponent}
          activeComponent={activeComponent}
          regularStudyInfo={regularStudyInfo}
        />
        <itemS.Content>{renderComponent()}</itemS.Content>
      </itemS.Container>
    </itemS.OutsideContainer>
  );
}
