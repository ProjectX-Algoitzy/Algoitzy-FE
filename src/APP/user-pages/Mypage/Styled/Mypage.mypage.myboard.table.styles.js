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

export const Head = styled.div`
  ${tokens.typography.T3_B_24};
  width: 100%;
  border-bottom: 0.04rem solid ${tokens.colors.B_Grey_2};
  padding-bottom: 0.5rem;
  margin-top: 4rem;
`;

// 카테고리 파트 시작
export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 165, 255, 0.05);
  width: 50rem;
  height: 2.292rem;
  border-bottom: 0.04rem solid ${tokens.colors.B_Grey_4};
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

// 카테고리 파트 끝
 
export const TupleContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 24rem;
  // min-height: 24rem;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0px; /* Chrome, Safari, Opera용 */
  }
  scrollbar-width: none; /* Firefox용 */
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
