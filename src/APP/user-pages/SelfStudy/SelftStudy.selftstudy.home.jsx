import React, { useState } from 'react'
import * as itemS from "./Styled/SelftStudy.selftstudy.home.styles"
import QuilEditor from '../../components/Editor/Editor.quileditor';

export default function SelftStudyHome({ isEditing }) {
  const [targetContent, setTargetContent] = useState('');
  const [subjectContent, setSubjectContent] = useState('');
  const [proceedContent, setProceedContent] = useState('');

  return (
    <itemS.Container>
      <itemS.InnerContainer>
        <itemS.Title>대상</itemS.Title>
        {isEditing ? (
          <QuilEditor setContent={setTargetContent} />
        ): (
          <itemS.ContentContainer>내용</itemS.ContentContainer>
        )}
        {/* <itemS.ContentContainer dangerouslySetInnerHTML={{ __html: regularStudyHome }}></itemS.ContentContainer> */}
      </itemS.InnerContainer>

      <itemS.InnerContainer>
        <itemS.Title>주제</itemS.Title>
        {isEditing ? (
          <QuilEditor setContent={setSubjectContent} />
        ): (
          <itemS.ContentContainer>내용</itemS.ContentContainer>
        )}
      </itemS.InnerContainer>

      <itemS.InnerContainer>
        <itemS.Title>진행 방식</itemS.Title>
        {isEditing ? (
          <QuilEditor setContent={setProceedContent} />
        ): (
          <itemS.ContentContainer>내용</itemS.ContentContainer>
        )}
      </itemS.InnerContainer>
    </itemS.Container>
  )
}
