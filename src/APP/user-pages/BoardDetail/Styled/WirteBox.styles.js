import styled from 'styled-components';
import * as tokens from "../../../../tokens"

export const Container = styled.div`
  
`;

export const WriteBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  background-color: ${tokens.colors.White};
  width: 1016px;
  padding: 20px 20px 20px 16px;
  border: 1px solid ${tokens.colors.B_Grey_2};
`;

export const InputBox = styled.input`
	width: 800px;
	height: 28px;
	${tokens.typography.B2_M_16};
	color: ${tokens.colors.Black};
  margin-right: 100px;
  border: none;
  
	&::placeholder {
		color: ${tokens.colors.Grey_3}; 
	}

  &:focus {
    outline: none; /* 포커스 시 outline 제거 */
    border: none;  /* 포커스 시 border 제거 */
  }

  // 텍스트 입력되어 있을 경우 해당 InputConfirmBox 구성 요소 바로 뒤에 오는 버튼 색상 변경
  &:not(:placeholder-shown) + button {
    background-color: ${tokens.colors.B_Grey_7};
  }
`;

export const SubmitBtn = styled.button`
  ${tokens.typography.B2_M_16};
  background-color: ${tokens.colors.B_Grey_3};
  color: ${tokens.colors.White};
  width: 80px;
  height: 30px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;