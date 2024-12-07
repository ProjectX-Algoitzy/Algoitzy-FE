import styled from 'styled-components';
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
  width: 12rem;
`;

export const Tab = styled.div`
  ${tokens.typography.T3_B_24};
  text-decoration: ${(props) => (props.active ? 'underline' : 'none')};
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
  background-color: #DFE8F1;
  width: 50rem;
  height: 2.292rem;
  border-bottom: 0.04rem solid ${tokens.colors.B_Grey_4};
  border-radius: 0.32rem 0.32rem 0 0;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const BlankBox = styled.div`
  width: 6.2rem;
`;

export const CategoryTitle = styled.div`
  ${tokens.typography.T5_SB_16};
  color: ${tokens.colors.Black};
  text-align: center;
  width: 29rem;
  margin-left: 3.417rem;
`;

export const CategoryDate = styled.div`
  ${tokens.typography.T5_SB_16};
  color: ${tokens.colors.Black};
  text-align: center;
  width: 5.75rem;
`;

export const CategoryView = styled.div`
  ${tokens.typography.T5_SB_16};
  color: ${tokens.colors.Black};
  text-align: center;
  width: 3.833rem;
`;

export const CategoryTempDate = styled.div`
  ${tokens.typography.T5_SB_16};
  color: ${tokens.colors.Black};
  text-align: center;
  width: 9.6rem;
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

export const ScrollBottomArrow = styled.img`
`;

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

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 50rem;
  margin-top: 1.458rem;
`;

export const AllCheckBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 5.416rem;
  height: 2rem;
`;

export const AllCheck = styled.input`
  width: 0.875rem;
  height: 0.875rem;
  display: flex;
  justify-content: center;
  align-items: center;
  appearance: none;
  border: 0.08rem solid #ccc;
  border-radius: 0.16rem;
  background-color: #fff;
  margin-left: 1.05rem;

  cursor: pointer;

  &:checked {
    background-color: #007bff;
    border-color: #007bff;
  }

  &:checked::before {
    content: '✔';
    color: #fff;
    font-size: 0.583rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const AllCheckText = styled.div`
  ${tokens.typography.Sub_B_16};
  color: ${tokens.colors.Black};
`;

export const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 15rem;
`;

export const DeleteButton = styled.button`
  background-color: ${tokens.colors.Red};
  color: ${tokens.colors.White};
  border: none;
  width: 6.67rem;
  height: 2rem;
  border-radius: 0.16rem;
  cursor: pointer;
`;

export const WriteButton = styled.button`
  background-color: ${tokens.colors.B_Grey_7};
  color: ${tokens.colors.White};
  border: none;
  width: 6.67rem;
  height: 2rem;
  border-radius: 0.16rem;
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
