import styled from 'styled-components';
import * as tokens from "../../../../tokens"


export const Container = styled.div`
  @media (max-width: 600px) {
    width: 32rem;
  }
  // background-color: ${tokens.colors.White};
  
`;

export const Table = styled.div`
  display: flex;
  flex-direction: column;
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
  // margin-right: 1.667rem;
`;

export const CategoryTempDate = styled.div`
  ${tokens.typography.T5_SB_16};
  color: ${tokens.colors.Black};
  text-align: center;
  width: 9.6rem;
`;

// 카테고리 파트 끝
 
export const TupleContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${tokens.colors.White};
  max-height: 19rem;
  // min-height: 24rem;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0px; /* Chrome, Safari, Opera용 */
  }
  scrollbar-width: none; /* Firefox용 */
  border-radius: 0 0 0.32rem 0.32rem;
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
