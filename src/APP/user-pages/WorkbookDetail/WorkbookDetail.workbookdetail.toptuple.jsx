import React, { useState } from 'react';
import * as itemS from "./Styled/WorkbookDetail.workbookdetail.toptuple.styles";
import request from "../../Api/request";


export default function TopTuple({ item }) {

  const handleRedirect = () => {
    // console.log('item.baekjoonUrl',item.baekjoonUrl);
    window.location.href = item.baekjoonUrl;
  };

  return (
    <itemS.Container>
      <itemS.Tuple onClick={handleRedirect}>
        <itemS.TupleNumber>{item.number}</itemS.TupleNumber>
        <itemS.TupleTitle>{item.name}</itemS.TupleTitle>
        <itemS.TupleLevel>
          <itemS.Level src={item.levelUrl} alt='레벨'/>
        </itemS.TupleLevel>
        
      </itemS.Tuple>
    </itemS.Container>
  );
}


