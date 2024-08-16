import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as itemS from "./Styled/Noticeboard.noticeboard.tuple.styles";

export default function NoticeboardTuple({ item }) {
  const navigate = useNavigate();

  const onOpen = (boardId, name) => {
    navigate(`/boarddetail/${boardId}`, { state: { name } });
  };

  return (
    <itemS.TupleContainer>
      <itemS.TupleNumber onClick={() => onOpen(item.boardId, item.name)}>{item.boardId}</itemS.TupleNumber>
      <itemS.TupleName onClick={() => onOpen(item.boardId, item.name)}>{item.name}</itemS.TupleName>
      <itemS.TupleView onClick={() => onOpen(item.boardId, item.name)}>{item.viewCount}</itemS.TupleView>
    </itemS.TupleContainer>
  );
}
