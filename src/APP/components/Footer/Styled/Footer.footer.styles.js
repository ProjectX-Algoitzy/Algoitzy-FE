import styled from 'styled-components';
import * as tokens from "../../../../tokens"

export const FooterContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 220px;
    background-color: #F6F9FB;
    align-items: center;
    justify-content: space-between;
`;

export const FooterLeftWrap = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 360px;
`;

export const FooterRightWrap = styled.div`
    display: flex;
    flex-direction: row;
    margin-right: 360px;
`;

export const Sentence1 = styled.div`
    font-family: "Pretendard";
    font-weight: 700;
    font-size: 24px;
    line-height: normal; /* 'auto'는 사용할 수 없으므로 'normal'로 설정하거나 특정 값 사용 */
    color: ${tokens.colors.B_Grey_6};
    margin-bottom: 7px;
    margin-right: 7px;
`;

export const Sentence2 = styled.div`
    font-family: "Pretendard";
    font-weight: 500; 
    font-size: 24px;
    line-height: normal;
    color: ${tokens.colors.B_Grey_6};
    margin-bottom: 7px;
`;

export const Sentence3 = styled.div`
    font-family: "Pretendard";
    font-weight: 500; 
    font-size: 18px;
    line-height: normal;
    color: ${tokens.colors.B_Grey_6};
`;

export const Icon = styled.img`
    width: 66px;
    height: 66px;
`;