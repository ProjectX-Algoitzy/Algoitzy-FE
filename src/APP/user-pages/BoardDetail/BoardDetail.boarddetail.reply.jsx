import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as itemS from "./Styled/BoardDetail.boarddetail.reply.styles";
import WriteBox from './WriteBox';
import request from '../../Api/request';
import { ConfirmContext } from '../../Common/Confirm/ConfirmContext';

export default function Reply({ item, parentName, formatDate, fetchComment }) {
  const { confirm } = useContext(ConfirmContext);
  const modalRef = useRef(null); 
  const navigate = useNavigate();

	const [isReplyBoxVisible, setIsReplyBoxVisible] = useState(false);
  const [isUtilBoxVisible, setIsUtilBoxVisible] = useState(false);
	const [likeStatus, setLikeStatus] = useState(item.myLikeYn);
  const [isEditing, setIsEditing] = useState(false); 
  const [editContent, setEditContent] = useState('');


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

  const handleEditClick = () => {
    setEditContent(item.content); 
    setIsEditing(true); 
  };

  const handleEditComplete = () => {
    setIsEditing(false); 
    fetchComment(); 
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
    const confirmed = await confirm("정말 삭제하시겠습니까?");
    
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

  // 계정 링크 이동
	const handlePage = (handle) => {
    navigate(`/mypage/${handle}`);
  };

	return (
    <itemS.Container>
      <itemS.WriteContainer>
        <itemS.CommentContainer>
          <itemS.CommentProfile onClick={() => handlePage(item.handle)} src={item.profileUrl} alt='프로필' />
          {isEditing ? (
            <WriteBox
              parentId={item.replyId}
              fetchComment={fetchComment}
              handleLoad={handleEditComplete}
              isEditing={true} // 수정 여부 전달
              editContent={editContent} // 수정할 초기 내용 전달
              replyId={item.replyId} // 수정 대상 댓글 ID 전달
            />
          ) : (
            <itemS.CommentBox>
              <itemS.WriterBox>
                <itemS.WriterNameBox>
                  <itemS.WriterName onClick={() => handlePage(item.handle)}>{item.createdName}</itemS.WriterName>
                  {item.myBoardYn && <itemS.WriterIcon>작성자</itemS.WriterIcon>}
                </itemS.WriterNameBox>
                {item.myReplyYn && ( // item.myBoardYn이 true일 때만 DotBox 렌더링
                  <itemS.DotBox ref={modalRef} onClick={handleDotClick}>
                    <itemS.DotButton src='/img/hamberg.svg' alt='...' />
                    {isUtilBoxVisible && ( // isUtilBoxVisible 상태에 따라 표시
                      <itemS.UtilButtonBox>
                        <itemS.UtilBox onClick={handleEditClick}>
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
                )}
              </itemS.WriterBox>
              {item.deleteYn || item.deleteByAdminYn ? (
                <itemS.ContentBox>
                  <itemS.DeletedIcon src='/img/deleted_icon_black.svg' alt='삭제된 글' />
                  <itemS.Content deleteYn={item.deleteYn || item.deleteByAdminYn}>{item.deleteYn ? '작성자에 의해 삭제된 댓글 입니다.' : '관리자에 의해 삭제된 댓글 입니다.'}</itemS.Content>
                </itemS.ContentBox>
              ) : (
                <itemS.ContentBox>
                  <itemS.Content deleteYn={item.deleteYn || item.deleteByAdminYn}><itemS.Mention>@{parentName} </itemS.Mention>{item.content}</itemS.Content>
                </itemS.ContentBox>
              )}
              <itemS.InfoBottomBox>
                <itemS.CreatedTime>{formatDate(item.createdTime)}</itemS.CreatedTime>
                <itemS.Reply onClick={handleReplyClick}>답글 달기</itemS.Reply>
                <itemS.CommentLike
                  src={item.myLikeYn ? '/img/like-s-fill.svg' : '/img/like-s.svg'}
                  alt='하뚜'
                  onClick={toggleLike} // 클릭 시 좋아요 토글
                />
              </itemS.InfoBottomBox>
            </itemS.CommentBox>
          )}
        </itemS.CommentContainer>

        {isReplyBoxVisible && (
          <itemS.WriteBox>
            <itemS.Blank></itemS.Blank>
            <WriteBox
              parentId={item.replyId}
              fetchComment={fetchComment} 
              handleLoad={handleReplyClick}
              isEditing={false} // 수정 여부 전달
              editContent={editContent} // 수정할 초기 내용 전달
              replyId={item.replyId} // 수정 대상 댓글 ID 전달
            />
          </itemS.WriteBox>
        )}

        {item.childrenReplyList.length > 0 &&
          item.childrenReplyList.map((reply) => (
            <Reply
              key={reply.replyId}
              item={reply}
              parentName={item.createdName} 
              formatDate={formatDate}
              fetchComment={fetchComment}
            />
          ))}
      </itemS.WriteContainer>
    </itemS.Container>
  );
}
