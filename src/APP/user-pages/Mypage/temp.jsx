// Inquiry.inquiry.main.styles.js 
// import styled, { css } from 'styled-components';
// import * as tokens from "../../../../tokens"



// export const OuterContainer = styled.div`
//   // background: linear-gradient(to bottom, #EFF1FD, #E8F7FF);
//   // position: relative;
//   width: 100%;
// `;

// export const Container = styled.div`
//   display: flex;
//   justify-content: center; 
// `;

// export const InnerContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center; 
//   background-color: ${tokens.colors.White};
//   border-radius: 0.25rem;
//   padding: 1.4rem 15rem 4rem 15rem;
//   margin-top: 5.583rem;
//   margin-bottom: 4.083rem;
//   // box-shadow: 0 0.17rem 1rem 0.17rem rgba(0, 0, 0, 0.04);
// `;

// export const TopContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   width: 50rem;
//   border-bottom: 0.04rem solid ${tokens.colors.B_Grey_2};
//   margin-bottom: 27px;
//   @media (max-width: 600px) {
//     width: 100%;
//   }
// `;

// export const HeadContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-start;
//   align-items: center;
//   // width: 14.58rem;
//   margin-bottom: 0.83rem;
//   @media (max-width: 600px) {
//     width: 100%;
//   }
// `;

// export const Head = styled.div`
//   ${tokens.typography.T3_B_24};
// `;

// // 검색 컨테이너
// export const SearchContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   background-color: ${tokens.colors.Grey_1};
//   width: 13.5rem;
//   height: 1.42rem;
//   border: 0.04rem solid ${tokens.colors.Grey_3};
//   border-radius: 0.17rem;
//   margin-bottom: 0.75rem;
// `;

// export const Search = styled.input`
//   background-color: ${tokens.colors.Grey_1};
//   width: 11.42rem;
//   height: 1.25rem;
//   ${tokens.typography.T5_SB_16};
//   color: ${tokens.colors.B_Grey_6};
//   margin: 0 0.42rem;
//   border: none;
//   outline: none;
  
//   &:focus {
//     outline: none;
//   }

//   &::placeholder {
//     color: ${tokens.colors.B_Grey_4};
//   }
// `;

// export const SearchIcon = styled.img`
//   width: 1rem;
//   height: 1rem;
//   margin-right: 0.25rem;
//   cursor: pointer;
// `;

// export const TabSortContainer = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   width: 50rem;
//   margin-bottom: 10px;
//   @media (max-width: 600px) {
//     width: 100%;
//   }
// `;

// // 조회수/이름순
// export const SortContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   width: 5.92rem;
//   height: 1.5rem;
//   border: 0.04rem solid ${tokens.colors.B_Grey_3};
//   border-radius: 0.17rem;
//   margin-top: 0.83rem;
//   position: relative;
// `;

// export const CategoryDrop = styled.div`
//   ${tokens.typography.B3_M_14};
//   color: ${tokens.colors.Grey_8};
//   text-align: center;
//   cursor: pointer;
// `;

// export const SortIcon = styled.img`
//   width: 1rem;
//   height: 1rem;
//   self-items: center;
//   cursor: pointer;
// `;

// export const SortDrop = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   background-color: ${tokens.colors.White};
//   width: 5.92rem;
//   /* height: 4.5rem; */
//   height: 3rem;
//   border-radius: 0.17rem;
//   position: absolute;
//   box-shadow: 0 0.08rem 0.42rem 0.08rem rgba(58, 107, 135, 0.10);
//   z-index: 99;
//   top: -0.17rem;
// `;

// export const SortText = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 5.92rem;
//   height: 1.5rem;
//   ${tokens.typography.B3_M_14};
//   color: ${tokens.colors.Grey_6};
  
//   &:hover {
//     background-color: rgba(102, 201, 255, 0.2); 
//   }
  
//   cursor: pointer;
// `;


// // 페이지
// export const PaginationContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   width: 50rem;
//   margin-top: 1rem;
// `;

// export const BlankBtn = styled.div`
//   width: 7.917rem;
// `;

// export const WriteBtn = styled.button`
//   background-color: ${tokens.colors.Blue_0_Main};
//   color: ${tokens.colors.White};
//   width: 7.917rem;
//   height: 2rem;
//   border: none;
//   border-radius: 0.16rem;
//   cursor: pointer;
// `;

// export const Pagination = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;  
//   padding: 0.83rem;
//   list-style: none;
//   // margin-top: 1.6rem;
// `;

// export const PaginationArrow = styled.div`
//   width: 1rem;
//   height: 1rem;
//   background-image: url('/img/grayarrow.png');
//   background-size: contain;
//   background-repeat: no-repeat;
//   transform: ${(props) => (props.left ? 'rotate(180deg)' : 'none')};
//   cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
//   opacity: ${(props) => (props.disabled ? 0.5 : 1)};
// `;

