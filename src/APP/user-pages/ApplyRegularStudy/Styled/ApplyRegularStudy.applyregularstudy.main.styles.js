import styled from 'styled-components';
import * as tokens from "../../../../tokens"

// export const Container = styled.div`
//   display: flex;
//   justify-content: center; 
//   background-image: url('/img/landing-background.png');
//   background-size: cover;
//   background-repeat: no-repeat;
//   background-position: center;
// `;

export const Container = styled.div`
  display: flex;
  justify-content: center; 
  background-image: url('/img/landing-background.png');
  background-size: cover; /* 이미지가 컨테이너 안에 맞춰 조정됨 */
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed; /* 스크롤 시 배경 고정 */
`; 

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  border-radius: 0.83rem;
  padding: 6.58rem 0;
  width: 50rem;
`;

export const Group = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start; 
  width: 50.83rem;
  justify-content: space-between;
  padding-top: 1.83rem;
  @media (max-width: 600px) {
    width: 33.8rem;
  }
`;