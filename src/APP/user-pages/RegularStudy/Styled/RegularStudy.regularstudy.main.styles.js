import styled from "styled-components";
import * as tokens from "../../../../tokens";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 360px;
  /* justify-content: center; */
  margin-top: 80px;
  height: 100vh; // 부모 컨테이너의 height를 설정하여 자식 컨테이너가 이 height를 따르도록 합니다.
  position: relative;
`;

export const Content = styled.div`
  flex: 1;
  overflow: auto; // 컨텐츠 영역에 스크롤 처리를 추가하여 overflow 발생 시 스크롤 되도록 설정합니다.
`;



