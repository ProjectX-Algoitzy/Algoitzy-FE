// import React, { useState, useEffect, useContext  } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import * as itemS from "../../user-pages/Auth/Styled/Auth.login.styles"
// import request, { ACCESS_TOKEN } from '../../Api/request';
// import axios from 'axios';
// import { ConfirmContext } from '../../Common/Confirm/ConfirmContext';
// import { AlertContext } from '../../Common/Alert/AlertContext';
// import { LoginStateContext } from '../../Common/LoginState/LoginStateContext';

// export default function Login() {

//   const navigate = useNavigate();

//   //const { isLogin, setIsLogin } = useContext(LoginStateContext);

//   const { confirm } = useContext(ConfirmContext);
//   const { alert } = useContext(AlertContext);
//   const [isAlertOpen, setIsAlertOpen] = useState(false);  // Alert 창 열림 여부

// 	const [email, setEmail] = useState('');
// 	const [password, setPassword] = useState('');
//   const [emailCode, setEmailCode] = useState('');
//   const [isEmailCodeValid, setIsEmailCodeValid] = useState(false);
//   const [showEmailCodeInput, setShowEmailCodeInput] = useState(false);  // 이메일 인증번호 입력창의 표시 여부

//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === 'Enter' && !isAlertOpen) { // Alert 창이 열려있지 않을 때만 실행
//         event.preventDefault();
//         handleSubmit();
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);

//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [email, password, isAlertOpen, emailCode]);

//   // 이메일 인증 코드 전송 버튼
//   const handleSubmitEmail = async () => {
//     const requestData = {
//       type: "CERTIFICATION",
//       emailList: [email],
//     };
//     try {
//       const response = await axios.post('https://user-dev.kau-koala.com/email', requestData);
//       // console.log("response", response.data);
//       if (response.data["isSuccess"]) {
//         // console.log("이메일 인증 코드 전송 성공!");
//         setShowEmailCodeInput(true);  // 이메일 인증번호 입력창 표시
//       } else {
//         console.error("이메일 인증 코드 전송 실패:", response.data);
//       }
//     } catch (error) {
//       console.error("이메일 인증 코드 전송 오류:", error);
//     }
//   };

//   // 이메일 인증번호 확인 버튼
//   const handleConfirmEmail = async () => {
//     const requestData = {
//       email: email,
//       code: emailCode
//     };
//     try {
//       const response = await axios.post('https://user-dev.kau-koala.com/email/certification', requestData);
//       // console.log("response", response.data);
//       if (response.data["isSuccess"]) {
//         console.log("이메일 인증 성공!");
//         setIsEmailCodeValid(true);
//         handleSubmit(); // 이메일 인증이 완료되면 로그인 시도
//       } else {
//         console.error("이메일 인증 실패:", response.data);
//       }
//     } catch (error) {
//       console.error("이메일 인증 오류:", error);
//       alert(error.response.data.message);
//     }
//   };

//   // 로그인 버튼
//   // const handleSubmit = async () => {
//   //   if (!isEmailCodeValid && !showEmailCodeInput) {
//   //     handleSubmitEmail(); // 이메일 인증 코드 전송
//   //     return;
//   //   }

//   //   const requestData = {
//   //     email: email,
//   //     password: password,
//   //   };
//   //   try {
//   //     const response = await axios.post('https://user-dev.kau-koala.com/member/login', requestData);
//   //     // console.log("response", response);
//   //     localStorage.setItem(ACCESS_TOKEN, response.data.result.accessToken);
//   //     if (response.data["isSuccess"]) {
//   //       console.log("로그인 성공!");
//   //       navigate("/");
//   //       window.location.reload();
//   //     } else {
//   //       setIsAlertOpen(true);
//   //       alert(response.data.message || "로그인 실패")
//   //       .then(() => setIsAlertOpen(false));
//   //     }
//   //   } catch (error) {
//   //     setIsAlertOpen(true);
//   //     const errorMessage = error.response?.data?.result?.message || "로그인 오류 발생";
//   //     alert(String(errorMessage))
//   //     .then(() => setIsAlertOpen(false));
//   //     console.error("로그인 오류:", error);
//   //   }
//   // };

