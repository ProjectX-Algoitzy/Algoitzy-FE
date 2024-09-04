import styled from "styled-components";
import * as tokens from "../../../../tokens";
import Select, { components } from 'react-select';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1.33rem;
  padding-bottom: 1.33rem;
  height: 100%;
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4.17rem;
  margin-bottom: 1.5rem;
  width: 33.04rem;
  ${tokens.typography.T1_SB_32};
  color: ${tokens.colors.Grey_8};
  padding-bottom: 0.67rem;
  border-bottom: 0.042rem solid ${tokens.colors.B_Grey_2};
`;

export const ComingSoonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 33.04rem;
  height: 15rem;
  background-color: ${tokens.colors.B_Grey_1};
  border-radius: 0.42rem;
  color: ${tokens.colors.B_Grey_5};
  ${tokens.typography.T3_B_24};
`;

// export const WeeksSelectContainer = styled(Select).attrs({
//   classNamePrefix: 'react-select',
// })`
//   .react-select__control {
//     display: flex;
//     /* text-align: center; */
//     width: 5.92rem;
//     height: 1.5rem;
//     color: ${tokens.colors.Grey_8};
//     ${tokens.typography.B3_M_14};
//     border: 0.042rem solid ${tokens.colors.B_Grey_3};
//     border-radius: 0.167rem;
//   }
//   .react-select__menu {
//     position: absolute;
//     top: -0.42rem;
//     left: -0.042rem;
//     width: 6.04rem;
//     height: 11.67rem;
//     border-radius: 0.167rem;
//     border: none;
//     box-shadow: 0 0.083rem 0.167rem rgba(0, 0, 0, 0.1);
//     font-weight: 600;
//     text-align: center;
//     ${tokens.typography.B3_M_14};
//   }
//   .react-select__option:not(:last-child) {
//     border-bottom: 0.042rem solid ${tokens.colors.B_Grey_2};
//   }
//   .react-select__option {
//     color: ${tokens.colors.Grey_8};
//     ${tokens.typography.B3_M_14};
//     border: none;
//   }
//   .react-select__option--is-selected:first-of-type {
//     background-color: rgba(102, 201, 255, 0.2);
//     backdrop-filter: blur(8px);
//     color: ${tokens.colors.Grey_8};
//     border-top-left-radius: 0.167rem;
//     border-top-right-radius: 0.167rem;
//     border: none;
//     ${tokens.typography.B3_M_14};
//     position: relative;
//     top: -0.17rem;
//   }
//   .react-select__option--is-selected:last-of-type {
//     background-color: rgba(102, 201, 255, 0.2);
//     backdrop-filter: blur(8px);
//     color: ${tokens.colors.Grey_8};
//     border-bottom-left-radius: 0.167rem;
//     border-bottom-right-radius: 0.167rem;
//     border: none;
//     ${tokens.typography.B3_M_14};
//   }
//   .react-select__option--is-selected:not(:first-of-type):not(:last-of-type) {
//     background-color: rgba(102, 201, 255, 0.2);
//     backdrop-filter: blur(8px);
//     color: ${tokens.colors.Grey_8};
//     border: none;
//     ${tokens.typography.B3_M_14};
//   }
//   .react-select__option--is-focused {
//     background-color: transparent;
//     cursor: pointer;
//   }
//   .react-select__option:active {
//     background-color: transparent;
//   }
//   .react-select__single-value {
//     width: 100%;
//     text-align: center;
//     padding-left: 1.13rem;
//   }
// `;

