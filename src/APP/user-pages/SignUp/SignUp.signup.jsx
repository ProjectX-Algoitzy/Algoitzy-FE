import React, { useState, useEffect  } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as itemS from "./Styled/SignUp.signup.styles"
import axios from 'axios';

export default function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [handle, setHandle] = useState(''); 
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [SMSCode, setSMSCode] = useState('');
  const [email, setEmail] = useState('');
  const [emailCode, setEmailCode] = useState('');

  // border색상 및 메시지 상태
  // 백준 계정 색상 및 메시지
  const [handleColor, setHandleColor] = useState('#CFCFCF'); 
  const [handleMessage, setHandleMessage] = useState(''); 

  // 비밀번호 border 색상 
  const [pwdborderColor, setPwdBorderColor] = useState('1px solid #CFCFCF'); 

  // 비밀번호 확인 border 색상 
  const [pwdConfirmborderColor, setPwdConfirmBorderColor] = useState('1px solid #CFCFCF'); 

  // 핸드폰 및 인증코드 색상 및 메시지
  const [phoneBorderColor, setPhoneBorderColor] = useState('#CFCFCF'); // Grey_4 border 색상
  const [phoneMessageColor, setPhoneMessageColor] = useState('#171717'); // Grey_8 메시지 색상
  const [phoneMessage, setPhoneMessage] = useState('인증받을 유효한 휴대폰 번호를 입력해주세요.'); // 메시지
  const [SMSColor, setSMSColor] = useState('#CFCFCF'); // Grey_4 border 및 메시지 색상
  const [SMSMessage, setSMSMessage] = useState(''); // 메시지

  // 이메일 및 인증코드 색상 및 메시지
  const [emailBorderColor, setEmailBorderColor] = useState('#CFCFCF'); // Grey_4 border 색상
  const [emailMessageColor, setEmailMessageColor] = useState('#171717'); // Grey_8 메시지 색상
  const [emailMessage, setEmailMessage] = useState('인증받을 유효한 휴대폰 번호를 입력해주세요.'); // 메시지
  const [emailCodeColor, setEmailCodeColor] = useState('#CFCFCF'); // Grey_4 border 및 메시지 색상
  const [emailCodeMessage, setEmailCodeMessage] = useState(''); // 메시지


  // 비밀번호 유효성 검사
  const PasswordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[a-zA-Z\d@$!%*#?&]{1,15}$/;

  // 핸드폰 번호 유효성 검사 
  // const PhoneRegex = /^01[0-9]-\d{4}-\d{4}$/;

  // 유효성 확인
  // 이름 유효성 확인
  const [isNameValid, setIsNameValid] = useState(false);
  // 백준 계정 유효성 확인
  const [isHandleValid, setIsHandleValid] = useState(false);
  
  // 비밀번호 유효성 확인 
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  // 비밀번호 확인 유효성 확인 
  const [isPasswordConfirmValid, setIsPasswordConfirmValid] = useState(false);

  // 핸드폰 번호 및 인증 코드 유효성 확인
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);
  const [isSMSValid, setIsSMSValid] = useState(false);

  // 이메일 및 인증 코드 유효성 확인
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEmailCodeValid, setIsEmailCodeValid] = useState(false);

  // 회원가입 버튼 색상 및 활성화/비활성화
  const [btnSubmitColor, setBtnSubmitColor] = useState(); // B_Grey_3
  const [isAbled, setIsAbled] = useState(false); 
  // Blue_0_Main

  // 핸드폰 번호 '인증하기' text
  const [phoneConfirmBtnText, setPhoneConfirmBtnText] = useState("인증하기"); 

  // 이메일 '인증하기' text
  const [emailConfirmBtnText, setemailConfirmBtnText] = useState("인증하기"); 

  useEffect(() => {
    const isAllValid = isNameValid && isHandleValid && isPasswordValid && isPasswordConfirmValid && isPhoneNumberValid && isSMSValid && isEmailValid && isEmailCodeValid;
    setBtnSubmitColor(isAllValid ? '#00A5FF' : '#D2D9E5');
    setIsAbled(isAllValid);
  }, [isNameValid, isHandleValid, isPasswordValid, isPasswordConfirmValid, isPhoneNumberValid, isSMSValid, isEmailValid, isEmailCodeValid]);

  

  // 이름 입력 change event
  const handleNameChange = (value) => {
    setName(value);
    setIsNameValid(value.trim().length > 0);
  }

  // 백준 계정 입력 change event
  const handleHandleChange = (value) => {
    setHandle(value);
    setHandleColor('#555555'); // Grey_6

    // 입력 했다가 모두 지우는 경우를 생각해야 할까 -> 해당 입력칸 focus 상태면 생각하지 않아도 된다 border 변화 못느껴서 -> 다른 칸을 선택했을때는 티가 난다 -> 이런경우가 생길까?
    // if (value.trim().length > 0) {
    //   setHandleColor('#555555'); // Grey_6
    // } else {
    //   setHandleColor('#CFCFCF'); // Grey_6
    // }
  }

  // 비밀번호 입력 change event
  const handlePasswordChange = (value) => {
    setPassword(value);
    setIsPasswordValid(PasswordRegex.test(value));
    if (!PasswordRegex.test(value) && value.trim().length > 0) {
      setPwdBorderColor('1px solid #DC4A41'); // Red
    } else {
      setPwdBorderColor('1px solid #555555'); // Grey_6
    }
  }

  // 비밀번호 확인 입력 change event
  const handlePasswordConfirmChange = (value) => {
    setPasswordConfirmation(value);
    setIsPasswordConfirmValid(PasswordRegex.test(value));
    if (value !== password && value.trim().length > 0) {
      setPwdConfirmBorderColor('1px solid #DC4A41'); // Red
    } else {
      setPwdConfirmBorderColor('1px solid #555555'); // Grey_6
    }
  }


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

  // 핸드폰 번호 입력 change event
  const handleEmailChange = (value) => {
    setEmail(value);
    setEmailBorderColor('#555555'); // Grey_6
  }

  // 핸드폰 번호 인증 코드 입력 change event
  const handleEmailCodeChange = (value) => {
    setEmailCode(value);
    setEmailCodeColor('#555555'); // Grey_6
  }

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
        alert("회원가입을 성공하셨습니다.");
        navigate("/login");
      } else {
        console.error("회원가입 실패:", response.data);
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
    }
  };

  // 백준 유효 계정 인증하기 버튼
  const handleConfirmHandle = async () => {
    const requestData = {
      handle: handle,
    };
    try {
      const response = await axios.post('http://3.35.47.250:8281/sign-up/handle', requestData);
      console.log("response",response);
      if (response.status === 200) {
        console.log("백준 유효 계정 인증 성공!");
        setIsHandleValid(true);
        setHandleColor('#3083F7'); // Blue_3
        setHandleMessage('인증이 완료되었습니다.');
      } else { // 이 경우는 없느건가?
        console.error("백준 유효 계정 인증 실패:", response.data);
        
      }
    } catch (error) {
      console.error("백준 유효 계정 인증 오류:", error);
      setIsHandleValid(false);
      setHandleColor('#DC4A41'); // Red
      setHandleMessage('등록되지 않은 계정입니다.');
    }
  };

  // 핸드폰 번호 인증번호 확인 버튼
  const handleConfirmPhone = async () => {
   
    const requestData = {
      phoneNumber: phoneNumber,
      code: SMSCode
    };
    try {
      const response = await axios.post('http://3.35.47.250:8281/sign-up/phone-number', requestData);
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
  
  // 이메일 인증번호 확인 버튼
  const handleConfirmEmail = async () => {
   
    const requestData = {
      email: email,
      code: emailCode
    };
    try {
      const response = await axios.post('http://3.35.47.250:8281/sign-up/email', requestData);
      console.log("response",response);
      if (response.status === 200) {
        console.log("이메일 인증 성공!");
        setIsEmailCodeValid(true);
        setEmailBorderColor('#3083F7'); // Blue_3
        setEmailMessageColor('#3083F7'); // Blue_3
        setEmailMessage('인증이 완료되었습니다.');
        setEmailCodeColor('#555555'); // grey_6
      } else {
        console.error("이메일 인증 실패:", response.data);
        setEmailCodeColor('#DC4A41'); // REd
        setEmailCodeMessage('인증번호가 일치하지 않습니다. 다시 인증을 진행해주세요.');
      }
    } catch (error) {
      console.error("이메일 인증 오류:", error);
      setIsEmailCodeValid(false);
      setEmailCodeColor('#DC4A41'); // REd
      setEmailCodeMessage('인증번호가 일치하지 않습니다. 다시 인증을 진행해주세요.');
      setemailConfirmBtnText("다시 인증하기");
    }
  };

  // 이메일 인증 코드 전송 버튼 {인증하기 버튼}
  const handleSubmitEmail = async () => {
   
    const requestData = {
      email: email,
    };
    try {
      const response = await axios.post('http://3.35.47.250:8281/email/certification', requestData);
      console.log("response",response);
      if (response.status === 200) {
        console.log("이메일 인증 코드 전송 성공!");
        setIsEmailValid(true);
        setEmailBorderColor('#3083F7'); // Blue_3
        setEmailMessageColor('#3083F7'); // Blue_3
        setEmailMessage('인증번호가 발송되었습니다.');
      } else {
        console.error("이메일 인증 코드 전송 실패:", response.data);
      }
    } catch (error) {
      console.error("이메일 인증 코드 전송 오류:", error);
      setIsEmailValid(false);
      setEmailBorderColor('#DC4A41'); // Red
      setEmailMessageColor('#DC4A41'); // Red
      setEmailMessage('사용할 수 없는 핸드폰 번호입니다.');
      
    }
  };

  // SMS 인증 코드 전송 버튼 {인증하기 버튼}
  const handleSubmitSMS = async () => {
   
    const requestData = {
      phoneNumber: phoneNumber,
    };
    try {
      const response = await axios.post('http://3.35.47.250:8281/sms/certification', requestData);
      console.log("response",response);
      if (response.status === 200) {
        console.log("SMS 인증 코드 전송 성공!");
        setIsPhoneNumberValid(true);
        setPhoneBorderColor('#3083F7'); // Blue_3
        setPhoneMessageColor('#3083F7'); // Blue_3
        setPhoneMessage('인증번호가 발송되었습니다.');
      } else {
        console.error("SMS 인증 코드 전송 실패:", response.data);
      }
    } catch (error) {
      console.error("SMS 인증 코드 전송 오류:", error);
      setIsPhoneNumberValid(false);
      setPhoneBorderColor('#DC4A41'); // Red
      setPhoneMessageColor('#DC4A41'); // Red
      setPhoneMessage('사용할 수 없는 핸드폰 번호입니다.');
      
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
                placeholder="이름을 입력해주세요."
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
              />
            </itemS.LIContainer>
          
            <itemS.LIContainer>
              <itemS.Label>백준닉네임</itemS.Label>
              <itemS.InputConfirmBoxWrapper>
                <itemS.InputConfirmBox
                  type="text"
                  placeholder="백준닉네임을 입력해주세요."
                  value={handle}
                  onChange={(e) => handleHandleChange(e.target.value)}
                  style={{ border: `1px solid ${handleColor}` }}
                  disabled={isHandleValid}
                />
                <itemS.BtnConfirm onClick={handleConfirmHandle}>
                 인증하기
                </itemS.BtnConfirm>
              </itemS.InputConfirmBoxWrapper>
            </itemS.LIContainer>
            <itemS.Message
              style={{ color: `${handleColor}` }}
            >
              {handleMessage}
            </itemS.Message>
            
            
            <itemS.LIContainer>
              <itemS.Label>비밀번호</itemS.Label>
              <itemS.InputBox
                type="password"
                placeholder="비밀번호를 입력해주세요."
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                style={{ border: pwdborderColor }}
              />
            </itemS.LIContainer>
            {!isPasswordValid && password.length > 0 && (
            <itemS.ErrorMessage>
              * 특수문자 1개 이상, 영문+숫자, 15자 이내로 설정해주세요.
            </itemS.ErrorMessage>
            )}
        
            <itemS.LIContainer>
              <itemS.Label>비밀번호 확인</itemS.Label>
              <itemS.InputBox
                type="password"
                placeholder="비밀번호 확인"
                value={passwordConfirmation}
                onChange={(e) => handlePasswordConfirmChange(e.target.value)}
                style={{ border: pwdConfirmborderColor }}
              />
            </itemS.LIContainer>
            {!isPasswordConfirmValid && passwordConfirmation.length > 0 && (
            <itemS.ErrorMessage>
              비밀번호가 일치하지 않습니다.
            </itemS.ErrorMessage>
            )}
        

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
            
            
            <itemS.LIContainer>
              <itemS.Label>이메일</itemS.Label>
              <itemS.InputConfirmBoxWrapper>
                <itemS.InputConfirmBox
                  type="text"
                  placeholder="이메일을 입력해주세요."
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  style={{ border: `1px solid ${emailBorderColor}` }}
                  disabled={isEmailCodeValid}
                />
                <itemS.BtnConfirm onClick={handleSubmitEmail}>
                 {emailConfirmBtnText}
                </itemS.BtnConfirm>
              </itemS.InputConfirmBoxWrapper>
              <itemS.CodeMessage
                style={{ color: `${emailMessageColor}` }}
              >
                {emailMessage}
              </itemS.CodeMessage>
              
              <itemS.InputConfirmBoxWrapper>
                <itemS.InputConfirmBox
                  type="text"
                  placeholder="인증코드"
                  value={emailCode}
                  onChange={(e) => handleEmailCodeChange(e.target.value)}
                  style={{ border: `1px solid ${emailCodeColor}` }}
                  disabled={isEmailCodeValid}
                />
                <itemS.BtnConfirm onClick={handleConfirmEmail}>
                 인증번호 확인
                </itemS.BtnConfirm>
                <itemS.Message
                  style={{ color: `${emailCodeColor}` }}
                >
                  {emailCodeMessage}
                </itemS.Message>
              </itemS.InputConfirmBoxWrapper>
            </itemS.LIContainer>
          </div>
          <itemS.Btn 
            onClick={handleSubmit}
            style={{ backgroundColor: `${btnSubmitColor}` }}
            disabled={!isAbled}
          >
            <div>회원가입</div>
          </itemS.Btn>
        </itemS.InnerContainer>
      </itemS.Container>
    </div>
  );
}
