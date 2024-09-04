import styled from 'styled-components';
import * as tokens from "../../../../tokens"

export const Container = styled.div`
  display: flex;
  justify-content: center; 
  background-image: url('/img/landing-background.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  border-radius: 0.83rem;
  padding: 6.58rem 15rem;
`;

export const Group = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start; 
  width: 50.83rem;
  padding-top: 1.83rem;
`;