export const WeeksSelectContainer = styled(Select).attrs({
  classNamePrefix: 'react-select',
})`
  .react-select__control {
    display: flex;
    width: 5.92rem;
    height: 2rem;
    color: ${tokens.colors.Grey_8};
    ${tokens.typography.B3_M_14};
    border: 0.042rem solid ${tokens.colors.B_Grey_3};
    border-radius: 0.167rem;
    box-shadow: 0 0.042rem 0.083rem rgba(0, 0, 0, 0.1);
  }

  .react-select__menu {
    position: absolute;
    top: -0.5rem;
    left: 0.03rem;
    width: 100%;
    max-height: 14.5rem; /* Adjusted height to fit 8 items */
    border-radius: 0.167rem;
    border: none;
    box-shadow: 0 0.083rem 0.167rem rgba(0, 0, 0, 0.1);
    font-weight: 600;
    ${tokens.typography.B3_M_14};
    background-color: white; 
  }

  .react-select__option {
    color: ${tokens.colors.Grey_8};
    ${tokens.typography.B3_M_14};
    border: none;
    padding: 0.5rem;
    cursor: pointer; /* Ensure the cursor indicates interactiveness */
    display: flex;
    align-items: center; /* Vertically center-align text */
    justify-content: center; /* Horizontally center-align text */
  }

  .react-select__option:not(:last-child) {
    border-bottom: 0.042rem solid ${tokens.colors.B_Grey_2};
  }

  .react-select__option--is-selected {
    background-color: rgba(102, 201, 255, 0.2);
    backdrop-filter: blur(8px);
    color: ${tokens.colors.Grey_8};
    border: none;
    ${tokens.typography.B3_M_14};
  }

  .react-select__option--is-selected:first-of-type {
    border-top-left-radius: 0.167rem;
    border-top-right-radius: 0.167rem;
  }

  .react-select__option--is-selected:last-of-type {
    border-bottom-left-radius: 0.167rem;
    border-bottom-right-radius: 0.167rem;
  }

  .react-select__option--is-focused {
    background-color: rgba(102, 201, 255, 0.1);
    cursor: pointer;
  }

  .react-select__single-value {
    width: 100%;
    text-align: center;
    padding-left: 0.5rem;
  }
  .react-select__indicatorContainer {
    width: 1rem; 
    height: 1rem;
    align-items: center;
    justify-content: center;
    padding: 0;
}

  .css-1xc3v61-indicatorContainer {
      padding: 0; /* 패딩을 제거하여 여백 없애기 */
      height: auto; /* 높이를 자동으로 조정, 필요 시 특정 높이 지정 가능 */
      width: auto; /* 너비를 자동으로 조정, 필요 시 특정 너비 지정 가능 */
      display: flex; /* 플렉스 레이아웃 유지 */
      align-items: center; /* 아이콘을 수직 중앙에 정렬 */
      justify-content: center; /* 아이콘을 수평 중앙에 정렬 */
  }
`;


// 테이블 스타일 시작
export const TableContainer = styled.div`
  width: var(--common-width); /* 동일한 CSS 변수 사용 */
`;

export const Table = styled.table`
  width: 33.04rem;
  /* height: 18.63rem; */
  border-collapse: collapse;
  background-color: #fff;
  table-layout: fixed; /* 열 너비 고정 */
`;

export const TableHead = styled.th`
  background-color: ${tokens.colors.Grey_1};
  color: ${tokens.colors.Black};
  border-bottom: 0.042rem solid ${tokens.colors.B_Grey_4};
  padding-top: 0.71rem;
  padding-bottom: 0.71rem;
  text-align: left;
  ${tokens.typography.T5_SB_16};
  position: relative;

  /* 첫 번째 열: 백준 번호 */
  &:nth-child(1) {
    padding-left: 0.92rem;
  }

  /* 두 번째 열: 제목 */
  &:nth-child(2) {
    padding-left: 2.08rem;
  }

  /* 세 번째 열은 공백, 네 번째 열은 레벨 */
  &:nth-child(4) {
    padding-left: 2.5rem;
  }
`;

export const TableRow = styled.tr``;

export const TableCell = styled.td`
  text-align: left;
  padding-top: 0.71rem; 
  padding-bottom: 0.71rem;
  border-bottom: 0.042rem solid ${tokens.colors.B_Grey_3};
  ${tokens.typography.B2_M_16};

  /* 첫 번째 열: 백준 번호 */
  &:nth-child(1) {
    padding-left: 0.92rem;
  }

  /* 두 번째 열: 제목 */
  &:nth-child(2) {
    padding-left: 2.08rem;
  }

  /* 세 번째 열: 레벨 */
  &:nth-child(4) {
    padding-left: 2.5rem;
  }
`;
// 테이블 스타일 끝