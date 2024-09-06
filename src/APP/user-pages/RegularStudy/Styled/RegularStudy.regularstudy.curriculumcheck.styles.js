import styled from "styled-components";
import * as tokens from "../../../../tokens";

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 63.08rem;
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  ${tokens.typography.T1_SB_32};
  color: ${tokens.colors.Grey_8};
  margin-top: 7.5rem;
  padding-bottom: 0.83rem;
  border-bottom: 0.042rem solid ${tokens.colors.B_Grey_2};
  margin-bottom: 1.33rem;
`;

export const SecondContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const WhiteBox = styled.div`
  width: 31.25rem;
  height: 2.33rem;
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  border-radius: 0.167rem;
  border: 0.042rem solid ${tokens.colors.Grey_4};
  color: ${tokens.colors.Grey_7};
  ${tokens.typography.B2_M_16};
`;

export const ContentsContainer = styled.div`
  margin-top: 1.33rem;
  margin-bottom: 1.79rem;
  border-radius: 0.167rem;
  border: 0.042rem solid ${tokens.colors.B_Grey_2};
  color: ${tokens.colors.Grey_7};
  width: 100%;
  height: 28.29rem;
  overflow: auto;
  font-size: 0.75rem;
  padding: 0.5rem;

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