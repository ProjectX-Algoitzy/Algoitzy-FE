import styled from 'styled-components';
import * as tokens from "../../../../tokens"
import Select from 'react-select';


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  background-image: url('/img/bg-myinfo.svg');
  
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  background-color: ${tokens.colors.White};
  border: 0.042rem solid ${tokens.colors.B_Grey_4};
  border-radius: 0.83rem;
  padding: 5.33rem 12.71rem;
  margin: 5rem 0 2.7rem 0;
  box-shadow: 0 0.125rem 0.75rem 0 rgba(0, 0, 0, 0.08);
`;

export const DeleteInfo = styled.div`
  ${tokens.typography.T5_SB_16}
  color: ${tokens.colors.Black};
  border-bottom: 0.042rem solid ${tokens.colors.Black};
  margin-bottom: 5.875rem;
  cursor: pointer;
`;

// 회원가입 head
export const Head3 = styled.div`
  ${tokens.typography.H3_SB_40}
  margin-top: 3.25rem;
`;

// 라벨+입력 컨테이너
export const LIContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

// 입력값 라벨
export const Label = styled.label`
  height: 1rem;
  ${tokens.typography.T4_SB_20}
  color: ${tokens.colors.Grey_8};
  margin-top: 1.25rem;
  margin-bottom: 0.42rem;
`;

// 토글 에러 메시지 아래 라벨
export const BlankLabel = styled.label`
  height: 1rem;
  ${tokens.typography.T4_SB_20}
  color: ${tokens.colors.Grey_8};
  margin-bottom: 0.42rem;
