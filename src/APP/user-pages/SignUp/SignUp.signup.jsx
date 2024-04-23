import React, { useState } from 'react';
import * as itemS from "./Styled/SignUp.signup.styles"
import axios from 'axios';

export default function Signup() {

  const [name, setName] = useState('');
  const [handle, setHandle] = useState(''); 
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneConfirmCode, setPhoneConfirmCode] = useState('');
  const [email, setEmail] = useState('');
  const [emailConfirmCode, setEmailConfirmCode] = useState('');

  // 비밀번호 유효성 검사
  // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/;

  // // 비밀번호 확인 
  // const [isPasswordValid, setIsPasswordValid] = useState(true);
  // const handlePasswordChange = (value) => {
  //   setPassword(value); 
  //   // 비밀번호를 정규식과 비교하여 유효성을 검사
  //   if (passwordRegex.test(value)) {
  //     setIsPasswordValid(true);
  //   } else {
  //     setIsPasswordValid(false);
  //   }
  // };

  // // 비밀번호 확인 
  // const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(true);
  // const handlePasswordConfirmationChange = (value) => {
  //   setPasswordConfirmation(value);
  //   // 비밀번호 확인 값과 비밀번호 값이 일치하는지 확인
  //   if (value === password) {
  //     setIsPasswordConfirmed(true);
  //   } else {
  //     setIsPasswordConfirmed(false);
  //   }
  // };
  
  // 회원가입 버튼
  const handleSubmit = async () => {
   
    const requestData = {
      email: email,
      password: password,
      checkPassword: passwordConfirmation, 
      name: name,
      handle: handle,
      phoneNumber: phoneNumber,
    };
    try {
      const response = await axios.post('http://3.35.47.250:8281/sign-up', requestData);
      console.log("response",response);
      if (response.status === 200) {
        console.log("회원가입 성공!");
      } else {
        console.error("회원가입 실패:", response.data);
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
    }
  };

  // 백준 유효 계정 인증 버튼
  const handleConfirmHandle = async () => {
   
    const requestData = {
      handle: handle,
    };
    try {
      const response = await axios.post('http://3.35.47.250:8281/sign-up/handle', requestData);
      console.log("response",response);
      if (response.status === 200) {
        console.log("백준 유효 계정 인증 성공!");
      } else {
        console.error("백준 유효 계정 인증 실패:", response.data);
      }
    } catch (error) {
      console.error("백준 유효 계정 인증 오류:", error);
    }
  };

  // 휴대 전화 인증 버튼
  const handleConfirmPhone = async () => {
   
    const requestData = {
      phoneNumber: phoneNumber,
      code: phoneConfirmCode
    };
    try {
      const response = await axios.post('http://3.35.47.250:8281/sign-up/phone-number', requestData);
      console.log("response",response);
      if (response.status === 200) {
        console.log("휴대 전화 인증 성공!");
      } else {
        console.error("휴대 전화 인증 실패:", response.data);
      }
    } catch (error) {
      console.error("휴대 전화 인증 오류:", error);
    }
  };
  
  // 이메일 인증 코드 전송 버튼
  const handleSubmitEmail = async () => {
   
    const requestData = {
      email: email,
    };
    try {
      const response = await axios.post('http://3.35.47.250:8281/email/certification', requestData);
      console.log("response",response);
      if (response.status === 200) {
        console.log("이메일 인증 코드 전송 성공!");
      } else {
        console.error("이메일 인증 코드 전송 실패:", response.data);
      }
    } catch (error) {
      console.error("이메일 인증 코드 전송 오류:", error);
    }
  };

  // SMS 인증 코드 전송 버튼
  const handleSubmitSMS = async () => {
   
    const requestData = {
      phoneNumber: phoneNumber,
    };
    try {
      const response = await axios.post('http://3.35.47.250:8281/sms/certification', requestData);
      console.log("response",response);
      if (response.status === 200) {
        console.log("SMS 인증 코드 전송 성공!");
      } else {
        console.error("SMS 인증 코드 전송 실패:", response.data);
      }
    } catch (error) {
      console.error("SMS 인증 코드 전송 오류:", error);
    }
  };

  return (
    <div>
      <itemS.Container>
        <itemS.InnerContainer>
          <itemS.Head3>회원가입</itemS.Head3>
          <div>
            <itemS.LIContainer>
              <itemS.Label>이름</itemS.Label>
              <itemS.InputBox
                type="text"
                placeholder="이름을 입력해주세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </itemS.LIContainer>
          
            <itemS.LIContainer>
              <itemS.Label>백준닉네임</itemS.Label>
              <itemS.InputConfirmBoxWrapper>
                <itemS.InputConfirmBox
                  type="text"
                  placeholder="백준닉네임을 입력해주세요"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                />
                <itemS.BtnConfirm onClick={handleConfirmHandle}>
                  <div>인증하기</div>
                </itemS.BtnConfirm>
              </itemS.InputConfirmBoxWrapper>
            </itemS.LIContainer>
            
            <itemS.LIContainer>
              <itemS.Label>비밀번호</itemS.Label>
              <itemS.InputBox
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </itemS.LIContainer>
        
            <itemS.LIContainer>
              <itemS.Label>비밀번호 확인</itemS.Label>
              <itemS.InputBox
                type="password"
                placeholder="비밀번호 확인"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </itemS.LIContainer>

            <itemS.LIContainer>
              <itemS.Label>핸드폰 번호</itemS.Label>
              <itemS.InputConfirmBoxWrapper>
                <itemS.InputConfirmBox
                  type="text"
                  placeholder="000-0000-0000"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <itemS.BtnConfirm onClick={handleSubmitSMS}>
                  <div>인증하기</div>
                </itemS.BtnConfirm>
              </itemS.InputConfirmBoxWrapper>

              <itemS.InputConfirmBoxWrapper>
                <itemS.InputConfirmBox
                  type="text"
                  placeholder="인증코드"
                  value={phoneConfirmCode}
                  onChange={(e) => setPhoneConfirmCode(e.target.value)}
                />
                <itemS.BtnConfirm onClick={handleConfirmPhone}>
                  <div>인증번호 확인</div>
                </itemS.BtnConfirm>
              </itemS.InputConfirmBoxWrapper>
            </itemS.LIContainer>
            
            
            <itemS.LIContainer>
              <itemS.Label>이메일</itemS.Label>
              <itemS.InputConfirmBoxWrapper>
                <itemS.InputConfirmBox
                  type="text"
                  placeholder="이메일을 입력해주세요"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <itemS.BtnConfirm onClick={handleSubmitEmail}>
                  <div>인증하기</div>
                </itemS.BtnConfirm>
              </itemS.InputConfirmBoxWrapper>
              
              <itemS.InputConfirmBoxWrapper>
                <itemS.InputConfirmBox
                  type="text"
                  placeholder="인증코드"
                  value={emailConfirmCode}
                  onChange={(e) => setEmailConfirmCode(e.target.value)}
                />
                <itemS.BtnConfirm>
                  <div>인증번호 확인</div>
                </itemS.BtnConfirm>
              </itemS.InputConfirmBoxWrapper>
            </itemS.LIContainer>
          </div>
          <itemS.Btn onClick={handleSubmit}>
            <div>회원가입</div>
          </itemS.Btn>
        </itemS.InnerContainer>
      </itemS.Container>
    </div>
  );
}
