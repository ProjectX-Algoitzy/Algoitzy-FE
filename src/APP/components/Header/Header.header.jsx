import React, { useEffect, useRef, useState } from 'react';
import * as itemS from "./Styled/Header.header.styles";
import request from '../../Api/request';
import ProfileModal from './Header.profile.modal';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState('');

  // Refs for detecting clicks outside
  const modalRef = useRef(null); 
  const studyMenuRef = useRef(null);
  const codingMenuRef = useRef(null);

  // Fetch login status on component mount
  const checkLoginStatus = async () => {
    try {
      const response = await request.get('/member/info');
      console.log("로그인 멤버 정보 조회", response);
      if (response["isSuccess"]) {
        setUserName(response.result.name);
        setProfileUrl(response.result.profileUrl);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("로그인 멤버 정보 조회 실패", error);
    }
  };
  useEffect(() => {

    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      checkLoginStatus();
    }
  });

  // Toggle Profile Modal
  const toggleProfileModal = () => {
    setShowProfileModal(prev => !prev);
  };

  // Handle Menu Clicks
  const handleMenuClick = (menu) => {
    setActiveMenu((prev) => (prev === menu ? '' : menu));
  };

  // Handle Navigation and Close Menus
  const handleNav = () => {
    setActiveMenu('');
  };

  // Click Outside Handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is inside Profile Modal
      const clickedInsideProfile = modalRef.current && modalRef.current.contains(event.target);

      // Check if click is inside any open submenu
      let clickedInsideMenu = false;
      if (activeMenu === 'study') {
        clickedInsideMenu = studyMenuRef.current && studyMenuRef.current.contains(event.target);
      } else if (activeMenu === 'coding') {
        clickedInsideMenu = codingMenuRef.current && codingMenuRef.current.contains(event.target);
      }

      // If click is outside both Profile Modal and any open submenu, close them
      if (!clickedInsideProfile && !clickedInsideMenu) {
        setShowProfileModal(false);
        setActiveMenu('');
      }
    };

    // Attach the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileModal, activeMenu]);

  return (
    <>
      <itemS.HeaderContainer>
        <itemS.HeaderWrap>
          <itemS.HeaderLeftWrap>
            <itemS.StyledLink to="/" style={{ textDecoration: 'none' }}>
              <itemS.Rabel src='/img/koalalogo.png' alt='코알라로고' />
            </itemS.StyledLink>
          </itemS.HeaderLeftWrap>
          <itemS.HeaderRightWrap>
            <itemS.StyledLink to={isLoggedIn ? "/mystudy" : "/login"}>
              <itemS.PageLink>나의 스터디</itemS.PageLink>
            </itemS.StyledLink>
            <itemS.StyledLink onClick={() => handleMenuClick('study')}>
              <itemS.PageLink>스터디</itemS.PageLink>
            </itemS.StyledLink>
            <itemS.StyledLink onClick={() => handleMenuClick('coding')}>
              <itemS.PageLink>코딩테스트 분석</itemS.PageLink>
            </itemS.StyledLink>
            {isLoggedIn ? (
              <div style={{ position: 'relative' }} ref={modalRef}>
                <itemS.ProfileBox onClick={toggleProfileModal}>
                  <itemS.AdminName>안녕하세요, {userName} 님</itemS.AdminName>
                  <itemS.Arrow src='/img/arrow-bt.svg' alt='화살표' />
                </itemS.ProfileBox>
                {showProfileModal && (
                  <ProfileModal 
                    userName={userName} 
                    profileUrl={profileUrl} 
                    setIsLoggedIn={setIsLoggedIn} 
                    setShowProfileModal={setShowProfileModal}
                  />
                )}
              </div>
            ) : (
              <itemS.StyledLink to="/login">
                <itemS.Btn>로그인/회원가입</itemS.Btn>
              </itemS.StyledLink>
            )}
          </itemS.HeaderRightWrap>
        </itemS.HeaderWrap>
      </itemS.HeaderContainer>

      {/* Submenus */}
      {activeMenu === 'study' && (
        <itemS.SubStudyMenu 
          ref={studyMenuRef} 
          onClick={(e) => e.stopPropagation()} // Prevent event bubbling
        >
          <itemS.StyledLink to={isLoggedIn ? "/apply" : "/login"} onClick={handleNav}>
            <itemS.SubMenuItem>정규 스터디</itemS.SubMenuItem>
          </itemS.StyledLink>

          <itemS.StyledLink to={isLoggedIn ? "/study" : "/login"} onClick={handleNav}>
            <itemS.SubMenuItem>자율 스터디</itemS.SubMenuItem>
          </itemS.StyledLink>

        </itemS.SubStudyMenu>
      )}
      {activeMenu === 'coding' && (
        <itemS.SubCodingMenu 
          ref={codingMenuRef} 
          onClick={(e) => e.stopPropagation()} // Prevent event bubbling
        >
          <itemS.StyledLink to={isLoggedIn ? "/enterbootlist" : "/login"} onClick={handleNav}>
            <itemS.SubMenuItem>기업/부트캠프 분석</itemS.SubMenuItem>
          </itemS.StyledLink>
        </itemS.SubCodingMenu>
      )}
    </>
  );
}
