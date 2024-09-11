import React, { useEffect, useState } from 'react';
import * as itemS from "./Styled/Mypage.mypage.myinfo.styles";

export default function MyInfo({ item }) {
  // const [myStudyList, setMyStudyList] = useState([]);
  // const [applyStudyList, setApplyStudyList] = useState([]);
  // const [myInfoData, setMyInfoData] = useState([]);

  // useEffect(() => {
  //   setMyStudyList(mystudydata);
  //   setApplyStudyList(applystudydata);
  //   setMyInfoData(myinfodata);
  // }, []);

  return (
    <itemS.Container>
      <itemS.ProfileBox>
        <itemS.Profile src='/img/close.png' alt='프로필'/>
        <itemS.NameBox>
          <itemS.Name>{item.name}민중원</itemS.Name>
          <itemS.Handle>{item.handle}킹갓제너럴GTA</itemS.Handle>
        </itemS.NameBox>
      </itemS.ProfileBox>
      <itemS.EditButton>
        내 정보 수정
      </itemS.EditButton>
      
    </itemS.Container>
  );
}
