import styled from "styled-components";
import * as tokens from "../../../../tokens";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5rem;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 0.5rem;
  margin-top: 6.25rem;
`;

export const ContentForTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${tokens.colors.White};
  border-radius: 0.167rem;
  width: 33.04rem;
  padding: 0.5rem 1.292rem 0.333rem 0.583rem;
  box-shadow: 0px 0.083rem 0.125rem 0.083rem #D6DaF0;
`;

export const ApplicationName = styled.div`
  display: flex;
  flex-direction: column;
  ${tokens.typography.H2_SB_48};
  color: ${tokens.colors.Grey_8};
  margin-left: 1rem;
  justify-content: center; 
  background-color: ${tokens.colors.White};
  margin-top: 1.833rem;
  width: 31.042rem;
  padding-bottom: 0.667rem;
`;

export const StudySelectContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${tokens.typography.B3_M_14};
  margin-left: 1rem;
  margin-bottom: 1.667rem;
  width: 8.75rem;
  height: 2rem;
  border: none;
  border-radius: 0.167rem;
  background-color: rgba(102, 201, 255, 0.2); 
  backdrop-filter: blur(8px); 
  color: ${tokens.colors.Blue_0_Main};
`;

export const SecondInnerContainer = styled.div` /*문항들 하나하나를 감싸주는 컨테이너*/
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 0.417rem;
`;

export const ContentContainer = styled.div` /* 하나의 질문 전체를 담아주는 컨테이너 */
  display: flex;
  flex-direction: column;
  background-color: ${tokens.colors.White};
  border-radius: 0.167rem;
  padding: 1.333rem 1.292rem 0.333rem 1rem;
  /* width: 33.04rem; */
  width: 50rem;
  box-shadow: 0px 0.083rem 0.125rem 0.083rem #D6DaF0; 
`;

export const QuestionAndMultiSelectCheckContainer = styled.div` /* 질문과 그 옆의 복수 응답 부분까지를 다 감싸주는 컨테이너 */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const QuestionContainer = styled.div` /* 질문과 필수답변 여부를 감싸주는 컨테이너*/
  display: flex;
  flex-direction: row; 
  border: none;
  ${tokens.typography.T5_SB_16};
  color: ${tokens.colors.Grey_8};
  white-space: pre-wrap;
`;

export const NecessaryImg = styled.img` /*필수질문일 때 넣을 별표이미지를 꾸며주는 스타일드 컴포넌트*/
  width: 0.5rem;
  height: 0.5rem;
  margin-left: 0.333rem;
`;

export const MultiselectImg = styled.img` /*객관식 복수일 때 넣을 '복수응답' 이미지를 꾸며주는 스타일드 컴포넌트 */
  width: 3.167rem;
  height: 1.208rem;
`;

export const SelectAndAnswerContainer = styled.div` /*주관식 응답과 객관식 응답(보기)부분을 모두 감싸주는 컨테이너 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// export const AnswerInputContainer = styled.textarea` /*스터디원이 주관식 질문에 답하기 위한 input콘테이너 */  
//   margin-top: 0.667rem;
//   height: 2rem;
//   width: 100%;
//   border: none;
//   border-bottom: 1px solid ${tokens.colors.B_Grey_4};
//   ${tokens.typography.B2_M_16};
//   resize: none;
//   overflow: hidden; /* 스크롤 숨기기 */

//   &::placeholder {
//     color: ${tokens.colors.Grey_5};
//   }

//   &:focus {
//     outline: none; /* 클릭 시 테두리 제거 */
//   }
// `;

export const AnswerInputContainer = styled.textarea`
  margin-top: 0.667rem;
  width: 100%;
  height: auto;
  border: none;
  border-bottom: 1px solid ${tokens.colors.B_Grey_4};
  ${tokens.typography.B2_M_16};
  resize: none;
  overflow: hidden; /* 스크롤 숨기기 */

  &::placeholder {
    color: ${tokens.colors.Grey_5};
  }

  &:focus {
    outline: none; /* 클릭 시 테두리 제거 */
  }
`;

export const SelectContainer = styled.div` /*객관식 보기 및 추가버튼을 모두 감싸주는 컨테이너 */
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 0.667rem;
  align-items: center;
  justify-content: center;
`;

export const OptionsContainer = styled.div` /*객관식 보기들과 그 보기 지우기 버튼을 모두 감싸주는 컨테이너 */
  display: flex;
  position: relative;
  flex-direction: row;
  width: 100%;
  height: 100%;
  align-items: center;
  margin-bottom: 1.167rem;
`;

export const SquareCheckBox = styled.input`
  appearance: none;
  border: none;
  width: 0.833rem;
  height: 0.833rem;
  cursor: pointer;
	background-image: url('/img/checkboxicon.png');
  &:checked {
    background-image: url('/img/checkedicon.png');
    width: 1rem;
    height: 1rem;
    margin-left: 0.083rem;
  }
`;

export const CircleCheckBox = styled.input`
  appearance: none;
  border: none;
  width: 0.833rem;
  height: 0.833rem;
  margin-right: 2.5rem;
  margin-left: 1rem;
  cursor: pointer;
	background-image: url('/img/iconcircle.png');
  &:checked {
    background-image: url('/img/checkedcircleicon.png');
    width: 1rem;
    height: 1rem;
    margin-right: 2.417rem;
    margin-left: 0.917rem;
  }
`;

export const ChoiceForSelectQuestionContainer = styled.div` /* 객관식 문항의 보기input들을 감싸주는 컨테이너 */
  padding-left: 0.5rem;
  border: none;
  ${tokens.typography.B3_M_14};
`;

export const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center; 
  width: 100%;
  height: 4rem;

  position: fixed;
  bottom: 0; /* 아래쪽으로 고정 */
  left: 0; /* 왼쪽으로 고정 */
  background-color: rgba(255, 255, 255, 0.1); 
  backdrop-filter: blur(200px); 
  z-index: 1000; 
`;

export const BtnContainer2 = styled.div`
  display: flex;
  flex-direction: row;
  // margin-left: 23.5rem;
`;

export const ArbitaryBtn = styled.button` /* 임시 저장하기 버튼*/
  width: 16.167rem;
	height: 2rem;
  border-radius: 0.167rem;
	border: none;
	cursor: pointer;
	color: ${tokens.colors.White};
	${tokens.typography.T5_SB_16}
  background-color: ${tokens.colors.B_Grey_7};
`;

export const Btn = styled.button` /*저장하기 버튼*/
  width: 16.167rem;
	height: 2rem;
  border-radius: 0.167rem;
	border: none;
	cursor: pointer;
	color: ${tokens.colors.White};
	${tokens.typography.T5_SB_16}
  background-color: ${tokens.colors.Blue_0_Main};
  margin-left: 3.042rem;
  @media only screen and (max-width: 600px) {
    margin-left: 1rem;
  }
`;