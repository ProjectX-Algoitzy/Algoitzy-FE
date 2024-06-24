import React from 'react'
import * as itemS from "./Styled/Footer.footer.styles"

export default function footer() {
  return (
    <itemS.FooterContainer>
        <itemS.FooterLeftWrap>
          <itemS.Sentence1>KOALA (한국항공대학교 알고리즘 협회)</itemS.Sentence1>
          <itemS.Sentence2>문의처 : engus525@naver.com</itemS.Sentence2>
          <itemS.Sentence2 style={{marginTop:"24px"}}>Copyrightⓒ2024.KOALA. All rights reserved.</itemS.Sentence2>
        </itemS.FooterLeftWrap>

        <itemS.FooterRightWrap>
          <itemS.Icon src='/img/icongithub.png' alt='깃허브 아이콘' />
          <itemS.Icon src='/img/iconblog.png' alt='블로그 아이콘' style={{marginLeft:"16px"}} />
        </itemS.FooterRightWrap>
    </itemS.FooterContainer>
  )
}
