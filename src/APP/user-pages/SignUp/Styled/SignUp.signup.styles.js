import styled from 'styled-components';
import * as tokens from "../../../../tokens"
import Select from 'react-select';


export const Container = styled.div`
  display: flex;
  justify-content: center; 
  background-image: url('/img/login.png');
  
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  background-color: ${tokens.colors.White};
  border: 1px solid ${tokens.colors.Grey_4};
  border-radius: 20px;
  padding: 128px 305px;
  margin-top: 60px;
`;

// 회원가입 head
export const Head3 = styled.div`
	${tokens.typography.H3_SB_40}
	margin-top: 78px;
`;

// 라벨+입력 컨테이너
export const LIContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

// 입력값 라벨
export const Label = styled.label`
	height: 24px;
	${tokens.typography.T4_SB_20}
	color: ${tokens.colors.Grey_8};
	margin-top: 30px;
	margin-bottom: 10px;
`;

// 입력 박스
export const InputBox = styled.input`
	width: 570px;
	height: 54.4px;
	border: 1px solid ${tokens.colors.Grey_4};
	border-radius: 4px;
	${tokens.typography.B2_M_16}
	color: ${tokens.colors.Grey_8};
	padding: 0 10px;
	margin-bottom: 4px;

	&::placeholder {
		color: ${tokens.colors.Grey_4}; 
	}

	// 텍스트 입력되어 있을 경우 border 색상변경
	&:not(:placeholder-shown) { 
		border: 1px solid ${tokens.colors.Grey_6};
	  }
	
`;

// 셀렉트 박스 컨테이너
export const SelectBoxContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;

	width: 570px;
	height: 54.4px;
	border: 1px solid ${tokens.colors.Grey_4};
	border-radius: 4px;
	padding: 0 10px;
	margin-bottom: 4px;
	
`;

// 셀렉트 박스 컨테이너 텍스트
export const DropText = styled.div`
  ${tokens.typography.B2_M_16};
  color: ${tokens.colors.Grey_8};
  margin: 0 4px;
`;


// 입력+인증 컨테이너
export const InputConfirmBoxWrapper = styled.div`
  display: flex;
  align-items: center;
