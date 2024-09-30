import React, { useState, useEffect, useContext, useRef  } from 'react';
import axios from 'axios';
import request from '../../Api/request';
import { useNavigate, useLocation } from 'react-router-dom';
import * as itemS from "./Styled/EditMyInfo.editmyinfo.main.styles"
import Timer from '../SignUp/SignUp.timer';
import { AlertContext } from '../../Common/Alert/AlertContext';

const GIHO = '/<>  ';

const gradeOptions = [
  {value: 4, label:"4 학년"},
  {value: 3, label:"3 학년"},
  {value: 2, label:"2 학년"},
  {value: 1, label:"1 학년"}
]

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

export default function EditMyInfo() {
  
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
  const [fixName, setFixName] = useState(''); // 고정 이름
  const [grade, setGrade] = useState(gradeOptions[0]);
  const [major, setMajor] = useState('');
  const [handle, setHandle] = useState(''); 
  const [fixHandle, setFixHandle] = useState(''); // 고정 닉네임
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fixPhoneNumber, setFixPhoneNumber] = useState(''); // 고정 번호
  const [SMSCode, setSMSCode] = useState('');
  const [userRandomId, setUserRandomId] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false); // 비밀번호 변경 토글
  const [editText, setEditText] = useState('변경'); // 비밀번호 변경 버튼 텍스트 변경

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

  // 비밀번호 border 색상 
  const [newPwdBorderColor, setNewPwdBorderColor] = useState('1px solid #CFCFCF'); 
  // 비밀번호 확인 border 색상 
  const [newPwdConfirmBorderColor, setNewPwdConfirmBorderColor] = useState('1px solid #CFCFCF'); 

  // 핸드폰 및 인증코드 색상 및 메시지
  const [phoneBorderColor, setPhoneBorderColor] = useState('#CFCFCF'); // Grey_4 border 색상
  const [phoneMessageColor, setPhoneMessageColor] = useState('#171717'); // Grey_8 메시지 색상
  const [phoneMessage, setPhoneMessage] = useState('인증받을 유효한 휴대폰 번호를 입력해주세요.'); // 메시지
  const [SMSColor, setSMSColor] = useState('#CFCFCF'); // Grey_4 border 및 메시지 색상
  const [SMSMessage, setSMSMessage] = useState(''); // 메시지

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
  // 새 비밀번호 유효성 확인
  const [isNewPasswordValid, setIsNewPasswordValid] = useState(false);

  // 비밀번호 확인 유효성 확인 
  const [isNewPasswordConfirmValid, setIsNewPasswordConfirmValid] = useState(false);

  // 핸드폰 번호 및 인증 코드 유효성 확인
  const [isPhoneValid, setIsPhoneValid] = useState(false); // 핸드폰 번호 정규식 만족 여부
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false); // 핸드폰 번호 실제 사용 여부
  const [isSMSValid, setIsSMSValid] = useState(false);

  // 수정완료 버튼 색상 및 활성화/비활성화
  const [btnSubmitColor, setBtnSubmitColor] = useState(); // B_Grey_3
  const [isHandleAbled, setIsHandleAbled] = useState(true);  // 백준 닉네임
  const [isPhoneAbled, setIsPhoneAbled] = useState(true);  // 핸드폰 번호
  const [isAbled, setIsAbled] = useState(true); 
  // Blue_0_Main

  // 핸드폰 번호 '인증하기' text
  const [phoneConfirmBtnText, setPhoneConfirmBtnText] = useState("인증하기"); 

  // 개인정보 조회
  const fetchMyInfo = async () => {
    try {
      const response = await request.get(`/member/my-info`);

      if (response.isSuccess) {
        console.log("내 개인정보 조회 성공",response);
        setName(response.result.name);
        setFixName(response.result.name);
        setGrade(response.result.grade);
        setMajor(response.result.major);
        setHandle(response.result.handle);
        setFixHandle(response.result.handle);
        setProfileUrl(response.result.profileUrl);
        setPhoneNumber(response.result.phoneNumber);
        setFixPhoneNumber(response.result.phoneNumber);
        setEmail(response.result.email);

        setIsNameValid(NameRegex.test(response.result.name));
        if (!NameRegex.test(response.result.name) && response.result.name.trim().length > 0) {
          setNameBorderColor('1px solid #DC4A41'); // Red
        } else {
          // setNameBorderColor('1px solid #555555'); // Grey_6
        }
        

      } else {
        console.error("내 개인정보 조회 실패:", response);
      }
    } catch (error) {
      console.error('내 개인정보 조회 오류', error);
    }
      
  };

  useEffect(() => {
    fetchMyInfo();
  }, []);

  useEffect(() => {
    const isAllValid = isHandleAbled && isPhoneAbled;
    setBtnSubmitColor(isAllValid ? '#00A5FF' : '#D2D9E5');
    setIsAbled(isAllValid);
  }, [isHandleAbled, isPhoneAbled]);

  // 프로필 이미지 파일 업로드
  const handleFileChange = async (event) => {
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
    // if (!NameRegex.test(value) && value.trim().length > 0) {
    //   setNameBorderColor('1px solid #DC4A41'); // Red
    // } else {
    //   setNameBorderColor('1px solid #555555'); // Grey_6
    // }
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
    if (value === fixHandle) {
      setIsHandleAbled(true);
      // setBtnSubmitColor('#00A5FF'); // Blue_Main_0
    } else {
      setIsHandleAbled(false);
      // setBtnSubmitColor('#D2D9E5'); // B_Grey_3
    }
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

  // 새 비밀번호 입력 change event
  const handleNewPasswordChange = (value) => {
    setNewPassword(value);
    setIsNewPasswordValid(PasswordRegex.test(value));
    if (!PasswordRegex.test(value) && value.trim().length > 0) {
      setNewPwdBorderColor('1px solid #DC4A41'); // Red
    } else {
      setNewPwdBorderColor('1px solid #555555'); // Grey_6
    }
  }

  // 비밀번호 확인 입력 change event
  const handleNewPasswordConfirmChange = (value) => {
    setNewPasswordConfirmation(value);
    setIsNewPasswordConfirmValid(value === newPassword);
    if (value !== newPassword && value.trim().length > 0) {
      setNewPwdConfirmBorderColor('1px solid #DC4A41'); // Red
    } else {
      setNewPwdConfirmBorderColor('1px solid #555555'); // Grey_6
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

    if (value.replace(/-/g, '') === fixPhoneNumber) {
      setIsPhoneAbled(true);
      // setBtnSubmitColor('#00A5FF'); // Blue_Main_0
    } else {
      setIsPhoneAbled(false);
      // setBtnSubmitColor('#D2D9E5'); // B_Grey_3
    }
  }

  // 핸드폰 번호 인증 코드 입력 change event
  const handleSMSCodeChange = (value) => {
    setSMSCode(value);
    setSMSColor('#555555'); // Grey_6
  }

  // 수정완료 버튼
  const handleSubmit = async () => {
   
    const requestData = {
      profileUrl: profile,
      name: name,
      grade: grade,
      major: major,
      handle: handle,
      password: newPassword,
      checkPassword: newPasswordConfirmation, 
      phoneNumber: phoneNumber,
    };
    console.log("requestData",requestData);
    try {
      const response = await request.patch('/member', requestData);
      console.log("response",response);
      if (response["isSuccess"]) {
        console.log("개인정보 수정 성공!");
        const result = await alert('수정 완료되었습니다.');
        if (result) {
          window.location.replace('/mypage');
        }
      } else {
        console.error("개인정보 수정 실패:", response.data);
      }
    } catch (error) {
      console.error("개인정보 수정 오류:", error);
    
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
        setIsHandleAbled(true); // 기존이랑 다르더라고 인증 성공시 수정 버튼 활성화
        // setBtnSubmitColor('#00A5FF'); // Blue_Main_0
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
        setIsPhoneAbled(true); // 수정 완료 버튼 활성화
        // setBtnSubmitColor('#00A5FF'); // Blue_Main_0
      } else {
        console.error("핸드폰 번호 인증 실패:", response.data);
        setSMSColor('#DC4A41'); // REd
        setSMSMessage('인증번호가 일치하지 않습니다. 다시 인증을 진행해주세요.');
      }
    } catch (error) {
      console.error("핸드폰 번호 인증 오류:", error);
      setIsSMSValid(false);
      setSMSColor('#DC4A41'); // REd
      setSMSMessage(error.response.data.message);
      setPhoneConfirmBtnText("다시 인증하기");
    }
  };

  // SMS 인증 코드 전송 버튼 {인증하기 버튼}
  const handleSubmitSMS = async () => {
    const phone = phoneNumber.replace(/-/g, '');
   
    const requestData = {
      phoneNumber: phone,
      userRandomId: userRandomId
    };
    try {
      const response = await axios.post('https://user-dev.kau-koala.com/sms/certification', requestData);
      console.log("response",response.data);
      if (response.data["isSuccess"]) {
        console.log("SMS 인증 코드 전송 성공!");
        setIsPhoneNumberValid(true);
        setPhoneBorderColor('#00A5FF'); // Blue_0_Main
        setPhoneMessageColor('#00A5FF'); // Blue_0_Main
        setUserRandomId(response.data.result); // sms 인증코드 랜덤 string
        // setPhoneMessage('인증번호가 발송되었습니다.');
        setCount((prevCount) => {
          const newCount = prevCount + 1;
          setPhoneMessage(`인증번호가 발송되었습니다. (${newCount}/5)`);
          return newCount;
        });
        setTimerStarted(true); // 타이머 시작
        setTimerKey((prevKey) => prevKey + 1); // 타이머 리셋
        setIsSMSValid(false); // 인증코드 입력 활성화
        setIsPhoneAbled(false); // 수정 완료 버튼 비활성화 
        // setBtnSubmitColor('#D2D9E5'); // B_Grey_3
      } else {
        console.error("SMS 인증 코드 전송 실패:", response.data);
      }
    } catch (error) {
      console.error("SMS 인증 코드 전송 오류:", error);
      setIsPhoneNumberValid(false);
      setPhoneBorderColor('#DC4A41'); // Red
      setPhoneMessageColor('#DC4A41'); // Red
      setPhoneMessage(error.response?.data?.result?.phoneNumber || error.response?.data?.message);

    }
  };

  const toggleEditMode = async (text) => {
    const requestData = {
      password: password
    };
    // 조건 분기문을 try 블록 외부로 이동
    if (text === '변경') {
      try {
        const response = await request.post(`/member/check-password`, requestData);
        
        if (response.result) {
          console.log("비밀번호 일치 여부 성공", response);
          setEditText('취소');  // 버튼 텍스트를 '취소'로 변경
          setIsEditing((prev) => !prev); // 편집 모드 토글
        } else {
          console.error("내 개인정보 조회 실패:", response);
          alert('잘못된 비밀번호입니다.');
        }
      } catch (error) {
        console.error('내 개인정보 조회 오류', error);
      }
    } else if (text === '취소') {
      // 텍스트가 '취소'일 경우 API 요청 없이 상태를 '변경'으로 토글
      setEditText('변경');  // 버튼 텍스트를 다시 '변경'으로 설정
      setIsEditing((prev) => !prev); // 편집 모드 토글
    }
  };
  
  

  return (
    <div>
      <itemS.Container>
        <itemS.InnerContainer>
          <itemS.Head3>내 정보 수정</itemS.Head3>
          <div>
            <itemS.LIContainer>
              <itemS.Label>프로필 이미지</itemS.Label>
              <itemS.ProfileContainer>
                <itemS.ProfileBox>
                  <itemS.Profile src={profileUrl} alt='프로필이미지' />
                  <itemS.Upload src='/img/camera.svg' alt='업로드' onClick={handleClick} />
                </itemS.ProfileBox>
                <itemS.NameBox>
                  <itemS.Name>{fixName}</itemS.Name>
                  <itemS.Handle>{GIHO}{fixHandle}</itemS.Handle>
                </itemS.NameBox>
              </itemS.ProfileContainer>
  
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
              <itemS.BlankLabel>이메일</itemS.BlankLabel>
              <itemS.EmailBox
                type="text"
                value={email}
                readOnly 
              />
            </itemS.LIContainer>
            <itemS.LIContainer>
              <itemS.Label>학년</itemS.Label>
              {/* <itemS.SelectBoxContainer style={{ border: `1px solid ${gradeColor}` }}> */}
                <itemS.GradeSelect
                  options={gradeOptions}
                  // placeholder={gradePlaceholderText}
                  value={gradeOptions.find(option => option.value === grade)}
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
                value={majorOptions.find(option => option.value === major)} 
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
              <itemS.InputConfirmBoxWrapper>
                <itemS.InputPwdBox
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  style={{ border: pwdBorderColor }}
                />
                <itemS.BtnEdit onClick={() => toggleEditMode(editText)}>
                  {/* {isEditing ? "취소" : "변경"} */}{editText}
                </itemS.BtnEdit>
              </itemS.InputConfirmBoxWrapper>
            </itemS.LIContainer>
            {!isPasswordValid && password.length > 0 ? (
              <itemS.ToggleErrorMessage>
                * 특수문자 1개 이상, 영문+숫자, 8~15자 이내로 설정해주세요.
              </itemS.ToggleErrorMessage>
            ) : (
              <itemS.Blank></itemS.Blank>
            )}

            {isEditing && (
              <>
                <itemS.LIContainer>
                  <itemS.InputBox
                    type="password"
                    placeholder="새 비밀번호를 입력해주세요."
                    value={newPassword}
                    onChange={(e) => handleNewPasswordChange(e.target.value)}
                    style={{ border: newPwdBorderColor }}
                  />
                </itemS.LIContainer>
                {!isNewPasswordValid && newPassword.length > 0 ? (
                  <itemS.ToggleErrorMessage>
                    * 특수문자 1개 이상, 영문+숫자, 8~15자 이내로 설정해주세요.
                  </itemS.ToggleErrorMessage>
                ) : (
                  <itemS.Blank></itemS.Blank>
                )}

                <itemS.LIContainer>
                  <itemS.InputBox
                    type="password"
                    placeholder="새 비밀번호를 한번 더 입력해주세요."
                    value={newPasswordConfirmation}
                    onChange={(e) => handleNewPasswordConfirmChange(e.target.value)}
                    style={{ border: newPwdConfirmBorderColor }}
                  />
                </itemS.LIContainer>
                {!isNewPasswordConfirmValid && newPasswordConfirmation.length > 0 ? (
                  <itemS.ToggleErrorMessage>
                    비밀번호가 일치하지 않습니다.
                  </itemS.ToggleErrorMessage>
                ) : (
                  <itemS.Blank></itemS.Blank>
                )}
              </>
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
            
            
          </div>
          <itemS.Btn 
            onClick={handleSubmit}
            style={{ backgroundColor: `${btnSubmitColor}` }}
            disabled={!isAbled}
          >
            수정 완료
          </itemS.Btn>
        </itemS.InnerContainer>
        {/* <itemS.DeleteInfo>계정 삭제하기</itemS.DeleteInfo> */}
      </itemS.Container>
    </div>
  );
}