//   const handleSubmit = async () => {
//     // Step 1: Check if the account exists
//     const checkAccountRequestData = {
//         email: email,
//         password: password
//     };
//     try {
//         const checkAccountResponse = await axios.post('https://user-dev.kau-koala.com/member/check-account', checkAccountRequestData);
        
//         if (checkAccountResponse.data.result) {
//             // 계정이 존재하는 경우
//             if (!isEmailCodeValid && !showEmailCodeInput) {
//                 handleSubmitEmail(); // 이메일 인증 코드 전송
//                 return;
//             }

//             // Step 3: Handle login after email verification
//             const loginRequestData = {
//                 email: email,
//                 password: password,
//             };
//             try {
//                 const loginResponse = await axios.post('https://user-dev.kau-koala.com/member/login', loginRequestData);
//                 // console.log("response", loginResponse);
//                 localStorage.setItem(ACCESS_TOKEN, loginResponse.data.result.accessToken);
//                 if (loginResponse.data.isSuccess) {
//                     console.log("로그인 성공!");
//                     navigate("/");
//                     window.location.reload();
//                 } else {
//                     setIsAlertOpen(true);
//                     alert(loginResponse.data.message || "로그인 실패")
//                     .then(() => setIsAlertOpen(false));
//                 }
//             } catch (loginError) {
//                 setIsAlertOpen(true);
//                 const loginErrorMessage = loginError.response?.data?.result?.message || "로그인 오류 발생";
//                 alert(String(loginErrorMessage))
//                 .then(() => setIsAlertOpen(false));
//                 console.error("로그인 오류:", loginError);
//             }
//         } else {
//             // 계정이 존재하지 않는 경우
//             setIsAlertOpen(true);
//             alert("계정이 존재하지 않습니다.")
//             .then(() => setIsAlertOpen(false));
//         }
//     } catch (checkAccountError) {
//         setIsAlertOpen(true);
//         const checkAccountErrorMessage = checkAccountError.response?.data?.result?.message || "계정 확인 오류 발생";
//         alert(String(checkAccountErrorMessage))
//         .then(() => setIsAlertOpen(false));
//         console.error("계정 확인 오류:", checkAccountError);
//     }
// };


//   // // 로그인 버튼
//   // const handleSubmit = async () => {
   
//   //   const requestData = {
//   //     email: email,
//   //     password: password,
//   //   };
//   //   try {
//   //     const response = await axios.post('https://user-dev.kau-koala.com/member/login', requestData);
//   //     console.log("response",response);
//   //     localStorage.setItem(ACCESS_TOKEN, response.data.result.accessToken);
//   //     if (response.data["isSuccess"]) {
//   //       console.log("로그인 성공!");
//   //       navigate("/");
//   //       window.location.reload();
//   //     } else {
//   //       // console.error("로그인 실패:", response.data);
//   //       setIsAlertOpen(true);
//   //       alert(response.data.message || "로그인 실패")
//   //       .then(() => {
//   //         setIsAlertOpen(false);
//   //       }); // 실패 메시지가 없으면 기본 메시지 표시
//   //     }
//   //   } catch (error) {
//   //     setIsAlertOpen(true);
//   //     const errorMessage = error.response?.data?.result?.message || error.response?.data?.result?.email || error.response?.data?.result?.password || error.response?.data?.result || error.response?.data?.message || "로그인 오류 발생"; // 객체를 문자열로 변환하거나 기본 메시지 사용
//   //     alert(String(errorMessage))  // 문자열로 변환 보장
//   //     .then(() => {
//   //       setIsAlertOpen(false);
//   //     }); // 실패 메시지가 없으면 기본 메시지 표시
//   //     console.error("로그인 오류:", error);
//   //   }
//   // };

