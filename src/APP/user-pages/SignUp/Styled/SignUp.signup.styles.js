import styled from 'styled-components';
import * as tokens from "../../../../tokens"


export const Container = styled.div`
  display: flex;
  justify-content: center; 
  
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
	margin-top: 74px;
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
	margin-top: 34px;
	margin-bottom: 10px;
`;

// 입력 박스
export const InputBox = styled.input`
	width: 590px;
	height: 56px;
	border: 1px solid ${tokens.colors.Grey_4};
	border-radius: 4px;
	${tokens.typography.B2_M_16}
	color: ${tokens.colors.Grey_8};
	padding: 0 10px;

	&::placeholder {
		color: ${tokens.colors.Grey_4}; 
	}

	// 텍스트 입력되어 있을 경우 border 색상변경
	&:not(:placeholder-shown) { 
		border: 1px solid ${tokens.colors.Grey_6};
	  }
`;

export const InputConfirmBoxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

// 입력+인증 박스
export const InputConfirmBox = styled.input`
	width: 434px;
	height: 56px;
	border: 1px solid ${tokens.colors.Grey_4};
	border-radius: 4px;
	${tokens.typography.B2_M_16}
	color: ${tokens.colors.Grey_8};
	padding: 0 10px;

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

//참고 코드
// export const InputF = styled.input`
//   &::placeholder {
//     color: #bdbdbd;
//   }
//   &:focus {
//     outline: none;

//     &::placeholder {
//       color: #C8C8C8;
//       font-size: 0.57rem;
//     }
//   }
// `;

// 입력칸
// export const Input = styled.input`
// 	height: 56px;
//   ${tokens.typography.B2_M_16}
// 	color: ${tokens.colors.Grey_4};
// 
// 	border: none;
// `;

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
`;

// 입력값 설명
export const DescriptionText = styled.div`
	color: ${tokens.colors.Grey_6};
	${tokens.typography.B3_M_14}
	margin-top: 4px;
	margin-bottom: 14px;
`;


export const ErrorMessage = styled.div`
	color: ${tokens.colors.Red};
	${tokens.typography.B3_M_14}
	margin-top: 4px;
	margin-bottom: 14px;
`;

