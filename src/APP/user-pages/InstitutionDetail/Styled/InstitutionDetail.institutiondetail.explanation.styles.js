import styled from 'styled-components';
import * as tokens from "../../../../tokens"


export const Container = styled.div`
  
`;

export const CategoryContainer = styled.div`
  display: flex;
  // flex-direction: row;
  // justify-content: center;
  // align-items: center;
  background-color: ${tokens.colors.B_Grey_1};
  width: 49.17rem;
  height: 13.75rem;
  border-bottom: 0.042rem solid ${tokens.colors.B_Grey_2};
  margin-bottom: 0.83rem;
  padding: 0.92rem;
  
  // img {
  //   max-width: 100%;
  //   width: auto;
  //   height: auto;
  // }

  overflow: auto;
    @media (max-width: 600px) {
    width: 100%;
  }

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

export const ComingSoonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 49.17rem;
  height: 10.75rem;
  background-color: ${tokens.colors.B_Grey_1};
  border-radius: 0.42rem;
  color: ${tokens.colors.B_Grey_5};
  ${tokens.typography.T3_B_24};
`;