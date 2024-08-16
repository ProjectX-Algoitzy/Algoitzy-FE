import React, { useState } from 'react';
import * as itemS from "./Styled/Noticeboard.noticeboard.table.styles";
import NoticeboardTuple from './Noticeboard.noticeboard.tuple';

export default function NoticeboardTable({ boardList }) {
   
    
  return (
    <itemS.Container>
      <itemS.Table>
        <itemS.CategoryContainer>
          
          <itemS.CategoryNumber>번호</itemS.CategoryNumber>
          <itemS.CategoryTitle>제목</itemS.CategoryTitle>
          <itemS.CategoryDate>최종 수정일</itemS.CategoryDate>
          
        </itemS.CategoryContainer>
        <itemS.TupleContainer>
          {boardList.map(item => (
            <NoticeboardTuple
              key={item.boardId}
              item={item}
                
            />
          ))}
        </itemS.TupleContainer>
      </itemS.Table>
    </itemS.Container>
  );
}