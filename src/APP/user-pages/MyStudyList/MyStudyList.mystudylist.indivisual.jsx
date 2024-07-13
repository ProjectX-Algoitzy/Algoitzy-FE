import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as itemS from "../MyStudyList/Styled/MyStudyList.mystudylist.indivisual.styles";


export default function MyStudyListIndividual({ studyList }){

	const navigate = useNavigate();

	
	const moveToDetail = (id) => { // 보기 추가 함수
		navigate(`/study/${id}`);
	}

	// 스터디 제목 글자수 자르기
	const truncateStudyName = (name) => {
		console.log("길이",name.length);
		if (name.length > 12) {
			return name.slice(0, 11) + '...';
		}
		return name;
	}

  return (
    
		<itemS.InnerContainer key={studyList.studyId}>
			<itemS.TopContainer>
				
        <itemS.TopImg src={studyList.profileUrl} alt='프로필'>
					
				</itemS.TopImg>
				
			</itemS.TopContainer>

			<itemS.BottomContainer>
				<itemS.Bottom>
					<itemS.Title onClick={() => moveToDetail(studyList.studyId)}>{truncateStudyName(studyList.studyName)}</itemS.Title>
					<itemS.BottomHeadCount>
						<itemS.PeopleIcon src='/img/people.png' alt='아이콘'></itemS.PeopleIcon>		
						<itemS.BottomInner>
							<itemS.HeadCount>{studyList.memberCount}</itemS.HeadCount>
							<itemS.Total>명</itemS.Total>
						</itemS.BottomInner>
					</itemS.BottomHeadCount>
					
					{/* <itemS.BottomBottom>
						<itemS.CreatedNameContainer>
							<itemS.ProfileIcon></itemS.ProfileIcon>
							<itemS.CreatedName>{studyList.createdName}</itemS.CreatedName>
						</itemS.CreatedNameContainer>
						<itemS.CreatedDate>{studyList.createdTime}</itemS.CreatedDate>
					</itemS.BottomBottom>												 */}
				</itemS.Bottom>
			</itemS.BottomContainer>

		</itemS.InnerContainer>
	)
    
};


