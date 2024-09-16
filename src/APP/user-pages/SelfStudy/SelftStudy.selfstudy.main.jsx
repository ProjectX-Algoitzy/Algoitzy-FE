import React, { useEffect, useState } from 'react';
import * as itemS from "./Styled/SelftStudy.selfstudy.main.styles";
import SelftStudySidebar from './SelftStudy.selftstudy.sidebar';
import SelftStudyHome from './SelftStudy.selftstudy.home';
import SelfStudyMemberList from './SelfStudy.selfstudy.memberlist';
import { useParams } from 'react-router-dom';

export default function SelftStudyMain() {
  const { id } = useParams();  // 정규스터디 ID 가져오기

  const getInitialComponent = () => {
    const savedComponent = localStorage.getItem(`activeComponent_${id}`);
    return savedComponent || 'home';
  };

  const [activeComponent, setActiveComponent] = useState(getInitialComponent);
  const [isEditing, setIsEditing] = useState(false);  // isEditing 상태 추가

  useEffect(() => {
    localStorage.setItem(`activeComponent_${id}`, activeComponent);
  }, [activeComponent, id]);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'home': 
        return <SelftStudyHome isEditing={isEditing} />;
      case 'memberlist':
        return <SelfStudyMemberList />;
      default:
        return <SelftStudyHome isEditing={isEditing} />;
    }
  }

  return (
    <itemS.Container>
      <SelftStudySidebar setActiveComponent={setActiveComponent} activeComponent={activeComponent} setIsEditing={setIsEditing} />
      <itemS.Content>{renderComponent()}</itemS.Content>
    </itemS.Container>
  )
}
