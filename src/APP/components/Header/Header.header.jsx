import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as itemS from "./Styled/Header.header.styles";
import { Link } from 'react-router-dom';
import request from '../../Api/request';
import { LoginStateContext } from '../../Common/LoginState/LoginStateContext';

export default function Header() {

  const navigate = useNavigate();

  const { isLogin } = useContext(LoginStateContext)

  const handleLogout = async () => {
    try {
      const response = await request.post('/member/logout');
      console.log("response",response);
      
      if (response["isSuccess"]) {
        console.log("로그아웃 성공!");
        window.localStorage.clear();
        navigate("/login");
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
          <Link to="/" style={{ textDecoration: 'none' }}>
            <itemS.Rabel>KOALA</itemS.Rabel>
          </Link>
        </itemS.HeaderLeftWrap>
        <itemS.HeaderRightWrap>
          {isLogin ? (
            <itemS.Btn onClick={handleLogout}>로그아웃</itemS.Btn>
          ) : (
            <Link to="/login">
              <itemS.Btn>로그인/회원가입</itemS.Btn>
            </Link>
          )}
        </itemS.HeaderRightWrap>
      </itemS.HeaderWrap>
    </itemS.HeaderContainer>
  );
}