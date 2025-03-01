import styled from 'styled-components';
import * as tokens from "../../../../tokens"


export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;  
  justify-content: space-between;
  width: 50rem;
  margin-top: 1.83rem;
`;

export const ProfileBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;  
  justify-content: center;
`;

export const Profile = styled.img`
  width: 5.2rem;
  height: 5.2rem;
  border: 0.04rem solid ${tokens.colors.Grey_4};
  border-radius: 2.6rem;
  margin-right: 1.1rem;
`;

export const NameBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;  
  justify-content: center;
`;

export const Name = styled.div`
  ${tokens.typography.T3_B_24};
  color: ${tokens.colors.Black};
`;

export const Handle = styled.div`
  ${tokens.typography.T5_SB_16};
  color: ${tokens.colors.Blue_0_Main};
  cursor: pointer;
`;

export const TabBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;  
  justify-content: space-between;
  // width: 20.416rem;
  height: 2rem;
`;

export const TabBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;  
  justify-content: space-between;
  width: 13.34rem;
  height: 2rem;
`;

export const Tab = styled.div`
  ${tokens.typography.T5_SB_16};
  color: ${tokens.colors.B_Grey_6};
  text-decoration: ${(props) => (props.active ? 'underline' : 'none')};
  cursor: pointer;
`;

export const EditButton = styled.button`
  width: 6.67rem;
  height: 2rem;
  background-color: ${tokens.colors.Blue_0_Main};
  color: ${tokens.colors.White};
  border: none;
  border-radius: 0.125rem;
  margin-right: 0.458rem;
  margin-left: 2.916rem;
  cursor: pointer;
`;

export const Blank = styled.div`
  width: 11.666rem;
`;