import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import request from '../../Api/request';
import * as itemS from "./Styled/WirteBox.styles";
import { AlertContext } from '../../Common/Alert/AlertContext';

export default function WriteBox({ parentId = null, fetchComment, handleLoad }) {
  const { id } = useParams();  // 게시글 ID 가져오기
  const { alert } = useContext(AlertContext);

  const [comment, setComment] = useState('');

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
        if(handleLoad) handleLoad();
      } else {
        console.error("댓글 작성 실패:", response.message);
        // alert('댓글 작성에 실패했습니다.');
      }
    } catch (error) {
      console.error("댓글 작성 오류:", error);
      // alert('댓글 작성 중 오류가 발생했습니다.');
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
        <itemS.SubmitBtn onClick={handleSubmit}>올리기</itemS.SubmitBtn>
      </itemS.WriteBox>
		</itemS.Container>
	);
}
