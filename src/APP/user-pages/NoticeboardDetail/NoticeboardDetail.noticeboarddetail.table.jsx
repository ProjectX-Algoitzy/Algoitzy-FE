import React, { useState, useContext } from 'react';
import * as itemS from "./Styled/NoticeboardDetail.noticeboarddetail.table.styles";
import NoticeboardDetailTuple from './NoticeboardDetail.noticeboarddetail.tuple.jsx';
import request from '../../Api/request';
import { AlertContext } from '../../Common/Alert/AlertContext';

export default function NoticeboardDetailTable({ boardId, commentList, fetchCommentList }) {

  const [content, setContent] = useState('');
  const { alert } = useContext(AlertContext);

  const handleAdd = async () => {
    const requestData = { 
      content: content,
    };

    try {
      const response = await request.post(`/board/${boardId}/comment`, requestData);
      console.log('response', response);

      if (response.isSuccess) {
        alert("댓글 생성이 완료되었습니다!");
        fetchCommentList();
        
      } 
    } catch (error) {
      console.error('댓글 생성에서 에러', error);
      alert("댓글을 입력해주세요.");
    }
  };


  const onChangeContent = (e) => {
    setContent(e.target.value);
  }

  return (
    <itemS.Container>
      <itemS.Table>
        <itemS.CommentContainer>
        <itemS.CommentInput placeholder='댓글을 입력해주세요' type='text' value={content} onChange={onChangeContent} />
          <itemS.CommentButton onClick={handleAdd}>올리기</itemS.CommentButton>
        </itemS.CommentContainer>
        <itemS.TupleContainer>
          {commentList.map(item => (
            <NoticeboardDetailTuple
              key={item.commentId}
              item={item}
            />
          ))}
        </itemS.TupleContainer>
      </itemS.Table>
    </itemS.Container>
  );
}
