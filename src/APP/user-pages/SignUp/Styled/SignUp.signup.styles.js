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
  width: 1200px;
  background-color: ${tokens.colors.White};
  border: 1px solid ${tokens.colors.Grey_4};
  border-radius: 20px;
  padding: 280px;
`;

// 회원가입 head
export const Head3 = styled.div`
	${tokens.typography.H3_SB_40}
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
	margin-top: 10px;
`;

// 입력 박스
export const InputBox = styled.input`
	width: 590px;
	height: 56px;
	border: 1px solid ${tokens.colors.Grey_4};
	border-radius: 4px;
	${tokens.typography.B2_M_16}
	color: ${tokens.colors.Grey_4};
	padding: 0 10px;
	margin: 8px 0;
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
	color: ${tokens.colors.Grey_4};
	padding: 0 10px;
	margin: 8px 0;
`;

// 입력칸
// export const Input = styled.input`
// 	height: 56px;
//   ${tokens.typography.B2_M_16}
// 	color: ${tokens.colors.Grey_4};
// 	leading-trim: both;
// 	border: none;
// `;

// 회원가입 버튼
export const Btn = styled.button`
	${tokens.Btns.Btn_fill_disable}
`;

// 인증하기 버튼
export const BtnConfirm = styled.button`
	${tokens.Btns.Btn_fill_certi_disable}
	margin-left: 16px;
`;

// 버튼 텍스트
export const BtnText = styled.div`
	width: 70px;
	height: 14px;
	color: ${tokens.colors.White};
	${tokens.typography.T4_SB_20}
	leading-trim: both;
`;



// /* 사용할 수 없는 이메일입니다. */

// position: absolute;
// width: 160px;
// height: 10px;
// left: 305px;
// top: 1084px;

// /* B3_M_14 */
// font-family: 'Pretendard';
// font-style: normal;
// font-weight: 500;
// font-size: 14px;
// line-height: 18px;
// /* or 129% */
// /* leading-trim and text-edge are draft CSS properties.

// Read more: https://drafts.csswg.org/css-inline-3/#leading-trim
// */
// leading-trim: both;
// text-edge: cap;
// display: flex;
// align-items: center;

// color: #DC4A41;



// /* 인증받을 유효한 휴대폰 번호를 입력해주세요 */

// position: absolute;
// width: 244px;
// height: 10px;
// left: 305px;
// top: 866px;

// /* B3_M_14 */
// font-family: 'Pretendard';
// font-style: normal;
// font-weight: 500;
// font-size: 14px;
// line-height: 18px;
// /* or 129% */
// /* leading-trim and text-edge are draft CSS properties.

// Read more: https://drafts.csswg.org/css-inline-3/#leading-trim
// */
// leading-trim: both;
// text-edge: cap;
// display: flex;
// align-items: center;

// /* Gray-6 */
// color: #555555;








// /* Frame 4487145 */

// position: absolute;
// width: 140px;
// height: 56px;
// left: calc(50% - 140px/2 + 225px);
// top: 802px;

// /* B.Gray-7 */
// background: #5A677A;
// border-radius: 4px;


// /* 인증하기 */

// position: absolute;
// width: 56px;
// height: 11px;
// left: calc(50% - 56px/2);
// top: calc(50% - 11px/2 + 0.5px);

// /* B2_M_16 */
// font-family: 'Pretendard';
// font-style: normal;
// font-weight: 500;
// font-size: 16px;
// line-height: 21px;
// /* or 131% */
// /* leading-trim and text-edge are draft CSS properties.

// Read more: https://drafts.csswg.org/css-inline-3/#leading-trim
// */
// leading-trim: both;
// text-edge: cap;

// /* White */
// color: #FFFFFF;



// /* Frame 4487147 */

// position: absolute;
// width: 140px;
// height: 56px;
// left: calc(50% - 140px/2 + 225px);
// top: 1020px;

// /* Gray-4 */
// background: #CFCFCF;
// border-radius: 4px;


