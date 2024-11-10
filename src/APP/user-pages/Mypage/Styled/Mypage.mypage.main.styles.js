import styled from 'styled-components';
import * as tokens from "../../../../tokens"


export const Container = styled.div`
  display: flex;
  justify-content: center;
  background: linear-gradient(to top, #EFF1FD, #E8F7FF);
  @media (max-width: 600px) {
    padding-left: 4rem;
  }
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  border-radius: 0.83rem;
  padding: 6.58rem 15rem;
  @media (max-width: 600px) {
    padding-right: 1rem;
  }
`;

export const MyInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
`;

export const StudyListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  position: relative;
`;

export const LeftStudyListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
`;

export const RightStudyListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
`;

export const HeadBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between; 
  align-items: flex-end;
  width: 100%;
  border-bottom: 0.04rem solid ${tokens.colors.B_Grey_3};
  padding-bottom: 0.5rem;
`;

export const StudyHeadBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between; 
  align-items: flex-end;
  width: 100%;
  border-bottom: 0.04rem solid ${tokens.colors.B_Grey_2};
  padding-bottom: 0.5rem;
  margin-top: 4rem;
`;

export const Head = styled.div`
  ${tokens.typography.T3_B_24};
`;

export const BtnMakeApp = styled.button`
  width: 7.92rem;
  height: 1.96rem;
  background: #00A5FF; 
  color: white;
  border-radius: 0.21rem; 
  border: none; 
  cursor: pointer; 
`;

export const Group = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start; 
  width: 50.83rem;
  margin-top: 1.83rem;
`;

// 페이지 넘김 관련 스타일 추가
export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  // margin-top: 2rem;
`;

export const LeftPageButton = styled.img`
  // background: #00A5FF;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${tokens.colors.Grey_7};
  border: none;
  border-radius: 0.21rem;
  width: 1rem;
  height: 1rem;
  margin: 0 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  position: absolute;
  top: 60%;
  left: -2rem;

  &:disabled {
    background: ${tokens.colors.B_Grey_3}; // 비활성화된 버튼 색상
    cursor: not-allowed;
  }
`;

export const RightPageButton = styled.img`
  // background: #00A5FF;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${tokens.colors.Grey_7};
  border: none;
  border-radius: 0.21rem;
  width: 1rem;
  height: 1rem;
  margin: 0 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  position: absolute;
  top: 60%;
  right: -2rem;

  &:disabled {
    background: ${tokens.colors.B_Grey_3}; // 비활성화된 버튼 색상
    cursor: not-allowed;
  }
`;

export const PageNumber = styled.div`
  margin: 0 1rem;
  font-size: 1.2rem;
  color: ${tokens.colors.B_Grey_1};
`;