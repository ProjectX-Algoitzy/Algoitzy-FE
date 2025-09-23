import styled from 'styled-components';
import * as tokens from "../../../../tokens"


export const Container = styled.div`
`;

export const Table = styled.div`
  display: flex;
  flex-direction: column;
`;


export const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #2d2d2d;
  height: 2.292rem;
  border-bottom: 0.04rem solid ${tokens.colors.B_Grey_4};

  /* 컬럼 폭: 1=순위, 2=이름, 3=속도, 4=메모리, 5=언어, 6=코드길이 */
  > div:nth-child(1) { width: 80px; }  /* 이름 */
  > div:nth-child(2) { width: 525px; }  /* 이름 */
  > div:nth-child(4) { width: 80px;  }  /* 메모리 */
  > div:nth-child(6) { width: 80px;  }  /* 코드길이 */
`;

export const LabelText = styled.div`
  ${tokens.typography.T5_SB_16};
  color: ${tokens.colors.White};
  width: 4.667rem;
  padding-left: 20px;
`;

export const TupleContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 24rem;
  overflow: auto;
  &::-webkit-scrollbar { width: 0px; }
  scrollbar-width: none;
`;

export const OverlayText = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 250%);
  z-index: 10;
  font-size: 1rem;
  color: ${tokens.colors.White};
  text-align: center;
`;