`;

// 입력 박스
export const EmailBox = styled.input`
  width: 23.75rem;
  height: 2.27rem;
  border: 0.042rem solid ${tokens.colors.Grey_4};
  border-radius: 0.17rem;
  ${tokens.typography.B2_M_16}
  color: ${tokens.colors.B_Grey_5};
  padding: 0 0.42rem;
  margin-bottom: 0.17rem;
  cursor: default;

  &:focus {
    border: 0.042rem solid ${tokens.colors.Grey_4}; 
    outline: none; // 기본 outline 제거
  
`;

export const InputBox = styled.input`
  width: 23.75rem;
  height: 2.27rem;
  border: 0.042rem solid ${tokens.colors.Grey_4};
  border-radius: 0.17rem;
  ${tokens.typography.B2_M_16}
  color: ${tokens.colors.Grey_8};
  padding: 0 0.42rem;
  margin-bottom: 0.17rem;

  &::placeholder {
    color: ${tokens.colors.Grey_4}; 
  }

  // 텍스트 입력되어 있을 경우 border 색상변경
  &:not(:placeholder-shown) { 
    border: 0.042rem solid ${tokens.colors.Grey_6};
  }
  
`;

// 셀렉트 박스 컨테이너
// export const SelectBoxContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-start;
//   align-items: center;

//   width: 23.75rem;
//   height: 2.27rem;
//   border: 0.042rem solid ${tokens.colors.Grey_4};
//   border-radius: 0.17rem;
//   padding: 0 0.42rem;
//   margin-bottom: 0.17rem;
// `;

// 셀렉트 박스 컨테이너 텍스트
// export const DropText = styled.div`
//   ${tokens.typography.B2_M_16};
//   color: ${tokens.colors.Grey_8};
//   margin: 0 0.17rem;
// `;


// 입력+인증 컨테이너
export const InputConfirmBoxWrapper = styled.div`
  display: flex;
  align-items: center;
`;
// 입력+인증 박스
export const InputConfirmBox = styled.input`
  width: 17.25rem;
  height: 2.27rem;
  border: 0.042rem solid ${tokens.colors.Grey_4};
  border-radius: 0.17rem;
  ${tokens.typography.B2_M_16}
  color: ${tokens.colors.Grey_8};
  padding: 0 0.42rem;
  margin-bottom: 0.17rem;


  &::placeholder {
    color: ${tokens.colors.Grey_4}; 
  }

  // 텍스트 입력되어 있을 경우 border 색상변경
  &:not(:placeholder-shown) { 
    border: 0.042rem solid ${tokens.colors.Grey_6};
  }

  // 텍스트 입력되어 있을 경우 해당 InputConfirmBox 구성 요소 바로 뒤에 오는 버튼 색상 변경
  &:focus + button {
    background-color: ${tokens.colors.B_Grey_7};
  }
  
`;

// 비밀번호 입력+인증 박스
export const InputPwdBox = styled.input`
  width: 19.7rem;
  height: 2.27rem;
  border: 0.042rem solid ${tokens.colors.Grey_4};
  border-radius: 0.17rem;
  ${tokens.typography.B2_M_16}
  color: ${tokens.colors.Grey_8};
  padding: 0 0.42rem;
  margin-bottom: 0.17rem;

  &::placeholder {
    color: ${tokens.colors.Grey_4}; 
  }

  // 텍스트 입력되어 있을 경우 border 색상변경
  &:not(:placeholder-shown) { 
    border: 0.042rem solid ${tokens.colors.Grey_6};
  }

  // 텍스트 입력되어 있을 경우 해당 InputConfirmBox 구성 요소 바로 뒤에 오는 버튼 색상 변경
  // &:focus + button {
  //   background-color: ${tokens.colors.B_Grey_7};
  // }
  
`;

// 타이머용 스타일들
// 입력+인증 타이머 컨테이너
export const InputConfirmTimerBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;
// 입력+인증 타이머 박스
export const InputConfirmTimerBox = styled.input`
  width: 17.25rem;
  height: 2.27rem;
  border: 0.042rem solid ${tokens.colors.Grey_4};
  border-radius: 0.17rem;
  ${tokens.typography.B2_M_16}
  color: ${tokens.colors.Grey_8};
  padding: 0 0.42rem;
  margin-bottom: 0.17rem;

  &::placeholder {
    color: ${tokens.colors.Grey_4}; 
  }

  // 텍스트 입력되어 있을 경우 border 색상변경
  &:not(:placeholder-shown) { 
    border: 0.042rem solid ${tokens.colors.Grey_6};
    }

  // 텍스트 입력되어 있을 경우 해당 InputConfirmBox 구성 요소 바로 뒤에 오는 버튼 색상 변경
  &:focus + button {
    background-color: ${tokens.colors.B_Grey_7};
  }
  
  // 최대 길이 설정
  &[maxlength] {
    maxlength: ${props => props.maxlength};
  }
`;

export const TimerBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  position: absolute;
  top: 0.42rem;
  left: 13.71rem;
  // width: 2.79rem;
	// height: 0.75rem;
	width: 3rem;
	height: 1.5rem;
  background-color: rgba(251, 170, 132, 0.2);
  border-radius: 0.17rem;
  padding: 0.375rem 0.58rem; 
`;
export const TimerIcon = styled.img`
  width: 0.75rem;
  height: 0.75rem;
  margin-right: 0.17rem;
`;
export const Timer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.88rem;
  height: 0.75rem;
  ${tokens.typography.B3_M_14};
  color: ${tokens.colors.Sub_3};
  border-radius: 0.17rem;
`;

// 회원가입 버튼
export const Btn = styled.button`
  ${tokens.Btns.Btn_fill_disable}
  background-color: ${tokens.colors.Blue_0_Main};
  color: ${tokens.colors.White};
  ${tokens.typography.T4_SB_20}
  margin-top: 4.17rem;
  
`;

// 인증하기 버튼
export const BtnConfirm = styled.button`
  ${tokens.Btns.Btn_fill_certi_disable}
  // background-color: ${tokens.colors.B_Grey_3};
  color: ${tokens.colors.White};
  ${tokens.typography.B2_M_16}
  margin-left: 0.67rem;
  margin-bottom: 0.17rem;
`;

// 변경 버튼
export const BtnEdit = styled.button`
  width: 3.417rem;
  height: 2.34rem;
  background-color: ${tokens.colors.White};
  color: ${tokens.colors.Grey_8};
  ${tokens.typography.B2_M_16}
  border-radius: 0.17rem;
  margin-left: 0.67rem;
  margin-bottom: 0.17rem;
  cursor: pointer;
`;

// 입력값 설명
export const CodeMessage = styled.div`
  color: ${tokens.colors.Grey_6};
  ${tokens.typography.B3_M_14}
  margin-bottom: 0.58rem;
`;

// 에러 메시지
export const ErrorMessage = styled.div`
  color: ${tokens.colors.Red};
  ${tokens.typography.B3_M_14}
  margin-bottom: 0.58rem;
`;

// 토글(on/ff) 에러 메시지
export const ToggleErrorMessage = styled.div`
  width: 24.67rem;
  color: ${tokens.colors.Red};
  ${tokens.typography.B3_M_14}
  margin-bottom: 0.1rem;
`;

export const Blank = styled.div`
  width: 24.67rem;
  height: 0.85rem;
`;

// 백준 계정 인증 확인 메시지
export const Message = styled.div`
  ${tokens.typography.B3_M_14}
`;


// 입력 drag박스
export const InputDragBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 9.33rem;
  height: 9.33rem;
  border: 0.042rem dashed ${tokens.colors.B_Grey_4};
  border-radius: 0.33rem;
  ${tokens.typography.B2_M_16}
  color: ${tokens.colors.Grey_8};
  padding: 0 0.42rem;
  margin-bottom: 0.17rem;
  background-color: ${tokens.colors.B_Grey_1};
  cursor: pointer;

  &::placeholder {
    color: ${tokens.colors.Grey_4};
  }

  // &:hover {
  //   border-color: ${tokens.colors.Grey_6};
  // }
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const DragDropText = styled.span`
  font-weight: 500;
  font-size: 0.67rem;
  line-height: 0.875rem;
  color: ${tokens.colors.B_Grey_7};
  margin-bottom: 0.33rem;
`;

export const UploadText = styled.span`
  ${tokens.typography.T5_SB_16};
  color: ${tokens.colors.Blue_0_Main};
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;  
  justify-content: flex-start;
  width: 23.75rem;
`;

export const ProfileBox = styled.div`
  position: relative;
  width: 5.2rem;
  height: 5.2rem;
  margin-top: 0.33rem;
  margin-right: 1.1rem;
`;

export const Profile = styled.img`
  width: 5.2rem;
  height: 5.2rem;
  border-radius: 4.67rem;
  
  // border: 1px solid ${tokens.colors.Grey_4};
`;

export const Upload = styled.img`
  position: absolute;
  width: 1.62rem;
  height: 1.62rem;
  border-radius: 0.81rem;
  z-index: 999;
  bottom: 0;
  right: 0;
  cursor: pointer;
`;

export const NameBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;  
  justify-content: center;
`;

export const Name = styled.div`
  ${tokens.typography.T3_B_24};
  color: ${tokens.colors.Black};
`;

export const Handle = styled.div`
  ${tokens.typography.T5_SB_16};
  color: ${tokens.colors.Blue_0_Main};
  
`;
// export const FileName = styled.span`
//   ${tokens.typography.B3_M_14};
//   color: ${tokens.colors.B_Grey_7};
//  margin-top: 8px;
// `;




export const GradeSelect = styled(Select).attrs({
  classNamePrefix: 'react-select',
})`
.react-select__control {
  width: 23.75rem;
  height: 2.25rem;
  color: ${tokens.colors.Grey_8};
  ${tokens.typography.B3_M_14};
  border: ${(props) => (props.isGradeSelected ? `0.042rem solid ${tokens.colors.Grey_6}` : `0.042rem solid ${tokens.colors.B_Grey_3}`)};
  border-radius: 0.17rem;
  text-align: center;
  cursor: pointer;
}

.react-select__menu {
  position: absolute;
  top: -0.42rem;  
  left: -0.08rem;
  width: 23.96rem;
  border-radius: 0.17rem;
  border: none;
  box-shadow: 0 0.08rem 0.17rem rgba(0, 0, 0, 0.1);
  font-weight: 600;
  text-align: center;
  ${tokens.typography.B3_M_14};
  overflow: hidden; /* Hide scrollbar */
}

.react-select__menu-list {
  // max-height: 220px;
  overflow-y: auto;
  /* Hide scrollbar for WebKit-based browsers (Chrome, Safari, etc.) */
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  /* Hide scrollbar for Firefox */
  scrollbar-width: none;
  /* Hide scrollbar for Internet Explorer and Edge */
  -ms-overflow-style: none;
}

.react-select__option {
  display: flex;
  align-items: center; /* Align text vertically center */
  justify-content: center; /* Align text horizontally center */
  height: 2.25rem;
  color: ${tokens.colors.Grey_8};
  ${tokens.typography.B3_M_14};
  border: none;
  text-align: center; /* Center the text */
}

.react-select__option:not(:last-child) {
  border-bottom: 0.042rem solid ${tokens.colors.B_Grey_2};
}

.react-select__option--is-selected {
  background-color: ${tokens.colors.White};
  backdrop-filter: blur(0.33rem);
  color: ${tokens.colors.Grey_8};
  border: none;
  ${tokens.typography.B3_M_14};
}

.react-select__option--is-focused {
  background-color: rgba(102, 201, 255, 0.2);
  cursor: pointer;
}

.react-select__option:active {
  background-color: rgba(102, 201, 255, 0.2);
}

.react-select__option:hover {
  background-color: rgba(102, 201, 255, 0.2);
}
`;

export const MajorSelect = styled(Select).attrs({
  classNamePrefix: 'react-select',
})`
.react-select__control {
  width: 23.75rem;
  height: 2.25rem; 
  color: ${tokens.colors.Grey_8};
  ${tokens.typography.B3_M_14};
  border: ${(props) => (props.isMajorSelected ? `0.042rem solid ${tokens.colors.Grey_6}` : `0.042rem solid ${tokens.colors.B_Grey_3}`)};
  border-radius: 0.17rem;
  text-align: center;
  cursor: pointer;
}

.react-select__menu {
  position: absolute;
  top: -0.42rem;
  left: -0.08rem;
  width: 23.96rem;
  border-radius: 0.17rem;
  border: none;
  box-shadow: 0 0.08rem 0.17rem rgba(0, 0, 0, 0.1);
  font-weight: 600;
  text-align: center;
  ${tokens.typography.B3_M_14};
  overflow: hidden;
}

.react-select__menu-list {
  max-height: 9.17rem;
  overflow-y: auto;
  /* Hide scrollbar for WebKit-based browsers (Chrome, Safari, etc.) */
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  /* Hide scrollbar for Firefox */
  scrollbar-width: none;
  /* Hide scrollbar for Internet Explorer and Edge */
  -ms-overflow-style: none;
}

.react-select__option {
  display: flex;
  align-items: center; /* Align text vertically center */
  justify-content: center; /* Align text horizontally center */
  height: 2.25rem;
  color: ${tokens.colors.Grey_8};
  ${tokens.typography.B3_M_14};
  border: none;
  text-align: center; /* Center the text */
}

.react-select__option:not(:last-child) {
  border-bottom: 0.042rem solid ${tokens.colors.B_Grey_2};
}

.react-select__option--is-selected {
  background-color: ${tokens.colors.White};
  backdrop-filter: blur(8px);
  color: ${tokens.colors.Grey_8};
  border: none;
  ${tokens.typography.B3_M_14};
}

.react-select__option--is-focused {
  background-color: rgba(102, 201, 255, 0.2);
  cursor: pointer;
}

.react-select__option:active {
  background-color: rgba(102, 201, 255, 0.2);
}

.react-select__option:hover {
  background-color: rgba(102, 201, 255, 0.2);
}
`;

