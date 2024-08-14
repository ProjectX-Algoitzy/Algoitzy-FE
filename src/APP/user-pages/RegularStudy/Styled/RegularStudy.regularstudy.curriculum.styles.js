import styled from "styled-components";
import * as tokens from "../../../../tokens";

export const CanNotEnterContainer = styled.div`
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

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1.33rem;
  height: 100%;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: row;
  width: 33.04rem;
  justify-content: space-between;
  margin-top: 4.17rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.83rem;
  border-bottom: 0.042rem solid ${tokens.colors.B_Grey_2};
  ${tokens.typography.T1_SB_32};
  color: ${tokens.colors.Grey_8};
`;

export const BtnMakeCurri = styled.button`
  width: 7.92rem;
  height: 1.96rem;
  background: #00A5FF; 
  color: white;
  border-radius: 0.21rem; 
  border: none; 
  cursor: pointer; 
`;

export const CurriculumContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0.83rem;
  width: 33.04rem;
  height: 4.17rem;
  background-color: ${tokens.colors.White};
  box-shadow: 0px 0.17rem 0.42rem rgba(0, 0, 0, 0.1); /* 그림자 추가 */
`;

export const CurriculumText = styled.div`
  display: flex;
  align-items: center;
  ${tokens.typography.T3_B_24};
  color: ${tokens.colors.Grey_8};
  margin-left: 1.67rem;
  cursor: pointer;
`;

export const MiddleCurriculumContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SmallCurriculumContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Gray5Text = styled.div`
  display: flex;
  align-items: center;
  ${tokens.typography.Sub_M_12};
  color: ${tokens.colors.Grey_5};
  margin-top: 0.13rem;
  margin-left: 0.33rem;
`;

export const Gray6Text = styled.div`
  ${tokens.typography.Sub_M_12};
  color: ${tokens.colors.Grey_6};
  margin-bottom: 0.42rem;
`;

export const Gray7Text = styled.div`
  display: flex;
  font-family: Pretendard;
  font-weight: 600;
  font-size: 0.58rem;
  line-height: 0.75rem;
  color: ${tokens.colors.Grey_7};
`;

export const CurriculumDate = styled.div`
  ${tokens.typography.B3_M_14};
  color: #A2A2A2;
`;

export const DeleteIcon = styled.div`
  background-image: url('/img/GrayX.png');
  width: 0.58rem;
  height: 0.58rem;
  margin-top: 1.58rem;
  margin-right: 1.58rem;
  margin-left: 5rem;
  cursor: pointer;
`;