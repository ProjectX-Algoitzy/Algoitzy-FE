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
  padding: 0.42rem 0.42rem;
  // img {
  //   max-width: 100%;
  //   width: auto;
  //   height: auto;
  // }
  overflow: auto;
`;