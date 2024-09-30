import styled from 'styled-components';
import * as tokens from "../../../../tokens"

// export const FooterContainer = styled.div`
//     display: flex;
//     flex-direction: row;
//     width: 100%;
//     height: 9.17rem;
//     background-color: #F6F9FB;
//     align-items: center;
//     justify-content: space-between;
// `;

export const FooterContainer = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 9.17rem;
    background-color: #F6F9FB;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const FooterLeftWrap = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 12rem;
    @media (max-width: 600px) {
        margin-left: 5rem;
    }
`;

export const FooterRightWrap = styled.div`
    display: flex;
    flex-direction: row;
    margin-right: 12rem;
    @media (max-width: 600px) {
        margin-right: 5rem;
    }
`;

export const Sentence1 = styled.div`
    font-family: "Pretendard";
    font-weight: 700;
    font-size: 1rem;
    line-height: normal;
    color: ${tokens.colors.B_Grey_6};
    margin-bottom: 0.29rem;
    margin-right: 0.29rem;
`;

export const Sentence2 = styled.div`
    font-family: "Pretendard";
    font-weight: 500; 
    font-size: 1rem;
    line-height: normal;
    color: ${tokens.colors.B_Grey_6};
    margin-bottom: 0.29rem;
`;

export const Sentence3 = styled.div`
    display: flex;
    align-items: center;
    font-family: "Pretendard";
    font-weight: 500; 
    font-size: 0.75rem;
    line-height: normal;
    color: ${tokens.colors.B_Grey_6};
`;

export const NoteLink = styled.a`
    display: flex;
    align-items: center;
    font-family: "Pretendard";
    font-weight: 500; 
    font-size: 0.75rem;
    line-height: normal;
    margin-left: 6px;
    color: ${tokens.colors.B_Grey_6};
`;

export const Icon = styled.img`
    width: 2.75rem;
    height: 2.75rem;
`;