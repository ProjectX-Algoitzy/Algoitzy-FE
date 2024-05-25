import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as itemS from "../../user-pages/MakedSelfStudyList/Styled/MakedSelfStudyList.makedselfstudylist.group.styles";


export default function MakedSelfStudyListIndividual({ application, setCntApp }){

	const navigate = useNavigate();

	
	const moveToDetail = (id) => { // 보기 추가 함수
		navigate(`/makedapplicationdetail/${id}`);
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
    
		<itemS.InnerContainer key={application.applicationId}>
			<itemS.TopContainer>
				
				<itemS.TopImg>
					
				</itemS.TopImg>
				
			</itemS.TopContainer>

			<itemS.BottomContainer>
				<itemS.Bottom>
					<itemS.Title onClick={() => moveToDetail(application.applicationId)}>{truncateStudyName(application.title)}</itemS.Title>
					<itemS.BottomHeadCount>
						<itemS.PeopleIcon></itemS.PeopleIcon>		
						<itemS.BottomInner>
							<itemS.HeadCount>1</itemS.HeadCount>
							<itemS.Total>/10</itemS.Total>
						</itemS.BottomInner>
					</itemS.BottomHeadCount>
					<itemS.BottomLocationIcon>
						<itemS.LocationIcon></itemS.LocationIcon>	
						<itemS.LocationText>온라인</itemS.LocationText>	
					</itemS.BottomLocationIcon>
					<itemS.BottomBottom>
						<itemS.CreatedNameContainer>
							<itemS.ProfileIcon></itemS.ProfileIcon>
							<itemS.CreatedName>{application.createdName}</itemS.CreatedName>
						</itemS.CreatedNameContainer>
						<itemS.CreatedDate>{application.createdTime}</itemS.CreatedDate>
					</itemS.BottomBottom>												
				</itemS.Bottom>
			</itemS.BottomContainer>

		</itemS.InnerContainer>
	)
    
};


