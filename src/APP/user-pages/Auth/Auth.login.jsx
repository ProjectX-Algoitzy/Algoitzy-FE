import React, { useState, useEffect, useContext  } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as itemS from "../../user-pages/Auth/Styled/Auth.login.styles"
import request, { ACCESS_TOKEN } from '../../Api/request';
import axios from 'axios';
import { ConfirmContext } from '../../Common/Confirm/ConfirmContext';
import { AlertContext } from '../../Common/Alert/AlertContext';
import { LoginStateContext } from '../../Common/LoginState/LoginStateContext';

export default function Login() {

  const navigate = useNavigate();

  //const { isLogin, setIsLogin } = useContext(LoginStateContext);

  const { confirm } = useContext(ConfirmContext);
  const { alert } = useContext(AlertContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

  // 로그인 버튼
  const handleSubmit = async () => {
   
    const requestData = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post('https://user-dev.kau-koala.com/member/login', requestData);
      console.log("response",response);
      localStorage.setItem(ACCESS_TOKEN, response.data.result.accessToken);
      if (response.data["isSuccess"]) {
        console.log("로그인 성공!");
        //setIsLogin(true);
        // alert("로그인을 성공하셨습니다.");
        // const result = await alert('로그인', '로그인이 완료되었습니다!');
        // if (result) {
        navigate("/");
        window.location.reload();
        // }
        // navigate("/");
      } else {
        console.error("로그인 실패:", response.data);
        alert(response.data.message || "로그인 실패"); // 실패 메시지가 없으면 기본 메시지 표시
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      const errorMessage = error.response?.data?.result?.message || error.response?.data?.result || "로그인 오류 발생"; // 객체를 문자열로 변환하거나 기본 메시지 사용
      alert(String(errorMessage)); // 문자열로 변환 보장
    }
  };


  return (
      <itemS.Container>
        <itemS.InnerContainer>
          <itemS.Head3>로그인</itemS.Head3>
						<itemS.Img src="/img/login.svg" alt="Icon"/>
            <itemS.LoginIContainer>
              <itemS.IIContainer>
                <itemS.InputBox
                  type="text"
                  placeholder="아이디(이메일)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <itemS.Icon src="/img/uil_user.svg" alt="Icon"/>
              </itemS.IIContainer>
              <itemS.IIContainer>
                <itemS.InputBox
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // style={{ border: pwdborderColor }}
                />
                <itemS.Icon src="/img/uil_lock.svg" alt="Icon"/>
              </itemS.IIContainer>
							{/* <itemS.UtilBox>
								<itemS.CheckBox type="checkbox" />
								<itemS.NormText>자동 로그인</itemS.NormText>
							</itemS.UtilBox> */}
            </itemS.LoginIContainer>
						
          <itemS.Btn onClick={handleSubmit}>
            로그인
          </itemS.Btn>
          <itemS.UtilBox>
            <itemS.RouteSignup onClick={() => navigate("/signup")}>
              회원가입
            </itemS.RouteSignup>
            <itemS.UtilText onClick={() => navigate("/findemail")}>아이디</itemS.UtilText>
            <itemS.UtilText>/</itemS.UtilText>
            <itemS.UtilText>
              비밀번호 찾기
            </itemS.UtilText>
          </itemS.UtilBox>
        </itemS.InnerContainer>
      </itemS.Container>
  )
}
