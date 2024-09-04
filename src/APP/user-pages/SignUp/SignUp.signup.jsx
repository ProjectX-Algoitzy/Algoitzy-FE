import React, { useState, useEffect, useContext, useRef  } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import * as itemS from "./Styled/SignUp.signup.styles"
import Timer from './SignUp.timer';
import { AlertContext } from '../../Common/Alert/AlertContext';

const gradeOptions = [
  {value: 4, label:"4 학년"},
  {value: 3, label:"3 학년"},
  {value: 2, label:"2 학년"},
  {value: 1, label:"1 학년"}
]

const gradePlaceholderText = '학년을 선택해주세요.';

const majorOptions = [
  {value: "항공우주공학과", label:"항공우주공학과"},
  {value: "기계항공공학과", label:"기계항공공학과"},
  {value: "신소재공학과", label:"신소재공학과"},
  {value: "항공우주 및 기계공학부", label:"항공우주 및 기계공학부"},
  {value: "항공전자정보공학부", label:"항공전자정보공학부"},
  {value: "스마트드론공학과", label:"스마트드론공학과"},
  {value: "공과대학 융합전공", label:"공과대학 융합전공"},
  {value: "소프트웨어학과", label:"소프트웨어학과"},
  {value: "전기전자공학과", label:"전기전자공학과"},
  {value: "컴퓨터공학과", label:"컴퓨터공학과"},
  {value: "AI자율주행시스템공학과", label:"AI자율주행시스템공학과"},
  {value: "AI융합대학 융합전공", label:"AI융합대학 융합전공"},
  {value: "항공교통물류학부", label:"항공교통물류학부"},
  {value: "항공경영학과", label:"항공경영학과"},
  {value: "경영학과", label:"경영학과"},
  {value: "항공운항학과", label:"항공운항학과"},
  {value: "국제교류학부", label:"국제교류학부"},
  {value: "경영학부", label:"경영학부"},
  {value: "항공ㆍ경영대학 융합전공", label:"항공ㆍ경영대학 융합전공"},
  {value: "자유전공학부", label:"자유전공학부"},
  {value: "인문자연학부", label:"인문자연학부"}
]

const majorPlaceholderText = '학과를 선택해주세요.';

