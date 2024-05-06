import React, { useState, useEffect, useContext  } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as itemS from "../../../user-pages/FindAuth/FindEmailSuccess/Styled/FindAuth.FindEmailSuccess.styles"
import request from '../../../Api/request';

export default function FindEmailSuccess() {

  const navigate = useNavigate();

	const [email, setEmail] = useState('');
	
  // 로그인 버튼
  const handleSubmit = async () => {
   
    // const requestData = {
    //   email: email,
    //   password: password,
    // };
    // try {
    //   const response = await request.post('/member/login', requestData);
    //   console.log("response",response);
    //   localStorage.setItem(ACCESS_TOKEN, response.result.accessToken);
    //   if (response["isSuccess"]) {
    //     console.log("로그인 성공!");
    //     alert("로그인을 성공하셨습니다.");
    //     navigate("/");
    //   } else {
    //     console.error("로그인 실패:", response.data);
    //   }
    // } catch (error) {
    //   console.error("로그인 오류:", error);
    // }
  };

	

  return (
		<itemS.Container>
			<itemS.InnerContainer>
				<itemS.Head3>아이디 찾기</itemS.Head3>
				<itemS.Body>아이디</itemS.Body>
				<itemS.Text>고객님의 정보와 일치하는 아이디는 다음과 같습니다.</itemS.Text>
				<itemS.EmailBox>
					<itemS.EmailIcon>

					</itemS.EmailIcon>
					<itemS.Email>
						test123@test.com
					</itemS.Email>
				</itemS.EmailBox>
				<itemS.BtnContainer>
					<itemS.BtnLogin>
						로그인
					</itemS.BtnLogin>
					<itemS.BtnFindPassword>
						비밀번호 찾기
					</itemS.BtnFindPassword>
				</itemS.BtnContainer>
				
			</itemS.InnerContainer>
		</itemS.Container>
  )
}
