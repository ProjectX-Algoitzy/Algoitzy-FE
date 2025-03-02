import React, { useEffect } from 'react'
import * as itemS from "./Styled/SelftStudy.selftstudy.home.styles"
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark-reasonable.css';
import MarkdownContent from './SelfStudy.selfstudy.markdowncontent';


export default function SelftStudyHome({ selftStudyContent }) {
  useEffect(() => {
    // 코드블록에 하이라이트 적용
    if (selftStudyContent) {
      document.querySelectorAll('pre').forEach((block) => {
        hljs.highlightBlock(block);
      });
    }
  }, [selftStudyContent]);
  return (
    <itemS.Container>
      <itemS.Title>홈</itemS.Title>
      <MarkdownContent markdownContent={selftStudyContent || ''} /> {/* content 전달 */}
      {/*<itemS.ContentContainer dangerouslySetInnerHTML={{ __html: selftStudyContent }}></itemS.ContentContainer>*/}
    </itemS.Container>
  )
}
