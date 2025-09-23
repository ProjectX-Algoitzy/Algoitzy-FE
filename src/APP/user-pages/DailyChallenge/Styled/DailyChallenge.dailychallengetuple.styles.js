import styled from 'styled-components';
import * as tokens from "../../../../tokens"


export const Container = styled.div`

`;

export const TupleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid ${tokens.colors.B_Grey_3};

  /* 컬럼 폭: 1=순위, 2=이름, 3=속도, 4=메모리, 5=언어, 6=코드길이 */
  > div:nth-child(1) { width: 80px; }  /* 이름 */
  > div:nth-child(2) { width: 525px; }  /* 이름 */
  > div:nth-child(4) { width: 80px;  }  /* 메모리 */
  > div:nth-child(6) { width: 80px;  }  /* 코드길이 */

  filter: ${({ $disabled }) => ($disabled ? "blur(6px)" : "none")};
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};
  opacity: ${({ $disabled }) => ($disabled ? 0.8 : 1)};
`;

export const TupleContent = styled.div`
  display: flex;
  align-items: center;
  ${tokens.typography.T5_SB_16};
  color: ${tokens.colors.White};
  width: 4.667rem;
  padding-left: 20px;
  min-height: 2.333rem;
`;