`;
// 입력+인증 박스
export const InputConfirmBox = styled.input`
	width: 414px;
	height: 54.4px;
	border: 1px solid ${tokens.colors.Grey_4};
	border-radius: 4px;
	${tokens.typography.B2_M_16}
	color: ${tokens.colors.Grey_8};
	padding: 0 10px;
	margin-bottom: 4px;

	&::placeholder {
		color: ${tokens.colors.Grey_4}; 
	}

	// 텍스트 입력되어 있을 경우 border 색상변경
	&:not(:placeholder-shown) { 
		border: 1px solid ${tokens.colors.Grey_6};
	  }

	// 텍스트 입력되어 있을 경우 해당 InputConfirmBox 구성 요소 바로 뒤에 오는 버튼 색상 변경
	&:not(:placeholder-shown) + button {
		background-color: ${tokens.colors.B_Grey_7};
	}
	
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
	width: 414px;
	height: 54.4px;
	border: 1px solid ${tokens.colors.Grey_4};
	border-radius: 4px;
	${tokens.typography.B2_M_16}
	color: ${tokens.colors.Grey_8};
	padding: 0 10px;
	margin-bottom: 4px;

	&::placeholder {
		color: ${tokens.colors.Grey_4}; 
	}

	// 텍스트 입력되어 있을 경우 border 색상변경
	&:not(:placeholder-shown) { 
		border: 1px solid ${tokens.colors.Grey_6};
	  }

	// 텍스트 입력되어 있을 경우 해당 InputConfirmBox 구성 요소 바로 뒤에 오는 버튼 색상 변경
	&:not(:placeholder-shown) + button {
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
	top: 10px;
	left: 329px;
	width: 67px;
	height: 18px;
	background-color: rgba(251, 170, 132, 0.2);
	border-radius: 4px;
	padding: 9px 14px; 
`;
export const TimerIcon = styled.img`
	width: 18px;
	height: 18px;
	margin-right: 4px;
`;
export const Timer = styled.div`
  display: flex;
  align-items: center;
	justify-content: center;
	width: 45px;
	height: 18px;
	${tokens.typography.B3_M_14};
	color: ${tokens.colors.Sub_3};
	// background-color: rgba(251, 170, 132, 0.2);
	border-radius: 4px;
`;

// 회원가입 버튼
export const Btn = styled.button`
	${tokens.Btns.Btn_fill_disable}
	color: ${tokens.colors.White};
	${tokens.typography.T4_SB_20}
	margin-top: 100px;
	
`;

// 인증하기 버튼
export const BtnConfirm = styled.button`
	${tokens.Btns.Btn_fill_certi_disable}
	color: ${tokens.colors.White};
	${tokens.typography.B2_M_16}
	margin-left: 16px;
	margin-bottom: 4px;
`;

// 입력값 설명
export const CodeMessage = styled.div`
	color: ${tokens.colors.Grey_6};
	${tokens.typography.B3_M_14}
	margin-bottom: 14px;
`;

// 에러 메시지
export const ErrorMessage = styled.div`
	color: ${tokens.colors.Red};
	${tokens.typography.B3_M_14}
	margin-bottom: 14px;
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
  width: 224px;
  height: 224px;
  border: 1px dashed ${tokens.colors.B_Grey_4};
  border-radius: 8px;
  ${tokens.typography.B2_M_16}
  color: ${tokens.colors.Grey_8};
  padding: 0 10px;
  margin-bottom: 4px;
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
  font-family: Pretendard;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  color: ${tokens.colors.B_Grey_7};
	margin-bottom: 8px;
`;

export const UploadText = styled.span`
  ${tokens.typography.T5_SB_16};
  color: ${tokens.colors.Blue_0_Main};
`;

export const FileName = styled.span`
  ${tokens.typography.B3_M_14};
  color: ${tokens.colors.B_Grey_7};
	margin-top: 8px;
`;




export const GradeSelect = styled(Select).attrs({
  classNamePrefix: 'react-select',
})`
.react-select__control {
  // width: 42px;
  // height: 24px;
  color: ${tokens.colors.Grey_8};
  ${tokens.typography.B3_M_14};
  border: 1px solid ${tokens.colors.B_Grey_3};
  border-radius: 4px;
  text-align: center;
  justify-content: center;
}

.react-select__menu {
  position: absolute;
  top: -10px;  
  left: -2px;
  width: 50px;
  height: 145px; 
  border-radius: 4px;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-weight: 600;
  text-align: center;
  ${tokens.typography.B3_M_14};
  overflow: hidden; /* Hide scrollbar */
}

.react-select__menu-list {
  max-height: 145px;
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

.react-select__option:not(:last-child) {
  border-bottom: 1px solid ${tokens.colors.B_Grey_2};
}

.react-select__option {
  color: ${tokens.colors.Grey_8};
  ${tokens.typography.B3_M_14};
  border: none;
}

.react-select__option--is-selected:first-of-type {
  background-color: ${tokens.colors.White};
  backdrop-filter: blur(8px);
  color: ${tokens.colors.Grey_8};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border: none;
  ${tokens.typography.B3_M_14};
  position: relative;
  top: -4px;
}

.react-select__option--is-selected:last-of-type {
  background-color: ${tokens.colors.White};
  backdrop-filter: blur(8px);
  color: ${tokens.colors.Grey_8};
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border: none;
  ${tokens.typography.B3_M_14};
}

.react-select__option--is-selected:not(:first-of-type):not(:last-of-type) {
  background-color: ${tokens.colors.White};
  backdrop-filter: blur(8px);
  color: ${tokens.colors.Grey_8};
  border: none;
  ${tokens.typography.B3_M_14};
}

.react-select__option--is-focused {
  background-color: transparent;
  cursor: pointer;
}

.react-select__option:active {
  background-color: transparent;
}

.react-select__option:hover {
  background-color: rgba(102, 201, 255, 0.2);
}
`;

export const MajorSelect = styled(Select).attrs({
  classNamePrefix: 'react-select',
})`
.react-select__control {
  // width: 42px;
  // height: 24px;
  color: ${tokens.colors.Grey_8};
  ${tokens.typography.B3_M_14};
  border: 1px solid ${tokens.colors.B_Grey_3};
  border-radius: 4px;
  text-align: center;
  justify-content: center;
}

.react-select__menu {
  position: absolute;
  top: -10px;  
  left: -2px;
  width: 250px;
  height: 145px; 
  border-radius: 4px;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-weight: 600;
  text-align: center;
  ${tokens.typography.B3_M_14};
  overflow: hidden; /* Hide scrollbar */
}

.react-select__menu-list {
  max-height: 145px;
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

.react-select__option:not(:last-child) {
  border-bottom: 1px solid ${tokens.colors.B_Grey_2};
}

.react-select__option {
  color: ${tokens.colors.Grey_8};
  ${tokens.typography.B3_M_14};
  border: none;
}

.react-select__option--is-selected:first-of-type {
  background-color: ${tokens.colors.White};
  backdrop-filter: blur(8px);
  color: ${tokens.colors.Grey_8};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border: none;
  ${tokens.typography.B3_M_14};
  position: relative;
  top: -4px;
}

.react-select__option--is-selected:last-of-type {
  background-color: ${tokens.colors.White};
  backdrop-filter: blur(8px);
  color: ${tokens.colors.Grey_8};
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border: none;
  ${tokens.typography.B3_M_14};
}

.react-select__option--is-selected:not(:first-of-type):not(:last-of-type) {
  background-color: ${tokens.colors.White};
  backdrop-filter: blur(8px);
  color: ${tokens.colors.Grey_8};
  border: none;
  ${tokens.typography.B3_M_14};
}

.react-select__option--is-focused {
  background-color: transparent;
  cursor: pointer;
}

.react-select__option:active {
  background-color: transparent;
}

.react-select__option:hover {
  background-color: rgba(102, 201, 255, 0.2);
}
`;