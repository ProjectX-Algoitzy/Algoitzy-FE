import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as itemS from "./Styled/Header.profile.modal.styles";
import request from '../../Api/request';

const ProfileModal = ({ userName, profileUrl, setIsLoggedIn, setShowProfileModal }) => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await request.post('/member/logout');
      console.log("로그아웃", response);
      if(response["isSuccess"]) {
        window.localStorage.clear();
        setIsLoggedIn(false);
        navigate("/login");
      }
    } catch (error) {
      console.error("로그아웃 실패", error);
    }
  };

  const handleMyPage = () => {
    navigate(`/mypage/${localStorage.getItem('handle')}`);
    setShowProfileModal(false);
  };

  return (
      <itemS.ArrowBubble onClick={e => e.stopPropagation()}>
        <itemS.TopContainer>
          <itemS.Profile src={profileUrl} alt='기본프로필' ></itemS.Profile>
          <itemS.Name>{userName} 님</itemS.Name>
          <itemS.Logout onClick={handleLogout}>로그아웃</itemS.Logout>
        </itemS.TopContainer>
        <itemS.BottomContainer>
          <itemS.Button onClick={handleMyPage}>마이페이지</itemS.Button>
          {/* <itemS.Button>문의하기</itemS.Button> */}
        </itemS.BottomContainer>
      </itemS.ArrowBubble>
  );
};

export default ProfileModal;