import React, { useState, useEffect } from 'react';
import * as itemS from "./Styled/NoticeboardDetail.noticeboarddetail.tuple.styles";
// import request from "../../Api/request";
// import WorkbookDetail from '../WorkbookDetail/WorkbookDetail.workbookdetail.main';


export default function NoticeboardDetailTuple({ item }) {

  
  return (
    <div>
      <itemS.TupleContainer>
        <itemS.TupleName>{item.createdName}</itemS.TupleName>
        <itemS.TupleContent>{item.content}</itemS.TupleContent>
      </itemS.TupleContainer>
    </div>
  );
}
