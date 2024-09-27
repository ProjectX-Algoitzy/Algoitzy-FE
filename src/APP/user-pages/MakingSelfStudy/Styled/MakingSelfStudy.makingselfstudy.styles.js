// import styled from 'styled-components';
// import * as tokens from "../../../../tokens";


// export const Container = styled.div`
//   display: flex;
//   justify-content: center; 
//   align-items: center;
//   // background-color: ${tokens.colors.Blue_0_Main};
// `;

// export const InnerContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   border: 0.042rem solid ${tokens.colors.B_Grey_3};
//   background-color: white;
//   border-radius: 0.167rem;
//   padding: 0 12.71rem;
//   margin: 6.67rem 0;
// `;


// // 모달 외부  #121721 49%
// // export const Backdrop = styled.div`
// //   position: absolute;
// //   top: 0;
// //   left: 0;
// //   width: 100%;
// //   display: flex;
// //   justify-content: center;
// //   align-items: flex-start;
// //   background-color: ${tokens.colors.Blue_0_Main};
// //   padding: 5.29rem 0 14.88rem 0px;
// //   z-index: 1001;
// // `;

// // 안쪽 컨테이너 너비
// // export const InnerContainer = styled.div`
// //   display: flex;
// //   flex-direction: column;
// //   width: 38.33rem;
// // `;

// // 스터디 지원 분야
// export const StudyNameContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-top: 5rem;
//   margin-bottom: 2.75rem;
// `;

// // Title
// export const Title = styled.div`
//   ${tokens.typography.T1_SB_32};
//   color: ${tokens.colors.Grey_8};
// `;

// // 스터디 이름
// export const StudyName = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 8.75rem;
//   height: 2rem;
//   ${tokens.typography.T5_SB_16};
//   color: ${tokens.colors.Blue_0_Main};
//   background-color: rgba(0, 165, 255, 0.1);
// `;

// // 지원서 컨테이너
// export const InnerInnerContainer = styled.div`
//   display: flex;
//   flex-direction: column;
// `;


// // 라벨+입력 컨테이너
// export const LIContainer = styled.div`
// 	display: flex;
// 	flex-direction: column;
// `;

// // 입력값 라벨
// export const Label = styled.label`
// 	height: 1rem;
// 	${tokens.typography.T4_SB_20}
// 	color: ${tokens.colors.Grey_8};
// 	margin-top: 1.33rem;
// 	margin-bottom: 0.42rem;
// `;

// // 입력 text박스
// export const InputBox = styled.input`
// 	width: 24.58rem;
// 	height: 2.33rem;
// 	border: 0.042rem solid ${tokens.colors.Grey_4};
// 	border-radius: 0.167rem;
// 	${tokens.typography.B2_M_16}
// 	color: ${tokens.colors.Grey_8};
// 	padding: 0 0.42rem;
// 	margin-bottom: 0.17rem;

// 	&::placeholder {
// 		color: ${tokens.colors.Grey_4}; 
// 	}

// 	// 텍스트 입력되어 있을 경우 border 색상변경
// 	&:not(:placeholder-shown) { 
// 		border: 0.042rem solid ${tokens.colors.Grey_6};
// 	  }
// `;

// // 입력 textarea박스
// export const InputAreaBox = styled.textarea`
// 	width: 24.58rem;
// 	height: 7.92rem;
// 	border: 0.042rem solid ${tokens.colors.Grey_4};
// 	border-radius: 0.167rem;
// 	${tokens.typography.B2_M_16}
// 	color: ${tokens.colors.Grey_8};
// 	padding: 0.71rem 0.42rem;
// 	margin-bottom: 0.17rem;
//   resize: none; 
//   // box-sizing: border-box; 

// 	&::placeholder {
// 		color: ${tokens.colors.Grey_4}; 
// 	}
// 	// 텍스트 입력되어 있을 경우 border 색상변경
// 	&:not(:placeholder-shown) { 
// 		border: 0.042rem solid ${tokens.colors.Grey_6};
// 	  }
//   vertical-align: top; 
// `;

