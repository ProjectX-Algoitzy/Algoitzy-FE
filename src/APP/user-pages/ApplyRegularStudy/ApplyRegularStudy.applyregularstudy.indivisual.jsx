import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as itemS from "../ApplyRegularStudy/Styled/ApplyRegularStudy.applyregularstudy.indivisual.styles";


export default function ApplyRegularStudyIndividual({ studyList }){

	const navigate = useNavigate();

	
	const moveToWritingApplication = (id) => { // 지원 하러 가기
		// navigate(`/writingapplication/${id}`);
		navigate(`/regularstudy/${id}`);
	}

	// 스터디 제목 글자수 자르기
	const truncateStudyName = (name) => {
		if (name.length > 12) {
			return name.slice(0, 11) + '...';
		}
		return name;
	}

  return (
    
		<itemS.Container key={studyList.studyId}>		
        <itemS.TopImg src={studyList.profileUrl} alt='프로필' />
	
        <itemS.Title>{truncateStudyName(studyList.studyName)}</itemS.Title>
        <itemS.Detail onClick={() => moveToWritingApplication(studyList.studyId)}>스터디 상세 보기 &gt;</itemS.Detail>
        {/* <itemS.Apply>지원하기</itemS.Apply> */}
        


		</itemS.Container>
	)
    
};


