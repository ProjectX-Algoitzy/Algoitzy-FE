import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as itemS from "./Styled/MakedSelfStudyList.makedselfstudylist.indivisual.styles";

export default function MakedSelfStudyListIndividual({ studyList }){ 
	const navigate = useNavigate();
	const moveToDetail = (id) => { // 보기 추가 함수
		navigate(`/study/${id}`);
	}
	// 스터디 제목 글자수 자르기
	const truncateStudyName = (name) => {
		// console.log("길이",name.length);
		if (name.length > 12) {
			return name.slice(0, 11) + '...';
		}
		return name;
	}

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}.${month}.${day}`;
	}
	  

  return (
	<itemS.InnerContainer key={studyList.studyId}>
		<itemS.TopContainer>
			<itemS.TopImg src={studyList.profileUrl} alt='스터디 프로필'/>			
		</itemS.TopContainer>

		<itemS.BottomContainer>
			<itemS.Bottom>
				<itemS.Title onClick={() => moveToDetail(studyList.studyId)}>{truncateStudyName(studyList.studyName)}</itemS.Title>
				<itemS.BottomHeadCount>
					<itemS.PeopleIcon />
					<itemS.BottomInner>
						<itemS.HeadCount>{studyList.memberCount}명</itemS.HeadCount>
					</itemS.BottomInner>
				</itemS.BottomHeadCount>
				
				<itemS.BottomBottom>
					<itemS.CreatedNameContainer>
						<itemS.ProfileIcon src={studyList.leaderProfileUrl} alt='스터디장 프로필' />
						<itemS.CreatedName>{studyList.leaderName}</itemS.CreatedName>
					</itemS.CreatedNameContainer>
					<itemS.CreatedDate>{formatDate(studyList.createdTime)}</itemS.CreatedDate>
				</itemS.BottomBottom>												
			</itemS.Bottom>
		</itemS.BottomContainer>
	</itemS.InnerContainer>
	)
};