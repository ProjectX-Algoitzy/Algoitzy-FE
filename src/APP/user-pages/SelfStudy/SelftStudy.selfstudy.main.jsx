import React, { useContext, useEffect, useState } from 'react';
import * as itemS from "./Styled/SelftStudy.selfstudy.main.styles";
import SelftStudySidebar from './SelftStudy.selftstudy.sidebar';
import SelftStudyHome from './SelftStudy.selftstudy.home';
import SelfStudyMemberList from './SelfStudy.selfstudy.memberlist';
import { AlertContext } from '../../Common/Alert/AlertContext';
import { useNavigate, useParams } from 'react-router-dom';
import request from '../../Api/request';

export default function SelftStudyMain() {
  const { id } = useParams();  // 정규스터디 ID 가져오기
  const navigate = useNavigate();
  const [selfStudyInfo, setSelfStudyInfo] = useState(null);
  const [selftStudyContent, setSelftStudyContent] = useState(null);
  const { alert } = useContext(AlertContext);

  useEffect(() => {
    const fetchSelfStudyInfo = async () => {
      try {
        const response = await request.get(`study/${id}`);
        console.log("자율 스터디 사이드 바 조회 정보: ", response);
        if (response["isSuccess"]) {
          setSelfStudyInfo(response.result);
          setSelftStudyContent(response.result.content);

          if(response.result.endYN) {
            if (response.result.memberRole === null) {
              await alert("권한이 없습니다.");
              navigate(-1); // 이전 페이지로 이동
              return; // 함수 종료
            }
          }
        }
      } catch (err) {
        console.error("자율스터디 정보 조회 오류", err);
      }
    };
    fetchSelfStudyInfo();
  }, [id]);

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
        return <SelftStudyHome selftStudyContent={selftStudyContent} setSelftStudyContent={setSelftStudyContent} />;
      case 'memberlist':
        return <SelfStudyMemberList />;
      default:
        return <SelftStudyHome selftStudyContent={selftStudyContent} setSelftStudyContent={setSelftStudyContent} />;
    }
  }

  return (
    <itemS.Container>
      <SelftStudySidebar selfStudyInfo={selfStudyInfo} setActiveComponent={setActiveComponent} activeComponent={activeComponent} />
      <itemS.Content>{renderComponent()}</itemS.Content>
    </itemS.Container>
  )
}
