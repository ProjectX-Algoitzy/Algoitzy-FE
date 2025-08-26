import styled from "styled-components";
import * as tokens from "../../../../tokens";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50rem;
  margin-bottom: 269px;
    @media (max-width: 600px) {
    width: 32rem;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.div`
  ${tokens.typography.T3_B_24};
  color: ${tokens.colors.B_Grey_1};
`;

export const Notice = styled.div`
  ${tokens.typography.B2_M_16};
  color: ${tokens.colors.Grey_4};
  margin-left: 28px;
`;

export const Divider = styled.div`
  height: 0.063rem;
  border: none;
  background-color: ${tokens.colors.B_Grey_6};
  margin: 12px 0px 26px 0;
`;

export const DateRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 1rem;
`;

export const DateText = styled.div`
  ${tokens.typography.T3_SB_24};
  color: ${tokens.colors.B_Grey_1};
  display: flex;
  justify-content: center;
`;

export const NavButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    width: 1rem;
    height: 1rem;
    background-image: ${({ $dir }) =>
      $dir === 'right'
        ? "url('/img/arrow-r-white.svg')"
        : "url('/img/arrow-l-white.svg')"};
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;


export const LanguageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0 0.542rem 0.542rem;
  gap: 1.25rem;
`;

export const Language = styled.div`
  ${tokens.typography.B2_M_16};
  color: ${({ $active }) =>
    $active ? tokens.colors.White : tokens.colors.Grey_4};

  border-bottom: ${({ $active }) =>
    $active ? `1px solid ${tokens.colors.White}` : "1px solid transparent"};

  &:hover {
    color: ${tokens.colors.White};
    cursor: pointer;
  }
`;