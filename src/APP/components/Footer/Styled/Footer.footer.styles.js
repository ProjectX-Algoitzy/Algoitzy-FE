import styled from 'styled-components';
import * as tokens from "../../../../tokens"

export const FooterContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 320px;
    background-color: #F6F9FB;
    justify-content: space-between;
`;

export const FooterLeftWrap = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 360px;
    margin-top: 72px;
`;

export const FooterRightWrap = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 72px;
    margin-right: 360px;
`;

export const Sentence1 = styled.div`
	${tokens.typography.T3_B_24};
	color: ${tokens.colors.B_Grey_4};
    margin-bottom: 7px;
`;

export const Sentence2 = styled.div`
    ${tokens.typography.T4_SB_20};
    color: ${tokens.colors.B_Grey_6};
`;

export const Icon = styled.img`
    width: 66px;
    height: 66px;
`;