export default function Signup() {
  
  const navigate = useNavigate();
  const { alert } = useContext(AlertContext);
  
  // 프로필 이미지 
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [profileUrl, setProfileUrl] = useState('img/baseprofile.svg'); // 렌더링용
  const [profile, setProfile] = useState(null); // api용
  const [previousProfileUrl, setPreviousProfileUrl] = useState(null);

  const [timerStarted, setTimerStarted] = useState(false);
  const [timerKey, setTimerKey] = useState(0); // 타이머 리렌더링 키

  const [count, setCount] = useState(0); // 인증번호 발송 count

  const [name, setName] = useState('');
  const [grade, setGrade] = useState(gradeOptions[0]);
  const [major, setMajor] = useState('');
  const [handle, setHandle] = useState(''); 
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [SMSCode, setSMSCode] = useState('');
  const [email, setEmail] = useState('');
  const [emailCode, setEmailCode] = useState('');

  // border색상 및 메시지 상태

  // 이름 색상 및 메시지
  const [nameBorderColor, setNameBorderColor] = useState('1px solid #CFCFCF'); 

  // 학년 색상
  // const [gradeColor, setGradeColor] = useState('#CFCFCF'); 
  const [isGradeSelected, setisGradeSelected] = useState(false); 

  // 학과 색상
  // const [majorColor, setMajorColor] = useState('#CFCFCF'); 
  const [isMajorSelected, setisMajorSelected] = useState(false); 

  // 백준 계정 색상 및 메시지
  const [handleColor, setHandleColor] = useState('#CFCFCF'); 
  const [handleMessage, setHandleMessage] = useState(''); 

  // 비밀번호 border 색상 
  const [pwdBorderColor, setPwdBorderColor] = useState('1px solid #CFCFCF'); 

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
  const [emailMessage, setEmailMessage] = useState('인증받을 유효한 이메일을 입력해주세요.'); // 메시지
  const [emailCodeColor, setEmailCodeColor] = useState('#CFCFCF'); // Grey_4 border 및 메시지 색상
  const [emailCodeMessage, setEmailCodeMessage] = useState(''); // 메시지

  // 이름 유효성 검사
  const NameRegex = /^[a-zA-Z가-힣\s]+$/;

  // 비밀번호 유효성 검사
  const PasswordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[a-zA-Z\d@$!%*#?&]{8,15}$/;

  // 핸드폰 번호 유효성 검사 
  const PhoneRegex = /^01[0-9]-\d{4}-\d{4}$/;

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
  const [isPhoneValid, setIsPhoneValid] = useState(false); // 핸드폰 번호 정규식 만족 여부
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false); // 핸드폰 번호 실제 사용 여부
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


  // 프로필 이미지 파일 업로드
  const handleFileChange = async (event) => {
    // console.log('previousProfileUrl',previousProfileUrl);
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
  
      if (previousProfileUrl) {
        console.log('1');
        await handleFileDelete(profileUrl);
      }
      console.log('12');
      await handleFileUpload(selectedFile);
    }
  };
  

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('multipartFileList', file);
  
    try {
      const response = await axios.post('https://user-dev.kau-koala.com/s3', formData);
      if (response.data.isSuccess) {
        const newProfileUrl = response.data.result[0];
        console.log('파일 업로드 성공:', newProfileUrl);
        // console.log('이전:', profileUrl);
        setPreviousProfileUrl(profileUrl); 
        setProfileUrl(newProfileUrl);
        setProfile(newProfileUrl);
      } else {
        console.error('파일 업로드 실패:', response.data);
      }
    } catch (error) {
      console.error('파일 업로드 에러:', error);
    }
  };
  
  const handleFileDelete = async (profileUrl) => {
    try {
      // URL에 profileUrl을 포함시킴
      const url = `https://user-dev.kau-koala.com/s3?fileUrl=${encodeURIComponent(profileUrl)}`;
  
      // console.log('삭제 URL:', url);
  
      const response = await axios.delete(url);
  
      if (response.data.isSuccess) {
        console.log('파일 삭제 성공:', profileUrl);
      } else {
        console.error('파일 삭제 실패:', response.data);
      }
    } catch (error) {
      console.error('파일 삭제 에러:', error);
    }
  };

  // 타이머 완료
  const onComplete = () => {
    setTimerStarted(false);
    // setIsSMSValid(true); //  타이머 종료시 입력칸 비활성화
  }

  // 이름 입력 change event
  const handleNameChange = (value) => {
    setName(value);
    // setIsNameValid(value.trim().length > 0);
    setIsNameValid(NameRegex.test(value));
    if (!NameRegex.test(value) && value.trim().length > 0) {
      setNameBorderColor('1px solid #DC4A41'); // Red
    } else {
      setNameBorderColor('1px solid #555555'); // Grey_6
    }
  }

  // 학년 선택 change event
  const handleGradeChange = (selectedOption) => {
    const { value } = selectedOption;
    setGrade(value);
    // setGradeColor('#555555');
    setisGradeSelected(true);
  }

  // 학과 입력 change event
  const handleMajorChange = (selectedOption) => {
    const { value } = selectedOption;
    setMajor(value);
    // setMajorColor('#555555');
    setisMajorSelected(true);
  }

  // 백준 계정 입력 change event
  const handleHandleChange = (value) => {
    setHandle(value);
    setHandleColor('#555555'); // Grey_6
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
    setIsPasswordConfirmValid(value === password);
    if (value !== password && value.trim().length > 0) {
      setPwdConfirmBorderColor('1px solid #DC4A41'); // Red
    } else {
      setPwdConfirmBorderColor('1px solid #555555'); // Grey_6
    }
  }


  // 핸드폰 번호 입력 change event
  const handlePhoneNumberChange = (value) => {
    const numericValue = value.replace(/\D/g, ''); // 숫자가 아닌 문자 제거

    let formattedValue = numericValue;

    if (numericValue.length > 3 && numericValue.length <= 7) {
      formattedValue = `${numericValue.slice(0, 3)}-${numericValue.slice(3)}`; // 010-xxxx 로 변경
    } else if (numericValue.length > 7) {
      formattedValue = `${numericValue.slice(0, 3)}-${numericValue.slice(3, 7)}-${numericValue.slice(7, 11)}`; // 010-xxxx-xxxx 로 변경
    }

    setPhoneNumber(formattedValue);
    setIsPhoneValid(PhoneRegex.test(formattedValue));

    if (!PhoneRegex.test(formattedValue) && formattedValue.trim().length > 0) {
      setPhoneBorderColor('#DC4A41'); // Red
      setPhoneMessageColor('#DC4A41'); // Red
      setPhoneMessage('010-0000-0000 형식에 맞춰 입력해주세요.');
    } else {
      setPhoneBorderColor('#555555'); // Grey_6
      setPhoneMessageColor('#171717');
      setPhoneMessage('인증하기를 진행해주세요.');
    }
  }

  // 핸드폰 번호 인증 코드 입력 change event
  const handleSMSCodeChange = (value) => {
    setSMSCode(value);
    setSMSColor('#555555'); // Grey_6
  }

  // 이메일 입력 change event
  const handleEmailChange = (value) => {
    setEmail(value);
    setEmailBorderColor('#555555'); // Grey_6
  }

  // 이메일 인증 코드 입력 change event
  const handleEmailCodeChange = (value) => {
    setEmailCode(value);
    setEmailCodeColor('#555555'); // Grey_6
  }

  // 회원가입 버튼
  const handleSubmit = async () => {
   
    const requestData = {
      profileUrl: profile,
      email: email,
      password: password,
      checkPassword: passwordConfirmation, 
      name: name,
      grade: grade,
      major: major,
      handle: handle,
      phoneNumber: phoneNumber,
    };
    console.log("requestData",requestData);
    try {
      const response = await axios.post('https://user-dev.kau-koala.com/sign-up', requestData);
      console.log("response",response.data);
      if (response.data["isSuccess"]) {
        console.log("회원가입 성공!");
        const result = await alert('회원가입이 완료되었습니다!');
        if (result) {
          navigate("/login");
        }
      } else {
        console.error("회원가입 실패:", response.data);
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      const errorMessage = error.response?.data?.result?.message || error.response?.data?.result?.email || error.response?.data?.result?.password || error.response?.data?.result || error.response?.data?.message || "회원가입 오류 발생";
      alert(String(errorMessage))  // 문자열로 변환 보장
    }
  };

  // 백준 유효 계정 인증하기 버튼
  const handleConfirmHandle = async () => {
    const requestData = {
      handle: handle,
    };
    try {
      const response = await axios.post('https://user-dev.kau-koala.com/sign-up/handle', requestData);
      console.log("response",response.data);
      if (response.data["isSuccess"]) {
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
      // setHandleMessage('등록되지 않은 계정입니다.');
      setHandleMessage(error.response.data.message);
    }
  };

  // 핸드폰 번호 인증번호 확인 버튼
  const handleConfirmPhone = async () => {
    const phone = phoneNumber.replace(/-/g, '');
   
    const requestData = {
      phoneNumber: phone,
      code: SMSCode
    };
    try {
      const response = await axios.post('https://user-dev.kau-koala.com/sign-up/phone-number', requestData);
      console.log("response",response.data);
      if (response.data["isSuccess"]) {
        console.log("핸드폰 번호 인증 성공!");
        setTimerStarted(false); // 타이머 off
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
      // setSMSMessage('인증번호가 일치하지 않습니다. 다시 인증을 진행해주세요.');
      setSMSMessage(error.response.data.message);
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
      const response = await axios.post('https://user-dev.kau-koala.com/sign-up/email', requestData);
      console.log("response",response.data);
      if (response.data["isSuccess"]) {
        console.log("이메일 인증 성공!");
        setIsEmailCodeValid(true);
        setEmailBorderColor('#3083F7'); // Blue_3
        setEmailMessageColor('#3083F7'); // Blue_3
        setEmailMessage('인증이 완료되었습니다.');
        setEmailCodeMessage('');
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
      type: "CERTIFICATION",
      emailList: [email],
    };
    try {
      const response = await axios.post('https://user-dev.kau-koala.com/email', requestData);
      console.log("response",response.data);
      if (response.data["isSuccess"]) {
        console.log("이메일 인증 코드 전송 성공!");
        setIsEmailValid(true);
        setEmailBorderColor('#00A5FF'); // Blue_0_Main
        setEmailMessageColor('#00A5FF'); // Blue_0_Main
        setEmailMessage('인증번호가 발송되었습니다.');
      } else {
        console.error("이메일 인증 코드 전송 실패:", response.data);
      }
    } catch (error) {
      console.error("이메일 인증 코드 전송 오류:", error);
      setIsEmailValid(false);
      setEmailBorderColor('#DC4A41'); // Red
      setEmailMessageColor('#DC4A41'); // Red
      setEmailMessage('사용할 수 없는 이메일입니다.');
      
    }
  };

  // SMS 인증 코드 전송 버튼 {인증하기 버튼}
  const handleSubmitSMS = async () => {
    const phone = phoneNumber.replace(/-/g, '');
   
    const requestData = {
      phoneNumber: phone,
    };
    try {
      const response = await axios.post('https://user-dev.kau-koala.com/sms/certification', requestData);
      console.log("response",response.data);
      if (response.data["isSuccess"]) {
        console.log("SMS 인증 코드 전송 성공!");
        setIsPhoneNumberValid(true);
        setPhoneBorderColor('#00A5FF'); // Blue_0_Main
        setPhoneMessageColor('#00A5FF'); // Blue_0_Main
        // setPhoneMessage('인증번호가 발송되었습니다.');
        setCount((prevCount) => {
          const newCount = prevCount + 1;
          setPhoneMessage(`인증번호가 발송되었습니다. (${newCount}/5)`);
          return newCount;
        });
        setTimerStarted(true); // 타이머 시작
        setTimerKey((prevKey) => prevKey + 1); // 타이머 리셋
        setIsSMSValid(false); // 인증코드 입력 활성화
      } else {
        console.error("SMS 인증 코드 전송 실패:", response.data);
      }
    } catch (error) {
      console.error("SMS 인증 코드 전송 오류:", error);
      setIsPhoneNumberValid(false);
      setPhoneBorderColor('#DC4A41'); // Red
      setPhoneMessageColor('#DC4A41'); // Red
      setPhoneMessage(error.response?.data?.result?.phoneNumber || error.response?.data?.message);
      
      // setPhoneMessage('사용할 수 없는 핸드폰 번호입니다.');
      // console.log(error.response.data.result.phoneNumber);
      
    }
  };

  return (
    <div>
      <itemS.Container>
        <itemS.InnerContainer>
          <itemS.Head3>회원가입</itemS.Head3>
          <div>
            <itemS.LIContainer>
              <itemS.Label>프로필 이미지</itemS.Label>
              <itemS.ProfileBox>
                <itemS.Profile src={profileUrl} alt='프로필이미지' />
                <itemS.Upload src='/img/camera.svg' alt='업로드' onClick={handleClick} />
              </itemS.ProfileBox>
             
              <itemS.HiddenFileInput
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </itemS.LIContainer>
            <itemS.LIContainer>
              <itemS.Label>이름</itemS.Label>
              <itemS.InputBox
                type="text"
                placeholder="이름을 입력해주세요."
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                style={{ border: nameBorderColor }}
              />
            </itemS.LIContainer>
            {!isNameValid && name.length > 0 ? (
            <itemS.ToggleErrorMessage>
              한글 및 영문만 입력 가능합니다.
            </itemS.ToggleErrorMessage>
          ) : (
            <itemS.Blank></itemS.Blank>
          )}
            <itemS.LIContainer>
              <itemS.BlankLabel>학년</itemS.BlankLabel>
              {/* <itemS.SelectBoxContainer style={{ border: `1px solid ${gradeColor}` }}> */}
                <itemS.GradeSelect
                  options={gradeOptions}
                  placeholder={gradePlaceholderText}
                  // defaultValue={gradeOptions[0]}
                  components={{ DropdownIndicator: null, IndicatorSeparator: null }}
                  isSearchable={false}
                  onChange={handleGradeChange}
                  isGradeSelected={isGradeSelected}
                />
                {/* <itemS.DropText>학년</itemS.DropText> */}
              {/* </itemS.SelectBoxContainer> */}
            </itemS.LIContainer>
            <itemS.LIContainer>
              <itemS.Label>학과</itemS.Label>
              {/* <itemS.SelectBoxContainer style={{ border: `1px solid ${majorColor}` }}> */}
                <itemS.MajorSelect
                  options={majorOptions}
                  placeholder={majorPlaceholderText}
                  // defaultValue={gradeOptions[0]}
                  components={{ DropdownIndicator: null, IndicatorSeparator: null }}
                  isSearchable={false}
                  onChange={handleMajorChange}
                  isMajorSelected={isMajorSelected}
                />
              {/* </itemS.SelectBoxContainer> */}
            </itemS.LIContainer>
          
            <itemS.LIContainer>
              <itemS.Label>백준 닉네임</itemS.Label>
              <itemS.InputConfirmBoxWrapper>
                <itemS.InputConfirmBox
                  type="text"
                  placeholder="백준닉네임을 입력해주세요."
                  value={handle}
                  onChange={(e) => handleHandleChange(e.target.value)}
                  style={{ border: `1px solid ${handleColor}` }}
                  disabled={isHandleValid}
                />
                <itemS.BtnConfirm onClick={handleConfirmHandle} disabled={isHandleValid}>
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
                style={{ border: pwdBorderColor }}
              />
            </itemS.LIContainer>
            {/* {!isPasswordValid && password.length > 0 && (
            <itemS.ErrorMessage>
              * 특수문자 1개 이상, 영문+숫자, 8~15자 이내로 설정해주세요.
            </itemS.ErrorMessage>
            )} */}
            {!isPasswordValid && password.length > 0 ? (
              <itemS.ToggleErrorMessage>
                * 특수문자 1개 이상, 영문+숫자, 8~15자 이내로 설정해주세요.
              </itemS.ToggleErrorMessage>
            ) : (
              <itemS.Blank></itemS.Blank>
            )}
        
            <itemS.LIContainer>
              <itemS.BlankLabel>비밀번호 확인</itemS.BlankLabel>
              <itemS.InputBox
                type="password"
                placeholder="비밀번호 확인"
                value={passwordConfirmation}
                onChange={(e) => handlePasswordConfirmChange(e.target.value)}
                style={{ border: pwdConfirmborderColor }}
              />
            </itemS.LIContainer>
            {/* {!isPasswordConfirmValid && passwordConfirmation.length > 0 && (
            <itemS.ErrorMessage>
              비밀번호가 일치하지 않습니다.
            </itemS.ErrorMessage>
            )} */}
            {!isPasswordConfirmValid && passwordConfirmation.length > 0 ? (
              <itemS.ToggleErrorMessage>
                비밀번호가 일치하지 않습니다.
              </itemS.ToggleErrorMessage>
            ) : (
              <itemS.Blank></itemS.Blank>
            )}
        
            <itemS.LIContainer>
              <itemS.BlankLabel>핸드폰 번호</itemS.BlankLabel>
              <itemS.InputConfirmBoxWrapper>
                <itemS.InputConfirmBox
                  type="text"
                  placeholder="000-0000-0000"
                  value={phoneNumber}
                  onChange={(e) => handlePhoneNumberChange(e.target.value)}
                  style={{ border: `1px solid ${phoneBorderColor}` }}
                  disabled={isSMSValid}
                />
                <itemS.BtnConfirm onClick={handleSubmitSMS} disabled={isSMSValid}>
                 {phoneConfirmBtnText}
                </itemS.BtnConfirm>
              </itemS.InputConfirmBoxWrapper>
              <itemS.CodeMessage
                style={{ color: `${phoneMessageColor}` }}
              >
                {phoneMessage}
              </itemS.CodeMessage>

              <itemS.InputConfirmTimerBoxWrapper>
                  <itemS.InputConfirmTimerBox maxlength="10"
                    type="text"
                    placeholder="인증코드"
                    value={SMSCode}
                    onChange={(e) => handleSMSCodeChange(e.target.value)}
                    style={{ border: `1px solid ${SMSColor}` }}
                    disabled={isSMSValid}
                  />
                  
                <itemS.BtnConfirm onClick={handleConfirmPhone} disabled={isSMSValid}>
                 인증번호 확인
                </itemS.BtnConfirm>
                  {timerStarted ? (
                      <itemS.TimerBox>
                        <itemS.TimerIcon src="/img/timer.svg" alt="Timer Icon"/>
                        <itemS.Timer>
                          <Timer 
                            key={timerKey} // 리렌더링
                            initialTime={180} 
                            onComplete={onComplete} 
                          />
                        </itemS.Timer>
                      </itemS.TimerBox>
                    ) : (
                      <div></div>
                    )}
              </itemS.InputConfirmTimerBoxWrapper>
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
                <itemS.BtnConfirm onClick={handleSubmitEmail} disabled={isEmailCodeValid}>
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
                <itemS.BtnConfirm onClick={handleConfirmEmail} disabled={isEmailCodeValid}>
                 인증번호 확인
                </itemS.BtnConfirm>
              </itemS.InputConfirmBoxWrapper>
            </itemS.LIContainer>
            <itemS.Message
              style={{ color: `${emailCodeColor}` }}
            >
              {emailCodeMessage}
            </itemS.Message>
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