//   return (
//       <itemS.Container>
//         <itemS.InnerContainer>
//           <itemS.Head3>로그인</itemS.Head3>
// 						<itemS.Img src="/img/login.svg" alt="Icon"/>
//             <itemS.LoginIContainer>
//               <itemS.IIContainer>
//                 <itemS.InputBox
//                   type="text"
//                   placeholder="아이디(이메일)"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   disabled={showEmailCodeInput}
//                 />
//                 <itemS.Icon src="/img/uil_user.svg" alt="Icon"/>
//               </itemS.IIContainer>
//               <itemS.IIContainer>
//                 <itemS.InputBox
//                   type="password"
//                   placeholder="비밀번호"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   disabled={showEmailCodeInput}
//                   // style={{ border: pwdborderColor }}
//                 />
//                 <itemS.Icon src="/img/uil_lock.svg" alt="Icon"/>
//               </itemS.IIContainer>
// 							{/* <itemS.UtilBox>
// 								<itemS.CheckBox type="checkbox" />
// 								<itemS.NormText>자동 로그인</itemS.NormText>
// 							</itemS.UtilBox> */}
//               {showEmailCodeInput && (
//                 <itemS.IIContainer>
//                   <itemS.InputBox
//                     type="text"
//                     placeholder="이메일 인증번호"
//                     value={emailCode}
//                     onChange={(e) => setEmailCode(e.target.value)}
//                   />
//                   <itemS.Icon src="/img/uil_lock.svg" alt="Icon"/> {/* 이메일 인증 아이콘 추가 */}
//                   <itemS.Btn onClick={handleConfirmEmail}>인증번호 확인</itemS.Btn>
//                 </itemS.IIContainer>
//               )}
//             </itemS.LoginIContainer>
						
//           {/* <itemS.Btn onClick={handleSubmit}>
//             로그인
//           </itemS.Btn> */}
//           {!showEmailCodeInput && (
//             <itemS.Btn onClick={handleSubmit}>
//               로그인
//             </itemS.Btn>
//           )}
//           <itemS.UtilBox>
//             <itemS.RouteSignup onClick={() => navigate("/signup")}>
//               회원가입
//             </itemS.RouteSignup>
//             <itemS.UtilText onClick={() => navigate("/findemail")}>아이디</itemS.UtilText>
//             <itemS.UtilText>/</itemS.UtilText>
//             <itemS.UtilText onClick={() => navigate("/findpassword")}>
//               비밀번호 찾기
//             </itemS.UtilText>
//           </itemS.UtilBox>
//         </itemS.InnerContainer>
//       </itemS.Container>
//   )
// }

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
  const [isAlertOpen, setIsAlertOpen] = useState(false);  // Alert 창 열림 여부

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter' && !isAlertOpen) { // Alert 창이 열려있지 않을 때만 실행
        event.preventDefault();
        handleSubmit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [email, password, isAlertOpen]);

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
        navigate("/");
        window.location.reload();
      } else {
        // console.error("로그인 실패:", response.data);
        setIsAlertOpen(true);
        alert(response.data.message || "로그인 실패")
        .then(() => {
          setIsAlertOpen(false);
        }); // 실패 메시지가 없으면 기본 메시지 표시
      }
    } catch (error) {
      setIsAlertOpen(true);
      const errorMessage = error.response?.data?.result?.message || error.response?.data?.result?.email || error.response?.data?.result?.password || error.response?.data?.result || error.response?.data?.message || "로그인 오류 발생"; // 객체를 문자열로 변환하거나 기본 메시지 사용
      alert(String(errorMessage))  // 문자열로 변환 보장
      .then(() => {
        setIsAlertOpen(false);
      }); // 실패 메시지가 없으면 기본 메시지 표시
      console.error("로그인 오류:", error);
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
            Login
          </itemS.Btn>
          <itemS.UtilBox>
            <itemS.RouteSignup onClick={() => navigate("/signup")}>
              회원가입
            </itemS.RouteSignup>
            <itemS.UtilText>|</itemS.UtilText>
            <itemS.UtilText onClick={() => navigate("/findemail")}>아이디 찾기</itemS.UtilText>
            <itemS.UtilText>|</itemS.UtilText>
            <itemS.UtilText onClick={() => navigate("/findpassword")}>
              비밀번호 찾기
            </itemS.UtilText>
          </itemS.UtilBox>
        </itemS.InnerContainer>
      </itemS.Container>
  )
}
