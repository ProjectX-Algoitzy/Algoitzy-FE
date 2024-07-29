import React, { useState, useEffect, useContext } from 'react';
import request from '../../Api/request';
import * as itemS from "./Styled/InstitutionDetail.institutiondetail.main.styles";
import InstitutionDetailTable from './InstitutionDetail.institutiondetail.table';
import InstitutionDetailExplanation from './InstitutionDetail.institutiondetail.explanation';
import { ConfirmContext } from '../../Common/Confirm/ConfirmContext';
import { dummydata } from './dummy';

export default function InstitutionDetailMain() {
  const { confirm } = useContext(ConfirmContext);
  
  const [itemList, setItemList] = useState([]); // 스터디원

  useEffect(() => {
    setItemList(dummydata);
  }, []);
  
  const handleDeleteClick = async () => {
    const confirmed = await confirm('추천 문제집과 함께 삭제되며, 삭제된 정보는 복구할 수 없습니다.\n정말로 삭제하시겠습니까?');
    if (confirmed) {
      console.log('확인');
      //TODO - 삭제 api 넣을 곳
    }
  };

  return (
    <itemS.OuterContainer>
      <itemS.Container>
        <itemS.InnerContainer>
          <itemS.TitleBox>
            <itemS.Title>삼성전자</itemS.Title>
          </itemS.TitleBox>
          <itemS.PartBox>
            <itemS.Part>코딩테스트 분석</itemS.Part>
          </itemS.PartBox>
          <InstitutionDetailExplanation />
          <itemS.PartBox>
            <itemS.Part>추천 문제집</itemS.Part>
          </itemS.PartBox>
          <InstitutionDetailTable itemList={itemList} />
        </itemS.InnerContainer>
      </itemS.Container>
    </itemS.OuterContainer>
  );
}
