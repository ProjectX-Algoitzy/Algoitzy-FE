import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as itemS from "./Styled/Noticeboard.noticeboard.tuple.styles";

export default function NoticeboardTuple({ item }) {
  const navigate = useNavigate();

  const onOpen = (boardId) => {
    navigate(`/boarddetail/${boardId}`);
  };

  return (
    <itemS.TupleContainer>
      <itemS.TupleNumber onClick={() => onOpen(item.boardId)}>{item.boardId}</itemS.TupleNumber>
      <itemS.TupleTitle onClick={() => onOpen(item.boardId)}>{item.title}</itemS.TupleTitle>
      <itemS.TupleView onClick={() => onOpen(item.boardId)}>{item.updatedTime}</itemS.TupleView>
    </itemS.TupleContainer>
  );
}