// /* 인증하기 */

// position: absolute;
// width: 56px;
// height: 11px;
// left: calc(50% - 56px/2);
// top: calc(50% - 11px/2 + 0.5px);

// /* B2_M_16 */
// font-family: 'Pretendard';
// font-style: normal;
// font-weight: 500;
// font-size: 16px;
// line-height: 21px;
// /* or 131% */
// /* leading-trim and text-edge are draft CSS properties.

// Read more: https://drafts.csswg.org/css-inline-3/#leading-trim
// */
// leading-trim: both;
// text-edge: cap;

// /* White */
// color: #FFFFFF;



// /* Frame 4487146 */

// position: absolute;
// width: 140px;
// height: 56px;
// left: calc(50% - 140px/2 + 225px);
// top: 894px;

// /* Gray-4 */
// background: #CFCFCF;
// border-radius: 4px;


// /* 인증번호 확인 */

// position: absolute;
// width: 87px;
// height: 11px;
// left: calc(50% - 87px/2 + 0.5px);
// top: calc(50% - 11px/2 + 0.5px);

// /* B2_M_16 */
// font-family: 'Pretendard';
// font-style: normal;
// font-weight: 500;
// font-size: 16px;
// line-height: 21px;
// /* or 131% */
// /* leading-trim and text-edge are draft CSS properties.

// Read more: https://drafts.csswg.org/css-inline-3/#leading-trim
// */
// leading-trim: both;
// text-edge: cap;

// /* White */
// color: #FFFFFF;



// /* Frame 4487148 */

// position: absolute;
// width: 140px;
// height: 56px;
// left: calc(50% - 140px/2 + 225px);
// top: 1112px;

// /* Gray-4 */
// background: #CFCFCF;
// border-radius: 4px;


// /* 인증번호 확인 */

// position: absolute;
// width: 87px;
// height: 11px;
// left: calc(50% - 87px/2 + 0.5px);
// top: calc(50% - 11px/2 + 0.5px);

// /* B2_M_16 */
// font-family: 'Pretendard';
// font-style: normal;
// font-weight: 500;
// font-size: 16px;
// line-height: 21px;
// /* or 131% */
// /* leading-trim and text-edge are draft CSS properties.

// Read more: https://drafts.csswg.org/css-inline-3/#leading-trim
// */
// leading-trim: both;
// text-edge: cap;

// /* White */
// color: #FFFFFF;



// /* Frame 4487144 */

// box-sizing: border-box;

// position: absolute;
// width: 434px;
// height: 56px;
// left: calc(50% - 434px/2 - 78px);
// top: 894px;

// /* Gray-4 */
// border: 1px solid #CFCFCF;
// border-radius: 4px;


// /* 비밀번호를 입력해주세요 */

// position: absolute;
// width: 157px;
// height: 11px;
// left: 17px;
// top: 22px;

// /* B2_M_16 */
// font-family: 'Pretendard';
// font-style: normal;
// font-weight: 500;
// font-size: 16px;
// line-height: 21px;
// /* or 131% */
// /* leading-trim and text-edge are draft CSS properties.

// Read more: https://drafts.csswg.org/css-inline-3/#leading-trim
// */
// leading-trim: both;
// text-edge: cap;

// /* Gray-4 */
// color: #CFCFCF;



// /* 이메일 */

// position: absolute;
// width: 52px;
// height: 14px;
// left: 305px;
// top: 990px;

// /* T4_SB_20 */
// font-family: 'Pretendard';
// font-style: normal;
// font-weight: 600;
// font-size: 20px;
// line-height: 26px;
// /* or 130% */
// /* leading-trim and text-edge are draft CSS properties.

// Read more: https://drafts.csswg.org/css-inline-3/#leading-trim
// */
// leading-trim: both;
// text-edge: cap;

// /* Gray-8 */
// color: #171717;



// /* 핸드폰 번호 */

// position: absolute;
// width: 92px;
// height: 14px;
// left: 305px;
// top: 772px;