// // 입력 drag박스
// export const InputDragBox = styled.div`
//   width: 13rem;
//   height: 9.33rem;
//   border: 0.042rem dashed ${tokens.colors.B_Grey_4};
//   border-radius: 0.167rem;
//   ${tokens.typography.B2_M_16}
//   color: ${tokens.colors.Grey_8};
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   text-align: center;
//   padding: 0 0.42rem;
//   margin-bottom: 0.17rem;
//   background-color: ${tokens.colors.B_Grey_1};
//   cursor: pointer;

//   &::placeholder {
//     color: ${tokens.colors.Grey_4};
//   }

//   // &:hover {
//   //   border-color: ${tokens.colors.Grey_6};
//   // }
// `;

// export const HiddenFileInput = styled.input`
//   display: none;
// `;

// export const DragDropText = styled.span`
//   font-family: Pretendard;
//   font-weight: 500;
//   font-size: 0.67rem;
//   line-height: 0.875rem;
//   color: ${tokens.colors.B_Grey_7};
//   margin-right: 0.17rem;
// `;

// export const UploadText = styled.span`
//   ${tokens.typography.T5_SB_16};
//   color: ${tokens.colors.Blue_0_Main};
// `;

// // 버튼 컨테이너
// export const BtnContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 24.58rem;
// `;

// // 확정하기 버튼 
// export const DecisionBtn = styled.button`
//   ${tokens.Btns.Btn_fill_default};
//   margin: 2.67rem 0 6rem 0;
// `;

import styled from "styled-components";
import * as tokens from "../../../../tokens";

export const BackGroundContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  align-items: center;
  background-image: url('/img/login.png');
  min-height: 100%;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4.167rem; 
  margin-bottom: 4.708rem; 
  width: 50rem; 
  height: auto;
  background-color: white;
  border-radius: 0.333rem; 
  box-shadow: 0rem 0.167rem 0.417rem 0.167rem rgba(58, 107, 135, 0.2); 
`;

export const StyledPageName = styled.div`
  margin-top: 5rem; 
  margin-bottom: 3.333rem; 
  color: ${tokens.colors.Grey_8};
  ${tokens.typography.H3_SB_40};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 24.583rem;
`;

export const LittleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-bottom: 1.333rem; 
`;

export const StyledTitle = styled.div`
  margin-bottom: 0.417rem;
  color: ${tokens.colors.Grey_8};
  ${tokens.typography.T4_SB_20};
`;

export const FileUploadContainer = styled.div`
  width: 100%;
  height: 9.333rem; 
  border: 0.042rem dashed ${tokens.colors.B_Grey_4}; 
  background-color: #f7f8fc;
  border-radius: 0.333rem; 
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${tokens.colors.B_Grey_7};
  ${tokens.typography.B2_M_16};
  transition: border-color 0.3s;
  position: relative;

  &:hover {
    border-color: #aaaaaa;
  }

  &.dragActive {
    border-color: #000000;
  }
`;

export const HighlightText = styled.span`
  color: ${tokens.colors.Blue_0_Main};
`;

export const ImagePreview = styled.div` /* 이미지 미리보기를 위한 스타일 */
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 0.208rem; 
  }
`;

export const StyledInput = styled.input`
  box-sizing: border-box;
  border-radius: 0.167rem;
  border: none;
  border: 0.042rem solid ${tokens.colors.Grey_4}; 
  width: 24.583rem;
  height: 2.333rem; 
  color: ${tokens.colors.Grey_7};
  ${tokens.typography.B3_M_14};
  padding-left: 0.667rem;
  &::placeholder {
    color: ${tokens.colors.Grey_4};
  }

  &:focus {
    outline: none;
  }
`;

export const Btn = styled.button` /*다음 버튼*/
  margin-left: 0.667rem; 
  width: 16.167rem; 
  height: 2rem; 
  border-radius: 0.167rem;
  border: none;
  cursor: pointer;
  color: ${tokens.colors.White};
  ${tokens.typography.T5_SB_16};
  background-color: ${tokens.colors.Blue_0_Main};
`;
