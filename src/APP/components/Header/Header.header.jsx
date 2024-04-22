import React from 'react'
import * as itemS from "./Styled/Header.header.styles"
import { Link } from 'react-router-dom'

export default function header() {
  return (
    <itemS.HeaderContainer>
        <itemS.HeaderWrap>
        <itemS.HeaderLeftWrap>
            <Link to="/" style={{textDecoration: 'none'}}><itemS.Rabel>KOALA</itemS.Rabel></Link>
        </itemS.HeaderLeftWrap>
        <itemS.HeaderRightWrap>
            <Link to="/login"><itemS.Btn>로그인/회원가입</itemS.Btn></Link>
        </itemS.HeaderRightWrap>
        </itemS.HeaderWrap>
    </itemS.HeaderContainer>
  )
}
