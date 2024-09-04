import styled from "styled-components";
import * as tokens from "../../../../tokens";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1.33rem;
  height: 100%;
  width: 33.04rem;

  @media (max-width: 600px) {
    width: 100%;
    padding-right: 1.33rem;
  }
`;

export const Title = styled.div`
  display: flex;
  margin-top: 4.17rem;
  margin-bottom: 1.5rem;
  width: 100%;
  ${tokens.typography.T1_SB_32};
  color: ${tokens.colors.Grey_8};
  padding-bottom: 0.67rem;
  border-bottom: 0.042rem solid ${tokens.colors.B_Grey_2};
`;

export const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 4.21rem;
`;

export const BlueContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 2.08rem;
  background-color: ${tokens.colors.B_Grey_1};
  color: ${tokens.colors.Grey_8};
  ${tokens.typography.T4_SB_20};
  padding-left: 0.67rem;
`; 

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
  color: ${tokens.colors.Grey_6};
  ${tokens.typography.B2_M_16};
  padding-left: 0.67rem;
  margin-top: 1rem;
  border: none;

  &::placeholder {
    color: ${tokens.colors.Grey_6};
  }
`;