// /* T4_SB_20 */
// font-family: 'Pretendard';
// font-style: normal;
// font-weight: 600;
// font-size: 20px;
// line-height: 26px;
// /* or 130% */
// /* leading-trim and text-edge are draft CSS properties.

// Read more: https://drafts.csswg.org/css-inline-3/#leading-trim
// */
// leading-trim: both;
// text-edge: cap;

// /* Gray-8 */
// color: #171717;



// /* Frame 4487139 */

// box-sizing: border-box;

// position: absolute;
// width: 590px;
// height: 56px;
// left: calc(50% - 590px/2);
// top: 550px;

// /* Gray-4 */
// border: 1px solid #CFCFCF;
// border-radius: 4px;


// /* 비밀번호를 입력해주세요 */

// position: absolute;
// width: 157px;
// height: 11px;
// left: 17px;
// top: 22px;

// /* B2_M_16 */
// font-family: 'Pretendard';
// font-style: normal;
// font-weight: 500;
// font-size: 16px;
// line-height: 21px;
// /* or 131% */
// /* leading-trim and text-edge are draft CSS properties.

// Read more: https://drafts.csswg.org/css-inline-3/#leading-trim
// */
// leading-trim: both;
// text-edge: cap;

// /* Gray-4 */
// color: #CFCFCF;



// /* Frame 4487140 */

// box-sizing: border-box;

// position: absolute;
// width: 590px;
// height: 56px;
// left: calc(50% - 590px/2);
// top: 676px;

// /* Gray-4 */
// border: 1px solid #CFCFCF;
// border-radius: 4px;


// /* 비밀번호를 다시 한번 입력해주세요 */

// position: absolute;
// width: 220px;
// height: 11px;
// left: 17px;
// top: 22px;

// /* B2_M_16 */
// font-family: 'Pretendard';
// font-style: normal;
// font-weight: 500;
// font-size: 16px;
// line-height: 21px;
// /* or 131% */
// /* leading-trim and text-edge are draft CSS properties.

// Read more: https://drafts.csswg.org/css-inline-3/#leading-trim
// */
// leading-trim: both;
// text-edge: cap;

// /* Gray-4 */
// color: #CFCFCF;



// /* 비밀번호 */

// position: absolute;
// width: 70px;
// height: 14px;
// left: 305px;
// top: 520px;

// /* T4_SB_20 */
// font-family: 'Pretendard';
// font-style: normal;
// font-weight: 600;
// font-size: 20px;
// line-height: 26px;
// /* or 130% */
// /* leading-trim and text-edge are draft CSS properties.

// Read more: https://drafts.csswg.org/css-inline-3/#leading-trim
// */
// leading-trim: both;
// text-edge: cap;

// /* Gray-8 */
// color: #171717;



// /* 비밀번호 확인 */

// position: absolute;
// width: 109px;
// height: 14px;
// left: 305px;
// top: 646px;

// /* T4_SB_20 */
// font-family: 'Pretendard';
// font-style: normal;
// font-weight: 600;
// font-size: 20px;
// line-height: 26px;
// /* or 130% */
// /* leading-trim and text-edge are draft CSS properties.

// Read more: https://drafts.csswg.org/css-inline-3/#leading-trim
// */
// leading-trim: both;
// text-edge: cap;

// /* Gray-8 */
// color: #171717;



// /* 회원가입 */

// position: absolute;
// width: 139px;
// height: 28px;
// left: calc(50% - 139px/2);
// top: 128px;

// /* H3_SB_40 */
// font-family: 'Pretendard';
// font-style: normal;
// font-weight: 600;
// font-size: 40px;
// line-height: 54px;
// /* or 135% */
// /* leading-trim and text-edge are draft CSS properties.

// Read more: https://drafts.csswg.org/css-inline-3/#leading-trim
// */
// leading-trim: both;
// text-edge: cap;

// /* Gray-8 */
// color: #171717;
