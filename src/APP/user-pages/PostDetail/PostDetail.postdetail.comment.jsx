import React, { useState, useEffect, useContext } from 'react';
import request from '../../Api/request';
import * as itemS from "./Styled/PostDetail.postdetail.comment.styles";

export default function Comment({ item }) {
	


	return (
		<itemS.Container>
			<itemS.WriteContainer>
				<itemS.CommentProfile src='img/people.png' alt='프로필' />
				<itemS.CommentBox>		
					<itemS.WriterBox>
						<itemS.WriterName>{item.name}</itemS.WriterName>
					</itemS.WriterBox>			
					<itemS.Content>{item.content}</itemS.Content>
					<itemS.InfoBottomBox>
						<itemS.CreatedTime>{item.createdTime}</itemS.CreatedTime>
						<itemS.CoComment>답글 달기</itemS.CoComment>
						<itemS.CommentLike src={item.like ? 'img/like-s-fill.svg' : 'img/like-s.svg'} alt='하뚜' />
					</itemS.InfoBottomBox>
				</itemS.CommentBox>
			</itemS.WriteContainer>
		</itemS.Container>
	);
}
