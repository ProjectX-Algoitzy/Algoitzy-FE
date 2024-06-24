import React, { useEffect, useState } from 'react';
import * as itemS from "./Styled/Header.header.styles";
import request from '../../Api/request';
import ProfileModal from './Header.profile.modal';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // 로그인 유무를 확인하고자는 하는 useState
  const [userName, setUserName] = useState('');
  const [showProfileModal, setShowProfileModal] = useState(false); // ProfileModal 표시 여부 상태

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await request.get('/member/info');
        console.log("로그인 멤버 정보 조회", response);
        if(response["isSuccess"]) {
          setUserName(response.result.name);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("로그인 멤버 정보 조회 실패", error);
      }
    };
    checkLoginStatus();
  }, []);

  const toggleProfileModal = () => {
    setShowProfileModal(prev => !prev); // ProfileModal 표시 여부 토글
  };

  return (
    <itemS.HeaderContainer>
      <itemS.HeaderWrap>
        <itemS.HeaderLeftWrap>
          <itemS.StyledLink to="/" style={{textDecoration: 'none'}}><itemS.Rabel src='/img/koalalogo.png' alt='코알라로고'/></itemS.StyledLink>
        </itemS.HeaderLeftWrap>
        <itemS.HeaderRightWrap>
          <itemS.StyledLink to={isLoggedIn ? "#" : "/login"}>
            <itemS.PageLink>지원자 관리</itemS.PageLink>
          </itemS.StyledLink>
          <itemS.StyledLink to={isLoggedIn ? "#" : "/login"}> 
            <itemS.PageLink>스터디 관리</itemS.PageLink>
          </itemS.StyledLink>  
          <itemS.StyledLink to={isLoggedIn ? "#" : "/login"}>
            <itemS.PageLink>코딩테스트 분석</itemS.PageLink>
          </itemS.StyledLink>
          {isLoggedIn ? (
            <div style={{ position: 'relative' }}>
              <itemS.AdminName onClick={toggleProfileModal}>안녕하세요, {userName} 님</itemS.AdminName>
              {showProfileModal && <ProfileModal userName={userName} setIsLoggedIn={setIsLoggedIn}/>}
            </div>
          ) : (
            <itemS.StyledLink to="/login">
              <itemS.Btn>로그인/회원가입</itemS.Btn>
            </itemS.StyledLink>
          )}
        </itemS.HeaderRightWrap>
      </itemS.HeaderWrap>
    </itemS.HeaderContainer>
  );
}