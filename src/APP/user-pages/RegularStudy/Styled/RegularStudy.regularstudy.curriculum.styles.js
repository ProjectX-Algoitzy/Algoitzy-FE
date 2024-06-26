import styled from "styled-components";
import * as tokens from "../../../../tokens";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 32px;
  height: 100%;
  margin-top: 100px;
`;

export const LittleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 793px;
  margin-bottom: 100px;
`;

export const TriangleImg = styled.img`
  width: 24px;
  height: 24px;
  margin-top: 9px;
  margin-right: 9px;
  cursor: pointer;
`;

export const Title = styled.div`
  display: flex;
  width: 100%;
  ${tokens.typography.T1_SB_32};
  color: ${tokens.colors.Grey_8};
  padding-bottom: 16px;
  border-bottom: 1px solid ${tokens.colors.B_Grey_2};
`;

export const BlueContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;
  margin-top: 40px;
  background-color: ${tokens.colors.B_Grey_1};
  color: ${tokens.colors.Grey_8};
  ${tokens.typography.T4_SB_20};
  padding-left: 16px;
`; 

export const ContentsContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 43px;
  border-radius: 4px;
  border: 1px solid ${tokens.colors.B_Grey_2};
  color: ${tokens.colors.Grey_7};
  width: 809px;
  height: 224px;
  overflow: auto;
  resize: vertical; /* 사용자가 수직 방향으로 크기 조절 가능하도록 설정 */
`;