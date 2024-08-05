import React, { useState } from 'react';
import * as itemS from "./Styled/WorkbookDetail.workbookdetail.toptuple.styles";
import request from "../../Api/request";


export default function TopTuple({ item }) {

  const handleRedirect = () => {
    window.location.href = item.baekjoonUrl;
  };

  return (
    <itemS.Container>
      <itemS.Tuple>
        <itemS.TupleNumber onClick={handleRedirect}>{item.number}</itemS.TupleNumber>
        <itemS.TupleTitle onClick={handleRedirect}>{item.name}</itemS.TupleTitle>
        <itemS.TupleLevel>
          <itemS.Level src={item.levelUrl} alt='레벨' onClick={handleRedirect}/>
        </itemS.TupleLevel>
        
      </itemS.Tuple>
    </itemS.Container>
  );
}


