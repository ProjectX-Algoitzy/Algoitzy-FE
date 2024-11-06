import styled from 'styled-components';
import * as tokens from "../../../../tokens";
import Select from 'react-select';


export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

export const EditorHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.5rem;
`

export const TitleInput = styled.textarea`
  width: 100%;
  height: auto;
  color: ${({ hasText }) => hasText ? tokens.colors.B_Grey_8 : tokens.colors.B_Grey_6}; /* hasText에 따라 색상 변경 */
	${tokens.typography.H2_SB_48}
  font-family: 'Pretendard', sans-serif;
  border: 1px solid #ffffff;
  outline: none;
  resize: none;
  overflow: hidden;
`;

export const Divider = styled.div`
  width: 4.3rem;
  height: 0.1rem;
  background-color: ${tokens.colors.B_Grey_4}; /* 구분선 색상 */
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

export const GradeSelect = styled(Select).attrs({
  classNamePrefix: 'react-select',
})`
.react-select__control {
  width: 100%;
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
  top: -0.43rem;  
  width: 100%;
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

export const CategorySelect = styled.div`
  width: 100%;
  color: ${tokens.colors.B_Grey_8};
	${tokens.typography.B2_M_16}
  padding: 10px;
  border: 1px solid ${tokens.colors.B_Grey_3};
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Toolbar = styled.div`
  position: sticky; /* 스크롤 시 상단 고정 */
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  button {
    background: none;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    padding: 0.2rem;
    color: #666;
    &:hover {
      color: #333;
    }
  }
  img {
    width: 0.8rem;
    height: 0.8rem;
  }
  span {
    color: #ccc;
  }
`;

export const EditorContainer = styled.div`
  padding: 1rem;
  flex: 1;
  border: 1px solid #ffffff;
  font-size: 0.8rem;
  font-family: 'Pretendard', sans-serif;
  line-height: 1.6;
  overflow-y: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  .cm-editor.cm-focused {
    outline: none;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  h3 {
    margin-top: 0;
  }
  input {
    width: 100%;
    padding: 8px;
    margin: 10px 0;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  button {
    margin: 5px;
    padding: 8px 12px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    &:first-of-type {
      background-color: #00A5FF;
      color: white;
    }
    &:last-of-type {
      background-color: #5A677A;
      color: white;
    }
  }
`;

export const FileContainer = styled.div`
  display: flex;
  color: ${tokens.colors.B_Grey_8};
	${tokens.typography.B2_M_16}
  padding: 0.8rem;
  border: 1px solid ${tokens.colors.B_Grey_3};
  border-radius: 4px;
  gap: 1rem;
`;

export const FileList = styled.div`
`;

export const FileLabel = styled.div`
`;

export const FileItem = styled.div`
  color: #555;
  gap: 0.2rem;
`;