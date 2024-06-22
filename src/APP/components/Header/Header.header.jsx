import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as itemS from "./Styled/Header.header.styles";
import { Link } from 'react-router-dom';
import request from '../../Api/request';
//import { LoginStateContext } from '../../Common/LoginState/LoginStateContext'; //이 LoginStateContext 사용하니, 새로 고침시 로그아웃 버튼이 초기화되어 "로그인"버튼으로 바뀌는 현상이 발생해서 일단 이렇게 주석처리했습니다. 

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // 로그인 유무를 확인하고자는 하는 useState
  const [userName, setUserName] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  //const { isLogin } = useContext(LoginStateContext)  //이 isLogin을 사용하니, 새로 고침시 로그아웃 버튼이 초기화되어 "로그인"버튼으로 바뀌는 현상이 발생해서 일단 이렇게 주석처리했습니다. 

  // const isActiveForApplication = location.pathname === '/application' ||  //지원자 관리와 관련된 페이지의 경우, 해당 링크 글씨색을 바꾸기 위함입니다. user의 경우, 아직 네비게이션 버튼 글자가 어떻게 이루어질지 몰라서 일단 주석처리했습니다.
  //                                 location.pathname === '/makingapplicationform' ||
  //                                 /^\/newapplication\/[^\/]+$/.test(location.pathname);

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

  const handleLogout = async () => {
    try {
      const response = await request.post('/member/logout');
      console.log("response",response);
      
      if (response["isSuccess"]) {
        console.log("로그아웃 성공!");
        window.localStorage.clear();
        navigate("/login");
        window.location.reload();
        // navigate("/");
      } else {
        console.error("로그아웃 실패:", response.data);
      }
    } catch (error) {
      console.error("로그아웃 오류:", error);
    }
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
              <itemS.AdminName>안녕하세요, {userName} 님</itemS.AdminName>
              <itemS.Btn onClick={handleLogout}>로그아웃</itemS.Btn>
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