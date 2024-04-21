import React, { useState } from 'react';
import * as itemS from "./Styled/SignUp.signup.styles"
import axios from 'axios';

export default function Signup() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [handle, setHandle] = useState(''); // Add handle state

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
      
      const response = await axios.post('http://3.35.47.250:8281/swagger-ui/index.html#//sign-up', requestData);

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
  

  return (
    <itemS.Container>
      <itemS.Label>이메일:</itemS.Label>
      <itemS.Input
        type="text"
        placeholder="이메일을 입력해주세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
  
      <itemS.Label>비밀번호:</itemS.Label>
      <itemS.Input
        type="password"
        placeholder="비밀번호를 입력해주세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
  
      <itemS.Label>비밀번호 확인:</itemS.Label>
      <itemS.Input
        type="password"
        placeholder="비밀번호 확인"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />
  
      <itemS.Label>이름:</itemS.Label>
      <itemS.Input
        type="text"
        placeholder="이름을 입력해주세요"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
  
      <itemS.Label>백준닉네임:</itemS.Label>
      <itemS.Input
        type="text"
        placeholder="백준닉네임을 입력해주세요"
        value={handle}
        onChange={(e) => setHandle(e.target.value)}
      />
  
      <itemS.Label>핸드폰 번호:</itemS.Label>
      <itemS.Input
        type="text"
        placeholder="000-0000-0000"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
  
      <itemS.Button onClick={handleSubmit}>회원가입</itemS.Button>
    </itemS.Container>
  );
}
