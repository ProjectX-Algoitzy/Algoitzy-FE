import styled from "styled-components";
import * as tokens from "../../../../tokens";

export const Container = styled.div``;

// 튜플 파트 시작
export const TupleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${tokens.colors.White};
  width: 50rem;
  min-height: 2.333rem;
  border-bottom: 0.04rem solid ${tokens.colors.B_Grey_3};

  /* &:hover {
    background-color: ${(props) =>
    props.temp === "true" ? "inherit" : tokens.colors.B_Grey_2};
    cursor: ${(props) =>
    props.temp === "true"
      ? "default"
      : props["data-delete-yn"]
      ? "not-allowed"
      : "pointer"};
  } */
  @media (max-width: 600px) {
    width: 100%;
  }
`;

// export const Blank = styled.div`
//   width: 0.875rem;
// `;

export const TupleStatus = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${tokens.typography.B2_M_16};
  color: ${tokens.colors.Black};
  width: 8.2rem;
  /* min-height: 2.333rem; */
`;

export const TupleTitleBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* min-height: 2.333rem; */
  width: 21rem;
  /* margin-left: 3.3rem;
  margin-right: 8.117rem; */
`;

export const TupleTitle = styled.span`
  ${tokens.typography.B2_M_16};
  color: ${(props) =>
    props["data-delete-yn"] ? tokens.colors.Sub_3 : tokens.colors.Black};
`;

export const TupleDate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${tokens.typography.B2_M_16};
  color: ${tokens.colors.Black};
  /* width: 5.25rem; */
  width: 3.5rem;
  margin-left: 10rem;
  /* min-height: 2.333rem; */
`;

export const TupleView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${tokens.typography.B2_M_16};
  color: ${tokens.colors.Black};
  /* width: 3rem;
  margin-left: 0.833rem;
  margin-right: 2.43rem; */
  width: 1.4rem;
  margin-left: 3.333rem;
  margin-right: 1.25rem;
  /* min-height: 2.333rem; */
`;

// 튜플 파트 끝
