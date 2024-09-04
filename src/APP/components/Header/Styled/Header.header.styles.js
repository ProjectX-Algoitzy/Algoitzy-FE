import styled from 'styled-components';
import * as tokens from "../../../../tokens"
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1000;
`;

export const HeaderWrap = styled.div`
  background-color: rgba(255, 255, 255, 0.05); 
  backdrop-filter: blur(200px);
  height: 3.33rem;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 5rem;
  @media (max-width: 600px) {
      padding: 0 0.33rem;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const HeaderLeftWrap = styled.div`
  display: flex;
  @media (max-width: 600px) {
      margin: 0;
  }
`;

export const Rabel = styled.img`
  margin-top: 0.42rem;
  width: 7.46rem;
  height: 1.67rem;
  @media (max-width: 600px) {
      margin: 0.5rem;
  }
`;

export const HeaderRightWrap = styled.div`
  display: flex;
  align-items: center;
`;

export const PageLink = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => (props.isActive ? tokens.colors.B_Grey_8 : tokens.colors.B_Grey_6)};
  width: 5.83rem;
  height: 0.88rem;
  margin: 0 0.25rem;
  ${tokens.typography.T5_SB_16};
  @media (max-width: 600px) {
      margin: 0;
  }
`;

export const AdminName = styled.div`
  color: ${tokens.colors.Blue_0_Main};
  height: 0.88rem;
  ${tokens.typography.T5_SB_16};
  margin-left: 2.08rem;
  margin-right: 2.08rem;
  @media (max-width: 600px) {
     margin-left: 1rem;
     margin-right: 0;
  }
  cursor: pointer;
`;

export const Btn = styled.button`
  ${tokens.Btns.Btn_ghost_default}
  ${tokens.typography.T5_SB_16};
  margin-left: 2.08rem;
  @media (max-width: 600px) {
     ${tokens.typography.T6_SB_14};
     margin-left: 1rem;
  }
  @media (max-width: 300px) {
     ${tokens.typography.T7_SB_12};
  }
`;

export const SubStudyMenu = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 2.5rem;
  padding-left: 69vw;
  background-color: ${tokens.colors.B_Grey_1};
  position: fixed;
  top: 3.33rem;
  z-index: 999;
  @media (max-width: 600px) {
    padding-left: 18rem;
  }
`;

export const SubCodingMenu = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 2.5rem;
  padding-left: 78vw;
  background-color: ${tokens.colors.B_Grey_1};
  position: fixed;
  top: 3.33rem;
  z-index: 999;
  @media (max-width: 600px) {
    padding-left: 24rem;
  }
`;

export const SubMenuItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${tokens.typography.T5_SB_16};
  color: ${tokens.colors.B_Grey_5};
  width: 5.83rem;
  margin: 0 0.83rem;
  cursor: pointer;
  margin: 0 0.25rem;

  &:hover {
    color: ${tokens.colors.B_Grey_8};
  }
`;