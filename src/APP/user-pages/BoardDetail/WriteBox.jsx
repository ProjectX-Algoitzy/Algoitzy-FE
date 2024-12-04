import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import request from '../../Api/request';
import * as itemS from "./Styled/WirteBox.styles";
import { AlertContext } from '../../Common/Alert/AlertContext';

export default function WriteBox({ parentId = null, fetchComment, handleLoad }) {
  const { id } = useParams();
  const { alert } = useContext(AlertContext);

  const [comment, setComment] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length > 500) {
      alert('댓글은 최대 500자까지 입력할 수 있습니다.');
      return;
    }
    setComment(value);
  };

  const handleSubmit = async () => {
    if (!comment.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    const requestBody = {
      boardId: id,
      content: comment,
    };

    if (parentId !== null) {
      requestBody.parentId = parentId;
    }

    try {
      const response = await request.post('/reply', requestBody);

      if (response.isSuccess) {
        console.log("댓글 작성 성공", response);
        setComment('');
        fetchComment();
        if (handleLoad) handleLoad();
      } else {
        console.error("댓글 작성 실패:", response.message);
      }
    } catch (error) {
      console.error("댓글 작성 오류:", error);
    }
  };

  return (
    <itemS.Container>
      <itemS.WriteBox>
        <itemS.InputBox
          type="text"
          placeholder="댓글을 남겨보세요."
          value={comment}
          onChange={handleChange}
        />
        <itemS.TextCount>{`${comment.length}/500`}</itemS.TextCount>
        <itemS.SubmitBtn onClick={handleSubmit}>올리기</itemS.SubmitBtn>
      </itemS.WriteBox>
    </itemS.Container>
  );
}

