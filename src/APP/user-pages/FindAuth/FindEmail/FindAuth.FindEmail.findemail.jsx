import React, { useState, useEffect, useContext  } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as itemS from "../../../user-pages/FindAuth/FindEmail/Styled/FindAuth.FindEmail.findemail.styles"
import request from '../../../Api/request';

export default function FindEmail() {

  const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
  const [SMSCode, setSMSCode] = useState('');

	// 핸드폰 및 인증코드 색상 및 메시지
  const [phoneBorderColor, setPhoneBorderColor] = useState('#CFCFCF'); // Grey_4 border 색상
  const [phoneMessageColor, setPhoneMessageColor] = useState('#171717'); // Grey_8 메시지 색상
  const [phoneMessage, setPhoneMessage] = useState('인증받을 유효한 휴대폰 번호를 입력해주세요.'); // 메시지
  const [SMSColor, setSMSColor] = useState('#CFCFCF'); // Grey_4 border 및 메시지 색상
  const [SMSMessage, setSMSMessage] = useState(''); // 메시지

	// 핸드폰 번호 및 인증 코드 유효성 확인
  // const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);
  const [isSMSValid, setIsSMSValid] = useState(false);

	// 핸드폰 번호 '인증하기' text
  const [phoneConfirmBtnText, setPhoneConfirmBtnText] = useState("인증하기");

	// const [isAbled, setIsAbled] = useState(false); 

	// useEffect(() => {
  //   const isAllValid =  isPhoneNumberValid && isSMSValid;
  //   setIsAbled(isAllValid);
  // }, [isPhoneNumberValid, isSMSValid]);

  
	// 핸드폰 번호 입력 change event
  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
    setPhoneBorderColor('#555555'); // Grey_6
  }

  // 핸드폰 번호 인증 코드 입력 change event
  const handleSMSCodeChange = (value) => {
    setSMSCode(value);
    setSMSColor('#555555'); // Grey_6
  }


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

	// 핸드폰 번호 인증번호 확인 버튼
  const handleConfirmPhone = async () => {
   
    const requestData = {
      phoneNumber: phoneNumber,
      code: SMSCode
    };
    try {
      const response = await request.post('/sign-up/phone-number', requestData);
      console.log("response",response);
      if (response.status === 200) {
        console.log("핸드폰 번호 인증 성공!");
        setIsSMSValid(true);
        setPhoneBorderColor('#3083F7'); // Blue_3
        setPhoneMessageColor('#3083F7'); // Blue_3
        setPhoneMessage('인증이 완료되었습니다.');
        setSMSMessage('');
        setSMSColor('#555555'); // grey_6
      } else {
        console.error("핸드폰 번호 인증 실패:", response.data);
        setSMSColor('#DC4A41'); // REd
        setSMSMessage('인증번호가 일치하지 않습니다. 다시 인증을 진행해주세요.');
      }
    } catch (error) {
      console.error("핸드폰 번호 인증 오류:", error);
      setIsSMSValid(false);
      setSMSColor('#DC4A41'); // REd
      setSMSMessage('인증번호가 일치하지 않습니다. 다시 인증을 진행해주세요.');
      setPhoneConfirmBtnText("다시 인증하기");
    }
  };

	// SMS 인증 코드 전송 버튼 {인증하기 버튼}
  const handleSubmitSMS = async () => {
   
    const requestData = {
      phoneNumber: phoneNumber,
    };
    try {
      const response = await request.post('/sms/certification', requestData);
      console.log("response",response);
      if (response.status === 200) {
        console.log("SMS 인증 코드 전송 성공!");
        // setIsPhoneNumberValid(true);
        setPhoneBorderColor('#3083F7'); // Blue_3
        setPhoneMessageColor('#3083F7'); // Blue_3
        setPhoneMessage('인증번호가 발송되었습니다.');
      } else {
        console.error("SMS 인증 코드 전송 실패:", response.data);
      }
    } catch (error) {
      console.error("SMS 인증 코드 전송 오류:", error);
      // setIsPhoneNumberValid(false);
      setPhoneBorderColor('#DC4A41'); // Red
      setPhoneMessageColor('#DC4A41'); // Red
      setPhoneMessage('사용할 수 없는 핸드폰 번호입니다.');
      
    }
  };


  return (
		<itemS.Container>
			<itemS.InnerContainer>
				<itemS.Head3>아이디 찾기</itemS.Head3>
					
					<itemS.LIContainer>
            <itemS.Label>이름</itemS.Label>
						<itemS.InputBox
							type="text"
							placeholder="아이디(이메일)"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</itemS.LIContainer>

					<itemS.LIContainer>
              <itemS.Label>핸드폰 번호</itemS.Label>
              <itemS.InputConfirmBoxWrapper>
                <itemS.InputConfirmBox
                  type="text"
                  placeholder="000-0000-0000"
                  value={phoneNumber}
                  onChange={(e) => handlePhoneNumberChange(e.target.value)}
                  style={{ border: `1px solid ${phoneBorderColor}` }}
                  disabled={isSMSValid}
                />
                <itemS.BtnConfirm onClick={handleSubmitSMS}>
                 {phoneConfirmBtnText}
                </itemS.BtnConfirm>
              </itemS.InputConfirmBoxWrapper>
              <itemS.CodeMessage
                style={{ color: `${phoneMessageColor}` }}
              >
                {phoneMessage}
              </itemS.CodeMessage>

              <itemS.InputConfirmBoxWrapper>
                <itemS.InputConfirmBox
                  type="text"
                  placeholder="인증코드"
                  value={SMSCode}
                  onChange={(e) => handleSMSCodeChange(e.target.value)}
                  style={{ border: `1px solid ${SMSColor}` }}
                  disabled={isSMSValid}
                />
                <itemS.BtnConfirm onClick={handleConfirmPhone}>
                 인증번호 확인
                </itemS.BtnConfirm>
              </itemS.InputConfirmBoxWrapper>
            </itemS.LIContainer>
            <itemS.Message
              style={{ color: `${SMSColor}` }}
            >
              {SMSMessage}
            </itemS.Message>
					
				<itemS.Btn onClick={handleSubmit}>
					확인
				</itemS.Btn>
				
			</itemS.InnerContainer>
		</itemS.Container>
  )
}
