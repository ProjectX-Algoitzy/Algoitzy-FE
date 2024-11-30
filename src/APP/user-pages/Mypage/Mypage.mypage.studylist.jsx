import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as itemS from "./Styled/Mypage.mypage.studylist.styles";

export default function StudyList({ studyList }){

	const navigate = useNavigate();
	
	const moveToDetail = (type, id) => {
		if (type === '정규') {
			navigate(`/regularstudy/${id}`);  
		} else if (type === '자율') {
			navigate(`/study/${id}`); 
		}
	};
	

	// 스터디 제목 글자수 자르기
	const truncateStudyName = (name) => {
		if (name.length > 12) {
			return name.slice(0, 11) + '...';
		}
		return name;
	}

	// createdTime에서 날짜 부분만 추출
	const formatDate = (dateTime) => {
		return dateTime.split('T')[0]; // 'T'를 기준으로 split하여 앞부분(날짜)만 반환
	}

  return (
		<itemS.InnerContainer key={studyList.studyId}>
			<itemS.TopContainer>
				<itemS.TopImg src={studyList.profileUrl} alt='프로필' />
			</itemS.TopContainer>

			<itemS.BottomContainer>
				<itemS.Bottom>
					<itemS.TitleContainer>
						<itemS.Title onClick={() => moveToDetail(studyList.studyType, studyList.studyId)}>
							{truncateStudyName(studyList.studyName)}
						</itemS.Title>
						<itemS.Type>{studyList.studyType}</itemS.Type>
					</itemS.TitleContainer>

					<itemS.BottomHeadCount>
						<itemS.PeopleIcon src='/img/people.png' alt='아이콘'></itemS.PeopleIcon>		
						<itemS.BottomInner>
							{/* <itemS.HeadCount>{studyList.memberCount}</itemS.HeadCount> */}
							<itemS.Total>{studyList.memberCount}명</itemS.Total>
						</itemS.BottomInner>
					</itemS.BottomHeadCount>
					
					<itemS.BottomBottom>
						{studyList.studyType === "자율" ? (
							<itemS.CreatedNameContainer>
								<itemS.ProfileIcon src={studyList.leaderProfileUrl} alt='프로필'></itemS.ProfileIcon>		
								<itemS.CreatedName>{studyList.leaderName}</itemS.CreatedName>
							</itemS.CreatedNameContainer>
						) : (
							<itemS.Blank></itemS.Blank>
						)}
						
						<itemS.CreatedDate>{formatDate(studyList.createdTime)}</itemS.CreatedDate>
					</itemS.BottomBottom>												
				</itemS.Bottom>
			</itemS.BottomContainer>

		</itemS.InnerContainer>
	)
};