// export const PaginationNumber = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;  
//   margin: 0 0.21rem;
//   width: 0.33rem;
//   height: 0.88rem;
//   padding: 0.42rem;
//   cursor: pointer;
//   color: ${(props) => (props.active ? tokens.colors.Blue_3 : tokens.colors.B_Grey_7)};
//   font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
//   ${tokens.typography.B3_M_14};
// `;




// Inquiry.inquiry.table.styles.js : 
// js
// import styled from 'styled-components';
// import * as tokens from "../../../../tokens"


// export const Container = styled.div`
//   @media (max-width: 600px) {
//     width: 32rem;
//   }
// `;

// export const Table = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// // 카테고리 파트 시작
// export const CategoryContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   background-color: rgba(0, 165, 255, 0.05);
//   width: 50rem;
//   height: 2.292rem;
//   border-bottom: 0.04rem solid ${tokens.colors.B_Grey_4};
//   @media (max-width: 600px) {
//     width: 100%;
//   }
// `;

// export const BlankBox = styled.div`
//   ${tokens.typography.T5_SB_16};
//   color: ${tokens.colors.Black};
//   text-align: center;
//   width: 5rem;
// `;

// export const CategoryTitle = styled.div`
//   ${tokens.typography.T5_SB_16};
//   color: ${tokens.colors.Black};
//   text-align: center;
//   width: 26.667rem;
//   margin-left: 3.417rem;
// `;

// export const CategoryWriter = styled.div`
//   ${tokens.typography.T5_SB_16};
//   color: ${tokens.colors.Black};
//   text-align: center;
//   width: 4.667rem;
// `;

// export const CategoryBlank = styled.div`
//   width: 4.667rem;
// `;

// export const CategoryDate = styled.div`
//   ${tokens.typography.T5_SB_16};
//   color: ${tokens.colors.Black};
//   text-align: center;
//   width: 5.75rem;
// `;

// export const CategoryView = styled.div`
//   ${tokens.typography.T5_SB_16};
//   color: ${tokens.colors.Black};
//   text-align: center;
//   width: 3.833rem;
//   margin-right: 1.667rem;
// `;

// // 카테고리 파트 끝

// // 튜플 파트 
// export const TupleContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: 24rem;
//   // min-height: 24rem;
//   overflow: auto;

//   &::-webkit-scrollbar {
//     width: 0px; /* Chrome, Safari, Opera용 */
//   }
//   scrollbar-width: none; /* Firefox용 */
// `;


// Inquiry.inquiry.tuple.styles.js :
// js
// import styled from 'styled-components';
// import * as tokens from "../../../../tokens"

// // 튜플 파트 시작
// export const TupleContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   width: 50rem;
//   border-bottom: 1px solid ${tokens.colors.B_Grey_3};
//   background-color: transparent;
//   &:hover {
//     background-color: ${tokens.colors.B_Grey_2};
//   }
//   cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
//   pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
//   /* opacity: ${({ disabled }) => (disabled ? 0.6 : 1)}; */
// `;

// export const TupleType = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   ${tokens.typography.T5_SB_16};
//   color: ${tokens.colors.Black};
//   width: 5rem;
//   min-height: 2.333rem;
//   cursor: pointer;
// `;

// export const TupleTitleBox = styled.div`
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   width: 26.667rem;
//   min-height: 2.333rem;
//   margin-left: 3.417rem;
//   cursor: pointer;
// `;

// export const TupleTitle = styled.span`
//   ${tokens.typography.T5_SB_16};
//   color: ${tokens.colors.Black};
// `;

// export const HighlightedText = styled.span`
//   ${tokens.typography.T5_SB_16};
//   color: ${tokens.colors.Blue_0_Main};
// `;

// export const Lockimg = styled.img`
//   width: 0.667rem;
//   height: 0.75rem;
//   margin-left: 0.458rem;
// `;

// export const TupleWriter = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   ${tokens.typography.T5_SB_16};
//   color: ${tokens.colors.Black};
//   width: 4.667rem;
//   min-height: 2.333rem;
//   cursor: pointer;
// `;

// export const TupleBlank = styled.div`
//   width: 4.667rem;
// `;

// export const TupleDate = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   ${tokens.typography.T5_SB_16};
//   color: ${tokens.colors.Black};
//   width: 5.75rem;
//   min-height: 2.333rem;
//   cursor: pointer;
// `;

// export const TupleProcess = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   ${tokens.typography.T5_SB_16};
//   color: ${tokens.colors.Black};
//   width: 3.833rem;
//   min-height: 2.333rem;
//   margin-right: 1.667rem;
//   cursor: pointer;
// `;

// export const TupleView = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   ${tokens.typography.T5_SB_16};
//   color: ${tokens.colors.Black};
//   width: 3.833rem;
//   min-height: 2.333rem;
//   margin-right: 1.667rem;
//   cursor: pointer;
// `;

// export const ProcessingYNBox = styled.div`
//   background-color: ${({ solvedYn }) => (solvedYn ? tokens.colors.Blue_0_Main : tokens.colors.Grey_4)};
//   color: ${tokens.colors.White};
//   width: 3.167rem;
//   height: 0.875rem;
//   border: none;
//   border-radius: 0.16rem;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;
