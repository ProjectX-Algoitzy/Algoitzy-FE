import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as itemS from "./Styled/Mypage.mypage.myinfo.styles";

export default function MyInfo({ item }) {

  const navigate = useNavigate();
  const GIHO = '/<>  ';
  // const [myStudyList, setMyStudyList] = useState([]);
  // const [applyStudyList, setApplyStudyList] = useState([]);
  // const [myInfoData, setMyInfoData] = useState([]);

  // useEffect(() => {
  //   setMyStudyList(mystudydata);
  //   setApplyStudyList(applystudydata);
  //   setMyInfoData(myinfodata);
  // }, []);

  const handleRedirect = () => {
    // console.log('item.baekjoonUrl',item.baekjoonUrl);
    window.location.href = item.baekjoonUrl;
  };

  const handleMyInfo = () => {
    
    navigate('/myinfo');
  };

  return (
    <itemS.Container>
      <itemS.ProfileBox>
        <itemS.Profile src={item.profileUrl} alt='프로필'/>
        <itemS.NameBox>
          <itemS.Name>{item.name}</itemS.Name>
          <itemS.Handle onClick={handleRedirect}>{GIHO}{item.handle}</itemS.Handle>
        </itemS.NameBox>
      </itemS.ProfileBox>
      <itemS.EditButton onClick={handleMyInfo}>내 정보 수정</itemS.EditButton>
      
    </itemS.Container>
  );
}
