import styled from "styled-components";
import * as tokens from "../../../../tokens";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1.333rem;
  height: 100%;
  /* width: 33.042rem; */
  width: 39.042rem;

  @media (max-width: 600px) {
    width: 33.04rem;
    padding-right: 1.33rem;
  }
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4.167rem;
  margin-bottom: 1.5rem;
  width: 100%;
  ${tokens.typography.T1_SB_32};
  color: ${tokens.colors.Grey_8};
  padding-bottom: 0.667rem;
  border-bottom: 1px solid ${tokens.colors.B_Grey_2};
`;

export const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 4.208rem;
  font-size: 0.75rem;
    pre {
    background-color: #282c34;  /* 배경색 검정 */
    color: #abb2bf;  /* 텍스트 색 회색 */
    padding: 10px;
    border-radius: 4px;
    font-family: 'Courier New', Courier, monospace;
    display: block;
    overflow-x: auto;
  }

  code {
    background-color: #282c34;
    color: #abb2bf;
    padding: 10px;
    border-radius: 4px;
    font-family: 'Courier New', Courier, monospace;
  }
`;