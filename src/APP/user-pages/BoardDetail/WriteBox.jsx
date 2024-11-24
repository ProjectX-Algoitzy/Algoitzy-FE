import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import request from '../../Api/request';
import * as itemS from "./Styled/WirteBox.styles";
import { AlertContext } from '../../Common/Alert/AlertContext';

export default function WriteBox({ parentId = null, isEditing = false, fetchComment, handleLoad, editContent = '' }) {
  const { id } = useParams();
  const { alert } = useContext(AlertContext);

  const [comment, setComment] = useState(editContent);

  const handleSubmit = async () => {
    if (!comment.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    const queryParams = new URLSearchParams({
      boardId: id,
      content: comment,
    });

    if (parentId !== null) {
      queryParams.append('parentId', parentId);
    }

    try {
      const response = await request.post(`/reply?${queryParams.toString()}`);

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

  const handleEdit = async () => {
    if (!comment.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    const queryParams = new URLSearchParams({
      content: comment,
    });

    try {
      const response = await request.patch(`/reply/${parentId}?${queryParams.toString()}`);

      if (response.isSuccess) {
        console.log("댓글 수정 성공", response);
        // setComment('');
        fetchComment();
        if (handleLoad) handleLoad();
      } else {
        console.error("댓글 수정 실패:", response.message);
      }
    } catch (error) {
      console.error("댓글 수정 오류:", error);
    }
  };

  return (
    <itemS.Container>
      <itemS.WriteBox>
        <itemS.InputBox
          type="text"
          placeholder="댓글을 남겨보세요."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <itemS.SubmitBtn onClick={isEditing ? handleEdit : handleSubmit}>올리기</itemS.SubmitBtn>
      </itemS.WriteBox>
    </itemS.Container>
  );
}

