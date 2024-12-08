import styled from "styled-components";
import * as tokens from "../../../../tokens";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1.33rem;
  height: 100%;
  width: 100%;
  max-width: 34rem;

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
  font-size: 0.75rem; /* 24px 기준 18px 크기, 에디터 수정 시 비율 조정 필요 */
  
  @media (max-width: 600px) {
    font-size: 1rem;
  }

    pre {
    background-color: #282c34;  /* 배경색 검정 */
    color: #abb2bf;  /* 텍스트 색 회색 */
    padding: 10px;
    border-radius: 4px;
    font-family: 'Courier New', Courier, monospace;
    display: block;
    overflow-x: auto;
  }

`;