import React, { useState, useRef, useEffect, useContext } from 'react';
import * as itemS from "./Styled/BoardDetail.boarddetail.reply.styles";
import WriteBox from './WriteBox';
import request from '../../Api/request';
import { ConfirmContext } from '../../Common/Confirm/ConfirmContext';

export default function Reply({ item, parentName, formatDate, fetchComment }) {
  const { confirm } = useContext(ConfirmContext);
  const modalRef = useRef(null); 

	const [isReplyBoxVisible, setIsReplyBoxVisible] = useState(false);
  const [isUtilBoxVisible, setIsUtilBoxVisible] = useState(false);
	const [likeStatus, setLikeStatus] = useState(item.myLikeYn);


  const handleReplyClick = () => {
    setIsReplyBoxVisible(!isReplyBoxVisible);
  };

  const handleDotClick = () => {
    setIsUtilBoxVisible(!isUtilBoxVisible); // DotBox 클릭 시 토글
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsUtilBoxVisible(false); // 외부 클릭 시 UtilBox 닫기
    }
  };

  // 댓글 좋아요 토글
  const toggleLike = async () => {
    try {
      const response = await request.put(`/reply/${item.replyId}/like`); // 좋아요 API 호출
      
      if (response.isSuccess) {
        console.log("좋아요 토글 성공", response);
        setLikeStatus(!likeStatus); // 상태 업데이트
        fetchComment();
      } else {
        console.error("좋아요 토글 실패:", response);
      }
    } catch (error) {
      console.error("Error liking the reply:", error);
    }
  };

  // 댓글 삭제
  const handleDelete = async () => {
    const confirmed = await confirm("정말로 삭제하시겠습니까?");
    
    if (confirmed) { 
      try {
        const response = await request.delete(`/reply/${item.replyId}`); 
  
        if (response.isSuccess) {
          console.log("댓글 삭제 성공", response);
          fetchComment();
        } else {
          console.error("댓글 삭제 실패:", response.message);
        }
      } catch (error) {
        console.error("댓글 삭제 오류:", error);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

	return (
    <itemS.Container>
      <itemS.WriteContainer>
        <itemS.CommentContainer>
          <itemS.CommentProfile src={item.profileUrl} alt='프로필' />
          <itemS.CommentBox>
            <itemS.WriterBox>
              <itemS.WriterName>{item.createdName}</itemS.WriterName>
              <itemS.DotBox ref={modalRef} onClick={handleDotClick}>
                <itemS.DotButton src='/img/hamberg.svg' alt='...' />
                {isUtilBoxVisible && ( // isUtilBoxVisible 상태에 따라 표시
                  <itemS.UtilButtonBox>
                    <itemS.UtilBox>
                      <itemS.UtilIcon src='/img/edit.svg' alt='수정' />
                      <itemS.UtilText>수정하기</itemS.UtilText>
                    </itemS.UtilBox>
                    <itemS.Hr></itemS.Hr>
                    <itemS.UtilBox onClick={handleDelete}>
                      <itemS.UtilIcon src='/img/trash.svg' alt='쓰레기통' />
                      <itemS.UtilText>삭제하기</itemS.UtilText>
                    </itemS.UtilBox>
                  </itemS.UtilButtonBox>
                )}
              </itemS.DotBox>
            </itemS.WriterBox>
            {/* <itemS.ContentBox> */}
              
            <itemS.Content><itemS.Mention>@{parentName} </itemS.Mention>{item.content}</itemS.Content>
            {/* </itemS.ContentBox> */}
            <itemS.InfoBottomBox>
              <itemS.CreatedTime>{formatDate(item.createdTime)}</itemS.CreatedTime>
              <itemS.Reply onClick={handleReplyClick}>답글 달기</itemS.Reply>
              <itemS.CommentLike
                src={item.myLikeYn ? '/img/like-s-fill.svg' : '/img/like-s.svg'}
                alt='하뚜'
                onClick={toggleLike}
              />
            </itemS.InfoBottomBox>
          </itemS.CommentBox>
        </itemS.CommentContainer>

        {isReplyBoxVisible && (
          <itemS.WriteBox>
            <itemS.Blank></itemS.Blank>
            <WriteBox
              parentId={item.replyId}
              fetchComment={fetchComment} 
              handleLoad={handleReplyClick}
            />
          </itemS.WriteBox>
        )}

        {item.childrenReplyList.length > 0 &&
          item.childrenReplyList.map((reply) => (
            <Reply
              key={reply.replyId}
              item={reply}
              parentName={item.createdName} // Pass the current reply's profile as parentProfile for child replies
              formatDate={formatDate}
              fetchComment={fetchComment}
            />
          ))}
      </itemS.WriteContainer>
    </itemS.Container>
  );
}
