import React, { useState } from 'react';
// import { useRecoilState } from 'recoil';
// import { IsOpenModal } from '../Recoil/Recoil.state';
import * as itemS from "./Styled/NoticeboardDetail.noticeboarddetail.table.styles.js";
import NoticeboardDetailTuple from './NoticeboardDetail.noticeboarddetail.tuple.jsx';

export default function NoticeboardDetailTable({ itemList, fetchWorkbook }) {

  const [name, setName] = useState('');

  const onChangeName = (e) => {
    setName(e.target.value);
  }

  return (
    <itemS.Container>
      <itemS.Table>
        <itemS.CommentContainer>
        <itemS.CommentInput placeholder='댓글을 입력해주세요' type='text' value={name} onChange={onChangeName} />
          <itemS.CommentButton>올리기</itemS.CommentButton>
        </itemS.CommentContainer>
        <itemS.TupleContainer>
          {itemList.map(item => (
            <NoticeboardDetailTuple
              key={item.workbookId}
              item={item}
              fetchWorkbook={fetchWorkbook}
            />
          ))}
        </itemS.TupleContainer>
      </itemS.Table>
    </itemS.Container>
  );
}
