import styled from "styled-components";
import * as tokens from "../../../../tokens";

export const Container = styled.div`
  @media (max-width: 600px) {
    width: 32rem;
  }
`;

export const Table = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TableContainerWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const TabBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  border-bottom: 0.04rem solid ${tokens.colors.B_Grey_2};
  padding-bottom: 0.5rem;
  margin-top: 4rem;
  margin-bottom: 1.83rem;
`;

export const TabBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const TabHead = styled.div`
  ${tokens.typography.T3_B_24};
  text-decoration: underline;
`;

export const TabBody = styled.div`
  ${tokens.typography.B2_M_16};
`;

export const SortTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: right;
`;

// 정렬
export const SortContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 5.92rem;
  height: 1.5rem;
  border: 0.04rem solid ${tokens.colors.B_Grey_3};
  border-radius: 0.17rem;
  margin-top: 0.83rem;
  position: relative;
`;

export const CategoryDrop = styled.div`
  ${tokens.typography.B3_M_14};
  color: ${tokens.colors.Grey_8};
  text-align: center;
  cursor: pointer;
`;

export const SortIcon = styled.img`
  width: 1rem;
  height: 1rem;
  self-items: center;
  cursor: pointer;
`;

export const SortDrop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${tokens.colors.White};
  width: 5.92rem;
  height: 4.5rem;
  border-radius: 0.17rem;
  position: absolute;
  box-shadow: 0 0.08rem 0.42rem 0.08rem rgba(58, 107, 135, 0.1);
  z-index: 99;
  top: -0.17rem;
`;

export const SortText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5.92rem;
  height: 1.5rem;
  ${tokens.typography.B3_M_14};
  color: ${tokens.colors.Grey_6};

  &:hover {
    background-color: rgba(102, 201, 255, 0.2);
  }

  cursor: pointer;
`;

// 카테고리 파트 시작
export const TableContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  box-shadow: 0 0.17rem 0.42rem 0 rgba(77, 114, 158, 0.25);
  border-radius: 0 0 0.32rem 0.32rem;
`;

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #dfe8f1;
  width: 50rem;
  height: 2.292rem;
  border-bottom: 0.04rem solid ${tokens.colors.B_Grey_4};
  border-radius: 0.32rem 0.32rem 0 0;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const CategoryStatus = styled.div`
  ${tokens.typography.T5_SB_16};
  color: ${tokens.colors.Black};
  text-align: center;
  width: 8.2rem;
`;

export const CategoryTitle = styled.div`
  ${tokens.typography.T5_SB_16};
  color: ${tokens.colors.Black};
  text-align: center;
  width: 21rem;
`;

export const CategoryDate = styled.div`
  ${tokens.typography.T5_SB_16};
  color: ${tokens.colors.Black};
  text-align: center;
  width: 3.5rem;
  margin-left: 10rem;
`;

export const CategoryView = styled.div`
  ${tokens.typography.T5_SB_16};
  color: ${tokens.colors.Black};
  width: 1.4rem;
  margin-left: 3.333rem;
  margin-right: 1.25rem;
`;

// 카테고리 파트 끝

export const TupleContainerWrapper = styled.div`
  display: flex;
`;

export const TupleContainer = styled.div`
  flex: 1;
  overflow: auto;
  max-height: 19rem;
  display: flex;
  flex-direction: column;
  scrollbar-width: none;
`;

export const ScrollbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.833rem;
`;

export const ScrollTopArrow = styled.img`
  margin-top: 2.292rem;
`;

export const ScrollBottomArrow = styled.img``;

export const ScrollbarWrapper = styled.div`
  overflow-y: auto;
  height: 18.417rem;
  width: 0.25rem;
  background-color: ${tokens.colors.B_Grey_3};
  border-radius: 0.125rem;
  margin: 0.042rem 0;
`;

export const ScrollbarThumb = styled.div`
  width: 100%;
  height: 96px;
  background: ${tokens.colors.B_Grey_6};
  border-radius: 0.125rem;
  position: relative;
  top: 0;
  cursor: pointer;
`;

export const NoItemsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${tokens.typography.B2_M_16};
  color: ${tokens.colors.B_Grey_5};
  min-height: 2.333rem;
`;
